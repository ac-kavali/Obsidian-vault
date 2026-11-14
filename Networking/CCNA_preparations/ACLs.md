
# ACLs — Access Control Lists

An **ACL** is an ordered list of rules that identifies traffic. Applied to a router interface for packet filtering, it decides which packets are **permitted** and which are **denied**.

Each rule is an **ACE — Access Control Entry**.

**Scope:** IPv4 standard and extended ACL concepts, with standard ACL configuration on Cisco IOS / IOS XE.

## 1. How ACLs work

When a packet reaches an interface and direction with an ACL:

1. Compare the packet with the first ACE.
2. If it does not match, check the next ACE.
3. At the **first match**, apply that rule: **permit** lets the packet past this ACL; **deny** drops it.
4. Stop checking this ACL after a match.
5. If no ACE matches, the **implicit deny** drops the packet.

> [!important] First match wins
> ACLs do not choose the most specific matching rule like a routing-table lookup. Put specific exceptions before broader rules that would match the same packets.

### Main rules

- **Creating an ACL does not apply it.** Attach it to an interface using `ip access-group`.
- For ordinary interface ACLs, use **one IPv4 ACL per interface, per direction**: one inbound and one outbound.
- A single ACL can be reused on multiple interfaces.
- Basic standard/extended ACLs are **stateless**: permitting a request does not automatically permit its reply through another ACL.
- A permit passes this check; routing and other filters must still allow delivery.
- ACLs can also classify traffic for NAT or QoS. In those uses, `deny` does not automatically mean “drop”; the feature determines the effect.

## 2. Implicit deny

Every IPv4 ACL has an invisible final rule that rejects unmatched packets:

| ACL type | Equivalent final rule |
| -------- | --------------------- |
| Standard | `deny any`            |
| Extended | `deny ip any any`     |

You do **not** configure this rule. It normally does not appear in `show running-config`.

If the only rule denies `192.168.10.50`, other sources are also dropped by implicit deny.

To block that host **and allow every other source**, use:

```text
R1(config)# access-list 10 deny host 192.168.10.50
R1(config)# access-list 10 permit any
```

To allow only selected sources, add their permit rules and let implicit deny reject the rest.

> [!warning] A deny-only ACL blocks everything
> A populated ACL needs a matching permit rule for any traffic to pass. An empty or nonexistent IPv4 ACL referenced on an IOS interface generally permits traffic, so create the complete ACL **before attaching it**.

## 3. ACL types

### Standard vs extended

| Feature         | Standard IPv4 ACL                              | Extended IPv4 ACL                                     |
| --------------- | ---------------------------------------------- | ----------------------------------------------------- |
| Matches         | **Source IPv4 address only**                   | Source, destination, protocol, ports numbers          |
| Number ranges   | **1–99**, **1300–1999**                        | **100–199**, **2000–2699**                            |
| Example purpose | Block a source from reaching a destination LAN | Block HTTP to one server while allowing other traffic |
| Usual placement | Near the **destination**                       | Near the **source**                                   |

A standard ACL cannot distinguish destinations. Placing it near the source could block access to other networks too. An extended ACL can identify the intended destination/service, so early filtering avoids carrying unwanted traffic.

These are placement guidelines; the policy and topology decide the exact interface.

### Numbered vs named

This describes **how the ACL is identified**, not what it matches.

| Identification | Standard example | Extended example |
| --- | --- | --- |
| Numbered | `access-list 10 ...` | `access-list 100 ...` |
| Named | `ip access-list standard LAN_FILTER` | `ip access-list extended WEB_FILTER` |

A named ACL can be **standard or extended**.

## 4. Wildcard masks

- **0 bit = must match.**
- **1 bit = ignore.**

For a normal subnet match:

**Wildcard mask = 255.255.255.255 − subnet mask**

| Target | ACL address expression |
| --- | --- |
| One host | `host 192.168.10.50` |
| Same host, explicit wildcard | `192.168.10.50 0.0.0.0` |
| `192.168.10.0/24` | `192.168.10.0 0.0.0.255` |
| `172.16.0.0/16` | `172.16.0.0 0.0.255.255` |
| `192.168.10.64/26` | `192.168.10.64 0.0.0.63` |
| Every source | `any` |

`any` equals `0.0.0.0 255.255.255.255`.

For `192.168.10.0 0.0.0.255`, the first three octets must match; the last can vary from `0` to `255`.

If omitted in a standard ACE, the wildcard defaults to **`0.0.0.0`**: one address. Unlike subnet masks, wildcard masks can have noncontiguous bits.

## 5. Inbound vs outbound

Direction is from the **router interface's point of view**.

| Direction | Meaning | Filtering stage for transit traffic |
| --- | --- | --- |
| `in` | Packet enters this interface | Before the routing decision |
| `out` | Packet leaves this interface | After the routing decision selects the exit interface |

If traffic enters R1 through `G0/0` and leaves through `G0/1`:

1. Check the inbound ACL on `G0/0`, if present.
2. Perform the routing lookup.
3. Check the outbound ACL on `G0/1`, if present.

It does **not** use the outbound ACL on `G0/0` or the inbound ACL on `G0/1`.

> [!tip] Direction does not change the matching field
> A standard ACL checks the packet's **source address**, whether applied `in` or `out`.

## 6. Configure a standard numbered ACL

### Example policy

R1's `G0/1` leads to destination LAN **`192.168.30.0/24`**. Addressing and routing already work.

For traffic leaving toward that LAN:

- Deny source **`192.168.10.50`**.
- Permit the rest of **`192.168.10.0/24`**.
- Deny all other sources.

Use the numbered and named examples as **alternatives**, not two ACLs to stack.

### Create and apply ACL 10

```text
R1> enable
R1# configure terminal
R1(config)# access-list 10 remark Filter sources reaching destination LAN
R1(config)# access-list 10 deny host 192.168.10.50
R1(config)# access-list 10 permit 192.168.10.0 0.0.0.255
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip access-group 10 out
R1(config-if)# end
```

- `10` identifies a **standard** ACL.
- `remark` adds a comment, with no filtering action.
- The host deny precedes the broader subnet permit.
- `out` checks packets leaving `G0/1` toward the destination LAN.
- No `permit any`: other sources must remain blocked.

The destination subnet is **not inside the ACEs**. Interface placement limits which traffic encounters this source-only filter.

| Packet source | Result toward the destination LAN |
| --- | --- |
| `192.168.10.50` | Explicit deny |
| `192.168.10.25` | Subnet permit |
| `192.168.20.25` | Implicit deny |

Verify before saving:

```text
R1# show ip access-lists 10
R1# show ip interface GigabitEthernet0/1
R1# copy running-config startup-config
```

Check rules and available match counters; the interface should show outbound ACL `10`.

## 7. Configure a standard named ACL

The same policy, named **`LAN_FILTER`**:

```text
R1> enable
R1# configure terminal
R1(config)# ip access-list standard LAN_FILTER
R1(config-std-nacl)# remark Filter sources reaching destination LAN
R1(config-std-nacl)# 10 deny host 192.168.10.50
R1(config-std-nacl)# 20 permit 192.168.10.0 0.0.0.255
R1(config-std-nacl)# exit
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip access-group LAN_FILTER out
R1(config-if)# end
```

`LAN_FILTER` identifies the ACL; **10 and 20 are ACE sequence numbers**. Sequence gaps leave room for new rules.

Applying `LAN_FILTER out` replaces an existing ordinary IPv4 outbound ACL on that interface.

### Insert or remove a rule

To also block `192.168.10.60`, insert a deny before sequence 20:

```text
R1# configure terminal
R1(config)# ip access-list standard LAN_FILTER
R1(config-std-nacl)# 15 deny host 192.168.10.60
R1(config-std-nacl)# end
R1# show ip access-lists LAN_FILTER
```

To remove only that added rule:

```text
R1# configure terminal
R1(config)# ip access-list standard LAN_FILTER
R1(config-std-nacl)# no 15
R1(config-std-nacl)# end
```

On supporting IOS versions, edit a numbered ACL through `ip access-list standard 10` too. Sequence-based editing is not exclusive to named ACLs.

Edits to an applied ACL affect traffic immediately. Save the intended final configuration with `copy running-config startup-config`.

## 8. Show running-config: include vs section

The pipe `|` filters the **display only**; it does not change configuration.

| Filter | Displays |
| --- | --- |
| `include EXPRESSION` | Only individual matching lines |
| `section EXPRESSION` | Matching section headers and their associated configuration lines |

Expressions are case-sensitive; `^` means “start of line.”

### Numbered ACL: include

```text
R1# show running-config | include ^access-list 10
access-list 10 remark Filter sources reaching destination LAN
access-list 10 deny host 192.168.10.50
access-list 10 permit 192.168.10.0 0.0.0.255
```

Classic numbered ACEs repeat `access-list 10`, so `include` shows the rules. That text can also match numbers beginning with `10`; use `show ip access-lists 10` for exact selection.

### Named ACL: compare both

```text
R1# show running-config | include ^ip access-list standard LAN_FILTER
ip access-list standard LAN_FILTER
```

Only the header matches; child rules do not contain that expression.

```text
R1# show running-config | section ^ip access-list standard LAN_FILTER
ip access-list standard LAN_FILTER
 remark Filter sources reaching destination LAN
 deny host 192.168.10.50
 permit 192.168.10.0 0.0.0.255
```

Illustrative output: sequence-number display varies by IOS version. Inspect sequences with `show ip access-lists LAN_FILTER`.

### Find the interface attachment

```text
R1# show running-config | include ip access-group
R1# show running-config | section ^interface GigabitEthernet0/1
```

The first shows attachment lines without interface context. The second shows the interface block containing the attachment.

## 9. Quick verification

| Command | Check |
| --- | --- |
| `show ip access-lists` | IPv4 ACL definitions, sequences, available match counters |
| `show ip access-lists LAN_FILTER` | One ACL's rules |
| `show ip interface GigabitEthernet0/1` | Applied inbound/outbound ACLs |

Generate traffic from permitted and denied hosts **through the filtered path**, then inspect results and counters. For ping, both request and reply paths must work.

> [!tip] Memorise
> **First match wins → no match means deny.**  
> Standard: **source only**, usually near destination. Extended: **source + destination + protocol/ports**, usually near source.  
> Wildcard **0 = match**, **1 = ignore**.  
> **Create → apply → verify → save.**  
> `include` = matching lines; `section` = matching blocks.

## Cisco references

- [ACL concepts, direction, and troubleshooting](https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html)
- [ACL examples and first-match behavior](https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html)
- [ACL types, number ranges, and wildcard masks](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/sec_data_acl/configuration/xe-3s/sec-data-acl-xe-3s-book/sec-access-list-ov.html)
- [Create an ACL and apply it](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/security-vpn/security-vpn/m_sec-create-ip-apply-0.html)
- [Named ACL rules](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/security-vpn/security-vpn/m_sec-acl-named.html)
- [ACE sequence numbering](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-acl-seq-num.html)
- [Show filters: include and section](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref/show_through_show_fm_summary.html)

