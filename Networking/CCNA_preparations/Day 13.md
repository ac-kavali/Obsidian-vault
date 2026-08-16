All you need in **Subnetting you find it in** : [[Networking/Subnetting|Subnetting]]
# Subnetting with VLSM

> [!info] What is VLSM? **Variable Length Subnet Masking** = subnetting a network into pieces of **different sizes**, instead of chopping it into equal-sized chunks. You give each subnet exactly as many host addresses as it needs — no more, no less. This avoids wasting IP space.

---

## 1️ Prerequisites — Binary & CIDR Basics

### IPv4 Address Structure

- 32 bits total, written as 4 **octets** (8 bits each), separated by dots.
- Each octet = 0–255 in decimal.

### CIDR Notation

`/n` = number of bits used for the **network portion**. The rest are **host bits**.

| CIDR | Subnet Mask     | Host bits | Usable hosts                 |
| ---- | --------------- | --------- | ---------------------------- |
| /24  | 255.255.255.0   | 8         | 254                          |
| /25  | 255.255.255.128 | 7         | 126                          |
| /26  | 255.255.255.192 | 6         | 62                           |
| /27  | 255.255.255.224 | 5         | 30                           |
| /28  | 255.255.255.240 | 4         | 14                           |
| /29  | 255.255.255.248 | 3         | 6                            |
| /30  | 255.255.255.252 | 2         | 2                            |
| /31  | 255.255.255.254 | 1         | 0 (point-to-point, RFC 3021) |
| /32  | 255.255.255.255 | 0         | 1 (host route)               |

> [!tip] Memorize the Magic Numbers The subnet mask octet values: **128, 192, 224, 240, 248, 252, 254, 255** Each is the previous one + half the remaining distance to 256. Burn this into memory — it's the backbone of fast subnetting.

### The Host Formula

```
Usable hosts = 2^(host bits) − 2
```

The "−2" removes the **network address** (all host bits = 0) and the **broadcast address** (all host bits = 1).

### The Subnet Formula

```
Number of subnets created = 2^(borrowed bits)
```

"Borrowed bits" = bits taken from the host portion to extend the network portion.

---

## 2️ The Core Shortcut: Block Size

> [!tip] THE most important shortcut in subnetting **Block size = 256 − (last non-zero octet value of the subnet mask)**

|Mask|Block Size|
|---|---|
|.128|256 − 128 = 128|
|.192|256 − 192 = 64|
|.224|256 − 224 = 32|
|.240|256 − 240 = 16|
|.248|256 − 248 = 8|
|.252|256 − 252 = 4|
|.254|256 − 254 = 2|

Every subnet under that mask starts on a **multiple of the block size**.

> [!example] Quick Example `/27` → mask `.224` → block size `32` Subnets: `.0, .32, .64, .96, .128, .160, .192, .224` — just keep adding 32.

This single trick lets you find network addresses, broadcast addresses, and ranges **without long binary math**.

---

## 3️ Finding Network / Broadcast / Usable Range (Fast Method)

Given an IP + mask, e.g. `172.16.20.100 /27`:

1. **Identify the "interesting octet"** — the octet where the mask isn't 0 or 255. Here it's the 4th octet (`.224`).
2. **Find block size**: `256 − 224 = 32`
3. **List multiples of the block size** until you pass the given IP: `0, 32, 64, 96(✔ ≤100), 128`
4. **Network address** = the multiple just below/equal → `172.16.20.96`
5. **Broadcast address** = next multiple − 1 → `172.16.20.127`
6. **Usable range** = network+1 to broadcast−1 → `172.16.20.97 – 172.16.20.126`

> [!question]- Practice: 192.168.10.75 /28 — network, broadcast, usable range? Mask .240 → block size 16 → multiples: 0,16,32,48,64,**80**... Wait — 75 falls between 64 and 80, so:
> 
> - Network: `192.168.10.64`
> - Broadcast: `192.168.10.79`
> - Usable: `192.168.10.65 – 192.168.10.78`

---

## 4️ VLSM — The Actual Process

Regular subnetting = all subnets same size (wasteful). **VLSM = size each subnet to fit its actual need**, then arrange them so they don't overlap.

### Step-by-Step Method

1. **List all required subnets and their host counts**, sorted **largest to smallest**.
2. For each one, find the **smallest mask that fits** using `2^h − 2 ≥ needed hosts`.
3. **Allocate from the top**, largest subnet first, starting at the beginning of your address block.
4. Each next subnet starts **immediately after** the previous one's range ends (i.e., right after its broadcast address).
5. Repeat until every requirement is placed.

> [!warning] Why largest-first matters If you allocate small subnets first, you can accidentally misalign larger ones later (they must start on a boundary matching their own block size). Going largest → smallest avoids this problem entirely.

---

## 5️ Worked VLSM Example

**Given:** `192.168.1.0/24` to divide among:

- LAN A — needs 100 hosts
- LAN B — needs 50 hosts
- LAN C — needs 20 hosts
- WAN link (router-to-router) — needs 2 hosts

### Step 1 — Find required mask per subnet

|Subnet|Hosts needed|Formula check|Mask needed|
|---|---|---|---|
|LAN A|100|2^7−2=126 ≥ 100|/25 (126 hosts)|
|LAN B|50|2^6−2=62 ≥ 50|/26 (62 hosts)|
|LAN C|20|2^5−2=30 ≥ 20|/27 (30 hosts)|
|WAN|2|2^2−2=2 ≥ 2|/30 (2 hosts)|

### Step 2 — Allocate, largest to smallest

|Subnet|Network|Mask|Broadcast|Usable Range|
|---|---|---|---|---|
|LAN A|192.168.1.0|/25|192.168.1.127|.1 – .126|
|LAN B|192.168.1.128|/26|192.168.1.191|.129 – .190|
|LAN C|192.168.1.192|/27|192.168.1.223|.193 – .222|
|WAN|192.168.1.224|/30|192.168.1.227|.225 – .226|

> [!tip] Notice the pattern Each subnet's network address = previous subnet's broadcast address **+ 1**. That's the whole trick — no overlaps, no gaps (unless you leave room intentionally for growth).

Remaining space after `.228` (`.228–.255`) is still free for future subnets.

---

## 6️ Common Pitfalls

> [!danger] Watch out for these
> 
> - **Forgetting the −2** (network + broadcast aren't usable) — except on /31 (point-to-point, both usable) and /32 (single host).
> - **Not sorting largest→smallest** before allocating — causes misaligned/overlapping subnets.
> - **Off-by-one on ranges** — broadcast is (next network − 1), not the same as the next network address.
> - **Confusing "hosts needed" with "hosts formula subnet size"** — always round UP to the next valid mask, never down.
> - **Mixing up /31 rule** — normally /31 gives 0 usable hosts by the formula, but RFC 3021 allows /31 specifically for point-to-point WAN links (both addresses usable, no network/broadcast).

---

## 7️ Speed Practice Routine (Jeremy-style habit)

1. Pick a random IP + CIDR.
2. In under 10 seconds, state: network address, broadcast address, and usable range.
3. Use only the **block size trick** — no long binary conversion.
4. Repeat with VLSM: give yourself 3–4 host requirements and subnet a /24 by hand.

---

## 🧠 Quick Recap

- **Block size = 256 − mask octet value** → the key to fast subnetting.
- Usable hosts = `2^(host bits) − 2`; Subnets created = `2^(borrowed bits)`.
- VLSM = variable-sized subnets to match actual host requirements (no wasted addresses).
- Process: list requirements → sort largest to smallest → find minimum mask per subnet → allocate sequentially, each new subnet starting right after the previous broadcast address.
- /31 is a special case for point-to-point links (both addresses usable).

---

## Self-Test

> [!question]- What mask do you need for a subnet requiring 27 hosts? /27 gives 30 usable hosts (2^5−2=30 ≥ 27) → smallest mask that fits.

> [!question]- Block size for a /29 network? Mask = .248 → 256−248 = 8

> [!question]- Why allocate largest subnets first in VLSM? To keep subnet boundaries aligned correctly; allocating small ones first can misalign larger subnets later and cause overlaps.

> [!question]- Network and broadcast for 10.0.0.50 /26? Block size 64 → multiples 0,64... 50 is between 0 and 64 → Network: 10.0.0.0, Broadcast: 10.0.0.63

---

## Related Notes

- [[CCNA - IPv4 Addressing]]
- [[CCNA - Routing Fundamentals]]
- [[CCNA - Static Routing]]