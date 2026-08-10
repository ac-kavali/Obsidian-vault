## What is a network :
is a digital telecomunication network which allows a nodes to share resources.
or simply a number of devices connected to each other. 

**Full-duplex** means that two devices can **send and receive data at the same time**.
### Examples of network components:


![[network_components.png|898]]


## What is a client 
a device that access a service made available by a server



---
## Cables and interfaces

### Copper
| speed    | common name      | IEEE standard | Informal Name | maximum length |
| -------- | ---------------- | ------------- | ------------- | -------------- |
| 10 Mbps  | Ethernet         | 802.3i        | 10BASE-T      | 100m           |
| 100 Mbps | Fast ethernet    | 802.3u        | 100BASE-T     | 100m           |
| 1 Gbps   | Gigabit ethernet | 802.3ab       | 1000BASE-T    | 100m           |
| 10Gbps   | 10 Gig Ethernet  | 802.3an       | 10GBASE-T     | 100m           |

**PC (MDI device)**
- Transmit at 1,2
- Receive at 3,6
- 4,5,7,8 not used for data

**Switch / Hub (MDI-X device)**
- Transmit at 3,6
- Receive at 1,2
- 4,5,7,8 not used for data

**Router (MDI device)**

- Transmit at 1,2
- Receive at 3,6
- 4,5,7,8 not used for data

**Server (MDI device)**

- Transmit at 1,2
- Receive at 3,6
- 4,5,7,8 not used for data

___
### Cable types and when to use them

**Straight-through cable** — connects an MDI device to an MDI-X device (opposite types), so Tx lines up with Rx naturally.  
Used for:
- PC → Switch
- PC → Hub
- Router → Switch
- Server → Switch

**Crossover cable** — connects two devices of the _same_ type; wires must be crossed so Tx on one end reaches Rx on the other (pins 1,2 swapped with 3,6 on one end).  
Used for:

- PC → PC
- PC → Router
- Switch → Switch
- Switch → Hub
- Router → Router
- Hub → Hub

_(Note: most modern NICs and switches support Auto-MDIX, which auto-detects and adjusts, making this distinction less critical in practice — but it's still tested on the CCNA.)_

**Rollover cable (console cable)** — not a data cable at all; used to connect a PC's serial/USB (via adapter) to a router or switch **console port** for direct CLI configuration. All 8 wires are reversed end-to-end (pin 1 → pin 8, pin 2 → pin 7, etc.), not just 1/2/3/6.  
Used for:

- PC (COM/USB) → Router or Switch console port


### **Auto-MDIX (Automatic Medium-Dependent Interface Crossover)**

It's a feature built into modern Ethernet ports (NICs, switches, routers) that automatically detects whether the device on the other end of the cable expects a "straight" or "crossed" pinout, and electrically swaps its own Tx/Rx pins internally if needed to establish the link.

**How it works:**
- When a link is established, the port sends out a signal and analyzes the response.
- If it detects it's connected to a like device (e.g., switch-to-switch) that would normally require a crossover cable, it internally flips its own transmit/receive pin assignment.
- If it's connected to an unlike device (e.g., PC-to-switch), it just behaves normally.
- End result: **you can use a straight-through cable for almost any connection**, and the port will "fix" the wiring itself.

**Is it used everywhere today?**
Pretty much, yes — with some caveats:

- **Modern NICs (since roughly the mid-2000s)** — virtually all support Auto-MDIX. Built into the Gigabit Ethernet standard (802.3ab) as a requirement, and most Fast Ethernet (100 Mbps) chipsets from that era onward include it too.
- **Modern switches/routers** — enterprise-grade switches (Cisco Catalyst, etc.) and consumer routers made in the last 15+ years almost universally support it, often enabled by default.
- **Older or very cheap/legacy equipment** — some older 10/100 Mbps-only hardware, very basic unmanaged hubs, or older Cisco IOS devices may not have it, or may have it disabled by default (older Cisco switches sometimes required you to manually enable it with `mdix auto` in interface config).

**Why the CCNA still tests it manually:**

Even though Auto-MDIX makes the cable type largely irrelevant in real-world modern networks, Cisco still expects you to know:

1. The theory of MDI vs MDI-X and why crossovers were historically needed.
2. That you _can't always rely_ on Auto-MDIX (older gear, certain WAN/serial connections, console cables which are never auto-detected).
3. Troubleshooting scenarios where a link fails and the cause turns out to be an old device without Auto-MDIX paired with the wrong cable type.

## the 1000Base-t and 10Gbase-t 
| Standard       |   Speed | Cable                          |  Pairs used | Max distance | Duplex      |
| -------------- | ------: | ------------------------------ | ----------: | -----------: | ----------- |
| **1000BASE-T** |  1 Gbps | Cat5e or better                | **4 pairs** |    **100 m** | Full-duplex |
| **10GBASE-T**  | 10 Gbps | Cat6a or better for full 100 m | **4 pairs** |    **100 m** | Full-duplex |

---
## Fiber-Optic 

| Informal Name | IEEE standard | Speed  | Cable type               | Maximum Length    |
| ------------- | ------------- | ------ | ------------------------ | ----------------- |
| 1000 BASE-LX  | 802.3z        | 1 Gbps | Multimode or Single-mode | 550m(MM), 5Km(SM) |
| 10G BASE-SR   | 802.3ae       | 10Gbps | Multimode                | 400 m             |
| 10G Base-LR   | 802.3ae       | 10Gbps | Single-Mode              | 10 Km             |
| 10G base-ER   | 802.3ae       | 10Gbps | Single-Mode              | 30 Km             |


