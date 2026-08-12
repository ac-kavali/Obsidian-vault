# Ethernet fram componnents 


preamble 
you should know its position
its lenght 
the exact two functions

![[What_is_the_Structure_of_the_Ethernet_Frame_Format.png]]

**7 simentic parts**
### Prealm 
First part of a Ethernet frame, 7bytes length alternation between 1 and 0s, and used for syncronisation betweent the sender and the receiver. 7 bytes length.
### Start Frame delimiter(SFD)
Its length is 1byte(8bits), and marks the end of the syncronisation, and the start of the real frame begining at the Destination Address

### Destination and Source MAC addresses
The destination MAC address and the source MAC address. in range of 42-1500 bytes

### Length/Type 
(EherType) this feild size is 2 Bytes, cames right after the source mac adress, before the data payload, this feild has dual meaning, depend on the value :
- if its  <=1500 it represent the length: tells you how many bytes of data follows in the paylaod.
- if its >= 1536 its represent the type : identifies which upper layer is carried in the paylaod.
**Common EtherType values**:
 - 0x800: IPv4
 - 0x806: ARP
 - 0x86DD: IPv6
 - 0x8100: 802.1Q(Vlan tagging)

### Frame Check Sequence FCS
Its the only part of the frame footer, with 4 bytes(32bit) in length, detecte currupted data by running a CRC algorithm over the received data
CRC=Cyclic Redundency Check

---
## MAC address
### What is a MAC Address?

A **MAC address** (Media Access Control address) is a unique identifier burned into a network interface card (NIC) at the hardware level.

- **Size:** 6 bytes = 48 bits
- **Aka:** BIA — **Burned-In Address**
- **Uniqueness:** Globally unique (in theory, no two NICs in the world should share the same MAC)
- **Format:** Written as 12 hex digits, usually grouped in pairs or in fours (e.g. `00:1A:2B:3C:4D:5E`)

#### The two parts of a MAC address

| Part          | Size    | Name                                         | Meaning                                                                   |
| ------------- | ------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| First 3 bytes | 24 bits | **OUI** — Organizationally Unique Identifier | Assigned by IEEE to the manufacturer/vendor (identifies who made the NIC) |
| Last 3 bytes  | 24 bits | NIC-specific / vendor-assigned part          | Assigned by the manufacturer, unique per device                           |

So the OUI tells you **who made it**, and the second half tells you **which specific device it is**.

---

### The MAC Address Table (on a Switch)

A switch builds and maintains a **MAC address table** (also called a CAM table — Content Addressable Memory table) to know which MAC address lives behind which port.

#### Dynamically learned MAC address
A **dynamically learned MAC address** is one the switch discovers on its own, automatically, just by looking at the **source MAC address** of frames arriving on its ports — no manual configuration needed. This is the default and normal way switches populate their MAC table.

#### Unknown unicast frame
An **unknown unicast frame** is a frame whose **destination MAC address** is not (yet) in the switch's MAC address table.
- Since the switch doesn't know which port leads to that MAC, it can't forward the frame intelligently.
- Instead, it **floods** the frame out of **every port** except the one it came in on (just like a broadcast, even though the frame itself is a unicast frame).
- Once the real owner of that MAC replies, the switch learns the MAC from the source address of the reply and adds it to the table.

---
### Aging Out MAC Addresses (the 5-minute rule)

By default, dynamically learned MAC addresses are removed from the MAC address table after a period of **inactivity** — typically **5 minutes (300 seconds)** on most switches (Cisco default).

- This timer is called the **aging timer**.
- It is **not** a blanket wipe of the whole table every 5 minutes.
- Only entries that have been **inactive** (no frames seen from that MAC) for the aging period get removed.
- Any MAC address that is still actively sending traffic has its timer **reset** every time a frame is seen from it, so it stays in the table indefinitely as long as it's active.

**Why remove them at all?**

- Keeps the table from filling up with stale/unused entries (devices that got unplugged, moved, or turned off).
- Frees up table space.
- Ensures that if a device physically moves to a different port, the switch will relearn its correct location rather than forwarding to the old, wrong port forever.

---

### How Multiple Connected Switches Learn MAC Addresses

Each switch in the network learns MAC addresses **independently**, using the same basic process — there's no central coordination.

1. When a switch receives a frame, it looks at the **source MAC** and records: _"this MAC is reachable out of the port I received this on."_
2. This applies **even to frames coming in on inter-switch links (uplinks/trunks)** — so a switch will learn the MAC addresses of devices connected to _other_ switches, associating them with the uplink port they arrived on.
3. When a frame needs to go towards another switch, it's forwarded out that uplink; the next switch does its own lookup/learning the same way.

This is why:

> **A single switch port can store and link thousands of different MAC addresses at the same time.**

If a port is a trunk/uplink connecting to another switch (or a whole chain of switches, or a hub), that one port is the path to potentially thousands of downstream devices. The switch doesn't associate "1 port = 1 MAC" — it associates "1 port = every MAC address reachable through that port," which can be a huge number on uplink ports.