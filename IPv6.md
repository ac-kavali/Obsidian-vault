# IPv6

**IPv6 = Internet Protocol version 6.** It uses **128-bit addresses**, giving us a much larger address space than IPv4.

An interface can have **multiple IPv6 addresses at the same time**: for example, a global unicast address and a link-local address.

- **Unicast:** one sender → one interface.
- **Multicast:** one sender → members of a group.
- **Anycast:** one sender → one of several interfaces sharing an address.
- IPv6 has **no broadcast**.

## Modified EUI-64

**EUI = Extended Unique Identifier.** Modified EUI-64 can build the **64-bit interface ID** from a **48-bit MAC address**.

For a normal `/64` LAN subnet:

| First 64 bits | Last 64 bits |
| --- | --- |
| Network prefix | Interface ID |

> [!tip] Remember
> EUI-64 creates the **interface ID**, not the network prefix. The prefix must come from configuration or another mechanism such as SLAAC.

### Steps

Example:

- MAC: `00:1A:2B:3C:4D:5E`
- Prefix: `2001:DB8:1234:1::/64`

1. **Split the MAC into two halves:** `00:1A:2B` and `3C:4D:5E`.
2. **Insert `FF:FE` in the middle:** `00:1A:2B:FF:FE:3C:4D:5E`.
3. **Invert the U/L bit of the first byte:** `00` becomes `02`.
4. **Regroup into four hextets:** `021A:2BFF:FE3C:4D5E`.
5. **Add the prefix:** `2001:DB8:1234:1:21A:2BFF:FE3C:4D5E/64`.

A **hextet** is a group of 16 bits, written with up to four hexadecimal digits.

### Which bit do we invert?

The **7th bit from the left** of the first byte, counting from 1. It is also the **2nd bit from the right**.

```text
Original first byte:  00000000 = 00
Modified first byte: 00000010 = 02
```

Invert means **0 → 1** or **1 → 0**. The shortcut is **XOR the first byte with hexadecimal `02`**.

- `00` → `02`
- `02` → `00`
- `AC` → `AE`

Do not always add 2: if that bit is already 1, you must clear it.

### Why invert it? UAA and LAA

In a **MAC address**, the U/L bit describes how the address was assigned:

| MAC type | Meaning | MAC U/L bit | Bit after Modified EUI-64 conversion |
| --- | --- | --- | --- |
| **UAA** | Universally Administered Address; normally manufacturer assigned | **0** | **1** |
| **LAA** | Locally Administered Address; locally assigned or overridden | **1** | **0** |

The original Modified EUI-64 convention reverses this meaning: **1 = universal**, **0 = local**.

**Why this design?** It lets manually chosen local interface IDs use simple values such as `::1` or `::2`, with the U/L bit left at zero.

> [!warning] Common trap
> This bit does **not** decide whether an IPv6 address is global unicast, unique local, or link-local. The **prefix** determines the address type. It also does not change the actual MAC address.

Modern devices can use other interface-ID methods, including stable opaque or temporary IDs. **IPv6 does not require every interface ID to be derived from a MAC.**

## Cisco configuration: Modified EUI-64

```text
Router> enable
Router# configure terminal
Router(config)# ipv6 unicast-routing
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ipv6 address 2001:DB8:1234:1::/64 eui-64
Router(config-if)# no shutdown
Router(config-if)# end
```

- `ipv6 unicast-routing`: enables IPv6 packet forwarding between interfaces.
- `ipv6 address ... /64 eui-64`: supplies the prefix and generates the interface ID.
- `no shutdown`: administratively enables the interface.
- Replace `gigabitEthernet 0/0` with your interface name.

The resulting address depends on **your interface MAC**. Configuring IPv6 also creates a link-local address automatically on Cisco IOS.

### Verify

```text
Router# show interfaces gigabitEthernet 0/0
Router# show ipv6 interface brief
Router# show ipv6 interface gigabitEthernet 0/0
Router# show ipv6 route
```

Check:

- The interface MAC used for your EUI-64 calculation.
- Interface status **up/up**.
- The configured prefix and generated interface ID.
- A link-local address and joined multicast groups.
- Connected IPv6 routes when the interface is operational.

> [!tip] EUI-64 ≠ SLAAC
> **EUI-64** is a way to build the interface ID. **SLAAC** lets a host configure an address using prefix information advertised by a router. SLAAC does not have to use EUI-64.

## Global unicast addresses — GUA

Used for globally unique addressing and communication across networks, including the Internet.

- Main allocated range to remember: **`2000::/3`**.
- First hexadecimal digit: **`2` or `3`**.
- Internet reachability still requires routing and suitable firewall rules.

For an organization given a `/48`, a common layout is:

| Global routing prefix | Subnet ID | Interface ID |
| --- | --- | --- |
| 48 bits | 16 bits | 64 bits |
| `2001:DB8:1234` | `0001` | `021A:2BFF:FE3C:4D5E` |

The organization can create **65,536 `/64` subnets** from a `/48`. Not every organization receives a `/48`.

> [!note] Lab addresses
> `2001:DB8::/32` is reserved for **documentation and examples**. The addresses in this note are not public Internet addresses to deploy.

## Unique local addresses — ULA

Used for **internal communication**, including communication between routed internal subnets or connected sites.

- Full range: **`FC00::/7`**.
- Locally generated ULAs use **`FD00::/8`**.
- The `FC00::/8` half is not defined for ordinary local assignment.
- Not intended to be routed on the public Internet.

Typical structure:

| Prefix | Random Global ID | Subnet ID | Interface ID |
| --- | --- | --- | --- |
| 8 bits: `FD` | 40 bits | 16 bits | 64 bits |

Example: `FD12:3456:789A:1::1/64`.

The randomly generated **40-bit Global ID** reduces the chance of two organizations choosing the same prefix.

> [!warning] ULA ≠ link-local
> Routers **can forward ULA traffic** between internal networks. “Local” does not mean “only on this link.” ULA addressing alone is not a security control.

## Link-local addresses — LLA

Used to communicate **on the same link**, such as the same VLAN. Routers do **not forward packets with link-local source or destination addresses to another link**.

- Reserved range: **`FE80::/10`**.
- Standard format: first 10 bits + **54 zero bits** + 64-bit interface ID.
- Therefore, the usual first 64 bits are **`FE80:0:0:0`**.
- Examples: `FE80::1`, `FE80::21A:2BFF:FE3C:4D5E`.

Used for neighbor discovery, router discovery, and commonly as a default gateway's next-hop address.

### Cisco commands

Enable IPv6 and generate a link-local address without adding a GUA:

```text
Router(config)# interface gigabitEthernet 0/0
Router(config-if)# ipv6 enable
Router(config-if)# no shutdown
```

Or manually choose the link-local address:

```text
Router(config-if)# ipv6 address FE80::1 link-local
```

- The address must be unique **on its link**.
- The same address can appear on **different links**.
- When pinging a link-local address, specify/select the outgoing interface if prompted: the address alone may not identify the link.

> [!tip] Remember
> An interface can have **GUA + LLA**, or **ULA + LLA**, at the same time.

## Multicast addresses

Multicast sends a packet to **interfaces that joined a group**, within the allowed scope.

All IPv6 multicast addresses start with **`FF`**: **`FF00::/8`**.

Format: **8-bit `FF` + 4-bit flags + 4-bit scope + 112-bit group ID**.

In `FF02::1`:

- `FF`: multicast.
- `0`: flags.
- `2`: link-local scope.
- `1`: group ID, here the all-nodes group.

Multicast addresses are **destination addresses**, not source addresses.

### Addresses to memorize

| Address | Group |
| --- | --- |
| `FF02::1` | All IPv6 nodes on the link |
| `FF02::2` | All IPv6 routers on the link |
| `FF02::5` | All OSPFv3 routers on the link |
| `FF02::6` | OSPFv3 DR and BDR on the link |
| `FF02::A` | EIGRP for IPv6 routers on the link |
| `FF02::1:2` | DHCPv6 servers and relay agents on the link |
| `FF02::1:FF00:0/104` | Solicited-node multicast range |

### Solicited-node multicast

Used by Neighbor Discovery, including address resolution and Duplicate Address Detection (**DAD**). IPv6 uses **Neighbor Discovery instead of ARP**.

To derive it:

1. Take the **last 24 bits** of a unicast or anycast address.
2. Append them to **`FF02::1:FF00:0/104`**.

Example:

- Address: `2001:DB8:1234:1:21A:2BFF:FE3C:4D5E`
- Last 24 bits: `3C:4D:5E`
- Solicited-node address: **`FF02::1:FF3C:4D5E`**

Different addresses can share a solicited-node group if their final 24 bits match.

## Multicast address scopes

**Scope = how far the multicast traffic is allowed to travel.** It is the **4th hexadecimal digit** of the address.

| Scope digit | Name | Boundary |
| --- | --- | --- |
| `1` | Interface-local | One interface within the node |
| **`2`** | **Link-local** | **One link; not forwarded to another link** |
| `3` | Realm-local | Defined by the network technology |
| `4` | Admin-local | Administratively defined boundary |
| **`5`** | **Site-local** | **One site** |
| `8` | Organization-local | One organization, potentially several sites |
| **`E`** | **Global** | **No scope boundary smaller than global** |

Examples: `FF02::...` has link-local scope; `FF05::...` has site-local scope; `FF0E::...` has global scope.

Scope is a **limit**, not a promise of delivery. Multicast forwarding still needs the appropriate network support and configuration.

> [!warning] Two different meanings
> **`FE80::/10`** is link-local **unicast**. **`FF02::/16`** is multicast with flags `0` and link-local scope. Both stay on the link, but they target different kinds of recipients.

## Anycast addresses

An **identical IPv6 address is assigned to multiple interfaces**, usually on different devices. Routing delivers a packet to **one instance**, using the best available route.

- **No special anycast prefix**: it uses addresses from unicast address space.
- “Nearest” means **best according to routing**, not necessarily geographically closest.
- Useful for services offered in multiple locations, such as DNS.

### How it works

1. Multiple servers provide the same service using the same anycast address.
2. Their networks advertise reachability to that address.
3. Routers choose the best route toward an instance.
4. If that route is withdrawn after a failure, routing can select another instance.

A service failure must cause the relevant route to be withdrawn or changed for routing to avoid it. Simply assigning the same address does not provide automatic failover.

## Other IPv6 addresses

### Unspecified — `::/128`

All **128 bits are zero**. It means **no address assigned yet**.

- Can be used as a source during initialization, such as in DAD Neighbor Solicitations.
- Not assigned to an interface.
- Not used as a destination.

### Loopback — `::1/128`

Used to communicate with **your own device**. Similar to IPv4 `127.0.0.1`.

```text
Router# ping ipv6 ::1
```

Traffic stays within the device. This does not test the physical network.

> [!warning] Do not confuse
> **`::/128`** = one unspecified address.
> **`::/0`** = the default route prefix, matching all IPv6 destinations.
> **`::1/128`** = the loopback address. A Cisco `interface loopback 0` is a separate logical interface that can receive other addresses.

## Quick review

| Type | Prefix / address | Main purpose |
| --- | --- | --- |
| Global unicast | `2000::/3` | Globally unique addressing; Internet routing where allocated and reachable |
| Unique local | `FC00::/7`; locally assigned `FD00::/8` | Routed internal communication |
| Link-local | `FE80::/10` | Communication on one link |
| Multicast | `FF00::/8` | Deliver to members of a group |
| Anycast | Unicast address space | Deliver to one instance selected by routing |
| Unspecified | `::/128` | No address yet |
| Loopback | `::1/128` | Communicate with yourself |

**Modified EUI-64:** split MAC → insert **FFFE** → flip **U/L bit** → add `/64` prefix.

## References

- [Cisco — IPv6 addressing and EUI-64 configuration](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipv6_basic/configuration/15-mt/ip6b-15-mt-book/ip6-uni-routing.html)
- [RFC 4291 — IPv6 addressing architecture and EUI-64 rationale](https://www.rfc-editor.org/rfc/rfc4291.html)
- [RFC 4193 — Unique local addresses](https://www.rfc-editor.org/rfc/rfc4193.html)
- [IANA — IPv6 multicast addresses and scopes](https://www.iana.org/assignments/ipv6-multicast-addresses)
