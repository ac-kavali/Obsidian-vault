
# CDP and LLDP

## 1. Purpose

**CDP (Cisco Discovery Protocol)** and **LLDP (Link Layer Discovery Protocol)** are Layer 2 neighbor-discovery protocols.

They allow directly connected devices to advertise information about themselves, helping network administrators discover and troubleshoot the topology.

Typical information advertised includes:

- Device ID / system name
- Local and remote interface (port) IDs
- Device capabilities (router, switch, bridge, phone, etc.)
- Management IP address, when available
- Platform and software information
- VLAN or duplex information (depending on protocol and device)

**Important:** CDP and LLDP discover neighboring devices. They do not route packets or create the network topology by themselves.

---

# 2. CDP — Cisco Discovery Protocol

## 2.1 Key facts for the CCNA

| Property | CDP |
|---|---|
| Type | Cisco-proprietary Layer 2 protocol |
| Default advertisement timer | **60 seconds** |
| Default holdtime | **180 seconds** |
| Destination MAC | **0100.0CCC.CCCC** |
| Scope | Directly connected neighbors |
| Default on Cisco IOS | Generally enabled globally and on interfaces |

CDP can operate over several types of media, provided the interface and platform support it.

### Destination MAC and forwarding

CDP advertisements are sent to the Cisco multicast MAC address:

`0100.0CCC.CCCC`

A CDP frame is intended for neighboring devices on the local link. A receiving device processes the advertisement and does **not** forward it as a CDP advertisement to another link. Therefore, CDP normally discovers directly connected neighbors, not every Cisco device in the network.

> **Remember:** CDP is Layer 2. It does not need an IP address to discover a neighbor.

## 2.2 CDP timer vs. holdtime

- **CDP timer (60 seconds):** how often the device sends CDP advertisements.
- **CDP holdtime (180 seconds):** how long the receiving device keeps the neighbor information if no newer advertisement arrives.

The holdtime is not the interval between advertisements.

If advertisements stop arriving, the neighbor entry remains until its holdtime expires, then it is removed from the CDP neighbor table.

## 2.3 CDP configuration commands

### Global configuration

```cisco
! Enable CDP globally
R1(config)# cdp run

! Disable CDP globally
R1(config)# no cdp run

! Change the advertisement interval (seconds)
R1(config)# cdp timer 60

! Change the holdtime (seconds)
R1(config)# cdp holdtime 180
```

The values shown above are the common defaults; the commands are included to show the syntax.

### Interface configuration

```cisco
R1(config)# interface gigabitEthernet 0/0

! Enable CDP on this interface
R1(config-if)# cdp enable

! Disable CDP on this interface
R1(config-if)# no cdp enable
```

**Important distinction:**

- `cdp run` / `no cdp run` controls CDP globally.
- `cdp enable` / `no cdp enable` controls CDP on an individual interface.

Disabling CDP globally prevents CDP from operating even if an interface has CDP enabled.

## 2.4 CDP verification and show commands

| Command | What it displays |
|---|---|
| `show cdp` | CDP status and global timer / holdtime information |
| `show cdp neighbors` | Neighbor summary: device ID, local interface, remote port, capability, platform |
| `show cdp neighbors detail` | Detailed information about discovered neighbors |
| `show cdp entry *` | Detailed CDP information for all neighbor entries |
| `show cdp entry <device-id>` | CDP information for one specified neighbor |
| `show cdp interface` | Interfaces on which CDP is enabled and related interface information |
| `show cdp traffic` | CDP packets sent and received, plus error counters |

Example:

```cisco
R1# show cdp neighbors
R1# show cdp neighbors detail
R1# show cdp interface
R1# show cdp traffic
R1# show cdp entry SW1
```

### Useful troubleshooting idea

If a directly connected Cisco neighbor is missing:

1. Check that CDP is enabled globally: `show cdp`.
2. Check that CDP is enabled on the local interface: `show cdp interface`.
3. Check the neighbor table: `show cdp neighbors`.
4. Verify the physical link and that the other device supports and has CDP enabled.

---

# 3. LLDP — Link Layer Discovery Protocol

## 3.1 Key facts for the CCNA

| Property | LLDP |
|---|---|
| Full name | Link Layer Discovery Protocol |
| Standard | **IEEE 802.1AB** |
| Type | Vendor-neutral Layer 2 protocol |
| Default advertisement timer | **30 seconds** |
| Default holdtime / TTL | **120 seconds** |
| Destination MAC | **0180.C200.000E** |
| Default on many Cisco IOS devices | Disabled globally; must be enabled |

LLDP is an **industry-standard** protocol, so devices from different vendors can exchange neighbor information if they support LLDP.

A device can run **CDP and LLDP at the same time**.

## 3.2 LLDP destination MAC and forwarding

LLDP advertisements are sent to the reserved link-local multicast MAC address:

`0180.C200.000E`

A device that receives an LLDP frame processes it locally and does **not** forward it to other devices. LLDP is therefore used to discover directly connected neighbors.

> **CCNA point:** LLDP frames are link-local. They are not forwarded by bridges/switches as ordinary multicast traffic.

## 3.3 LLDP timers

| Timer | Default | Meaning |
|---|---:|---|
| LLDP timer | **30 seconds** | How often LLDP advertisements are sent |
| LLDP holdtime | **120 seconds** | How long a neighbor keeps the advertised information before it expires |
| LLDP reinitialization delay | **2 seconds** | Delay before LLDP is reinitialized after being enabled or re-enabled |

### Do not confuse the timers

- **Timer:** advertisement frequency.
- **Holdtime:** lifetime of received neighbor information.
- **Reinitialization delay:** delay before LLDP starts/restarts after being enabled.

For example, if a device advertises every 30 seconds with a 120-second holdtime, the receiving device can keep the neighbor entry for up to 120 seconds without receiving a refresh.

## 3.4 Enable and disable LLDP

### Global configuration

```cisco
! Enable LLDP globally
R1(config)# lldp run

! Disable LLDP globally
R1(config)# no lldp run
```

### Interface configuration

LLDP has separate transmit and receive controls.

```cisco
R1(config)# interface gigabitEthernet 0/0

! Allow the interface to send LLDP advertisements
R1(config-if)# lldp transmit

! Allow the interface to receive LLDP advertisements
R1(config-if)# lldp receive

! Disable LLDP transmission on this interface
R1(config-if)# no lldp transmit

! Disable LLDP reception on this interface
R1(config-if)# no lldp receive
```

**Understand the difference:**

- `lldp transmit`: the interface sends LLDP advertisements.
- `lldp receive`: the interface listens for and processes LLDP advertisements.

An interface can be configured to transmit only, receive only, both, or neither.

## 3.5 Configure LLDP timers

These are global configuration commands. The values are in seconds.

```cisco
! Advertisement interval
R1(config)# lldp timer 30

! Neighbor information lifetime
R1(config)# lldp holdtime 120

! Reinitialization delay
R1(config)# lldp reinit 2
```

The values shown are the common defaults.

## 3.6 LLDP verification and show commands

| Command | What it displays |
|---|---|
| `show lldp` | Basic LLDP information, including timers and status |
| `show lldp traffic` | Number of LLDP messages sent and received, plus counters |
| `show lldp interface` | Interfaces and their LLDP transmit / receive status |
| `show lldp neighbors` | Neighbor summary and basic information |
| `show lldp neighbors detail` | Detailed information about LLDP neighbors |
| `show lldp entry <name>` | Detailed information for a specified neighbor entry |

Examples:

```cisco
R1# show lldp
R1# show lldp traffic
R1# show lldp interface
R1# show lldp neighbors
R1# show lldp neighbors detail
R1# show lldp entry SW1
```

The exact fields displayed can vary by Cisco IOS / IOS XE version and platform.

## 3.7 System Capabilities vs. Enabled Capabilities

LLDP neighbor details can display two capability fields:

- **System Capabilities:** the functions the neighbor device is capable of performing.
- **Enabled Capabilities:** the functions the neighbor is currently configured to perform / advertise as enabled.

Example:

A switch might support both **Bridge** and **Router** capabilities, but if routing is not enabled, its enabled capabilities may show only **Bridge**.

Common capability codes include:

| Capability | Meaning |
|---|---|
| `B` | Bridge (Layer 2 switch) |
| `R` | Router (Layer 3 routing) |
| `W` | WLAN access point |
| `T` | Telephone |
| `D` | DOCSIS cable device |
| `S` | Station (end system) |
| `O` | Other |

The exact set of capabilities depends on the device and the LLDP implementation.

---

# 4. CDP vs. LLDP — CCNA comparison

| Feature | CDP | LLDP |
|---|---|---|
| Standard | Cisco proprietary | IEEE 802.1AB |
| Default advertisement timer | 60 seconds | 30 seconds |
| Default holdtime | 180 seconds | 120 seconds |
| Destination MAC | `0100.0CCC.CCCC` | `0180.C200.000E` |
| Default on Cisco IOS | Generally enabled | Generally disabled |
| Global enable command | `cdp run` | `lldp run` |
| Per-interface control | `cdp enable` | `lldp transmit` / `lldp receive` |
| Neighbor summary | `show cdp neighbors` | `show lldp neighbors` |
| Detailed neighbor info | `show cdp neighbors detail` | `show lldp neighbors detail` |

## 5. CCNA exam reminders

- CDP is **Cisco proprietary**; LLDP is **vendor-neutral** and standardized by IEEE 802.1AB.
- Both operate at **Layer 2** and discover directly connected neighbors.
- CDP default timer: **60 seconds**.
- CDP default holdtime: **180 seconds**.
- LLDP default timer: **30 seconds**.
- LLDP default holdtime: **120 seconds**.
- LLDP reinitialization delay: **2 seconds**.
- CDP destination MAC: **0100.0CCC.CCCC**.
- LLDP destination MAC: **0180.C200.000E**.
- These discovery advertisements are not forwarded to other links.
- CDP and LLDP can run simultaneously.
- `no cdp run` disables CDP globally.
- `no lldp run` disables LLDP globally.
- LLDP transmit and receive can be controlled independently per interface.
- **Timer = how often advertisements are sent.**
- **Holdtime = how long received neighbor information remains valid.**

## 6. Quick self-test

1. What is the default CDP advertisement interval?
2. What is the default CDP holdtime?
3. What destination MAC address does CDP use?
4. Is CDP proprietary or an IEEE standard?
5. What is the default LLDP advertisement interval?
6. What is the default LLDP holdtime?
7. What destination MAC address does LLDP use?
8. Which command enables LLDP globally?
9. Which commands allow LLDP transmission and reception on an interface?
10. Can a device run CDP and LLDP simultaneously?
11. What is the difference between an LLDP neighbor's system capabilities and enabled capabilities?
12. What happens to a neighbor entry when its holdtime expires without a refresh?

<details>
<summary>Answers</summary>

1. 60 seconds.
2. 180 seconds.
3. `0100.0CCC.CCCC`.
4. Cisco proprietary.
5. 30 seconds.
6. 120 seconds.
7. `0180.C200.000E`.
8. `lldp run`.
9. `lldp transmit` and `lldp receive`.
10. Yes.
11. System capabilities are what the device can do; enabled capabilities are what it currently has enabled / advertises as enabled.
12. The neighbor entry expires and is removed from the neighbor table.

</details>
