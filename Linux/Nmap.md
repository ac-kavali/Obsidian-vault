
**_Network Mapper_**
## Table Of Contents
- [[#What is Nmap?|What is Nmap?]]
- [[#What Nmap Can Do|What Nmap Can Do]]
- [[#How Nmap Works|How Nmap Works]]
- [[#Port States|Port States]]
- [[#Basic Syntax|Basic Syntax]]
- [[#Core Commands|Core Commands]]
- [[#Target Specification|Target Specification]]
- [[#Scan Types Cheat Sheet|Scan Types Cheat Sheet]]
- [[#Output Saving|Output Saving]]
- [[#Most used Combos:|Most used Combos:]]
- [[#Nmap & ICMP|Nmap & ICMP]]
---
## What is Nmap?

Nmap (Network Mapper) is a **free, open-source tool** used to scan networks and discover:

>[!tip]  **What is the core questions that Nmap answers**
>- Which **system** are **up**?
>- What **services** are <span style="color:rgb(6, 178, 8)">running</span> on these systems?

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

Scans all **256 hosts** on the subnet. <span style="color:rgb(0, 176, 80)">/24</span>

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
“Don’t check if the host is alive — just assume it is and scan it anyway.”,Because Nmpa ping first, bofore scaning and in case the target network blocks ping (ICMP) and Drops probe packets, <span style="color:rgb(112, 48, 160)">Nmap</span> will says : Host is down but,  You _know_ the host is alive
You already confirmed:
- via browser
- via SSH
- via another scan
---
### Timing (speed vs stealth)

```sh
nmap -T0 → very slow (stealth)
nmap -T5 → very fast (noisy)
```
Real talk:
- CTF → `-T4` or `-T5`
- Real pentest → `-T2` or `-T3`
- 
**Combo**:
```sh
nmap -A -T4 <TARGET>
```

---
## Target Specification

- **<span style="color:rgb(0, 176, 80)">you can list all targets in one command:</span>**
 ```sh
 nmap 192.164.1.1 192.164.0.2 192.168.0.3
 ```
- **<span style="color:rgb(0, 176, 80)">or scan an astros \* to scan full bloc of ip addresses:</span>**
 ```sh
nmap 192.168.1.* 
 ```
 - **<span style="color:rgb(0, 176, 80)">or scan a few specific devices</span>**
```sh
nmap 192.168.1.0,1,2,3,4
```
- **<span style="color:rgb(0, 176, 80)">or also as a file</span>** 
```sh
nmap -iL list_of_hosts.txt
```

---

## Scan Types Cheat Sheet

| Flag  | Scan Type    | How it works                    |
| ----- | ------------ | ------------------------------- |
| `-A`  | Agressive    | Scan Everything                 |
| `-sT` | TCP Connect  | Full 3-way handshake            |
| `-sS` | SYN Stealth  | Half-open, sends SYN only       |
| `-sU` | UDP Scan     | Scans UDP ports                 |
| `-sn` | Ping Scan    | Check who's alive, no port scan |
| `-sV` | Version      | Detect Service version          |
| `-O`  | OS           | Detect OS                       |
| `-Pn` | No Discovery | Skip Hosts Discovery            |
| `-T`  | Speed up     | 1 For stealth, 4< for speed     |
| `-sL` | Listing      | Only taListing no scan          |
| `-PR` | ARP          | ARP ping                        |

---
## Output Saving
```sh
nmap -oN scan.txt TARGET     # normal
nmap -oG scan.grep TARGET    # grepable
nmap -oX scan.xml TARGET     # XML
```

---
## Most used Combos:

```sh
# 1. Find live hosts
nmap -sn 10.10.10.0/24

# 2. Scan ports
nmap -sS -p- 10.10.10.5

# 3. Enumerate services
nmap -sV -p 22,80 10.10.10.5

# 4. Deep scan
nmap -A 10.10.10.5
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