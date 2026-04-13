- [ ] cc : cubic capacity 
- [ ] FWD : Forwared-Wheel Drive
- [ ] RWD : Rear-Wheel Drive


#  Nmap — Network Mapper

**Related:** [[ICMP & Ping]]

---

## What is Nmap?

Nmap (Network Mapper) is a **free, open-source tool** used to scan networks and discover:

- Which **devices/hosts** are online
- Which **ports** are open
- What **services** are running
- What **OS** a target is using

> [!tip] Think of it as... A **flashlight for your network** — it reveals what's running and where.

---
## What Nmap Can Do

| Capability                 | Description                            |
| -------------------------- | -------------------------------------- |
| **Host Discovery**         | Find which devices are online          |
| **Port Scanning**          | Find which ports are open              |
| **Service Detection**      | Identify software running on each port |
| **OS Detection**           | Guess the operating system of a target |
| **Vulnerability Scanning** | Find weaknesses using scripts (NSE)    |

---
## How Nmap Works

Nmap sends **specially crafted packets** to a target and reads the **response** to determine port/host status.

```
Nmap ──── packet ────► Target Port
Nmap ◄─── response ──  Target Port
```

Before scanning ports, Nmap sends an **ICMP Echo Request** (ping) to check if the host is alive first.

---
## Port States

| State        | Meaning                                     |
| ------------ | ------------------------------------------- |
| **Open**     | A service is actively listening             |
| **Closed**   | Port is reachable, but nothing is listening |
| **Filtered** | A firewall is blocking the packets          |

---
## Basic Syntax

```bash
nmap [options] [target]
```

- `target` = IP address, hostname, or IP range

---

## Core Commands

### Scan a single host

```bash
nmap 192.168.1.1
```

Scans the **1000 most common ports** by default.

---

### Scan an entire network

```bash
nmap 192.168.1.0/24
```

Scans all **256 hosts** on the subnet.

---

### Scan specific ports

```bash
nmap -p 22,80,443 192.168.1.1
```

---

### Scan ALL ports

```bash
nmap -p- 192.168.1.1
```

Scans all **65,535 ports**.

---

### Detect service versions

```bash
nmap -sV 192.168.1.1
```

Example output: `Apache 2.4`, `OpenSSH 8.1`

---

### Detect the OS

```bash
nmap -O 192.168.1.1
```

---

### Full aggressive scan _(most popular)_

```bash
nmap -A 192.168.1.1
```

Runs: OS detection + service detection + traceroute + scripts.

---

### Stealth scan

```bash
nmap -sS 192.168.1.1
```

Sends **SYN only** (half-open) — doesn't complete TCP handshake, harder to detect/log.

---
### Skip host discovery
```sh
nmap -Pn <target>
```
“Don’t check if the host is alive — just assume it is and scan it anyway.”

---

## Scan Types Cheat Sheet

|Flag|Scan Type|How it works|
|---|---|---|
|`-sT`|TCP Connect|Full 3-way handshake|
|`-sS`|SYN Stealth|Half-open, sends SYN only|
|`-sU`|UDP Scan|Scans UDP ports|
|`-sn`|Ping Scan|Check who's alive, no port scan|

---

## Flags Quick Reference

```
-p       →  specify ports  (e.g. -p 80,443 or -p-)
-sV      →  detect service versions
-O       →  detect OS
-A       →  aggressive (everything at once)
-sS      →  stealth SYN scan
-sn      →  ping scan only (no port scan)
/24      →  scan full subnet (256 hosts)
```

---

## Nmap & ICMP

> [!info] Connection to ICMP Before port scanning, Nmap uses **ICMP Echo Request** (same as `ping`) to check if a host is alive.  
> If the host doesn't respond → Nmap may skip it.

```
Nmap ──── ICMP Echo Request ────► Is host alive?
              YES → start port scan
              NO  → skip host
```