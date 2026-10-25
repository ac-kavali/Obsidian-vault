
# TCP & UDP

_Transmission Control Protocol & User Datagram Protocol_

## <span style="color:rgb(255, 192, 0)">1. Introduction</span>

**TCP** and **UDP** are **Layer 4 — Transport layer** protocols.

- **IP addresses** identify the source and destination at Layer 3.
- **Port numbers** help identify the application endpoints at Layer 4.
- TCP provides a **reliable, ordered byte stream**.
- UDP sends **independent datagrams** with fewer built-in mechanisms.

Think of an IP address as the address of a building, and a port as the number of the office that should receive the message.

| Layer | What it adds | Example |
| --- | --- | --- |
| Transport — L4 | TCP or UDP header, including ports | TCP destination port `443` |
| Network — L3 | IP header | Destination IP `203.0.113.10` |
| Data Link — L2 | Frame header and trailer | Destination MAC of the next hop |

**Encapsulation:** application data → TCP segment / UDP datagram → IP packet → frame.

> [!note] Protocol numbers are different from port numbers
> Inside the IPv4 header, the **Protocol** field identifies TCP as **6**, and UDP as **17**. These are not TCP/UDP ports.

---

## <span style="color:rgb(255, 192, 0)">2. Port numbers & session multiplexing</span>

### Why do we need ports?

Your PC can browse a website, use SSH, and make DNS queries at the same time using the same IP address.

The operating system needs to know **which application should receive each incoming piece of data**.

- **Multiplexing:** several application conversations share the network connection.
- **Demultiplexing:** incoming traffic is delivered to the correct socket/application.

### Source port and destination port

For a typical client request:

- **Source port:** temporary port selected by the client's operating system.
- **Destination port:** port on which the server listens for the service.

Example: your PC connects to an HTTPS server.

| Direction | Source IP | Source port | Destination IP | Destination port |
| --- | --- | --- | --- | --- |
| Client → server | `192.168.1.10` | `52000` | `203.0.113.10` | `443` |
| Server → client | `203.0.113.10` | `443` | `192.168.1.10` | `52000` |

The addresses and ports **swap roles in the reply**.

> [!important] Source port does not always mean client port
> In the server's reply, the **source port is 443**. Source and destination describe the direction of that particular packet.

### How are different sessions identified?

A TCP connection is identified by the pair of endpoints:

`Source IP + Source port + Destination IP + Destination port`

When classifying traffic across protocols, include the **transport protocol** too: this gives a **5-tuple**.

| Protocol | Client endpoint | Server endpoint | Conversation |
| --- | --- | --- | --- |
| TCP | `192.168.1.10:52000` | `203.0.113.10:443` | HTTPS connection 1 |
| TCP | `192.168.1.10:52001` | `203.0.113.10:443` | HTTPS connection 2 |
| TCP | `192.168.1.10:52002` | `203.0.113.20:22` | SSH connection |

The server can use **the same listening port** for many clients because their connection tuples differ.

- TCP and UDP have **separate port spaces**: TCP `53` and UDP `53` are distinct endpoints.
- UDP also uses ports for delivery to applications, even though UDP itself does not establish connections.
- One browser can reuse a TCP connection for several requests; every browser tab does not necessarily create its own connection.

---

## <span style="color:rgb(255, 192, 0)">3. Port types and ranges</span>

Port fields are **16 bits**: values range from **0 to 65535**.

| Type | Range | Purpose |
| --- | --- | --- |
| **Well-known / System** | **0–1023** | Common services, such as SSH `22` and HTTP `80` |
| **Registered / User** | **1024–49151** | Registered application services, such as RDP `3389` |
| **Dynamic / Private** | **49152–65535** | Not assigned by IANA; commonly used for temporary client ports |

- **Port 0 is reserved**; it is not a normal service port.
- An **ephemeral port** is a temporary port, usually allocated for a client conversation.
- Actual ephemeral-port ranges depend on the operating system and its configuration; they can include ports below `49152`.
- A service can be configured on a different port. The port alone does not prove which application is running.

> [!tip] Remember the boundaries
> **0 → 1023 | 1024 → 49151 | 49152 → 65535**

---

## <span style="color:rgb(255, 192, 0)">4. TCP overview</span>

TCP is **connection-oriented**: endpoints establish a connection before normal application data exchange.

| Property | Simple meaning |
| --- | --- |
| **Connection-oriented** | Establishes and tracks connection state |
| **Reliable delivery** | Uses acknowledgements and retransmissions to recover missing data |
| **Sequencing** | Numbers bytes so the receiver can reconstruct their original order |
| **Flow control** | Limits sending according to the receiver's available capacity |
| **Full-duplex** | Both endpoints can send and receive data |
| **Congestion control** | Adjusts sending according to network conditions |

**Reliable does not mean delivery is possible forever.** If the destination becomes unreachable and recovery fails, TCP eventually reports a connection failure.

TCP is a **byte stream**: application message boundaries are not preserved. One application write may be split across several segments, or combined with other data.

> [!warning] Reliable does not mean encrypted
> TCP itself does not encrypt data. HTTPS adds TLS security above TCP in HTTP/1.1 and HTTP/2.

---

## <span style="color:rgb(255, 192, 0)">5. Important TCP header fields</span>

The TCP header is normally **20 bytes without options**, and can be up to **60 bytes**.

| Field | Size | Purpose |
| --- | --- | --- |
| **Source port** | 16 bits | Identifies the sending endpoint's port |
| **Destination port** | 16 bits | Identifies the receiving endpoint's port |
| **Sequence number** | 32 bits | Locates data in the sender's byte stream |
| **Acknowledgement number** | 32 bits | Next byte expected from the other endpoint |
| **Data offset** | 4 bits | TCP header length; tells where the payload begins |
| **Flags** | Individual control bits | Establish, acknowledge, close, or reset a connection |
| **Window** | 16 bits | Advertises how much data this endpoint is willing to receive |
| **Checksum** | 16 bits | Detects corruption in the header and data |
| **Options** | Variable | Extra capabilities, such as MSS and window scaling |

### Main flags

| Flag | Meaning | Simple interpretation |
| --- | --- | --- |
| **SYN** | Synchronize sequence numbers | “Let's establish a connection.” |
| **ACK** | Acknowledgement field is valid | “Use my acknowledgement number.” |
| **FIN** | Sender has finished sending | “I have no more data to send.” |
| **RST** | Reset | “Abort/reject this connection.” |
| **PSH** | Push | Requests prompt delivery of received data to the application |

Flags can be combined: **SYN + ACK**, **FIN + ACK**, etc.

> [!important] ACK flag vs acknowledgement number
> **ACK flag** is a control bit. **Acknowledgement number** is the numeric value telling the other endpoint which byte is expected next.

---

## <span style="color:rgb(255, 192, 0)">6. TCP 3-way handshake</span>

Before exchanging normal application data, the endpoints synchronize their initial sequence numbers.

Assume the client starts at **1000**, and the server starts at **5000**.

| Step | Direction | Flags | SEQ | ACK number | Meaning |
| --- | --- | --- | --- | --- | --- |
| 1 | Client → server | **SYN** | `1000` | Not valid | “My initial sequence number is 1000.” |
| 2 | Server → client | **SYN, ACK** | `5000` | `1001` | “I acknowledge your SYN; my initial sequence number is 5000.” |
| 3 | Client → server | **ACK** | `1001` | `5001` | “I acknowledge your SYN.” |

Now the connection is established at both endpoints once the final ACK reaches the server.

### Why +1?

A **SYN consumes one sequence number**, even though it is not an application data byte.

- Client's first data byte can use sequence number **1001**.
- Server's first data byte can use sequence number **5001**.
- Each direction has **its own independent sequence numbers**.

> [!tip] Memorise
> **SYN → SYN/ACK → ACK**

---

## <span style="color:rgb(255, 192, 0)">7. Sequencing & acknowledgement</span>

### What is sequencing?

TCP numbers **bytes**, not packets.

Imagine sending pages from a book. Numbering their positions lets the receiver identify missing parts and put arriving parts back into order.

For a data segment, **SEQ identifies its first data byte**.

### Example: sending 1000 bytes

Assume the connection is established and the next sequence number is `1001`.

| Segment | SEQ | Data length | Byte numbers carried | ACK after receiving this data in order |
| --- | --- | --- | --- | --- |
| 1 | `1001` | 500 bytes | `1001–1500` | `1501` |
| 2 | `1501` | 500 bytes | `1501–2000` | `2001` |

**ACK 2001** means:

> “I have received all bytes through 2000 in order. Send me byte 2001 next.”

For ordinary data with no SYN/FIN:

`Next sequence number = current sequence number + payload length`

### Acknowledgements are cumulative

A receiver can acknowledge several segments together.

**ACK 2001** acknowledges all earlier contiguous bytes, not only the last segment received.

TCP does **not** need to stop and wait after every segment. Several segments can be in flight before an ACK arrives.

### What if segments arrive out of order?

Suppose bytes `1501–2000` arrive, but `1001–1500` are missing:

1. The receiver can buffer the later bytes.
2. Its cumulative ACK stays at **1001**: that is still the first missing byte.
3. When the missing bytes arrive, the ACK can advance to **2001**.
4. TCP delivers the reconstructed stream to the application **in order**.

> [!note] Sequence-number rules
> - **Data:** consumes one sequence number per byte.
> - **SYN:** consumes one sequence number.
> - **FIN:** consumes one sequence number.
> - **Pure ACK with no data:** consumes no sequence numbers.

---

## <span style="color:rgb(255, 192, 0)">8. TCP retransmission</span>

A retransmission means **sending unacknowledged data again**.

### A) Retransmission timeout

1. Sender transmits data and keeps a copy for possible recovery.
2. The expected acknowledgement does not arrive in time.
3. The retransmission timer expires.
4. Sender retransmits the unacknowledged data.

The timeout adapts to measured network round-trip time; it is not one fixed value for every network.

### B) Fast retransmit

Later segments can reveal a gap before the timer expires.

- Receiver repeatedly acknowledges the same next expected byte.
- These are **duplicate ACKs**.
- In the classic TCP mechanism, **three duplicate ACKs** trigger fast retransmission of the missing data.

Example: repeated `ACK 1001` suggests the receiver is still waiting for data beginning at byte `1001`.

> [!note] What if only the ACK was lost?
> A later cumulative ACK may acknowledge the data anyway. If the sender retransmits, the receiver recognizes duplicate bytes and does not deliver them twice to the application.

**Checksum detects corruption; retransmission recovers missing/discarded data.** The checksum itself does not repair anything.

---

## <span style="color:rgb(255, 192, 0)">9. TCP flow control</span>

**Flow control prevents the sender from overwhelming the receiver.**

Think of the receiver saying: “I only have room for this much more data.”

### Receive window — rwnd

The **Window field** advertises the amount of data the sender of that header is currently willing to **receive**.

If the server advertises a window to the client, it controls **client → server** data.

### Simple window example

Server sends:

- **ACK = 1001**
- **Window = 3000 bytes**

This advertises space for bytes **1001–4000**.

Assuming no other limiting factor, the client can send these 3000 bytes without first waiting for another ACK. Bytes already in flight count against this allowance.

As the server's application reads data and buffer space becomes available, the receiver can advertise more space. The allowed range moves forward: this is a **sliding window**.

| Advertised window | Meaning |
| --- | --- |
| Larger | Receiver offers more capacity |
| Smaller | Receiver offers less capacity |
| **0** | Receiver currently has no room for additional normal data |

With a **zero window**, normal data sending pauses. TCP uses occasional probes to discover when the window opens again.

### Flow control vs congestion control

| Mechanism | Protects | Main limit |
| --- | --- | --- |
| **Flow control** | The receiver's capacity | Receive window — **rwnd** |
| **Congestion control** | The network from overload | Congestion window — **cwnd** |

The sender's outstanding data is limited by **both**: roughly the smaller of `rwnd` and `cwnd`.

> [!note] Window scaling
> The basic 16-bit Window field can represent up to **65535 bytes**. The **Window Scale option**, negotiated during connection setup, allows larger effective windows.

---

## <span style="color:rgb(255, 192, 0)">10. Terminating a TCP connection</span>

TCP is **full-duplex**. Closing one sending direction does not automatically close the other.

### Normal 4-way termination

| Step | Direction | Flags | Meaning |
| --- | --- | --- | --- |
| 1 | Client → server | **FIN, ACK** | “I have finished sending.” |
| 2 | Server → client | **ACK** | “I acknowledge your FIN.” |
| 3 | Server → client | **FIN, ACK** | “I have also finished sending.” |
| 4 | Client → server | **ACK** | “I acknowledge your FIN.” |

Between steps 2 and 3, the server may still send remaining data to the client. This is a **half-closed connection**.

- Either endpoint can initiate the close.
- A FIN consumes **one sequence number**, so it is acknowledged with `FIN sequence number + 1` when the FIN carries no data.
- The endpoint that performs the active close normally enters **TIME_WAIT**, allowing late segments to expire and the final ACK to be sent again if needed.

> [!tip] Memorise
> **FIN → ACK → FIN → ACK**

> [!note] Not always four separate segments
> The ACK and FIN in steps 2 and 3 can be combined. “4-way termination” describes the usual teaching sequence, not a requirement for exactly four packets.

### FIN vs RST

- **FIN:** orderly close of a sending direction.
- **RST:** abrupt reset; it does not perform the normal FIN exchange.

---

## <span style="color:rgb(255, 192, 0)">11. UDP overview</span>

**UDP — User Datagram Protocol** is **connectionless**.

- No TCP-style connection setup or teardown.
- No built-in acknowledgements or retransmissions.
- No built-in sequencing, ordered delivery, or flow control.
- Preserves datagram boundaries: each message remains a distinct datagram.
- Has a small, fixed **8-byte header**.

### UDP header

| Field | Size | Purpose |
| --- | --- | --- |
| Source port | 16 bits | Sending endpoint's port |
| Destination port | 16 bits | Receiving endpoint's port |
| Length | 16 bits | Total UDP header + data length |
| Checksum | 16 bits | Error detection |

> [!warning] Unreliable does not mean always losing data
> UDP itself does not guarantee delivery or recover missing datagrams. Applications can add their own acknowledgements, retries, ordering, and congestion control.

The checksum detects corruption; it does **not** recover a lost datagram. It is optional in IPv4 UDP and normally mandatory with IPv6.

### Why choose UDP?

- Short request/reply exchanges can avoid a transport handshake.
- Real-time audio/video can prioritize timely delivery; old retransmitted audio may arrive too late to be useful.
- Applications may implement their own transport behaviour.
- UDP can support **multicast** and IPv4 **broadcast**; TCP connections are unicast.

UDP has **less built-in overhead**, but is not automatically faster for every application or network.

---

## <span style="color:rgb(255, 192, 0)">12. TCP vs UDP</span>

| Feature | TCP | UDP |
| --- | --- | --- |
| Connection | Connection-oriented | Connectionless |
| Setup | 3-way handshake | No transport handshake |
| Delivery model | Byte stream | Individual datagrams |
| Reliable delivery | Built in | Not built in |
| Ordered delivery | Yes | Not guaranteed |
| Acknowledgements | Yes | Not built in |
| Retransmission | Yes | Not built in |
| Receiver flow control | Yes | Not built in |
| Congestion control | Yes | Not built in |
| Error detection | Checksum | Checksum |
| Header size | **20–60 bytes** | **8 bytes** |
| Typical uses | Web, SSH, email, file transfer | DNS queries, DHCP, NTP, real-time media |

---

## <span style="color:rgb(255, 192, 0)">13. Common services & ports</span>

These are the **usual service ports and transports** to learn for networking review. Individual applications can use other ports.

### Mainly TCP

| Service                         | Port        | Purpose / note                                                                             |
| ------------------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| **FTP data**                    | **20 TCP**  | Server's usual source port for active-mode data; passive FTP uses a negotiated server port |
| **FTP control**                 | **20 TCP**  | Commands and control connection                                                            |
| **SSH**                         | **22 TCP**  | Secure remote terminal; also used by SFTP/SCP                                              |
| **Telnet**                      | **23 TCP**  | Unencrypted remote terminal                                                                |
| **SMTP**                        | **25 TCP**  | Mail transfer between mail servers                                                         |
| **DHCP Server**                 | **67 UDP**  | DHCP server                                                                                |
| **DHCP Client**                 | **68 UDP**  | DHCP Cient                                                                                 |
| **TFTP**                        | **69 UDP**  | TFTP                                                                                       |
| **HTTP**                        | **80 TCP**  | Unencrypted web traffic                                                                    |
| **POP3**                        | **110 TCP** | Mail retrieval                                                                             |
| **IMAP**                        | **143 TCP** | Mail access and synchronization                                                            |
| **HTTPS — HTTP/1.1 and HTTP/2** | **443 TCP** | Web traffic protected with TLS                                                             |
| **SMB**                         | **445 TCP** | File and printer sharing                                                                   |
| **BGP**                         | **179 TCP** | Routing sessions between BGP peers                                                         |

### Mainly UDP

| Service | Port | Purpose / note |
| --- | --- | --- |
| **DHCPv4 server** | **67 UDP** | Server-side port |
| **DHCPv4 client** | **68 UDP** | Client-side port |
| **TFTP** | **69 UDP** | Initial request; transfer continues using chosen transfer ports |
| **NTP** | **123 UDP** | Time synchronization |
| **SNMP** | **161 UDP** | Typical queries and responses involving agents |
| **SNMP notifications** | **162 UDP** | Traps/informs sent to the manager |
| **Syslog — conventional UDP** | **514 UDP** | Logging messages |

### Services that need special attention

| Service | Transport / port | What to remember |
| --- | --- | --- |
| **DNS** | **UDP and TCP 53** | Ordinary queries commonly use UDP; TCP is also supported, including zone transfers and retry after a truncated UDP response |
| **HTTPS — HTTP/3** | **UDP 443** | Uses QUIC over UDP; QUIC supplies reliability and other connection mechanisms |
| **Syslog over TLS** | **TCP 6514** | Secure logging; “syslog is only UDP” is too broad |

> [!important] DHCP is an exception to the usual client-port example
> DHCPv4 clients use **68**, not an ordinary ephemeral source port, and servers use **67**. Relays add further forwarding behaviour.

### Important distinctions

- **SFTP** uses SSH, usually TCP `22`; it is different from FTP and FTPS.
- **TFTP uses UDP**, even though its application protocol has acknowledgements and retries.
- **DNS uses both TCP and UDP**. Do not memorize “DNS = UDP only.”
- **ICMP, OSPF, and EIGRP do not use TCP/UDP ports.** They are carried directly over IP.
- A voice/video application can use different transports for signalling and media; do not assume the whole application is UDP.

---

## <span style="color:rgb(255, 192, 0)">14. Inspecting TCP & UDP</span>

### Wireshark display filters

```text
tcp
udp
tcp.port == 443
udp.port == 53
tcp.flags.syn == 1
tcp.flags.fin == 1
tcp.flags.reset == 1
tcp.analysis.retransmission
```

- `tcp.port == 443`: matches **source or destination** TCP port 443.
- `tcp.flags.syn == 1`: shows both SYN and SYN/ACK segments.
- Expand **Transmission Control Protocol** in a packet to inspect ports, flags, sequence, acknowledgement, and window.
- Wireshark commonly displays **relative sequence numbers**, so a handshake often appears as `0`, `0/1`, then `1/1` instead of the original large numbers.

### Linux: show sockets

```bash
ss -tuna
```

- `-t`: TCP.
- `-u`: UDP.
- `-n`: numeric addresses and ports.
- `-a`: all sockets, including listening sockets.

---

## 15. Quick recap

> [!success] Must remember
> - **Ports:** 16 bits; `0–65535`.
> - **Ranges:** `0–1023`, `1024–49151`, `49152–65535`.
> - **TCP:** connection-oriented, reliable, ordered, with flow control.
> - **Handshake:** SYN → SYN/ACK → ACK.
> - **Close:** FIN → ACK → FIN → ACK, usually.
> - **SEQ:** position in the byte stream, not a packet counter.
> - **ACK:** next byte expected; cumulative.
> - **SYN and FIN:** each consumes one sequence number.
> - **Retransmission:** timeout or loss indications such as duplicate ACKs.
> - **Flow control:** protects receiver; congestion control protects network.
> - **UDP:** connectionless; no built-in reliability or ordering.
> - **Headers:** TCP `20–60` bytes; UDP `8` bytes.
> - **DNS:** TCP and UDP `53`.

## 16. Check your understanding

- [ ] Why can one server accept many TCP connections on port 443?
- [ ] In a server reply, which port becomes the source port?
- [ ] What are the three port ranges?
- [ ] What does ACK 2501 tell the sender?
- [ ] A data segment has SEQ 1001 and 800 data bytes: what is the next sequence number?
- [ ] Why does acknowledging a SYN add 1?
- [ ] Can TCP send several segments before receiving an ACK?
- [ ] What does a zero receive window mean?
- [ ] How does flow control differ from congestion control?
- [ ] Why can TCP termination require two FINs?
- [ ] Does UDP itself retransmit lost datagrams?
- [ ] Which protocols here use UDP 67/68, UDP 69, TCP 22, and both TCP/UDP 53?

> [!tip]- Answers
> 1. Each connection has a distinct pair of IP/port endpoints.
> 2. The server service port, such as 443.
> 3. 0–1023; 1024–49151; 49152–65535.
> 4. All bytes through 2500 have arrived in order; byte 2501 is expected next.
> 5. 1801, assuming no SYN/FIN.
> 6. SYN consumes one sequence number.
> 7. Yes, within the receive and congestion window limits.
> 8. The receiver currently has no space for additional normal data.
> 9. Flow control protects receiver capacity; congestion control responds to network conditions.
> 10. Each endpoint closes its own sending direction.
> 11. No; an application above UDP may implement retries.
> 12. DHCPv4; TFTP; SSH; DNS.

---

## References

Primary references for checking details beyond these study explanations:

- [TCP specification — RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)
- [UDP specification — RFC 768](https://www.rfc-editor.org/rfc/rfc768.html)
- [IANA service names and port number registry](https://www.iana.org/assignments/service-names-port-numbers/)
