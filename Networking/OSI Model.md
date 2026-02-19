# OSI Model — Complete Technical Reference

> _Open Systems Interconnection | Layers 1–7 | Protocols | TCP/IP Stack_

---

## Table of Contents

1. [What is the OSI Model?](#1-what-is-the-osi-model)
2. [The Two Mnemonics](#2-the-two-mnemonics-to-remember-the-layers)
3. [The Layers as Functions — Encapsulation](#3-the-layers-as-functions--encapsulation)
4. [Layer 7 — Application](#4-layer-7--application-layer)
5. [Layer 6 — Presentation](#5-layer-6--presentation-layer)
6. [Layer 5 — Session](#6-layer-5--session-layer)
7. [Layer 4 — Transport](#7-layer-4--transport-layer)
8. [Layer 3 — Network](#8-layer-3--network-layer)
9. [Layer 2 — Data Link](#9-layer-2--data-link-layer)
10. [Layer 1 — Physical](#10-layer-1--physical-layer)
11. [Quick Reference Summary Table](#11-quick-reference--osi-layers-summary)

---

## 1. What is the OSI Model?

**OSI** stands for **Open Systems Interconnection**. It is a conceptual framework developed by the International Organization for Standardization (ISO) in 1984, designed to standardize how different computer systems communicate over a network — regardless of their internal architecture or vendor.

Think of it as a blueprint that breaks down the complex task of network communication into **7 distinct, manageable layers**, each with a clearly defined responsibility.

> **Why does the OSI Model exist?**
> 
> Before OSI, every vendor had proprietary networking protocols. IBM systems couldn't talk to DEC systems, and so on. OSI gave engineers a universal language to design, troubleshoot, and reason about networks.
> 
> Today it serves as:
> 
> - A **troubleshooting guide**: "At which layer does the problem occur?"
> - A **teaching framework** for understanding networking protocols
> - A **reference model** for protocol designers and architects
> - A **map** to understand what happens behind every connection you make

**Analogy — Sending a Letter:** When you send a physical letter, you write content, put it in an envelope, address it, give it to the post office, it travels through sorting centers, trucks, planes — and arrives. Each step has a defined role. OSI does the same for data.

---

## 2. The Two Mnemonics to Remember the Layers

The OSI model has 7 layers, numbered **1 (bottom)** through **7 (top)**. Two classic mnemonics help remember them:

### Top-Down (Layer 7 → 1)

> **"All People Seem To Need Data Processing"**

|Letter|Word|Layer|Name|
|---|---|---|---|
|**A**|All|7|Application|
|**P**|People|6|Presentation|
|**S**|Seem|5|Session|
|**T**|To|4|Transport|
|**N**|Need|3|Network|
|**D**|Data|2|Data Link|
|**P**|Processing|1|Physical|

### Bottom-Up (Layer 1 → 7)

> **"Please Do Not Throw Sausage Pizza Away"**

|Letter|Word|Layer|Name|
|---|---|---|---|
|**P**|Please|1|Physical|
|**D**|Do|2|Data Link|
|**N**|Not|3|Network|
|**T**|Throw|4|Transport|
|**S**|Sausage|5|Session|
|**P**|Pizza|6|Presentation|
|**A**|Away|7|Application|

---

## 3. The Layers as Functions — Encapsulation

Think of each OSI layer like a **function** in a program — it receives input from the layer below, performs a specific job, and passes output to the layer above. Data flows **down** the stack on the sender side and **up** the stack on the receiver side.

Each layer adds a **header** (and sometimes a **trailer**) to the data — this is called **encapsulation**. The reverse process on the receiving end is **decapsulation**.

```
SENDER                              RECEIVER
──────────────────────────────────────────────────────
Layer 7  Application Data          Application Data  Layer 7
Layer 6  [L6 Header] + Data             Data + [L6]  Layer 6
Layer 5  [L5][L6] + Data           Data + [L6][L5]  Layer 5
Layer 4  [TCP Header] + Data       Data + [TCP Hdr]  Layer 4  <- Segment
Layer 3  [IP Header] + Segment   Segment + [IP Hdr]  Layer 3  <- Packet
Layer 2  [MAC Hdr] + Packet + [FCS]                  Layer 2  <- Frame
Layer 1  0101010110100011...  (bits on the wire)     Layer 1  <- Bits
──────────────────────────────────────────────────────
```

**PDU (Protocol Data Unit) names by layer:**

|Layer|PDU Name|
|---|---|
|4 – Transport|Segment (TCP) / Datagram (UDP)|
|3 – Network|Packet|
|2 – Data Link|Frame|
|1 – Physical|Bits|

---

## 4. Layer 7 — Application Layer

> **Function:** Provides the interface and services that applications use to communicate over the network.

This is the layer **closest to the end-user**. It is NOT the application itself (e.g. Chrome), but rather the protocols those applications use to communicate.

### What happens when you open a browser and type `https://example.com`?

1. Your browser (the **user agent**) determines it needs to make an HTTP/HTTPS request.
2. The Application layer **constructs the HTTP message**.
3. **DNS resolution** occurs — the hostname is converted to an IP address.
4. The request is handed down to the Presentation layer for encryption (TLS).
5. The data continues down the stack until it's transmitted as bits.

### Anatomy of an HTTP/HTTPS Request

```http
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: session_id=abc123; theme=dark
Cache-Control: max-age=0
```

For a **POST request**, a body is included:

```http
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 42

{"username": "alice", "password": "secret"}
```

**Common HTTP status codes:**

|Code|Meaning|
|---|---|
|`200 OK`|Request succeeded|
|`301 Moved Permanently`|Resource has a new URL|
|`400 Bad Request`|Malformed request|
|`401 Unauthorized`|Authentication required|
|`403 Forbidden`|Access denied|
|`404 Not Found`|Resource doesn't exist|
|`500 Internal Server Error`|Server-side failure|

### DNS — Domain Name System

**DNS** is the internet's phonebook. It translates human-readable domain names like `example.com` into IP addresses like `93.184.216.34`.

```
User types: example.com
     |
     v
1. Browser DNS cache          -> Hit? Done.
     | Miss
     v
2. OS Resolver / hosts file   -> Hit? Done.
     | Miss
     v
3. ISP Recursive Resolver     -> Hit? Done.
     | Miss
     v
4. Root Nameservers           -> "Ask .com TLD servers"
     |
     v
5. TLD Nameservers (.com)     -> "Ask ns1.example.com"
     |
     v
6. Authoritative Nameserver   -> Returns A record: 93.184.216.34
     |
     v
Browser connects to 93.184.216.34
```

**Common DNS record types:**

|Record|Purpose|Example|
|---|---|---|
|`A`|IPv4 address|`example.com -> 93.184.216.34`|
|`AAAA`|IPv6 address|`example.com -> 2606:2800::1`|
|`CNAME`|Alias to another domain|`www -> example.com`|
|`MX`|Mail exchange server|`mail.example.com`|
|`TXT`|Arbitrary text (SPF, DKIM, etc.)|`v=spf1 include:...`|
|`NS`|Nameserver for domain|`ns1.example.com`|
|`PTR`|Reverse DNS (IP -> name)|`34.216.184.93.in-addr.arpa`|

### Protocols at the Application Layer

|Protocol|Port|Description|
|---|---|---|
|`HTTP`|80|HyperText Transfer Protocol — web browsing|
|`HTTPS`|443|HTTP over TLS — encrypted web|
|`DNS`|53|Domain Name System — hostname resolution (UDP/TCP)|
|`SMTP`|25/587|Simple Mail Transfer Protocol — sending email|
|`IMAP`|143/993|Internet Message Access Protocol — email retrieval|
|`POP3`|110/995|Post Office Protocol — email download|
|`FTP`|20/21|File Transfer Protocol|
|`SFTP`|22|SSH File Transfer Protocol|
|`SSH`|22|Secure Shell — encrypted remote terminal|
|`DHCP`|67/68|Dynamic Host Configuration Protocol|
|`SNMP`|161/162|Network device monitoring|
|`LDAP`|389/636|Directory services (Active Directory)|
|`NTP`|123|Network Time Protocol|
|`WebSocket`|80/443|Full-duplex TCP communication channel|
|`gRPC`|varies|Remote Procedure Call over HTTP/2|

---

## 5. Layer 6 — Presentation Layer

> **Function:** Data translation, encoding, compression, and encryption between the application and the network.

The Presentation layer acts as a **data translator**. It ensures that data sent from one system can be read by another — handling format conversion and protecting data in transit.

### Data Transformation

|Task|Examples|
|---|---|
|**Character Encoding**|ASCII, UTF-8, UTF-16, EBCDIC|
|**Serialization**|JSON, XML, Protocol Buffers, MessagePack, CBOR|
|**Compression**|gzip, deflate, Brotli, LZ4, Zstandard|
|**Encryption**|AES-256-GCM, ChaCha20-Poly1305|

### Protocol Negotiation

A critical function of this layer is **cipher suite negotiation** — both endpoints must agree before any encrypted communication can begin:

- **Encryption algorithm** — e.g., `AES-256-GCM`, `ChaCha20-Poly1305`
- **Key exchange method** — e.g., `ECDHE` (Elliptic-curve Diffie-Hellman Ephemeral)
- **Signature algorithm** — e.g., `RSA`, `ECDSA`
- **MAC / HMAC algorithm** — e.g., `HMAC-SHA256`, `HMAC-SHA384`
- **Certificate format** — `X.509` / `ASN.1`

### TLS — Transport Layer Security

**TLS (Transport Layer Security)** is the dominant protocol at the Presentation layer. It provides **confidentiality**, **integrity**, and **authentication** for data in transit. It is the successor to SSL.

**TLS 1.3 Handshake (1-RTT):**

```
Client                                    Server
  |                                          |
  |---- ClientHello ------------------------>|
  |     (TLS version, cipher suites,         |
  |      key share, random value)            |
  |                                          |
  |<--- ServerHello -------------------------|
  |<--- Certificate -------------------------|
  |<--- CertificateVerify ------------------|
  |<--- Finished ----------------------------|
  |     (selected cipher suite, key share,   |
  |      certificate for authentication)     |
  |                                          |
  |  [Both sides derive session keys         |
  |   using ECDHE shared secret]             |
  |                                          |
  |---- Finished ---------------------------->|
  |                                          |
  |==== Encrypted Application Data =========>|
```

> TLS 1.3 eliminated weak cipher suites (RC4, DES, 3DES, MD5, SHA-1) and mandated Forward Secrecy (ECDHE). TLS 1.2 required 2 round-trips; TLS 1.3 needs only 1 (and supports 0-RTT session resumption).

**A TLS Record Header contains:**

```
Content Type  (1 byte)   -- handshake / application data / alert / change_cipher_spec
TLS Version   (2 bytes)  -- 0x0303 (TLS 1.2/1.3 for compatibility)
Length        (2 bytes)  -- length of the following data fragment
Data          (variable) -- the encrypted payload
```

### Protocols at the Presentation Layer

|Protocol|Description|
|---|---|
|`TLS 1.3 / 1.2`|Transport Layer Security — encryption and authentication|
|`SSL`|Secure Sockets Layer — deprecated predecessor to TLS|
|`MIME`|Multipurpose Internet Mail Extensions — email encoding|
|`XDR`|eXternal Data Representation — Sun RPC data format|
|`ASN.1`|Abstract Syntax Notation One — certificate encoding (X.509)|
|`ASCII / UTF-8`|Character encoding standards|
|`JPEG / PNG / H.264`|Media encoding/compression formats|

---

## 6. Layer 5 — Session Layer

> **Function:** Establishes, manages, and terminates sessions (logical connections) between communicating applications.

A **session** is a persistent context that allows a series of exchanges to be treated as a single logical conversation. When your OS initiates a connection, it creates a **socket** — an endpoint identified by an IP address and port number.

### Session Lifecycle

```
Application A                              Application B
     |                                          |
     |---- Session Establishment (SYN) -------->|
     |     Authentication, parameter negotiation |
     |                                          |
     |<==== Bidirectional Data Transfer =======>|
     |     Dialog control, synchronization      |
     |                                          |
     |---- Session Termination (FIN) ---------->|
     |     Resources released, socket closed    |
     |                                          |
```

### Key Responsibilities

- **Dialog Control** — Manages communication direction: half-duplex (one at a time) or full-duplex (simultaneous).
- **Synchronization** — Inserts **checkpoints** in data streams. If a failure occurs, transfer resumes from the last checkpoint rather than restarting entirely.
- **Session Recovery** — Handles reconnection after interruptions, essential for long file transfers.
- **Authentication & Authorization** — Validates identity at the session level (e.g., login sessions, API tokens).

### Protocols at the Session Layer

|Protocol|Description|
|---|---|
|`NetBIOS`|Network Basic I/O System — session services for Windows|
|`RPC`|Remote Procedure Call — call functions on remote systems|
|`PPTP`|Point-to-Point Tunneling Protocol — VPN session establishment|
|`SIP`|Session Initiation Protocol — VoIP/video call setup|
|`H.245`|ITU multimedia session control|
|`SOCKS`|Socket Secure — proxy protocol for session-level routing|
|`SAP`|Session Announcement Protocol|

---

## 7. Layer 4 — Transport Layer

> **Function:** End-to-end communication between processes. Segmentation, addressing, reliable delivery, flow control.

The Transport layer provides **process-to-process** delivery. It is responsible for segmenting data from upper layers and ensuring delivery (reliably with TCP, or fast and best-effort with UDP).

### Key Responsibilities

|Responsibility|Description|
|---|---|
|**Segmentation & Reassembly**|Breaks data into segments numbered so the receiver can reorder them|
|**Process-Level Addressing**|Port numbers (0–65535) identify which application receives data|
|**Multiplexing**|Multiple apps share the network via distinct port-tagged segments|
|**Demultiplexing**|At the receiver, segments are routed to the correct application by port|
|**Connection Management**|TCP: 3-way handshake to establish, FIN/ACK to terminate|
|**Flow Control**|Sliding window prevents sender from overwhelming receiver|
|**Error Control**|Sequence numbers + ACKs + retransmissions guarantee delivery (TCP)|

### TCP — Transmission Control Protocol

TCP provides **reliable, ordered, error-checked** delivery. It is **connection-oriented**.

**Three-Way Handshake:**

```
Client                          Server
  |                                |
  |---- SYN (seq=x) -------------->| Step1: Client requests connection
  |<--- SYN-ACK (seq=y, ack=x+1) --| Step2: Server acknowledges + responds
  |---- ACK (ack=y+1) ------------>| Step 3: Client confirms -- connection open
  |                                |
  |==== Data Transfer ============>|
  |                                |
  |---- FIN ---------------------->|   Teardown begins
  |<--- FIN-ACK -------------------|
```

**TCP Segment Header (20 bytes minimum):**

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+---------------------------+---------------------------------------+
|      Source Port (16)     |         Destination Port (16)         |
+---------------------------+---------------------------------------+
|                      Sequence Number (32)                         |
+-------------------------------------------------------------------+
|                    Acknowledgment Number (32)                     |
+--------+----------+-----------------------------------------------+
| Offset | Reserved |  Flags: URG ACK PSH RST SYN FIN               |
+--------+----------+-------------------+---------------------------+
|          Window Size (16)             |         Checksum (16)     |
+---------------------------------------+---------------------------+
|                    Urgent Pointer (16) / Options                  |
+-------------------------------------------------------------------+
|                         Data (payload)                            |
```

|Field|Size|Purpose|
|---|---|---|
|Source Port|16 bits|Sending application's port|
|Destination Port|16 bits|Receiving application's port|
|Sequence Number|32 bits|Position of this segment in data stream|
|Acknowledgment Number|32 bits|Next expected byte from sender|
|Data Offset|4 bits|Header length in 32-bit words|
|Flags|9 bits|`SYN`, `ACK`, `FIN`, `RST`, `PSH`, `URG`, `ECE`, `CWR`|
|Window Size|16 bits|Flow control — max bytes receiver can buffer|
|Checksum|16 bits|Error detection for header + data|
|Urgent Pointer|16 bits|Points to urgent data when `URG` flag is set|

### UDP — User Datagram Protocol

UDP is **connectionless, lightweight, and fast**. No delivery guarantee, no ordering, no flow control.

**UDP Datagram Header (8 bytes — fixed):**

```
+---------------------------+---------------------------------------+
|      Source Port (16)     |         Destination Port (16)        |
+---------------------------+---------------------------------------+
|         Length (16)       |           Checksum (16)              |
+---------------------------+---------------------------------------+
|                         Data (payload)                            |
```

**TCP vs UDP — When to use which:**

|Feature|TCP|UDP|
|---|---|---|
|Connection|Yes (3-way handshake)|No|
|Reliability|Guaranteed delivery|Best-effort|
|Ordering|Guaranteed|Not guaranteed|
|Flow Control|Yes (sliding window)|No|
|Speed|Slower (overhead)|Faster|
|**Use for**|HTTP, FTP, SSH, SMTP|DNS, VoIP, gaming, streaming|

### Flow Control — TCP Sliding Window

The receiver advertises its **receive window size** (`rwnd`) in each ACK. The sender may not send more unacknowledged data than this window size.

```
Sender                                  Receiver
  |                                        |
  |---- Segment 1 ------------------------>|
  |---- Segment 2 ------------------------>|
  |---- Segment 3 ------------------------>|  Window = 3
  |                                        |
  |<--- ACK 4 (rwnd=5) -------------------|  Window expands
  |---- Segment 4, 5, 6, 7, 8 ----------->|
```

**TCP Congestion Control algorithms:** Slow Start → Congestion Avoidance → Fast Retransmit → Fast Recovery (Reno / CUBIC / BBR).

### Protocols at the Transport Layer

|Protocol|Description|
|---|---|
|`TCP`|Transmission Control Protocol — reliable, ordered|
|`UDP`|User Datagram Protocol — fast, connectionless|
|`SCTP`|Stream Control Transmission Protocol — multi-streaming|
|`QUIC`|Quick UDP Internet Connections — basis of HTTP/3|
|`DCCP`|Datagram Congestion Control Protocol|

---

## 8. Layer 3 — Network Layer

> **Function:** Logical addressing and routing — determines the best path for packets across multiple networks.

The Network layer enables **inter-network communication** (routing between different networks). It operates on **packets**.

### Key Responsibilities

|Responsibility|Description|
|---|---|
|**Logical Addressing**|IP addresses uniquely identify source and destination globally|
|**Routing**|Determines the optimal path through intermediate routers|
|**Datagram Encapsulation**|Wraps Transport segments in an IP packet|
|**Fragmentation & Reassembly**|Splits packets exceeding MTU; destination reassembles|
|**Error Handling**|ICMP reports errors: host unreachable, TTL exceeded, etc.|

### IPv4 Header (20 bytes minimum)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-------+-------+---------------+---------------+-------------------+
|Version|  IHL  |  DSCP  | ECN  |            Total Length           |
+-------+-------+---------------+-+---+-----------------------------+
|          Identification (16)    |Flg|      Fragment Offset        |
+-----------------------+---------+---+-----------------------------+
|       TTL (8)         | Protocol(8) |       Header Checksum       |
+-----------------------+-------------+-----------------------------+
|                      Source IP Address (32)                        |
+-------------------------------------------------------------------+
|                   Destination IP Address (32)                      |
+-------------------------------------------------------------------+
|                    Options (variable) + Padding                    |
+-------------------------------------------------------------------+
```

|Field|Size|Purpose|
|---|---|---|
|Version|4 bits|IP version: `4` or `6`|
|IHL|4 bits|Internet Header Length (in 32-bit words)|
|DSCP|6 bits|Quality of Service class (QoS marking)|
|ECN|2 bits|Explicit Congestion Notification|
|Total Length|16 bits|Packet size (header + data), max 65,535 bytes|
|Identification|16 bits|Fragment reassembly identifier|
|Flags|3 bits|`DF` = Don't Fragment, `MF` = More Fragments|
|Fragment Offset|13 bits|Position of fragment in original datagram|
|**TTL**|8 bits|**Time To Live** — max hops before discard (prevents loops)|
|Protocol|8 bits|Upper layer: `6`=TCP, `17`=UDP, `1`=ICMP, `89`=OSPF|
|Header Checksum|16 bits|Error detection for header only|
|Source IP|32 bits|IPv4 address of sender|
|Destination IP|32 bits|IPv4 address of receiver|

> **TTL in action:** Each router decrements TTL by 1. When it reaches 0, the packet is discarded and ICMP "Time Exceeded" is returned. `traceroute` exploits this behavior to map each hop.

### Routing

Routers use **routing tables** to forward packets. When a packet arrives, the router matches the destination IP using **Longest Prefix Match**.

```
Routing Table Example:
Destination       Mask             Gateway         Interface   Metric
0.0.0.0           0.0.0.0          192.168.1.1     eth0        100    <- default route
10.0.0.0          255.0.0.0        10.1.1.1        eth1        10
192.168.1.0       255.255.255.0    0.0.0.0         eth0        1      <- directly connected
```

**Routing Protocol Types:**

|Type|Examples|Mechanism|
|---|---|---|
|Static|Manual configuration|Admin defines routes|
|IGP — Distance Vector|RIP, EIGRP|Share routing table with neighbors|
|IGP — Link State|OSPF, IS-IS|Build full topology map (Dijkstra's algorithm)|
|EGP — Path Vector|BGP|Exchange AS path info (internet backbone)|

### Protocols at the Network Layer

|Protocol|Description|
|---|---|
|`IPv4`|Internet Protocol v4 — 32-bit addressing|
|`IPv6`|Internet Protocol v6 — 128-bit addressing|
|`ICMP`|Internet Control Message Protocol — ping, traceroute, error reports|
|`ICMPv6`|IPv6 errors + Neighbor Discovery Protocol (NDP)|
|`OSPF`|Open Shortest Path First — link-state IGP|
|`BGP`|Border Gateway Protocol — internet backbone routing|
|`EIGRP`|Enhanced Interior Gateway Routing Protocol — Cisco hybrid|
|`RIP`|Routing Information Protocol — distance vector (legacy)|
|`ARP`|Address Resolution Protocol — maps IP to MAC|
|`NAT`|Network Address Translation — private to public IP mapping|
|`IPSec`|IP Security — network-layer VPN encryption|
|`GRE`|Generic Routing Encapsulation — tunnel protocol|

---

## 9. Layer 2 — Data Link Layer

> **Function:** Node-to-node transfer of data frames between directly connected devices. Physical addressing, error detection, medium access control.

The Data Link layer handles communication between two devices on the **same network segment**. It operates on **frames**.

### Two Sub-layers

```
 +------------------------------------------------+
 |           LLC -- Logical Link Control          |  <- Upper sub-layer
 |  (Protocol multiplexing, flow & error control) |
 +------------------------------------------------+
 |           MAC -- Media Access Control          |  <- Lower sub-layer
 |  (Physical addressing, medium access control)  |
 +------------------------------------------------+
```

**LLC (Logical Link Control):** Interface between the Network layer and MAC. Identifies which Layer 3 protocol is carried (via EtherType). Provides flow and error notification.

**MAC (Media Access Control):** Controls how devices gain access to the shared medium. Uses **CSMA/CD** for Ethernet (wired) and **CSMA/CA** for Wi-Fi (wireless). Handles physical addressing with **48-bit MAC addresses**.

### Key Responsibilities

- **Data Framing** — Encapsulates packets by adding a MAC header and FCS trailer.
- **Physical Addressing** — Uses 48-bit MAC addresses (e.g., `AA:BB:CC:DD:EE:FF`) to identify devices on the same local segment.
- **Error Detection & Handling** — Frame Check Sequence (FCS) using CRC32 detects corrupted frames. Corrupted frames are dropped; upper layers handle retransmission.
- **Medium Access Control** — Arbitrates who transmits on a shared medium.
- **Flow Control** — Link-level rate limiting to prevent buffer overflow.
- **Defining Physical Requirements** — Specifies which physical technologies it operates over (e.g., IEEE 802.3 = Ethernet, IEEE 802.11 = Wi-Fi).

### Ethernet Frame Structure (IEEE 802.3 / Ethernet II)

```
+----------+-----+--------------+------------+-----------+-----------------+------+
| Preamble | SFD |   Dest MAC   |  Src MAC   | EtherType |    Payload      | FCS  |
|  7 bytes | 1 B |   6 bytes    |  6 bytes   |  2 bytes  |  46-1500 bytes  | 4 B  |
+----------+-----+--------------+------------+-----------+-----------------+------+
```

|Field|Size|Purpose|
|---|---|---|
|Preamble|7 bytes|`10101010...` — clock synchronization|
|SFD|1 byte|`10101011` — Start Frame Delimiter|
|Destination MAC|6 bytes|MAC of receiving device|
|Source MAC|6 bytes|MAC of sending device|
|EtherType|2 bytes|`0x0800`=IPv4, `0x86DD`=IPv6, `0x0806`=ARP|
|Payload|46–1500 bytes|Encapsulated IP packet|
|FCS|4 bytes|CRC32 — error detection|

**MAC Address structure:**

```
AA:BB:CC:DD:EE:FF
|-----------|---|
  OUI (24 bits)  NIC-specific (24 bits)
  (Vendor ID)

Bit 0 of first byte: 0 = Unicast, 1 = Multicast
Bit 1 of first byte: 0 = Globally unique (burned-in), 1 = Locally administered
```

### Protocols & Standards at the Data Link Layer

|Protocol/Standard|Description|
|---|---|
|`IEEE 802.3`|Ethernet — dominant wired LAN standard|
|`IEEE 802.11`|Wi-Fi — WLAN (a/b/g/n/ac/ax/be)|
|`IEEE 802.1Q`|VLAN tagging — 4-byte tag inserted in Ethernet frame|
|`IEEE 802.1X`|Port-based Network Access Control (NAC)|
|`IEEE 802.3ad / LACP`|Link Aggregation — bonding multiple ports|
|`PPP`|Point-to-Point Protocol — WAN serial link encapsulation|
|`HDLC`|High-Level Data Link Control — synchronous serial|
|`STP / RSTP`|Spanning Tree Protocol — prevents Layer 2 loops|
|`MPLS`|Multi-Protocol Label Switching — often called "Layer 2.5"|
|`ARP`|Address Resolution Protocol — IP to MAC mapping|
|`VXLAN`|Virtual Extensible LAN — L2 over L3 tunneling (data centers)|

---

## 10. Layer 1 — Physical Layer

> **Function:** Transmission of raw bits over a physical medium. Defines electrical, optical, or radio signals, hardware specifications, and network topology.

The Physical layer is the **foundation of all networking**. It converts binary data (bits) into physical signals and transmits them.

### Key Responsibilities

- **Bit Transmission** — Converts bits into electrical voltages, light pulses, or radio waves. Converts received signals back to bits.
- **Encoding & Signaling** — Line coding ensures clock synchronization and signal integrity.
- **Hardware Specification** — Defines connectors, cables, NICs, transceivers, antennas.
- **Network Topology & Design** — Physical layout of devices.
- **Transmission Rate** — Defines bit rate (bandwidth) and baud rate.
- **Synchronization** — Ensures sender/receiver sample bits at the correct time.

### Transmission Media

#### Copper (Electrical Signals)

|Cable Type|Standard|Max Speed|Max Distance|
|---|---|---|---|
|Cat5e UTP|1000BASE-T|1 Gbps|100 m|
|Cat6 UTP|10GBASE-T|10 Gbps|55 m|
|Cat6a UTP|10GBASE-T|10 Gbps|100 m|
|Cat8 UTP|40GBASE-T|40 Gbps|30 m|
|Coaxial|DOCSIS 3.1|~10 Gbps|km (amplified)|

#### Fiber Optic (Light Pulses)

|Type|Core Size|Max Distance|Use Case|
|---|---|---|---|
|Single-Mode (SMF)|9 µm|100+ km|WAN, ISP backbone, long-haul|
|Multi-Mode OM3|50 µm|300 m @ 10G|Data center, building|
|Multi-Mode OM4|50 µm|550 m @ 10G|Data center|
|Multi-Mode OM5|50 µm|150 m @ 100G|Wideband multimode|

> Fiber is immune to electromagnetic interference (EMI) and supports much higher bandwidth and distances than copper.

#### Wireless (Radio Waves / Electromagnetic Spectrum)

|Technology|Standard|Frequency|Max Speed|
|---|---|---|---|
|Wi-Fi 4|802.11n|2.4/5 GHz|600 Mbps|
|Wi-Fi 5|802.11ac|5 GHz|3.5 Gbps|
|Wi-Fi 6/6E|802.11ax|2.4/5/6 GHz|9.6 Gbps|
|Wi-Fi 7|802.11be|2.4/5/6 GHz|46 Gbps|
|4G LTE|3GPP|700 MHz–2.6 GHz|~100 Mbps|
|5G NR|3GPP|Sub-6 GHz / mmWave|~10+ Gbps|
|Bluetooth 5|802.15.1|2.4 GHz|2 Mbps|
|Zigbee|802.15.4|2.4 GHz|250 kbps (IoT mesh)|
|LoRa|LoRaWAN|868/915 MHz|~50 kbps (long-range IoT)|

### Signal Encoding Schemes

|Scheme|Description|Used In|
|---|---|---|
|**NRZ** (Non-Return to Zero)|High=1, Low=0. Simple, DC wander issues|RS-232, early serial|
|**Manchester**|Transition mid-bit: H->L=1, L->H=0. Self-clocking|10BASE-T Ethernet|
|**4B/5B**|4 data bits -> 5 code bits, ensures transitions|100BASE-TX, FDDI|
|**8B/10B**|8 bits -> 10 bits, DC balance|1G Ethernet, Fibre Channel|
|**64B/66B**|64 data bits -> 66 bits, efficient|10G+ Ethernet|
|**PAM4**|4-level pulse amplitude, 2 bits/symbol|25G/100G/400G Ethernet|
|**OFDM**|Multiple orthogonal subcarriers|Wi-Fi, DSL, LTE, 5G|

```
NRZ Encoding:
  Bit:    1   0   1   1   0
  Signal: -+  +-  +------+  +-
           |  |           |  |
           +--+           +--+

Manchester Encoding:
  Bit:    1   0   1   1   0
  Signal: High-to-Low = 1
          Low-to-High = 0
          (Transition always occurs at midpoint of bit period)
```

### Network Topologies

```
  Star                    Bus                   Ring

      [SW]               --o--o--o--o--          o
     / | \                                     /   \
    o  o  o                                   o     o
                                               \   /
                                                o-o

  Full Mesh               Tree (Hierarchical)

  o-----o                        [Core]
  |\ /\ |                           o
  | X  \|                      /----+----\
  |/ \/ |               [Dist] o         o [Dist]
  o-----o                  /--+--\       /--+--\
                        [Acc]o   o    o   o[Acc]
```

|Topology|Pros|Cons|
|---|---|---|
|**Star**|Easy to manage, fault isolation|Single point of failure (switch)|
|**Bus**|Simple, cheap|Collisions, single cable failure kills all|
|**Ring**|Deterministic access|One failure breaks the ring (unless dual-ring)|
|**Full Mesh**|Highly redundant|Expensive: `n(n-1)/2` links required|
|**Tree**|Scalable, hierarchical|Root failure impacts everything below|
|**Hybrid**|Best of multiple|Complex design|

### Physical Layer Devices

|Device|Function|
|---|---|
|**Hub**|Broadcasts bits to all ports — no intelligence (deprecated)|
|**Repeater**|Amplifies/regenerates signal to extend cable runs|
|**NIC**|Converts digital data to/from physical signals|
|**Modem**|Modulates/demodulates signals (telephone, cable, DSL)|
|**Transceiver**|SFP/SFP+/QSFP+ modules for fiber connections|
|**Antenna**|Converts electrical signals to/from radio waves|
|**WAP**|Wireless Access Point — bridges wireless and wired networks|

---

## 11. Quick Reference — OSI Layers Summary

|#|Layer|PDU|Key Function|Protocols|
|---|---|---|---|---|
|**7**|**Application**|Data|User-facing services & APIs|HTTP, HTTPS, DNS, FTP, SSH, SMTP, DHCP|
|**6**|**Presentation**|Data|Encoding, encryption, compression|TLS/SSL, MIME, ASN.1, JSON, JPEG|
|**5**|**Session**|Data|Session establishment & management|NetBIOS, RPC, SIP, SOCKS|
|**4**|**Transport**|Segment|End-to-end delivery, ports, flow control|TCP, UDP, QUIC, SCTP|
|**3**|**Network**|Packet|Logical addressing & routing|IP, ICMP, OSPF, BGP, NAT, ARP|
|**2**|**Data Link**|Frame|MAC addressing, framing, error detection|Ethernet, Wi-Fi, PPP, STP, VLAN|
|**1**|**Physical**|Bits|Bit transmission over physical medium|Ethernet cable, Fiber, Wi-Fi radio|

### End-to-End Data Flow Example — Loading `https://example.com`

```
SENDER (Your browser)                               RECEIVER (Web server)
=====================                               =====================

L7 Application                                      L7 Application
   Browser builds HTTP GET request                     HTTP response delivered
   DNS resolves example.com -> 93.184.216.34            Page rendered in browser
         |                                                    ^
         v                                                    |
L6 Presentation                                     L6 Presentation
   TLS handshake negotiates AES-256-GCM                TLS decrypts the data
   Data is encrypted                                        ^
         |                                                    |
         v                                                    |
L5 Session                                          L5 Session
   OS creates socket:                                  Session context maintained
   192.168.1.10:52341 -> 93.184.216.34:443              ^
         |                                                    |
         v                                                    |
L4 Transport                                        L4 Transport
   TCP segments data                                   Reassembles segments in order
   Adds: src port, dst port,                           Sends ACKs back to sender
   sequence numbers, checksums                              ^
         |                                                    |
         v                                                    |
L3 Network                                          L3 Network
   IP adds src/dst IP addresses                        Validates IP header
   TTL set, routing decisions made                     Routes to correct process
         |                                                    ^
         v                                                    |
L2 Data Link                                        L2 Data Link
   Ethernet frame added                                FCS validated
   Your MAC -> Gateway router MAC                      MAC header stripped
         |                                                    ^
         v                                                    |
L1 Physical                                         L1 Physical
   NIC converts frame to electrical                    NIC receives signal
   signals on the cable                                Converts back to bits
         |                                                    ^
         +-----------> [ISP network / internet] ----------->--+
```

---

_OSI Model Complete Technical Reference — Layers 1–7 | TCP/IP | Protocols | Networking_
