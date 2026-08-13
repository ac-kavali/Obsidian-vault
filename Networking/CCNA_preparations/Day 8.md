
# IPv4 Addressing (Part 2)

> [!info] Scope of this note Covers the Router CLI portion of the Day 8 video — starting from `show ip interface brief` through to the end (interface configuration, `show interfaces`, `show interfaces description`, command review, and the practice quiz question).

## 🗺️ Lab Topology (context)

Three networks connected to a single router **R1**, one interface per network:

| Network        | Class | R1 Interface | R1 IP (last usable) | PC IP (first usable) |
| -------------- | ----- | ------------ | ------------------- | -------------------- |
| 10.0.0.0/8     | A     | G0/0         | 10.255.255.254      | 10.0.0.1             |
| 172.16.0.0/16  | B     | G0/1         | 172.16.255.254      | 172.16.0.1           |
| 192.168.0.0/24 | C     | G0/2         | 192.168.0.254       | 192.168.0.1          |
|                |       |              |                     |                      |

---

## 1️⃣ `show ip interface brief`

Confirms the **status and IP address** of every interface on a device.

```
R1#show ip interface brief
```

### Column breakdown

|Column|Meaning|
|---|---|
|**Interface**|Lists all physical/logical interfaces on the device (e.g. `GigabitEthernet0/0`)|
|**IP-Address**|Assigned IPv4 address, or `unassigned` if none|
|**OK?**|Whether the address is "valid" — legacy field, should always show `YES`|
|**Method**|How the IP was set — `manual`, `DHCP`, or `unset`|
|**Status**|🔑 **Layer 1** status of the interface|
|**Protocol**|🔑 **Layer 2** status of the interface|

> [!important] Status vs Protocol
> 
> - **Status** = Layer 1 (physical) — up if the interface is enabled + cable connected + far end connected properly
> - **Protocol** = Layer 2 (data link) — can only come up **after** Layer 1 is up
> - You can see `up / down` (L1 up, L2 down) but **never** `down / up` — L2 cannot function without L1

### Default behavior

> [!warning] Administratively down = default
> 
> - **Router** interfaces are **administratively down by default** (the `shutdown` command is applied out of the box), even if physically cabled to another device.
> - **Switch** interfaces are **NOT** administratively down by default — they come up automatically if connected to something.

---

## 2️⃣ Configuring an IPv4 address on an interface

### Step-by-step (G0/0 example)

```
R1#configure terminal
R1(config)#interface gigabitethernet0/0
R1(config-if)#ip address 10.255.255.254 255.0.0.0
R1(config-if)#no shutdown
```

- `ip address <ip-address> <subnet-mask>` — the mask **must** be written in **dotted decimal** (e.g. `255.0.0.0`), CLI does **not** accept `/8` CIDR notation directly on this command.
- `no shutdown` (`no shut`) — cancels the default `shutdown` state and enables the interface.

### Console messages after `no shutdown`

```
%LINK-3-UPDOWN: Interface GigabitEthernet0/0, changed state to up
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up
```

- 1st message → **Layer 1** came up → matches the **Status** column
- 2nd message → **Line protocol** (Layer 2) came up → matches the **Protocol** column

### Verifying from interface config mode

You can run privileged EXEC commands without leaving interface config mode by prefixing with `do`:

```
R1(config-if)#do show ip interface brief
```

### Repeat for remaining interfaces

You can jump directly between interfaces without returning to global config mode:

```
R1(config-if)#interface g0/1
R1(config-if)#ip address 172.16.255.254 255.255.0.0
R1(config-if)#no shutdown

R1(config-if)#interface g0/2
R1(config-if)#ip address 192.168.0.254 255.255.255.0
R1(config-if)#no shutdown
```

✅ After configuring all three, `show ip interface brief` should show an assigned IP, `Method = manual`, and **Status/Protocol = up/up** for each.

---

## 3️⃣ `show interfaces` (detailed)

```
R1#show interfaces g0/0
```

> [!tip] Always specify the interface Running bare `show interfaces` dumps info for **every** interface — very long. Specify the interface you care about.

This shows **L1, L2, and (to a lesser extent) L3** details:

|Output line|Meaning|
|---|---|
|`GigabitEthernet0/0 is up`|Layer 1 status|
|`line protocol is up`|Layer 2 status|
|`Hardware is iGbE`|Interface hardware type (Gigabit Ethernet)|
|`address is ____, bia ____`|MAC address; **bia** = Burned-In Address (the physical/factory MAC — the top address can be changed in CLI, bia cannot)|
|`Internet address is 10.255.255.254/8`|Layer 3 (IP) info — address shown **with** the mask, unlike `show ip interface brief`|

---

## 4️⃣ `show interfaces description`

Similar column layout to `show ip interface brief` (Status / Protocol) but adds a **Description** column.

### Setting a description

```
R1(config)#interface g0/0
R1(config-if)#description ## to SW1 ##
```

- Descriptions are **optional** but useful for documenting what each interface connects to.
- Repeat for G0/1 and G0/2 as needed.

### Viewing descriptions

```
R1(config-if)#do show interfaces description
```

(or from priv exec: `R1#show interfaces description` / `show int desc`)

---

## 📋 Command Review

|Command|Purpose|
|---|---|
|`show ip interface brief`|Confirm status + IP address of every interface|
|`interface <interface>`|Enter interface configuration mode|
|`ip address <ip-address> <subnet-mask>`|Assign an IPv4 address to an interface|
|`no shutdown`|Enable the interface (removes default shutdown state)|
|`description <text>`|Set a description on an interface|
|`show interfaces`|Detailed L1/L2/L3 info — **all** interfaces|
|`show interfaces <interface>`|Detailed L1/L2/L3 info — **specific** interface|
|`show interfaces description`|Status + Protocol + Description, all interfaces|
|`do <command>`|Run a priv-exec command while still in a config sub-mode|

---

## 🧮 Practice Quiz Question

**Given:** PC1 has IP address `43.109.23.12 /8`

|Item|Answer|
|---|---|
|Network address|`43.0.0.0`|
|Max hosts in network|`2^24 − 2` = 16,777,214|
|Broadcast address|`43.255.255.255`|
|First usable address|`43.0.0.1`|
|Last usable address|`43.255.255.254`|

> [!note] Why /8? `43.x.x.x` falls in the **Class A** range (1–126), so the classful mask is `/8` → 24 host bits → `2^24 − 2` usable hosts.

---

## 🔗 Related Notes

- [[Day 7 - IPv4 Addressing (Part 1)]]
- [[Day 9 - Switch Interfaces]]
- [[Day 10 - The IPv4 Header]]

## 📺 Source

- Jeremy's IT Lab — _Free CCNA | IPv4 Addressing (Part 2) | Day 8 | CCNA 200-301 Complete Course_
- Jeremy's IT Lab — _Free CCNA | Configuring IP Addresses | Day 8 Lab_