
## 1. What VTP Is and Why It Exists

VTP is a **Cisco-proprietary** Layer 2 protocol that synchronizes the **VLAN database** across multiple switches within the same **VTP domain**, so you don't have to manually create/rename/delete VLANs on every single switch.

- VTP advertisements travel **only over trunk links**.
- VTP manages: VLAN ID, VLAN name, VLAN type. It does **not** manage VLAN port assignments (which access ports belong to which VLAN) — that's still local, per-switch config.
- Works alongside DTP (trunk negotiation) but is a separate protocol.

---

## 2. VTP Domain

- A VTP domain is a logical grouping of switches that share the same VLAN database.
- Switches only exchange VTP info if their **domain names match exactly** (case-sensitive).
- A switch's domain name is **null/blank by default**. It's set automatically the first time it either:
    - Receives a VTP advertisement on a trunk, or
    - Is manually configured with `vtp domain <name>`.
- Once set, the domain name **cannot be changed back to null** except by reset/erase.

---

## 3. VTP Modes

|Mode|Can create/edit/delete VLANs?|Syncs with domain?|Forwards VTP ads?|Notes|
|---|---|---|---|---|
|**Server** (default)|Yes|Yes|Yes|Full control, changes propagate to domain|
|**Client**|No (local only — blocked)|Yes|Yes|Must receive VLANs from a server|
|**Transparent**|Yes (local only)|No — keeps own independent DB|Yes (v1/v2, forwards but doesn't process); v3 differs slightly|Good "safe" mode|
|**Off** (VTPv3 only)|Yes (local only)|No|No — ignores VTP entirely|Doesn't forward ads at all|

**Key exam point:** Transparent mode switches still **forward** VTP advertisements they receive on one trunk out other trunks (in v1/v2), acting as a pass-through, even though they don't apply the changes to their own database.

---

## 4. VTP Versions

|Version|Key Features|
|---|---|
|**v1**|Original. No extended-range VLAN support.|
|**v2**|Adds support for Token Ring VLANs, some minor differences (consistency checks, transparent mode forwards regardless of domain match in some cases).|
|**v3**|Adds: extended-range VLANs (1006–4094) can be propagated, private VLAN support, ability to designate a **primary server**, hidden/secret password option, and an **"off"** mode. Also supports propagating other databases (like MST).|

- All switches in a domain should run compatible VTP versions.
- v1 and v2 switches can interoperate if v2 is enabled domain-wide (v2 is backward compatible when enabled).
- v3 is not automatically compatible with v1/v2 the same way — check per exam objective, but generally know v3 exists and why it's better.

---

## 5. THE Most Important Concept: Configuration Revision Number

- Every time a VLAN is added/deleted/renamed on a VTP **server** (or transparent switch locally), the domain's **configuration revision number increments by 1**.
- When a switch joins a domain (or a new trunk comes up), switches compare revision numbers.
- **The switch/database with the HIGHER revision number always wins** and overwrites the VLAN database on switches with a lower revision number — regardless of whether that data is correct or current.

### The "VTP Bomb" scenario (classic exam & real-world trap)

1. An old switch was previously used in a lab/other network and has a high revision number (e.g., 50) with wrong or old VLANs.
2. It gets plugged into a production network using the **same domain name** with a lower revision number.
3. Because 50 > production's revision number, the old switch's (wrong) VLAN database **overwrites the entire domain**, potentially deleting VLANs everywhere and causing a massive outage.

### How to prevent it

- Set unused/new switches to **transparent** mode before connecting them to a live network (transparent switches don't push their database).
- Reset the revision number to 0 before connecting: change VTP domain name to something bogus then back (this resets revision to 0), or change mode to transparent then back to server.
- Use VTP passwords so unauthorized switches can't just merge in.
- In practice, many network engineers just **avoid VTP altogether** (leave every switch in transparent mode) to avoid this risk — worth knowing for real-world/scenario questions.

---

## 6. Requirements for VTP Switches to Synchronize

All of these must be true:

1. Connected via a **trunk** link (VTP doesn't work over access ports).
2. **Domain name** matches exactly.
3. **VTP password** matches (if one is configured).
4. **VTP version** compatible.
5. Receiving switch is in **Server** or **Client** mode (not transparent/off).
6. The advertisement's revision number is **higher** than the local one.

---

## 7. Step-by-Step Configuration (from enable)

### Set VTP mode

```
Switch> enable
Switch# configure terminal
Switch(config)# vtp mode server
Switch(config)# vtp mode client
Switch(config)# vtp mode transparent
Switch(config)# vtp mode off        ! VTPv3 only
```

### Set the domain name

```
Switch(config)# vtp domain MyCompany
```

### Set the VTP version

```
Switch(config)# vtp version 2
```

### Set a VTP password (optional, recommended)

```
Switch(config)# vtp password Cisco123
```

- Password must match on all switches in the domain to sync.
- In VTPv3, you can hide the password from `show vtp password` using:

```
Switch(config)# vtp password Cisco123 hidden
```

### Exit and verify

```
Switch(config)# end
Switch# show vtp status
Switch# show vtp password
```

---

## 8. Verification Commands

|Command|Shows|
|---|---|
|`show vtp status`|Mode, version, domain name, revision number, number of VLANs, VTP operating mode|
|`show vtp password`|Configured VTP password (if not hidden)|
|`show vtp counters`|Statistics on VTP advertisements sent/received, errors|
|`show vlan brief`|Actual VLAN database on that switch|
|`show interface trunk`|Confirms trunk links (needed for VTP to work at all)|

**Sample `show vtp status` output to recognize:**

```
VTP Version capable             : 1 to 3
VTP version running             : 2
VTP Domain Name                 : MyCompany
VTP Pruning Mode                : Disabled
VTP Traps Generation            : Disabled
Device ID                       : xxxx.xxxx.xxxx
Configuration last modified by 0.0.0.0 at ...
Local updater ID is 0.0.0.0
Feature VLAN:
--------------
VTP Operating Mode                : Server
Maximum VLANs supported locally   : 1005
Number of existing VLANs          : 8
Configuration Revision            : 12
```

---

## 9. VTP Pruning (bonus, sometimes tested)

- VTP pruning reduces unnecessary broadcast/multicast/unknown-unicast traffic sent over trunks to switches that don't actually have ports in a given VLAN.
- Without pruning, broadcast traffic for VLAN 10 floods across every trunk in the domain, even to switches with no VLAN 10 ports.
- Enable with:

```
Switch(config)# vtp pruning
```

- Only needs to be enabled on **one VTP server**; it propagates domain-wide.
- By default, VLANs 2–1001 are eligible for pruning; VLAN 1 and extended-range VLANs are not prunable.

---

## 10. VTP vs. No VTP (Design Consideration)

||Using VTP (server/client)|Transparent / No VTP|
|---|---|---|
|Adding VLANs|One command on server, propagates automatically|Must configure identically on every switch manually|
|Risk|Revision number overwrite risk ("VTP bomb")|No risk of accidental domain-wide overwrite|
|Real-world usage|Less common in modern designs due to risk|Very common — many orgs run every switch in transparent mode|

Cisco's own current best practice leans toward caution with VTP server/client due to the overwrite risk — good context if you get a scenario/design question.

---

## 11. Quick Command Cheat Sheet

```
enable
configure terminal
vtp mode {server | client | transparent | off}
vtp domain <domain-name>
vtp version {1 | 2 | 3}
vtp password <password> [hidden]
vtp pruning
end
show vtp status
show vtp password
show vtp counters
show vlan brief
```

---

## 12. Exam-Focused Summary — What You Absolutely Must Know

1. VTP synchronizes VLAN **databases** across switches in the same domain, over **trunks only**.
2. Four modes: **server** (full control), **client** (receive only, can't edit), **transparent** (local only, but forwards ads), **off** (v3 only, ignores everything).
3. **Higher configuration revision number always wins** — this is the #1 tested concept and real-world danger (VTP bomb).
4. Domain name + password + version must match for switches to sync.
5. New/unknown switches should go into a network in **transparent mode** first, or have their revision number reset, to avoid wiping out the VLAN database.
6. VTPv3 adds extended-range VLAN support, private VLANs, primary server concept, and hidden passwords.
7. VTP pruning limits unnecessary flooding across trunks — only needs enabling on one server switch.
8. `show vtp status` is your main verification command — know how to read domain name, mode, version, and revision number from it.