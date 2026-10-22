# FHRP (First Hop Redundancy Protocol)

## 1. Introduction

**FHRP** allows multiple routers to act as a redundant default gateway for hosts in the same subnet.

Without FHRP:
- A host has one default gateway.
- If that router fails, the host may lose access to other networks.
- Another router can exist, but hosts won't automatically use it if their configured gateway is still the failed router.

With FHRP:
- Multiple physical routers share a **virtual IP address**.
- Hosts use the virtual IP as their default gateway.
- If the active router fails, another router takes over.
- Hosts can continue communicating without changing their default gateway configuration.

### Basic topology

```text
             R1 (Active)
            /            \
           /              \
       R2 (Standby)      Internet
           |
    -----------------
    |               |
   PC1             PC2
    |
Default Gateway: 192.168.1.1 (Virtual IP)
```

Both routers have their own physical IP addresses, but hosts use the shared virtual IP.

### Main FHRP protocols

| Protocol | Full name | Main characteristic |
|---|---|---|
| HSRP | Hot Standby Router Protocol | Active/Standby |
| VRRP | Virtual Router Redundancy Protocol | Master/Backup |
| GLBP | Gateway Load Balancing Protocol | Active Virtual Gateway + Active Virtual Forwarders |

**Remember:**
- HSRP and VRRP primarily provide gateway redundancy.
- GLBP provides gateway redundancy and load balancing across multiple routers.
- HSRP and GLBP are Cisco proprietary; VRRP is an open standard.

---

## 2. Key Terms

| Term | Meaning |
|---|---|
| FHRP | Protocol providing default-gateway redundancy |
| Virtual IP (VIP) | Shared gateway IP configured on hosts |
| Virtual MAC (VMAC) | Shared logical MAC address associated with the virtual gateway |
| Active Router | HSRP router currently forwarding traffic for the virtual gateway |
| Standby Router | HSRP router ready to take over |
| Master Router | VRRP router currently forwarding traffic for the virtual router |
| Backup Router | VRRP router ready to become Master |
| Priority | Value used to influence the election |
| Preemption | Allows a higher-priority router to take over from the current active/master router |
| Hello Messages | Messages used to announce presence and maintain router status |
| Hold Time | Time without expected messages before a router is considered unavailable |
| Gratuitous ARP | Unsolicited ARP announcement used to update hosts' ARP caches |
| AVG | GLBP Active Virtual Gateway |
| AVF | GLBP Active Virtual Forwarder |
| Group ID | Identifies an FHRP group |

**Important distinction:**

The virtual IP and virtual MAC are logical gateway identities. They are not the same as a router's physical interface IP and MAC.

---

## 3. What Happens When the Active Router Fails?

Example configuration:

| Device | Physical IP | Role |
|---|---|---|
| R1 | 192.168.1.2 | Active |
| R2 | 192.168.1.3 | Standby |
| Virtual gateway | 192.168.1.1 | Shared gateway |

PC configuration:

```text
IP address:      192.168.1.10
Default gateway: 192.168.1.1
```

### Failure sequence

1. **R1 is the active router.**
   - R1 forwards traffic for the virtual gateway.
   - R2 monitors R1 using FHRP hello messages.

2. **R1 fails.**
   - R2 stops receiving R1's hello messages.
   - If R1 does not recover before the hold timer expires, R2 considers R1 unavailable.

3. **R2 becomes Active (HSRP) or Master (VRRP).**
   - R2 assumes responsibility for forwarding traffic for the virtual gateway.

4. **The virtual gateway remains the same.**
   - Virtual IP: `192.168.1.1`
   - Virtual MAC: normally unchanged for the same FHRP group.

5. **R2 sends a gratuitous ARP announcement.**
   - This helps update the Layer 2 forwarding information and/or hosts' ARP caches, depending on the announcement and device behavior.
   - The announcement advertises the virtual IP-to-MAC association.

6. **Traffic resumes through R2.**
   - Hosts still use `192.168.1.1`.
   - They do not need to change their default gateway.

### What changes during failover?

| Item | After failover |
|---|---|
| Host default gateway IP | No change |
| Virtual IP | No change |
| Virtual MAC | Normally no change |
| Active/Master router | Changes from R1 to R2 |
| Physical router forwarding traffic | Changes |
| Routing and Layer 2 forwarding state | May be updated as needed |

**Key point:** FHRP provides gateway redundancy without requiring hosts to reconfigure their default gateway.

The exact interruption depends on hello/hold timers, convergence, and the surrounding network.

---

## 4. What Happens When the Original Router Returns?

Assume R1 was originally Active and R2 took over.

When R1 comes back online:

1. R1 starts sending FHRP hello messages again.
2. R1 and R2 determine their roles using the protocol's election rules.
3. If preemption is enabled on R1 and R1 has a higher effective priority, R1 can take back the Active/Master role.
4. If preemption is disabled on R1, it generally does not take over merely because it has a higher priority.
5. The virtual IP remains the same, and the virtual MAC normally remains the same.
6. A role change may trigger additional announcements and Layer 2 forwarding updates.

### Preemption

**Preemption** allows a router with a higher priority to take over from the current Active/Master router.

Example:

```text
R1 priority: 110
R2 priority: 100
```

If R1 fails, R2 takes over.

If R1 returns:
- With preemption enabled on R1, R1 can reclaim the role.
- With preemption disabled on R1, R2 can remain Active even though R1 has a higher priority.

### How to stop the original router from taking back control

For HSRP, configure `no standby <group> preempt` on R1.

```cisco
interface GigabitEthernet0/0
 standby 10 priority 110
 no standby 10 preempt
```

This prevents R1 from preempting the current Active router just because R1 has a higher priority.

**Remember:**
- A higher priority does not necessarily mean immediate takeover.
- Preemption controls whether a higher-priority router can take over an already functioning Active/Master router.
- Preemption is different from the initial election when a group starts.

---

## 5. HSRP (Hot Standby Router Protocol)

HSRP is a Cisco-proprietary FHRP that provides a redundant default gateway using an Active router and a Standby router.

### HSRP election

The router with the highest HSRP priority is preferred.

- Default priority: `100`
- Valid priority: `0–255`
- Highest priority wins.
- If priorities tie, the router with the highest IP address on the relevant interface wins the election.
- A priority of `0` has special significance in HSRP and is used to relinquish the Active role.

Example:

```text
R1 priority = 120
R2 priority = 100

Result:
R1 = Active
R2 = Standby
```

With preemption enabled on R1, it can reclaim the Active role after recovery.

### HSRP versions

| Feature | HSRP v1 | HSRP v2 |
|---|---|---|
| Multicast IPv4 | `224.0.0.2` | `224.0.0.102` |
| UDP port | `1985` | `1985` |
| Virtual MAC format | `0000.0c07.acXX` | `0000.0c9f.fXXX` |
| Group numbers | 0–255 | 0–4095 |
| Default version | Version 1 | Must be configured where required |

`XX` and `XXX` represent hexadecimal group identifiers.

Examples:

```text
HSRP v1, group 10:
0000.0c07.ac0a

HSRP v2, group 10:
0000.0c9f.f00a
```

**Remember:** HSRP v2 supports more groups and uses a different multicast address and virtual MAC format. Both routers must use compatible HSRP versions.

### HSRP configuration

Example topology:

```text
R1: 192.168.10.2/24
R2: 192.168.10.3/24
VIP: 192.168.10.1
Group: 10
```

**R1 — preferred Active router**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.2 255.255.255.0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt
```

**R2 — Standby router**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.3 255.255.255.0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 100
 standby 10 preempt
```

Both routers use the same group and virtual IP.

### Verify HSRP

```cisco
show standby
show standby brief
show running-config
show ip interface brief
```

---

## 6. Load Balancing with HSRP

HSRP does not load-balance traffic automatically within one HSRP group: one router is Active for that group.

However, we can use **multiple HSRP groups** and make each router Active for a different group.

This distributes the default-gateway role across routers for different VLANs.

### Example

| VLAN | Subnet | Virtual IP | Preferred Active |
|---|---|---|---|
| VLAN 10 | `192.168.10.0/24` | `192.168.10.1` | R1 |
| VLAN 20 | `192.168.20.0/24` | `192.168.20.1` | R2 |

### R1 configuration

```cisco
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.2 255.255.255.0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 110
 standby 10 preempt

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.2 255.255.255.0
 standby version 2
 standby 20 ip 192.168.20.1
 standby 20 priority 90
 standby 20 preempt
```

### R2 configuration

```cisco
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.3 255.255.255.0
 standby version 2
 standby 10 ip 192.168.10.1
 standby 10 priority 90
 standby 10 preempt

interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.3 255.255.255.0
 standby version 2
 standby 20 ip 192.168.20.1
 standby 20 priority 110
 standby 20 preempt
```

### Result

```text
VLAN 10 → R1 Active, R2 Standby
VLAN 20 → R2 Active, R1 Standby
```

If R1 fails, R2 can take over both groups, assuming the interfaces and configurations remain operational.

**Remember:** This is load distribution across VLANs, not per-packet load balancing within one group.

---

## 7. Gratuitous ARP During Failover

**Gratuitous ARP (GARP)** is an unsolicited ARP announcement sent without a preceding ARP request.

It can help other devices learn or refresh the relationship between an IP address and a MAC address.

### Why is it useful with FHRP?

After a failover:
- The new Active/Master router needs to forward traffic for the virtual gateway.
- The virtual IP-to-MAC association is normally unchanged.
- An announcement can refresh relevant ARP or Layer 2 forwarding information, depending on the implementation.
- This helps traffic reach the new forwarding router.

### ARP cache vs MAC address table

| Table | Maps |
|---|---|
| ARP cache | IP address → MAC address |
| Switch MAC address table | MAC address → switch port |

Do not confuse these tables.

A gratuitous ARP announcement is not the same thing as an FHRP hello message:
- **Hello:** maintains and communicates FHRP router status.
- **GARP:** announces an IP/MAC association and can help update network forwarding state.

---

## 8. VRRP (Virtual Router Redundancy Protocol)

VRRP is an open-standard FHRP that provides a redundant virtual default gateway.

Unlike HSRP, VRRP uses these terms:

- **Master:** forwards traffic for the virtual router.
- **Backup:** monitors the Master and can take over if needed.

### VRRP election

The router with the highest priority is generally preferred.

- Default priority: `100`
- Valid priorities: `1–254` for normal VRRP routers.
- Priority `255` identifies the address owner, which uses the virtual IP as its own real interface IP.
- Priority `0` indicates that the current Master is relinquishing its role.
- If priorities tie, the higher primary IP address wins the election.
- Preemption is enabled by default in standard VRRP behavior, unless disabled by configuration or implementation.

### VRRP multicast and virtual MAC

| Feature | IPv4 VRRP |
|---|---|
| Multicast address | `224.0.0.18` |
| IP protocol number | `112` (not UDP) |
| Virtual MAC format | `0000.5e00.01XX` |

`XX` is the VRRP virtual router ID (VRID), represented in hexadecimal.

Example:

```text
VRID 10 → 0000.5e00.010a
```

For IPv6 VRRP, the corresponding virtual MAC format is `0000.5e00.02XX`, and the link-local multicast address is `ff02::12`.

### VRRP configuration example

Cisco IOS/IOS XE implementations commonly support commands similar to the following. Exact syntax varies by platform and software version.

**R1 — preferred Master**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.2 255.255.255.0
 vrrp 10 ip 192.168.10.1
 vrrp 10 priority 120
 vrrp 10 preempt
```

**R2 — Backup**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.3 255.255.255.0
 vrrp 10 ip 192.168.10.1
 vrrp 10 priority 100
 vrrp 10 preempt
```

Both routers must share the same VRID and virtual IP.

### Verify VRRP

```cisco
show vrrp
show vrrp brief
show running-config
```

---

## 9. GLBP (Gateway Load Balancing Protocol)

GLBP is a Cisco-proprietary FHRP that provides both gateway redundancy and load balancing.

Unlike HSRP and basic VRRP, GLBP can use multiple routers to forward traffic for the same virtual gateway.

### Main roles

| Role | Function |
|---|---|
| AVG | Active Virtual Gateway; coordinates the GLBP group and answers ARP requests |
| AVF | Active Virtual Forwarder; forwards traffic using an assigned virtual MAC |
| Standby AVG | Takes over if the AVG fails |
| Other AVFs | Provide additional forwarding paths |

### How GLBP load balancing works

1. Hosts use one virtual IP as their default gateway.
2. The AVG answers ARP requests for that virtual IP.
3. The AVG can return different virtual MAC addresses to different hosts.
4. Each assigned virtual MAC corresponds to an AVF.
5. Hosts send traffic to their assigned MAC, distributing forwarding across routers.
6. If an AVF fails, another forwarder can take over its virtual MAC, depending on GLBP state and configuration.

GLBP supports different load-balancing methods, including:
- **Round-robin:** distributes ARP replies across available forwarders.
- **Weighted:** distributes based on configured weights.
- **Host-dependent:** attempts to give each host a consistent forwarder.

### GLBP multicast and virtual MAC

| Feature | GLBP |
|---|---|
| Multicast IPv4 | `224.0.0.102` |
| UDP port | `3222` |
| Virtual MAC format | `0007.b400.XXYY` |

The MAC includes a group identifier and a forwarder identifier; the final fields encode the group/forwarder information.

Example:

```text
GLBP group: 10
Forwarder: 1
Example virtual MAC: 0007.b40a.0001
```

The exact virtual MAC assignment depends on the group and forwarder IDs.

### GLBP configuration example

**R1 — preferred AVG**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.2 255.255.255.0
 glbp 10 ip 192.168.10.1
 glbp 10 priority 120
 glbp 10 preempt
 glbp 10 load-balancing round-robin
```

**R2 — another router and forwarder**

```cisco
interface GigabitEthernet0/0
 ip address 192.168.10.3 255.255.255.0
 glbp 10 ip 192.168.10.1
 glbp 10 priority 100
 glbp 10 preempt
 glbp 10 load-balancing round-robin
```

Both routers participate in the same GLBP group and share the virtual IP.

### Verify GLBP

```cisco
show glbp
show glbp brief
show running-config
```

---

## 10. Comparing HSRP, VRRP and GLBP

| Feature | HSRP | VRRP | GLBP |
|---|---|---|---|
| Ownership | Cisco proprietary | Open standard | Cisco proprietary |
| Main roles | Active / Standby | Master / Backup | AVG / AVF |
| Gateway redundancy | Yes | Yes | Yes |
| Load balancing | Across multiple groups/VLANs | Not inherent to basic VRRP | Built in |
| IPv4 multicast | v1: `224.0.0.2`; v2: `224.0.0.102` | `224.0.0.18` | `224.0.0.102` |
| IP protocol / UDP | UDP `1985` | IP protocol `112` | UDP `3222` |
| Virtual MAC | v1: `0000.0c07.acXX`; v2: `0000.0c9f.fXXX` | `0000.5e00.01XX` | `0007.b400.XXYY` |
| Default priority | `100` | `100` | `100` |
| Main load-balancing approach | Multiple groups | External design or multiple virtual routers | Multiple forwarders in one group |

**Important:** HSRP v2 and GLBP use the same IPv4 multicast destination, `224.0.0.102`, but different UDP ports and different virtual MAC formats.

---

## 11. Important Cisco IOS Commands

### HSRP

```cisco
standby version 2
standby <group> ip <virtual-ip>
standby <group> priority <priority>
standby <group> preempt
no standby <group> preempt
standby <group> timers <hello> <hold>
show standby
show standby brief
```

### VRRP

```cisco
vrrp <group> ip <virtual-ip>
vrrp <group> priority <priority>
vrrp <group> preempt
no vrrp <group> preempt
show vrrp
show vrrp brief
```

### GLBP

```cisco
glbp <group> ip <virtual-ip>
glbp <group> priority <priority>
glbp <group> preempt
glbp <group> load-balancing round-robin
show glbp
show glbp brief
```

### General troubleshooting

```cisco
show ip interface brief
show running-config
show interfaces
show arp
show mac address-table
```

**Note:** Interface names, timers, tracking options, and exact commands can vary across Cisco platforms and software releases.

---

## 12. Final Review — Key Points to Remember

- FHRP provides a redundant default gateway using a virtual IP.
- Hosts keep the same default gateway when the Active/Master router fails.
- HSRP uses Active/Standby; VRRP uses Master/Backup; GLBP uses AVG/AVF.
- Higher priority usually wins an election; a tie is resolved using an IP address according to the protocol.
- Preemption determines whether a higher-priority router can take over from a functioning Active/Master router.
- HSRP v1 multicast: `224.0.0.2`.
- HSRP v2 multicast: `224.0.0.102`.
- VRRP multicast: `224.0.0.18`.
- GLBP multicast: `224.0.0.102`.
- HSRP uses UDP `1985`; VRRP uses IP protocol `112`; GLBP uses UDP `3222`.
- Gratuitous ARP can help refresh IP/MAC or Layer 2 forwarding information after a role change.
- HSRP load distribution can be achieved using different groups across VLANs.
- GLBP supports multiple forwarding routers for one virtual gateway.
- The virtual IP and virtual MAC normally remain unchanged during failover and recovery.

## Questions to Test Yourself

1. What problem does FHRP solve?
2. What is the difference between a physical IP and a virtual IP?
3. What happens when an HSRP Active router stops sending hello messages?
4. Does the host need to change its default gateway after failover?
5. What is preemption, and how can you prevent the original router from taking back the Active role?
6. What is the difference between an ARP cache and a switch MAC address table?
7. What are the HSRP v1 and v2 multicast addresses and virtual MAC formats?
8. How does VRRP elect its Master?
9. What is the difference between an AVG and an AVF in GLBP?
10. How can you distribute HSRP Active roles across VLANs?
11. Which protocol supports built-in load balancing among multiple forwarders?
12. Which command displays the current HSRP, VRRP or GLBP roles?
  