
# IPv4 Header — CCNA Essentials

> Goal: know each field, its size, and _why_ it exists (exam-relevant, not RFC-level depth).

## Quick Picture

```
 0               1               2               3
 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |    ToS/DSCP   |          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification       |Flags|     Fragment Offset      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      TTL      |    Protocol   |        Header Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Source IP Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                  Destination IP Address                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (if IHL > 5)                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

---


## Field-by-Field

| Field                            | Size                  | What it means                                                                                                          |
| -------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Version**                      | 4 bits                | IPv4 = `0100` (4). Tells the receiver which IP version to parse the rest as.                                           |
| **IHL** (Internet Header Length) | 4 bits                | Length of the header in **32-bit words**. Min = `5` (20 bytes, no options). Max = `15` (60 bytes).                     |
| **ToS / DSCP + ECN**             | 8 bits                | Type of Service — used for **QoS**. Marks traffic priority (e.g., voice > bulk data). DSCP = 6 bits, ECN = 2 bits.     |
| **Total Length**                 | 16 bits               | Size of the **whole packet** (header + data) in bytes. Max = 65,535 bytes.                                             |
| **Identification**               | 16 bits               | Unique ID for a packet — used to reassemble **fragments** that came from the same original packet.                     |
| **Flags**                        | 3 bits                | Fragmentation control: <br>• `DF` (Don't Fragment) <br>• `MF` (More Fragments) <br>• 1 reserved bit (unused, always 0) |
| **Fragment Offset**              | 13 bits               | Tells where this fragment fits in the original (unfragmented) packet.                                                  |
| **TTL** (Time to Live)           | 8 bits                | Decremented by **1 at every router hop**. Packet dropped when it hits 0 — prevents infinite routing loops.             |
| **Protocol**                     | 8 bits                | What's inside the data payload. Key values to memorize: <br>• `1` = ICMP <br>• `6` = TCP<br>• `17` = UDP               |
| **Header Checksum**              | 16 bits               | Error-checking for the **header only** (not the data). Recalculated by every router since TTL changes each hop.        |
| **Source IP Address**            | 32 bits               | Sender's IP address.                                                                                                   |
| **Destination IP Address**       | 32 bits               | Receiver's IP address.                                                                                                 |
| **Options**                      | Variable (0–40 bytes) | Rarely used in practice (e.g., timestamps, security). Only present if IHL > 5.                                         |
    
---
## CCNA Exam Focus (what Jeremy emphasizes)

- [ ] **TTL** — know it prevents routing loops, decremented per hop, packet dropped + ICMP "Time Exceeded" sent back when it reaches 0.
- [ ] **Protocol field** — memorize TCP=6, UDP=17, ICMP=1 (commonly tested).
- [ ] **Fragmentation fields** (ID, Flags, Fragment Offset) — understand _why_ fragmentation happens (packet > MTU of a link) and that IPv4 routers can fragment, IPv6 routers cannot.
- [ ] **Header Checksum vs no data checksum** — IP only checksums the header; TCP/UDP checksum the data instead.
- [ ] **IHL** — most packets have no options, so IHL = 5 (20-byte header) is the default/typical case.
- [ ] **ToS/DSCP** — ties into QoS topics later in CCNA (marking/prioritizing traffic).
- [ ] Know the **minimum header size = 20 bytes**, **maximum = 60 bytes** (with options).

---

## Common Exam Trick Questions

- "What decrements at each router hop?" → **TTL**
- "What field identifies the upper-layer protocol?" → **Protocol field**
- "What's the minimum IPv4 header size?" → **20 bytes**
- "Which field is used for QoS marking?" → **ToS / DSCP**
- "What happens when TTL = 0?" → Packet dropped, router sends ICMP Time Exceeded back to source

---

## My Notes

_(add your own examples, packet captures, or Wireshark screenshots here)_