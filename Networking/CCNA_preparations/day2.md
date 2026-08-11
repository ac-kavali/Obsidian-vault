## What is a network :
is a digital telecomunication network which allows a nodes to share resources.
or simply a number of devices connected to each other. 


Which cable type reverses all 8 wires end-to-end (pin 1→8, pin 2→7, etc.) and is used strictly for CLI configuration access? A) Crossover B) Straight-through C) Rollover (console) cable

**Full-duplex** means that two devices can **send and receive data at the same time**.
### Examples of network components:


![[network_components.png|898]]


## What is a client 
a device that access a service made available by a server



---
## Cables and interfaces
### Copper

- **10BASE-T & 100BASE-T** → only need **2 pairs / 4 wires** (they're slow enough that half the cable can just sit idle)
- **1000BASE-T & 10GBASE-T** → need **all 4 pairs / 8 wires** (once you cross into Gigabit territory, every wire has to work)

| speed    | common name      | IEEE standard | Informal Name | maximum length |
| -------- | ---------------- | ------------- | ------------- | -------------- |
| 10 Mbps  | Ethernet         | 802.3i        | 10BASE-T      | 100m           |
| 100 Mbps | Fast ethernet    | 802.3u        | 100BASE-T     | 100m           |
| 1 Gbps   | Gigabit ethernet | 802.3ab       | 1000BASE-T    | 100m           |
| 10Gbps   | 10 Gig Ethernet  | 802.3an       | 10GBASE-T     | 100m           |

**The one rule that kills 75% of the table:** every single one of these maxes out at **100 meters**. Doesn't matter if it's 10 Mbps or 10 Gbps — same cable length limit. So just delete that column from your memory entirely and remember "twisted-pair copper always caps at 100m."

**The speed ladder (×10 each rung):**  
10 Mbps → 100 Mbps → 1 Gbps → 10 Gbps

**The common name basically names itself:**

- 10 Mbps → just "Ethernet" (the original, no adjective needed)
- 100 Mbps → "**Fast** Ethernet"
- 1 Gbps → "**Gigabit** Ethernet"
- 10 Gbps → "**10 Gig** Ethernet"

You already know these — the name literally _is_ the speed.

**The informal name is a formula, not a fact:**  
**[speed number] + BASE-T**  
→ 10BASE-T, 100BASE-T, 1000BASE-T, 10GBASE-T

Notice it's the speed in Mbps (10, 100, 1000), except the last one shortens 10,000 down to "10G". So really: _speed-BASE-T, and at gigabit territory it starts abbreviating._

**The only genuinely random part — the IEEE codes — turn into a sentence:**  
The suffixes are **i, u, ab, an**. Make them the first letters of a sentence, in speed order:

> **"I U**pgraded **A B**etter **An**tenna"**

- **I** → 802.3**i** (10 Mbps)
- **U** → 802.3**u** (100 Mbps)
- **AB** → 802.3**ab** (1 Gbps)
- **AN** → 802.3**an** (10 Gbps)

**Putting the whole chain together as one story you replay in your head:**

> "Ethernet started at 10, always **i**n 100m. It got **U**pgraded to Fast Ethernet at 100. Then it got **A B**etter cable and became Gigabit at 1000. Finally it got an **An**tenna upgrade to 10 Gig — and the whole time, nothing ever went past 100 meters."

Once that story is in your head, the table just falls out of it: speed → name writes itself, name → BASE-T writes itself, and "I Upgraded A Better Antenna" hands you the IEEE codes in order

## Straight-throw vs crossover

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
| 10G base-ER   | 802.3ae       | 10Gbps | Single-Mode              | 40 Km             |
Fiber is actually kinder to your memory than copper, because the _letters themselves already tell the story_ — you just have to notice it.
**Step one — the standard number splits into "the odd one" and "the trio":**
- **1000BASE-LX** is alone on **802.3z** (it's the only Gigabit one, so it gets its own code)
- **SR, LR, ER** — all three 10G ones — share **802.3ae**
So the memory hook: _"Z is a solo act (1 Gig). AE is the 10-Gig trio."_ You only need to remember one oddball code (z) and one shared code (ae) for everything else.
**Step two — the letters SR / LR / ER aren't random, they're literally English words in disguise:**
- **S**R = **S**hort Range
- **L**R = **L**ong Range
- **E**R = **E**xtended Range

**Step three — hang real distances on that Short/Long/Extended ladder:**
- **S**hort → **400m** (basically a _sprint_ — short, and only one that needs Multimode fiber)
- **L**ong → **10 Km** (a _long haul_ drive)
- **E**xtended → **30 Km** (_extended_ even past that — 3× the long one)

Notice the cable type follows the same logic: "Short" is the only one cheap/dim enough to still use Multimode. The moment you go "Long" or "Extended," you're committed to Single-mode, because you need a tighter, purer light signal to survive that distance.

**LX is the weird cousin, and weird = memorable on its own:**  
It's the only one that can run on **either** fiber type, so it just gets **both** numbers depending on which cable you feed it:
- Multimode → 550m (short cable, so shorter reach, makes sense)
- Single-mode → 5 Km (better cable, longer reach)

**The one sentence that carries the whole table:**

> "**LX** stands alone on **Z** and can go either way (550m multimode / 5km single-mode). The **SR/LR/ER** trio all share **AE**, and their names literally spell out their range: **S**hort (400m, multimode), **L**ong (10km), **E**xtended (30km) — single-mode once you're going long."


---
### UTP vs Fibre-optic

## UTP
- low cost than fibre-optic.
- shorter maximum distance than fiber-optic(~100m)
- can be vulnerable to EMI(Electromagnetic interference)
- RJ45 ports used with UTP are sheaper than SFP ports
- Emit (leak) a faint signal outside of the cable, which can be copied is a security risk

## Fiber-optic
- Higher cost than utp
- longer maximum distance than utp
- no vulnerablity to emi
- SPF ports are more expensive than RJ45 ports(single-mode is more expensive than multimode).
- Does not emit any signal outisde of the cable