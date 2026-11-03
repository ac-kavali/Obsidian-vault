# TCP, UDP, and IPv6

**IPv6** gets a packet to the destination host. **TCP** and **UDP** use port numbers to deliver its data to the right application. Before a PC can send that packet over Ethernet, it needs its own IPv6 configuration and the MAC address of the next hop. Follow PC1 through those steps below.

## 1. TCP and UDP at Layer 4

| Feature | TCP — Transmission Control Protocol | UDP — User Datagram Protocol |
|---|---|---|
| Unit | Segment carrying part of a byte stream | Datagram preserving one message boundary |
| Setup | Three-way handshake | Can send immediately |
| Delivery | Tracks bytes, acknowledges them, retransmits missing data, and delivers bytes in order | Delivery, ordering, and retries are up to the application |
| Flow control | Receiver advertises a window telling the sender how much data it can accept | No built-in receive window |
| Header | At least 20 bytes | 8 bytes: source port, destination port, length, checksum |
| Examples | SSH (22), HTTPS over TCP (443) | DHCPv4 (server 67, client 68), TFTP initial request (69) |

Both use **16-bit ports**. The well-known range is **0–1023**. For example, a client might send from TCP port 51000 to server port 443. The reply travels from 443 to 51000. DNS commonly uses **both UDP and TCP on port 53**.

**TCP handshake and byte tracking**

1. Client → server: **SYN**, sequence 100. The client proposes its starting sequence number.
2. Server → client: **SYN, ACK**, sequence 500, acknowledgment 101. The SYN uses one sequence number.
3. Client → server: **ACK**, acknowledgment 501. Both sides can now send application data.
4. If the client sends 100 bytes starting at sequence 101, they occupy 101–200. The server replies **ACK 201**, meaning “I expect byte 201 next.” TCP can retransmit missing bytes after a timeout or signs of loss.
5. To close normally, each side sends a **FIN** when it finishes sending. A common sequence is **FIN → ACK → FIN → ACK**. The middle ACK and FIN can share a segment.

## 2. How to write an IPv6 address

An address has **128 bits**. Write it as eight 16-bit groups called **hextets**. Each full hextet has four hexadecimal digits. RFC 4291 defines accepted forms. RFC 5952 gives the canonical spelling so two people writing the same address get the same result.

1. Drop **leading zeros within each hextet**. Keep at least one digit: `00a0` becomes `a0`, and `0000` becomes `0`. Dropping the last zero from `a0` would change the value.
2. Find the **longest consecutive run** of all-zero hextets. If it contains at least two hextets, replace the whole run with `::`.
3. If runs tie, compress the **leftmost** one. A longer run farther right always wins over a shorter one on the left.
4. Use `::` **once at most**, anywhere in the address, including the beginning or end. Write letters **a–f in lowercase**. Uppercase input is valid, but lowercase is canonical.

| Input | Canonical output | Decision |
|---|---|---|
| `2001:0DB8:0000:0000:00A0:0000:0000:0001` | `2001:db8::a0:0:0:1` | Two equal runs. Compress the first. |
| `2001:db8:0:0:1:0:0:0` | `2001:db8:0:0:1::` | Three zero hextets beat two. |
| `2001:db8:0:1:2:3:4:5` | `2001:db8:0:1:2:3:4:5` | Leave one isolated zero as `0`. |

> [!tip] Expand it back
> Count the visible hextets and subtract from eight. In `2001:db8::1`, three are visible, so `::` represents five zero hextets. Two separate uses of `::` would make that count ambiguous.

## 3. IPv6 base header

The base header is always **40 bytes**. Read the fields in wire order.

| Field | Bits | What it does |
|---|---:|---|
| Version | 4 | Always 6 for IPv6. |
| Traffic Class | 8 | Carries QoS markings (DSCP) and congestion notification (ECN). |
| Flow Label | 20 | Labels packets belonging to the same flow. |
| Payload Length | 16 | Counts bytes after the 40-byte header, including any extension headers. |
| Next Header | 8 | Identifies the immediately following header. Common values are TCP **6**, UDP **17**, ICMPv6 **58**. It can also identify an extension header. |
| Hop Limit | 8 | Each forwarding router subtracts one. Once the limit reaches zero, the packet cannot be forwarded further. |
| Source Address | 128 | IPv6 address of the sender. |
| Destination Address | 128 | IPv6 address of the intended destination. |

Compared with IPv4, IPv6 has no base-header checksum. Only the source fragments IPv6 packets, using a Fragment extension header.

## 4. Neighbor Discovery Protocol (NDP)

NDP uses **ICMPv6** on the local link. It helps a host discover routers, resolve a neighbor's MAC address, check reachability, and detect duplicate addresses. Its messages have ICMPv6 **types** rather than TCP or UDP ports.

| Type | Message | Question or purpose |
|---:|---|---|
| 133 | Router Solicitation (RS) | “Is there a router? Please advertise now.” |
| 134 | Router Advertisement (RA) | “Here are this link's settings and my router lifetime.” |
| 135 | Neighbor Solicitation (NS) | “Who owns this address?” Also used for reachability probes and duplicate checks. |
| 136 | Neighbor Advertisement (NA) | “I own this address.” Can supply the owner's MAC. |
| 137 | Redirect | A router tells a host about a better first hop for a destination. |

### Solicited-node multicast — how PC1 predicts PC2's group

Suppose PC2 owns `2001:db8:10::1234:5678`. PC1 knows that IPv6 address but needs PC2's MAC.

1. An interface joins a **solicited-node multicast group** for each assigned unicast or anycast address. Every node uses the same rule: start with `ff02::1:ff00:0/104` and copy the target's **last 24 bits** into the remaining space.
2. For PC2, the last six hex digits are `345678`. PC1 therefore sends to **`ff02::1:ff34:5678`**. It can calculate this without asking who joined the group.
3. On Ethernet, the multicast MAC is `33:33` plus the multicast IPv6 address's last 32 bits. Here it is **`33:33:ff:34:56:78`**.
4. Two addresses can share the same last 24 bits. Both hosts might receive the NS, but each checks the **full target IPv6 address** inside it. Only the owner normally answers.

A switch with **MLD snooping** can learn which ports have listeners for an IPv6 multicast group. Without that information, multicast may be flooded within the VLAN. Either way, the receiving hosts still check the target address.

### NS and NA — resolving the next hop on Ethernet

1. PC1 checks its **neighbor table** for PC2. If it lacks a usable MAC, PC1 sends an NS to the calculated multicast group, naming PC2 as the target.
2. PC2 normally replies with a **unicast NA** to PC1 and includes its MAC. PC1 records the mapping and can send its Ethernet frame.
3. For a destination **outside the LAN**, PC1 resolves the **router's** MAC instead. The Ethernet destination is the router, while the IPv6 destination remains the remote host.

### IPv6 neighbor table

The table records a neighbor's IPv6 address, link-layer address, interface, and reachability state. A router can have a route to a distant network while its neighbor table contains only the local next hop for that route.

| State | How to read it |
|---|---|
| INCOMPLETE | Address resolution is in progress. The MAC is unknown. |
| REACHABLE | Reachability was confirmed recently. |
| STALE | The MAC is known, but confirmation has aged. Traffic can still use it. |
| DELAY | Traffic used a stale entry. The node briefly waits for confirmation. |
| PROBE | The node sends unicast NS probes to check reachability. |

On Cisco IOS, run `show ipv6 neighbors`. Check the **address, MAC, interface, and state**. A quiet LAN can legitimately show stale entries.

## 5. RS, RA, SLAAC, and DAD — how PC1 joins the LAN

**Stateless Address Autoconfiguration (SLAAC)** lets PC1 build an address from a router-advertised prefix and an interface ID it generates locally. **Duplicate Address Detection (DAD)** checks whether that candidate is already in use on the link.

1. **Create a link-local address.** PC1 forms a tentative link-local address and normally runs DAD before using it.
2. **Ask for a router.** PC1 sends an RS to `ff02::2` (all routers on the link). Routers also send periodic RAs, so a host can learn the settings without sending an RS.
3. **Read the RA.** R1 sends an RA from its link-local address, here `fe80::1`. It advertises the LAN prefix `2001:db8:10::/64`. A periodic RA goes to `ff02::1` (all nodes on the link). A solicited reply can also go directly to the requesting host.
4. **Build the address.** The prefix's **A flag** permits autonomous address creation. PC1 combines the advertised 64-bit prefix with a 64-bit interface ID, for example `::25`, giving `2001:db8:10::25`. The ID can be generated locally or derived with modified EUI-64.
5. **Check the new address.** While it is tentative, PC1 sends a DAD NS from the unspecified address `::` to `ff02::1:ff00:25`. The NS target is the **full candidate** `2001:db8:10::25`. An existing owner responds with an NA to `ff02::1`. A competing DAD probe can also reveal a clash. If a duplicate is detected, PC1 must not assign that candidate. If the check completes without a conflict, PC1 can use it.
6. **Learn the default gateway.** A **nonzero router lifetime** lets PC1 use the RA sender, `fe80::1`, as a default router. The gateway comes from the RA's source address. The prefix option supplies the prefix.

| RA flag | Meaning |
|---|---|
| A — Autonomous | This prefix may be used for SLAAC. |
| L — On-link | This prefix is advertised as reachable on the local link. |
| M — Managed | Addresses are available through DHCPv6. |
| O — Other configuration | Other settings, such as DNS, are available through DHCPv6. |

**Cisco IOS example.** Configure the advertising router on the LAN. With normal IOS Ethernet defaults, enabling IPv6 routing and configuring the /64 enables RAs carrying this prefix.

```text
R1(config)# ipv6 unicast-routing
R1(config)# interface GigabitEthernet0/0
R1(config-if)# ipv6 address fe80::1 link-local
R1(config-if)# ipv6 address 2001:db8:10::1/64
R1(config-if)# no shutdown
R1(config-if)# end
R1# show ipv6 interface GigabitEthernet0/0
```

Check the interface's link-local address, global prefix, multicast memberships, and RA settings. In Packet Tracer, set PC1's IPv6 configuration to **Auto Config** and check its address and gateway.

## 6. IPv6 static routes

A **static route** is a path entered by the administrator. Imagine R2 sits on R1's Ethernet LAN at `2001:db8:10::2` (link-local `fe80::2`) and connects to the remote LAN `2001:db8:20::/64`.

### Three ways to specify the path

The commands below are **alternative examples** in global configuration mode. The serial example assumes a separate point-to-point link to R2.

| Type | Cisco IOS example | How R1 finds the exit |
|---|---|---|
| Recursive (next hop only) | `ipv6 route 2001:db8:20::/64 2001:db8:10::2` | The first lookup gives R2's address. R1 resolves that address through its routing table to find the outgoing interface. This extra lookup explains “recursive.” |
| Directly attached (exit interface only) | `ipv6 route 2001:db8:20::/64 Serial0/0/0` | The interface identifies the only peer on a point-to-point link. On Ethernet, this form can make R1 attempt neighbor discovery for each final destination. |
| Fully specified (interface and next hop) | `ipv6 route 2001:db8:20::/64 GigabitEthernet0/0 fe80::2` | R1 knows both the link and the neighbor on it. A link-local next hop **requires the interface** because another link can reuse the same address. |

### Route types by purpose

| Purpose | Example | When it matches |
|---|---|---|
| Network | `2001:db8:20::/64` | One destination subnet. |
| Host | `2001:db8:20::99/128` | One exact IPv6 address. |
| Summary | `2001:db8:20::/63` | Covers both `2001:db8:20::/64` and `2001:db8:20:1::/64`. Use when both are reachable through that path. |
| Default | `::/0` | Catches destinations with no more-specific matching route. |
| Floating static | Static route with a higher administrative distance (AD) than the preferred route for the same prefix | Provides a backup if the preferred route disappears and the backup next hop is reachable. |

```text
R1(config)# ipv6 route ::/0 GigabitEthernet0/0 fe80::2
R1(config)# ipv6 route 2001:db8:20::/64 GigabitEthernet0/0 fe80::2 120
R1(config)# end
R1# show ipv6 route
R1# show ipv6 route 2001:db8:20::99
```

In the backup example, assume R1 normally learns the /64 through OSPF over another path. OSPF's default AD is **110**, so the static route with AD **120** can take over if OSPF withdraws it. A normal static route defaults to AD **1**. In the routing table, look for `S` when the static route is installed.

> [!tip] Two different decisions
> **Installing a route:** for the same prefix, lower AD is preferred between route sources. **Forwarding a packet:** among installed routes that match the destination, the **longest prefix** wins. An installed /64 wins over a default /0 even if the /0 has a lower AD.

## Quick recall

- **Need a prefix or gateway?** RS asks. RA supplies the settings.
- **Know the next-hop IPv6 address but need its MAC?** NS asks. NA answers.
- **Testing your own tentative address?** DAD uses an NS with source `::`.
- **Sending off-link?** Keep the remote IPv6 destination and use the local router's MAC.
- **Following the packet upward?** IPv6 Next Header identifies the next protocol. TCP and UDP ports identify the application endpoint.

## References

- [RFC 5952 §4 — canonical IPv6 text](https://www.rfc-editor.org/rfc/rfc5952.html#section-4) · [RFC 4291 §2.7.1 — solicited-node groups](https://www.rfc-editor.org/rfc/rfc4291.html#section-2.7.1)
- [RFC 8200 §3 — IPv6 header](https://www.rfc-editor.org/rfc/rfc8200.html#section-3) · [RFC 2464 §7 — Ethernet multicast mapping](https://www.rfc-editor.org/rfc/rfc2464.html#section-7)
- [RFC 4861 — Neighbor Discovery](https://www.rfc-editor.org/rfc/rfc4861.html) · [RFC 4862 §5 — SLAAC and DAD](https://www.rfc-editor.org/rfc/rfc4862.html#section-5)
- [RFC 9293 — TCP](https://www.rfc-editor.org/rfc/rfc9293.html) · [RFC 768 — UDP](https://www.rfc-editor.org/rfc/rfc768.html)
- [Cisco IOS XE — IPv6 static routing](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/configuration/xe-16/iri-xe-16-book/ip6-route-static-xe.html)
