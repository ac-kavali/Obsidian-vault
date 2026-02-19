## 1. Types of IP Addresses

### Classful Addressing

Classful addressing is the original method of organizing IP addresses into fixed classes, where the class of an address is determined by the first few bits of the address.

### CIDR (Classless Inter-Domain Routing)

CIDR replaced classful addressing to allow more flexible allocation of IP address space. Instead of fixed classes, CIDR uses a **prefix length** (e.g., `/24`) to define the network portion of the address, allowing subnets of any size.

---

## 2. IP Address Classes

| Class | Range (First Octet) | Default Mask        | Purpose                 |
| ----- | ------------------- | ------------------- | ----------------------- |
| **A** | 1 – 126             | /8 (255.0.0.0)      | Very large networks     |
| **B** | 128 – 191           | /16 (255.255.0.0)   | Medium-sized networks   |
| **C** | 192 – 223           | /24 (255.255.255.0) | Small networks          |
| **D** | 224 – 239           | N/A                 | Multicast               |
| **E** | 240 – 255           | N/A                 | Reserved / Experimental |

---

## 3. Reserved Addresses

### Network Address

The **first address** of any subnet. It identifies the subnet itself and **cannot be assigned to a host**. All host bits are set to `0`.

> Example: In `192.168.1.0/24`, the network address is `192.168.1.0`

### Broadcast Address

The **last address** of any subnet. It is used to send data to **all hosts** in the subnet and **cannot be assigned to a host**. All host bits are set to `1`.

> Example: In `192.168.1.0/24`, the broadcast address is `192.168.1.255`

---

## 4. Physical vs. Logical Subnetting

||Physical Subnetting|Logical Subnetting|
|---|---|---|
|**Definition**|Dividing a network using physical hardware (routers, switches)|Dividing a network using IP addressing and subnet masks|
|**Layer**|Layer 1 / Layer 2 (Physical/Data Link)|Layer 3 (Network)|
|**Tools**|Routers, switches, VLANs|Subnet masks, CIDR notation|

---

## 5. What is Subnetting?

**Subnetting** is the process of dividing a main network (major network) into smaller sub-networks (subnets) by **modifying the default subnet mask** — specifically by borrowing bits from the **host portion** and adding them to the **network portion**.

```
Original:   [  Network bits  |      Host bits       ]
After sub:  [  Network bits  | Subnet bits | Host bits ]
```

By borrowing host bits:

- We **increase** the number of available networks.
- We **decrease** the number of hosts per network.

---

## 6. How Subnetting Works

When we borrow `n` bits from the host portion:

- **Number of subnets** created = `2^n`
- **Number of usable hosts** per subnet = `2^(remaining host bits) - 2`
    - We subtract 2 to exclude the **network address** and **broadcast address**.

---

## 7. Practice: Subnetting Step-by-Step

### The Magic Table

This table is the key tool for subnetting. It maps bit positions to their subnet mask values.

|A |9 | 10 | 11 |12 |13 | 14 |15 |16 |
|---|---|---|---|---|---|---|---|---|
|B |17 | 18 | 19 | 20 |21 |22 |23 |24 | 
|C |25 |26 | 27 |28 | 29 |30 |31 |32 | 
|Hosts|128 | 64 | 32 |16 |8 | 4 |2 | 1| 
|Sbnet|128 |192| 224| 240| 248| 252| 254| 255|

---

### Worked Example: `170.1.0.0/16` — Divide into 5 Subnets

**Step 1: Find the number of bits to borrow (n)**

Use the formula:

```
2^n - 2 >= number of needed subnets
```

For 5 subnets:

- `2^1 - 2 = 0` ❌
- `2^2 - 2 = 2` ❌
- `2^3 - 2 = 6` ✅

So **n = 3 bits** to borrow.

---

**Step 2: Calculate the new prefix length**

```
Original prefix: /16
Borrowed bits:   + 3
New prefix:      /19
```

---

**Step 3: Look up /19 in the Magic Table**

`170.1.x.x` is a **Class B** address (first octet 128–191).

In the Class B row, find **Bit 19**:

- **Hosts per subnet** = `32`
- **Subnet mask value** = `224`

New subnet mask: `255.255.224.0`

---

**Step 4: Determine the number of hosts per subnet**

From the table, under column 19 in the hosts row: **32 hosts per subnet**.

Usable hosts = `32 - 2 = 30` (excluding network and broadcast addresses).

---

**Step 5: List all subnet ranges**

The **block size** (increment) is 32. Starting from `170.1.0.0`, we add 32 each time.

We stop when we reach the subnet mask boundary `170.1.224.0` (the 7th subnet, which is the upper boundary — this is `3 × 64 = 192`… continuing to 224).

|Subnet #|Network Address|First Host|Last Host|Broadcast|
|---|---|---|---|---|
|1|170.1.0.0|170.1.0.1|170.1.31.254|170.1.31.255|
|2|170.1.32.0|170.1.32.1|170.1.63.254|170.1.63.255|
|3|170.1.64.0|170.1.64.1|170.1.95.254|170.1.95.255|
|4|170.1.96.0|170.1.96.1|170.1.127.254|170.1.127.255|
|5|170.1.128.0|170.1.128.1|170.1.159.254|170.1.159.255|
|6|170.1.160.0|170.1.160.1|170.1.191.254|170.1.191.255|
|~~7~~|~~170.1.192.0~~|—|—|—|

> We have **6 valid subnets** available (2^3 - 2 = 6), using subnets 1 through 5 for our requirement.

---

**Step 6: Identify network address, first host, last host, and broadcast**

For each subnet with block size **32**:

|Component|Formula|Example (Subnet 1)|
|---|---|---|
|Network Address|First address of the block|`170.1.0.0`|
|First Valid Host|Network Address + 1|`170.1.0.1`|
|Last Valid Host|Broadcast Address - 1|`170.1.31.254`|
|Broadcast Address|Next block - 1|`170.1.31.255`|

---

## 8. Summary

|Concept|Value|
|---|---|
|Original Network|`170.1.0.0/16`|
|Required Subnets|5|
|Bits Borrowed (n)|3|
|New Prefix|/19|
|New Subnet Mask|`255.255.224.0`|
|Block Size|32|
|Valid Subnets Created|6|
|Usable Hosts per Subnet|30|

**Key Formulas:**

```
Number of subnets  = 2^n - 2   (where n = bits borrowed)
Number of hosts    = 2^h - 2   (where h = remaining host bits)
Block size         = 256 - subnet mask value in the changing octet
```

---

_End of Subnetting Documentation_