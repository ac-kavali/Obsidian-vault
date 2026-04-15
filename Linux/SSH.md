- [[#Overview|Overview]]
- [[#How SSH Works|How SSH Works]]
- [[#SSH Passwordless Key Pair Authentication|SSH Passwordless Key Pair Authentication]]
- [[#SSH Config File|SSH Config File]]
- [[#Common SSH Commands|Common SSH Commands]]
- [[#Securing SSH (Server Hardening)|Securing SSH (Server Hardening)]]
- [[#Summary|Summary]]

## Overview

SSH (Secure Shell) is a cryptographic network protocol designed in **1995** by Tatu Ylönen, providing secure remote access, command execution, and data communication between computers. It replaces insecure protocols like **Telnet**, **rsh**, and **rlogin** by ensuring:
- **Confidentiality** — Traffic is encrypted end-to-end
- **Integrity** — Data cannot be tampered with in transit
- **Authentication** — Both server and client are verified before any data is exchanged

SSH operates on **port 22** by default and uses a client–server model.

---

## How SSH Works

SSH establishes a secure channel over an unsecured network through a multi-step handshake:

1. **TCP Connection** — Client initiates a TCP connection to the server on port 22
2. **Protocol Negotiation** — Both sides agree on the SSH version (SSH-2 is standard)
3. **Key Exchange** — An algorithm (e.g. Diffie-Hellman) generates a shared session key
4. **Server Authentication** — The server proves its identity using its host key
5. **User Authentication** — The client authenticates via password or key pair
6. **Encrypted Session** — All subsequent communication is encrypted

---

## SSH Passwordless Key Pair Authentication

Instead of using a password at login, SSH can authenticate users via an **asymmetric key pair** — a much more secure and convenient method.

### Key Concepts

|Term|Description|
|---|---|
|**Private Key**|Kept secret on the client machine. Never shared.|
|**Public Key**|Placed on the remote server. Safe to share.|
|**Key Pair**|The private and public keys are mathematically linked.|
|**~/.ssh/authorized_keys**|File on the server that stores trusted public keys.|

### Step 1 — Generate a Key Pair (on the client)

```bash
ssh-keygen<span style="color:rgb(112, 48, 160)"> -t ed</span>25519 -C "your_email@example.com"
```

You will be prompted:

```
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
```

> **Key types:** `ed25519` is recommended (modern, fast, secure). Use `rsa -b 4096` for broader compatibility.

This creates two files:

```
~/.ssh/id_ed25519       ← Private key (keep this secret)
~/.ssh/id_ed25519.pub   ← Public key (copy this to the server)
```

---

### Step 2 — Copy the Public Key to the Server

**Method A — Using `ssh-copy-id` (recommended):**

```bash
ssh-copy-id user@remote_host
```

**Method B — Manual copy:**

```bash
cat ~/.ssh/id_ed25519.pub | ssh user@remote_host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**Method C — If you already have file access on the server:**

```bash
# On the server
echo "your_public_key_content" >> ~/.ssh/authorized_keys
```

---

### Step 3 — Set Correct Permissions (on the server)

SSH is strict about file permissions. Incorrect permissions will cause authentication to fail silently.

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

### Step 4 — Connect Without a Password

```bash
ssh user@remote_host
```

If a passphrase was set on the key, you will be prompted for it once — not for the remote password.

---

### Step 5 — (Optional) Use SSH Agent to Avoid Repeated Passphrase Entry

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

The agent holds your decrypted key in memory for the session.

---

## SSH Config File

For convenience, define connection shortcuts in `~/.ssh/config`:

```
Host myserver
    HostName 192.168.1.100
    User john
    IdentityFile ~/.ssh/id_ed25519
    Port 22
```

Connect using:

```bash
ssh myserver
```

---

## Common SSH Commands

|Command|Description|
|---|---|
|`ssh user@host`|Open a remote shell|
|`ssh -p 2222 user@host`|Connect on a custom port|
|`scp file.txt user@host:/path/`|Securely copy a file to a remote host|
|`scp user@host:/path/file.txt .`|Copy a file from a remote host|
|`rsync -avz -e ssh src/ user@host:/dst/`|Sync files over SSH|
|`ssh -L 8080:localhost:80 user@host`|Local port forwarding (tunnel)|
|`ssh -R 9090:localhost:3000 user@host`|Remote port forwarding|
|`ssh -D 1080 user@host`|Dynamic SOCKS proxy|

---

## Securing SSH (Server Hardening)

Edit `/etc/ssh/sshd_config` and apply the following best practices:

```bash
# Disable root login
PermitRootLogin no

# Disable password authentication (key pairs only)
PasswordAuthentication no

# Allow only specific users
AllowUsers alice bob

# Change default port (obscurity, not security)
Port 2222

# Disable empty passwords
PermitEmptyPasswords no

# Limit authentication attempts
MaxAuthTries 3

# Disable legacy protocol
Protocol 2
```

Restart the SSH service after changes:

```bash
sudo systemctl restart sshd
```

---

## SSH Tunneling

SSH can forward ports to access services securely through firewalls.

### Local Forwarding

Forward a local port to a remote service:

```bash
ssh -L 5432:localhost:5432 user@remote_host
# Access remote PostgreSQL locally via localhost:5432
```

### Remote Forwarding

Expose a local service to the remote machine:

```bash
ssh -R 8080:localhost:3000 user@remote_host
```

### Dynamic Forwarding (SOCKS Proxy)

Route traffic through the remote server:

```bash
ssh -D 1080 user@remote_host
```

---

## Troubleshooting

|Problem|Likely Cause|Fix|
|---|---|---|
|`Permission denied (publickey)`|Wrong key or missing authorized_keys|Check key path and permissions|
|`Host key verification failed`|Server fingerprint changed|Remove old entry: `ssh-keygen -R hostname`|
|`Connection refused`|SSH not running or wrong port|Check `sshd` status and firewall|
|`Too many authentication failures`|ssh-agent offering too many keys|Use `ssh -o IdentitiesOnly=yes -i keyfile`|
|Key ignored by server|Bad file permissions on `.ssh/`|`chmod 700 ~/.ssh && chmod 600 authorized_keys`|

---

## Key Algorithms Comparison

|Algorithm|Recommended|Notes|
|---|---|---|
|`ed25519`|✅ Yes|Modern, fast, compact, most secure|
|`ecdsa`|⚠️ Conditional|Good, but some implementation concerns|
|`rsa` (4096-bit)|✅ Compatible|Wide support; use 4096-bit minimum|
|`dsa`|❌ No|Deprecated, insecure, avoid|

---

## Summary

```
Client                         Server
  │                               │
  │──── TCP SYN ────────────────► │
  │◄─── TCP SYN-ACK ─────────────│
  │                               │
  │──── Key Exchange ───────────► │
  │◄─── Server Host Key ─────────│
  │                               │
  │──── Public Key Auth ────────► │
  │◄─── Auth Success ────────────│
  │                               │
  │══════ Encrypted Session ══════│
```

SSH key pair authentication eliminates password exposure over the network, resists brute-force attacks, and enables automation without storing plaintext credentials.