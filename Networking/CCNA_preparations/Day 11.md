# Routing Foundamentals 
## What You Need for the CCNA

- Explain the purpose of a router and how it forwards packets between networks
- Read and interpret a `show ip route` output
- Distinguish between **connected**, **local**, and other route types
- Understand the **route selection process** (prefix length → administrative distance → metric)
- Be able to trace a packet through a routing table by hand (route selection practice)

---

## 1. What Is Routing?

- A **router** connects multiple networks (subnets/VLANs) and moves packets between them based on **destination IP address**.
- Each router interface sits on a different network/subnet — this is what makes routing possible.
- Routing = the process of selecting the best path to forward a packet toward its destination.
- Every router builds and maintains a **routing table (RIB — Routing Information Base)** that lists known destination networks and how to reach them.

> [!tip] Exam angle CCNA loves to test whether you know a router **will not forward** a packet if there's no matching route (and no default route) — it gets dropped.

---

## 2. Router Pre-Configuration (Lab Topology)

Typical lab setup used in the video:

- Router **R1** with multiple interfaces (e.g., G0/0, G0/1, G0/2) each assigned an IP address on a different subnet.
- Each interface must have:
    - An IP address + subnet mask
    - Be turned on (`no shutdown`)
- Example config pattern:

```
R1(config)# interface g0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
```

Once an interface is configured **and up**, the router automatically installs a route to that interface's network.

---

## 3. The Routing Table (`show ip route`)

Command: `show ip route`

Anatomy of a routing table entry:

```
C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
L    192.168.1.1/32 is directly connected, GigabitEthernet0/0
```

|Field|Meaning|
|---|---|
|Code letter (`C`, `L`, `S`, `O`, `D`...)|Route source/type|
|Network/prefix|Destination network the route is for|
|"is directly connected" / "via"|Next hop or exit interface|
|Interface|Where the packet exits|

### Common Route Codes (CCNA-relevant)

|Code|Meaning|
|---|---|
|`C`|Connected route|
|`L`|Local route (the router's own interface IP as a /32)|
|`S`|Static route|
|`S*`|Static default route (candidate default)|
|`O`|OSPF|
|`D`|EIGRP|
|`R`|RIP|

> [!note] Legend At the top of `show ip route` output, Cisco prints a legend explaining every code — always skim it in the exam simulator if unsure.

---

## 4. Connected vs Local Routes

- **Connected route (`C`)**
    
    - Automatically added when an interface is configured with an IP and is up.
    - Represents the **entire subnet** the interface belongs to.
    - Example: `C 192.168.1.0/24 is directly connected, G0/0`
- **Local route (`L`)**
    
    - Automatically added alongside the connected route.
    - Represents the **exact IP address of the router's interface**, always as a **/32**.
    - Example: `L 192.168.1.1/32 is directly connected, G0/0`
    - Purpose: lets the router efficiently recognize traffic destined _to itself_ vs traffic that needs to be _forwarded_ through the interface.

> [!warning] Common mix-up Connected = the subnet. Local = the single host address of the router interface (/32). Both appear together, both are automatic — you don't configure them manually.

---

## 5. Route Selection Process

When multiple routes could match a destination, the router chooses using this order:

1. **Longest (most specific) prefix match wins** — a `/28` is preferred over a `/24` if both match the destination IP.
2. If prefix lengths are equal, compare **Administrative Distance (AD)** — lower AD wins (more "trustworthy" source).
3. If AD is also equal (same source, e.g. two OSPF routes), compare **metric** — lower metric wins.
4. If everything is still equal → **load balancing** (equal-cost multi-path).

### Administrative Distance cheat sheet (memorize for CCNA)

|Source|Default AD|
|---|---|
|Connected|0|
|Static|1|
|eBGP|20|
|EIGRP (internal)|90|
|OSPF|110|
|RIP|120|
|iBGP|200|
|Unknown/unreachable|255 (never used)|

> [!important] Exam gold **Longest prefix match always wins first — before AD is even considered.** AD only matters when prefix lengths tie.

---

## 6. Route Selection Practice (Worked Example Pattern)

Given a routing table like:

```
C   192.168.1.0/24  directly connected, G0/0
C   192.168.2.0/24  directly connected, G0/1
S   192.168.2.0/26  via 192.168.1.2
S*  0.0.0.0/0       via 192.168.1.1
```

**Destination: 192.168.2.5**

- Matches `192.168.2.0/24` (connected) ✅
- Also matches `192.168.2.0/26` (static) ✅ — more specific (/26 > /24)
- **Winner:** the `/26` static route (longest prefix match), even though connected normally has a better AD — prefix length is checked first.

**Destination: 8.8.8.8**

- No specific match found in the table
- Falls back to the **default route** `0.0.0.0/0` (if present) → forwarded via 192.168.1.1

> [!tip] Practice tip Build 3–4 of your own mini routing tables and destination IPs, and manually pick the winning route. This is exactly how Jeremy's quiz section and the real CCNA exam test this topic.

---

## 7. Summary — Key Takeaways

- [ ] Routers forward packets between different networks based on the destination IP.
- [ ] `show ip route` displays the routing table; know how to read each line.
- [ ] Connected (`C`) = subnet, Local (`L`) = interface's own /32 address — both automatic.
- [ ] Route selection order: **longest prefix match → lowest AD → lowest metric**.
- [ ] A missing route (with no default route) = packet dropped.
- [ ] Default route = `0.0.0.0/0`, marked with `S*` when static.

---

## 🔗 Related Notes

- [[Static Routing - Day 11 Part 2]]
- [[Life of a Packet - Day 12]]
- [[Subnetting Part 1 - Day 13]]
- [[Dynamic Routing - Day 24]]
- [[Administrative Distance]]
- [[show ip route Cheat Sheet]]

## ❓ Self-Test (before moving on)

1. What's the difference between a connected and a local route?
2. Why is a local route always a /32?
3. If two routes have the same prefix length, what's compared next?
4. What happens if no route matches and there's no default route?
5. What does `S*` mean in a routing table?

---

# 🧭 Static Routing

> [!info] What is a Static Route? A route **manually configured** by an admin, instead of being learned automatically by a routing protocol. Simple, predictable, no CPU/bandwidth overhead — but doesn't adapt to network changes.


## ⚡ The Command (memorize this)

```
ip route <destination-network> <subnet-mask> <next-hop-IP or exit-interface>
```

> [!example]
> 
> ```
> R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2
> ```
> 
> "To reach `192.168.2.0/24`, send packets to `10.0.0.2`."

---

## 🧩 3 Types of Static Routes

|Type|Syntax|Notes|
|---|---|---|
|**Next-hop**|`ip route <net> <mask> <next-hop-IP>`|Most common. Router does a recursive lookup to find how to reach the next-hop IP.|
|**Directly connected**|`ip route <net> <mask> <exit-interface>`|Only works on point-to-point links. ⚠️ Not recommended on multi-access networks (can cause ARP issues).|
|**Fully specified**|`ip route <net> <mask> <exit-interface> <next-hop-IP>`|Best of both — avoids recursive lookup, works reliably everywhere.|

> [!tip] Recursive Lookup With a next-hop-only static route, the router must look up **another route** in the table to figure out which interface reaches that next-hop IP. Extra lookup = tiny extra overhead. Fully specified routes skip this.

---

## 🌍 Default Route ("Gateway of Last Resort")

Matches **any** destination not covered by a more specific route.

```
ip route 0.0.0.0 0.0.0.0 <next-hop-IP>
```

- Shown in `show ip route` as **`S*`**
- Shortest possible prefix (`/0`) → **always least specific** → only used when nothing else matches
- Common on edge routers pointing toward the ISP

---

## 🔍 Verification Shortcuts

|Command|What it shows|
|---|---|
|`show ip route`|Full routing table|
|`show ip route static`|Only static routes|
|`show ip route <network>`|Details of one specific route|
|`show run \| section ip route`|Static routes from the running-config|
|`show ip interface brief` (`sh ip int br`)|Quick check interfaces are up/up|
|`ping` / `traceroute`|Confirm the route actually works end-to-end|

> [!tip] Jeremy-style shortcut habit Always run `sh ip int br` right after config changes — catches interfaces stuck in `down/down` before you waste time debugging routes.

---

## 🗑️ Removing a Static Route

Just prepend `no`:

```
R1(config)# no ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

⚠️ Must match the original command **exactly** (same network, mask, next-hop/interface).

---

## ⚖️ Administrative Distance (AD) of Static Routes

- Default AD of a static route = **1**
- Beats every dynamic routing protocol (OSPF=110, EIGRP=90, RIP=120) but loses to Connected (0)
- You can manually set a **floating static route** by adding a custom AD at the end:

```
ip route 192.168.2.0 255.255.255.0 10.0.0.2 200
```

> [!info] Floating Static Route A backup route with a **higher AD** than the primary (dynamic) route. Sits inactive in the background — only becomes active if the primary route disappears. Common for backup WAN links.

---

## ✅ Static Routing: Pros & Cons

|✅ Pros|❌ Cons|
|---|---|
|Simple to configure|Doesn't scale to large networks|
|No CPU/bandwidth overhead|Manual — no auto-adapt to failures|
|Predictable, secure (no routing updates to intercept)|Admin must update it manually if topology changes|
|Good for small networks / stub networks / default routes|Tedious to maintain at scale|

---

## 🧠 Quick Recap

- Syntax: `ip route <network> <mask> <next-hop/exit-int>`
- 3 flavors: next-hop / directly-connected / fully-specified (fully-specified = safest)
- `0.0.0.0 0.0.0.0 <next-hop>` = default route = catches everything unmatched
- Default AD = **1** → beats dynamic protocols, loses to connected routes
- Floating static = static route with AD raised above the dynamic protocol's AD, used as backup
- `no` in front of the exact original command removes it

---

## ❓ Self-Test

> [!question]- What's the default administrative distance of a static route? 1

> [!question]- Which type of static route avoids a recursive lookup? Fully specified (exit-interface + next-hop IP together).

> [!question]- What command creates a default route pointing to 203.0.113.1? `ip route 0.0.0.0 0.0.0.0 203.0.113.1`

> [!question]- How do you make a static route act only as a backup to a dynamic route? Configure it as a floating static route by setting its AD higher than the dynamic protocol's AD.

---

## 🔗 Related Notes

- [[CCNA - Routing Fundamentals]]
- [[CCNA - IPv4 Addressing]]
- [[CCNA - Dynamic Routing Protocols (OSPF, EIGRP)]]