## Switch Interfaces — Summary

#### 1. Speed & Duplex Basics

- **Speed**: data rate in bits per second (10, 100, 1000 Mbps, etc.)
- **Duplex**:
- **Full duplex** — send and receive at the same time (standard on modern switched networks)
- **Half duplex** — can't send and receive simultaneously; relies on **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection) to avoid collisions

#### 2. Autonegotiation

- Interfaces negotiate speed/duplex automatically by default.
- **Key exam trap**: if one side has autonegotiation **disabled** (hard-set) and the other has it **enabled**, the autonegotiating side can't detect duplex properly — it defaults to **half duplex**, while the manually configured side stays at whatever it was set to (e.g., 100 Mbps full). This mismatch causes a **duplex mismatch**, leading to collisions/errors.

#### 3. Checking Interface Status

- `show ip interface brief` — quick Layer 1/2 status
- Connected interfaces: **up/up**
- Disconnected: **down/down**
- Router interfaces: administratively down **by default**
- Switch interfaces: **enabled by default**
- `show interfaces status` — shows speed/duplex/VLAN per port
- `show interfaces` — detailed stats and error counters

#### 4. Configuring an Interface