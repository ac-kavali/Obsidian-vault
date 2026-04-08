A switch is a Device that connect multiple devices and send data only to the correct destination where this improve speed and security, it use ethernet (layer 2: Data link layer)

---
## Part 1 — How a Switch Forwards Data

When a frame arrives on a switch port, the switch performs a precise sequence of decisions. There are **five core processes** a switch can execute, and it always begins with learning.

---
### 1. Learning

Every time a frame enters a port, the switch reads the **source MAC address** and maps it to the incoming port in its **CAM table** (Content Addressable Memory), also called the MAC address table.

```
Frame arrives on Port 2
Source MAC: AA:BB:CC:DD:EE:01
→ CAM table records: AA:BB:CC:DD:EE:01 → Port 2
```

This process is automatic and continuous. The switch builds its table organically from real traffic. Each entry has a timer (typically **300 seconds**) and is removed if no traffic is seen from that MAC within that window.

---

### 2. Forwarding (Unicast — Known Destination)

If the **destination MAC** is already in the CAM table, the switch sends the frame **exclusively** to the corresponding port. No other device on the network sees this traffic.

```
Frame destined for: AA:BB:CC:DD:EE:02
CAM table lookup → Found → Port 5
→ Frame sent ONLY to Port 5
```

This is the most efficient operation and the primary reason switches outperform hubs. Each port becomes its own **collision domain**, enabling simultaneous full-duplex communication.

---

### 3. Flooding (Unicast — Unknown Destination)

If the destination MAC is **not** in the CAM table, the switch cannot make a forwarding decision. It therefore floods the frame to **all ports except the one it arrived on**.

```
Frame destined for: FF:00:AA:BB:CC:03
CAM table lookup → NOT FOUND
→ Frame sent to ALL ports except source port
→ Correct destination replies → switch learns its MAC
→ Future traffic is forwarded directly
```

Flooding is a fallback mechanism. It is normal during the initial phase of network operation but decreases as the CAM table fills with learned addresses.

> ⚠️ **MAC flooding attacks** exploit this by overwhelming the CAM table with fake MAC addresses, forcing the switch to flood all traffic like a hub — exposing data to every device. **Port Security** mitigates this.

---

## Part 2 — The Ethernet Frame

A **frame** is a Layer 2 (Data Link layer) Protocol Data Unit (PDU). It is the fundamental unit of data that a switch reads, forwards, and processes. Understanding a frame means understanding what a switch actually "sees" when traffic flows through it.

> Unlike an **IP packet** (Layer 3) or a **TCP segment** (Layer 4), a frame exists only within a single network segment. Every time it crosses a router, it is discarded and rebuilt.

---

### Frame Type: Ethernet II (IEEE 802.3)

The dominant frame format in modern networks is **Ethernet II**, standardized under IEEE 802.3. It operates at Layer 2 and encapsulates upper-layer data (IP packets, ARP messages, etc.).

---

### Anatomy of an Ethernet Frame

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ETHERNET II FRAME                                    │
├──────────────┬──────────────┬────────┬──────────────────────────┬──────────┤
│   Preamble   │  Dest. MAC   │  Src.  │   EtherType / Length     │  Payload │  FCS
│   + SFD      │  6 bytes     │  MAC   │   2 bytes                │  46–1500 │  4 bytes
│   8 bytes    │              │  6 B   │                          │  bytes   │
└──────────────┴──────────────┴────────┴──────────────────────────┴──────────┘
```

---

### Field-by-Field Breakdown

#### 1. Preamble (7 bytes) + Start Frame Delimiter — SFD (1 byte)

Total: **8 bytes**

The preamble is a sequence of alternating `1`s and `0`s (`10101010...`) that allows receiving NICs to synchronize their clocks with the sender. The final byte — the SFD (`10101011`) — signals that the actual frame data is about to begin.

> The preamble and SFD are added and stripped by the physical layer. The switch and upper layers never see them.

---

#### 2. Destination MAC Address (6 bytes — 48 bits)

This is the **hardware address** of the intended recipient. The switch uses this field exclusively to make forwarding decisions.

MAC address format: `AA:BB:CC:DD:EE:FF` (hexadecimal, colon-separated)

| Value               | Meaning                               |
| ------------------- | ------------------------------------- |
| `FF:FF:FF:FF:FF:FF` | Broadcast — sent to all devices       |
| `01:xx:xx:xx:xx:xx` | Multicast — sent to a group           |
| Any other value     | Unicast — sent to one specific device |

The first 3 bytes are the **OUI** (Organizationally Unique Identifier) — assigned to the manufacturer. The last 3 bytes are the device-specific identifier.

---
#### 3. Source MAC Address (6 bytes — 48 bits)

The hardware address of the **sending device**. The switch reads this field during the **learning** phase to build its CAM table.

> A device cannot spoof its source MAC in normal operation, but MAC spoofing attacks do exist, which is why **Dynamic ARP Inspection** and **802.1X port authentication** are used in secure environments.

---
#### 4. EtherType / Length (2 bytes)

This field serves a dual purpose depending on its value:

| Value              | Interpretation                                                      |
| ------------------ | ------------------------------------------------------------------- |
| `≥ 0x0600` (1536+) | **EtherType** — identifies the Layer 3 protocol                     |
| `< 0x0600`         | **Length** — indicates the size of the payload (older 802.3 format) |

Common EtherType values:

|EtherType|Protocol|
|---|---|
|`0x0800`|IPv4|
|`0x0806`|ARP (Address Resolution Protocol)|
|`0x86DD`|IPv6|
|`0x8100`|802.1Q VLAN tag|
|`0x8847`|MPLS|

---

#### 5. Payload / Data (46 – 1500 bytes)

This is the actual content being transported — typically an IP packet, ARP message, or other Layer 3 PDU. The switch does **not** read this field; it is passed through transparently.

- **Minimum**: 46 bytes — if the data is smaller, **padding** is added to reach the minimum
- **Maximum**: 1500 bytes — this is the standard **MTU** (Maximum Transmission Unit)

Frames carrying more than 1500 bytes of payload are called **jumbo frames** (up to 9000 bytes) and require explicit support from all devices on the path.

> If the payload is less than 46 bytes, the frame is padded with zeros to meet the minimum size requirement. The receiving device removes the padding based on upper-layer length fields.

---

#### 6. Frame Check Sequence — FCS (4 bytes)

The FCS is a **CRC-32** (Cyclic Redundancy Check) value computed from all the frame's fields (excluding preamble/SFD). The receiving device recalculates the CRC and compares it to the FCS:

- **Match** → Frame is intact, accepted
- **Mismatch** → Frame is corrupted, silently **discarded**

The switch performs this check on every incoming frame before making any forwarding decision. Corrupt frames are never forwarded. There is no retransmission at Layer 2 — that responsibility belongs to upper layers (TCP).

---

### Optional: 802.1Q VLAN Tag (4 bytes — inserted between Src MAC and EtherType)

When VLANs are in use, a 4-byte **802.1Q tag** is inserted into the frame to identify which VLAN the frame belongs to. These are called **tagged frames** and travel between switches on trunk ports.

```
┌──────────────┬──────────────┬──────────────────────────┬──────────┬──────────────┐
│  Dest. MAC   │  Src. MAC    │  802.1Q Tag (4 bytes)    │ EtherType│   Payload    │
│  6 bytes     │  6 bytes     │  TPID | PCP | DEI | VID  │ 2 bytes  │  46–1500 B   │
└──────────────┴──────────────┴──────────────────────────┴──────────┴──────────────┘
                               │          │
                               │          └─ VLAN ID (12 bits) → 4094 possible VLANs
                               └─ TPID: 0x8100 (identifies this as a VLAN-tagged frame)
```

|Sub-field|Size|Description|
|---|---|---|
|TPID|16 bits|Tag Protocol Identifier — always `0x8100`|
|PCP|3 bits|Priority Code Point — used for QoS (0–7)|
|DEI|1 bit|Drop Eligible Indicator — marks frames eligible for dropping under congestion|
|VID|12 bits|VLAN Identifier — identifies the VLAN (1–4094)|

---

### Frame Size Summary

|Component|Size|
|---|---|
|Preamble + SFD|8 bytes (not counted in frame size)|
|Destination MAC|6 bytes|
|Source MAC|6 bytes|
|802.1Q Tag (optional)|4 bytes|
|EtherType / Length|2 bytes|
|Payload (data)|46 – 1500 bytes|
|FCS|4 bytes|
|**Minimum frame size**|**64 bytes**|
|**Maximum frame size (standard)**|**1518 bytes** (1522 with 802.1Q tag)|

---

### Why Minimum Frame Size Matters: Collision Detection

The 64-byte minimum exists because of **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection) used in half-duplex Ethernet. A frame must be long enough to still be "on the wire" when a collision signal might return from the farthest point of the network. If a frame is too short, it finishes transmitting before detecting the collision, making the collision invisible.

With modern full-duplex switched networks, collisions are impossible — but the 64-byte minimum remains as a standard.

---

## Quick Reference

|Concept|Key Detail|
|---|---|
|Frame type|Ethernet II (IEEE 802.3)|
|Switch forwarding basis|Destination MAC address|
|Switch learning basis|Source MAC address|
|CAM table aging|~300 seconds (configurable)|
|Frame min size|64 bytes|
|Frame max size|1518 bytes (standard)|
|Error detection|CRC-32 via FCS field|
|VLAN tagging|802.1Q — 4-byte tag, 12-bit VLAN ID|
|Broadcast MAC|FF:FF:FF:FF:FF:FF|