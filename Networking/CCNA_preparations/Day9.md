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
- `show ip interface brief` — quick Layer 1/2 status
- Connected interfaces: **up/up**
- Disconnected: **down/down**
- Router interfaces: administratively down **by default**
- Switch interfaces: **enabled by default**
- `show interfaces status` — shows speed/duplex/VLAN per port
- `show interfaces` — detailed stats and error counters


#### 5. Configuring an Interface
```
interface f0/1
 speed 100
 duplex full
 description ## Connected to R1 ##
```
- `speed {10 | 100 | auto}`
- `duplex {auto | full | half}`
- `description <text>` — for documentation, no functional effect

#### 6. Disabling Unused Ports (security best practice)
```
interface range f0/5 - 12
 description ## Unused ##
 shutdown
```
Always shut down unused switch ports to prevent unauthorized access.


#### 6. Interface Errors to Know

| Error            | Meaning                                          |
| ---------------- | ------------------------------------------------ |
| **Runts**        | Frames smaller than 64 bytes                     |
| **Giants**       | Frames larger than 1518 bytes                    |
| **CRC errors**   | Frame fails cyclic redundancy check (corruption) |
| **Frame errors** | Frame is malformed                               |
#### Quick self-check (from the video's quiz)

1. Duplex mismatch between two interfaces → **collisions**
2. Half-duplex collision handling → **CSMA/CD**
3. Command to see interface error counters → **show interfaces**
4. Example interface errors → **runts, giants, CRC**
5. SW2 hard-set to 100/full, SW1 autonegotiating → SW1 lands on **100 Mbps, half duplex**
