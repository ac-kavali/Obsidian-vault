## Table Of Contents:
- [[#Ping|Ping]]
- [[#Netstat|Netstat]]
- [[#SS|SS]]
- [[#nslookup|nslookup]]
- [[#traceroot|traceroot]]
---
## Ping 
Ping is a network tool used to check if another device is reachable and how long it takes for data to travel to it and back.
- Ping uses the **ICMP** protocol

**Professionnal Use**
```sh
ping -c 1 -W 1 10.11.0.132 
```
`-c` count of signals to send.
`-W` Time deadline perpacket.

Don't assume a host is down just because `ping` fails — ICMP is commonly blocked by firewalls, making the host appear unreachable when it's actually live. This is why tools like **nmap** offer the `-Pn` flag, which skips the ping check entirely and proceeds straight to port scanning, often revealing hosts that would otherwise seem offline.

---
## Netstat
is a network command that show with details your network connectivity and activities. todya the *ss* more replaced it 
```sh
netstat 
```

| Flag | Description                 |
| ---- | --------------------------- |
| `-t` | TCP connections             |
| `-u` | UDP connections             |
| `-l` | Listening ports only        |
| `-n` | No DNS resolution (raw IPs) |
| `-p` | Show PID / process name     |
| `-a` | All connections + listening |
| `-r` | Routing table               |
| `-s` | Protocol statistics         |
| `-e` | Extended info               |
| `-c` | Continuous output (refresh) |

---
## SS
`ss` (Socket Statistics) is a Linux utility used to dump and filter socket information. It is the modern replacement for the deprecated netstat command, offering faster performance by reading directly from kernel space via **Netlink sockets** rather than parsing `/proc/net/tcp`.

```sh
ss
```
Running `ss` with no arguments displays all non-listening sockets (established, time-wait, close-wait, etc.).

| Flag | Long Form     | Description                                  |
| ---- | ------------- | -------------------------------------------- |
| `-a` | `--all`       | Show all sockets (listening and established) |
| `-l` | `--listening` | Show only listening sockets                  |
| `-n` | `--numeric`   | Do not resolve hostname or service name      |
| `-p` | `--processes` | Show process (PID and name) using each socket|
| `-e` | `--extended` | Show detailed socket information (timers, uid, etc.) |
| `-s` | `--summary` | Print summary statistics |
| `-t` |-| TCP |
| `-u` |-| UDP|

i use this all the time : 
```sh
ss -tunpl | grep ssh
```
or any service you want to check its socket informations.

---
## nslookup
 is a tool used to query DNS servers to get information about domain names and IP addresses.
 **Basic DNS lookup**
 ```sh
 nslookup google.com
 ```
 You'll get: 
 - IP address of the domain
 - DNS server used

**Reverse dns lookup**
```sh
nslookup 8.8.8.8
```
This asks: 
- What domain name associated with this ip address.

**Query a specific dns server**
```sh
nslookup google.com 8.8.8.8
```
Instead of quering your default resolver you can specify a dns server.



## traceroot
a network diagnostic tool used to track the real-time path that data packets take from a source machine to a destination.
_example_:
```
traceroot www.google.com
```

