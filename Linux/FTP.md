##  Before You Start — Why FTP Is a Bad Idea

- **Most systems don't need to act as FTP servers.** If SSH is already running, SFTP is available for free — no extra daemon needed.
- **FTP is insecure by design.** Credentials, commands, and file data all travel in plain text. Anyone on the network can sniff your username, password, and every byte transferred.
- **Keeping it installed increases attack surface.** Every running daemon and open port is a potential entry point. If FTP isn't strictly required, don't install it.

---
## 1. Server Setup — vsftpd

### Install the daemon

```bash
# Debian / Ubuntu
sudo apt install vsftpd -y
```

### Configure `/etc/vsftpd.conf`

```/etc/vsftpd.conf
# ── Basics ──────────────────────────────────────────
listen=YES
# ── Authentication ───────────────────────────────────
anonymous_enable=NO       # ALWAYS disable anonymous access
local_enable=YES          # allow local system users
write_enable=YES          # allow uploads (NO for read-only)
```
- **Always disable anonymous login because it give anyone to login without user and passwd just typing**
```json
user: anonymous
passwd: anonymous
```
and he will get access.


### Expose a directory to clients

vsftpd maps each local user to their home directory. The cleanest pattern is a dedicated FTP user with a restricted home:

```bash
# Create the user (no shell login)!!! for security
sudo useradd -m -d /srv/ftp/ftpuser -s /usr/sbin/nologin ftpuser
sudo passwd ftpuser

```

### Enable and restart

```bash
sudo systemctl enable vsftpd
sudo systemctl restart vsftpd
sudo systemctl status vsftpd
```

---

## 2. Client Side — Connecting & Commands

### Default credentials
Start with `ftp` comman

### Connect

```bash
ftp 192.168.1.10
```

### FTP Command Reference

| Command         | Description                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `ftp hostname`  | Connect to an FTP server. You'll be prompted for username and password.                                                        |
| `get file`      | Download a single file from the remote server to your current local directory.                                                 |
| `put file`      | Upload a single local file to the current remote directory.                                                                    |
| `mget *.txt`    | Download multiple files matching a glob pattern. Prompts before each file unless `prompt` is off.                              |
| `mput *.txt`    | Upload multiple local files matching a glob pattern. Same prompt behavior as `mget`.                                           |
| `lcd /path`     | **Local** change directory — where files land on _your_ machine.                                                               |
| `cd /path`      | **Remote** change directory — navigate the server's directory tree.                                                            |
| `!ls`           | List contents of the current remote directory.                                                                                 |
| `binary`        | Switch to binary transfer mode. **Always use this** for non-text files (images, archives, executables). Transfers bytes as-is. |
| `ascii`         | Switch to ASCII transfer mode. Translates line endings (`CRLF` ↔ `LF`). Use for plain text only — **corrupts binary data**.    |
| `passive`       | Toggle passive mode. The client initiates both connections — use when the client is behind a NAT or firewall.                  |
| `prompt`        | Toggle per-file confirmation for `mget`/`mput`. Turn off to transfer all matched files without interruption.                   |
| `bye` or `quit` | Close the connection and exit. Both do the same thing.                                                                         |

### Quick session example

```
ftp 192.168.1.10
# Connected to 192.168.1.10.
# Name: ftpuser
# Password: ••••••••

ftp> binary          # always switch to binary first
ftp> passive         # enable if behind NAT
ftp> ls
ftp> cd files
ftp> lcd ~/Downloads
ftp> prompt          # turn off per-file confirmation
ftp> mget *.csv
ftp> bye
```

---

## 3. FTP vs SFTP
 
|Property|FTP|SFTP|
|---|---|---|
|Encryption|✗ None — plain text|✓ Full AES encryption via SSH|
|Credentials|✗ Visible on the wire|✓ Protected inside SSH tunnel|
|Data in transit|✗ Sniffable by anyone|✓ Encrypted end-to-end|
|Ports|21 (control) + dynamic data ports|22 only|
|Extra daemon|Required (vsftpd, etc.)|✓ Built on SSH — nothing to install|
|Firewall|✗ Needs passive port range open|✓ Single port, firewall-friendly|
|Auth options|Password only|Password or SSH key pairs|
|Resume transfers|Partial|✓ Native support|

**Bottom line:** SFTP gives you everything FTP does — listing, upload, download, navigation — plus encryption, key auth, and a single port. There is no practical reason to run plain FTP over a network you don't fully control.

---
## 5. Setting Up SFTP on the Server (Short Version)

If OpenSSH is installed, you're almost done. The only thing to configure is a chroot jail — restricting SFTP users to a specific directory without giving them shell access.

```bash
# Create the SFTP group and a dedicated user
sudo groupadd sftpusers
sudo useradd -m -G sftpusers -s /usr/sbin/nologin sftpuser
sudo passwd sftpuser

# Root must own the chroot jail
sudo chown root:root /home/sftpuser
sudo chmod 755 /home/sftpuser

# Create a writable upload directory
sudo mkdir /home/sftpuser/files
sudo chown sftpuser:sftpuser /home/sftpuser/files
```
- The mini jail directory must owned by the root, or the ssh will refuse login


Append to `/etc/ssh/sshd_config`:

```
Match Group sftpusers
    ChrootDirectory        %h
    ForceCommand           internal-sftp
    AllowTcpForwarding     no
    X11Forwarding          no
```

Apply and reload:

```bash
sudo sshd -t            # test for syntax errors first
sudo systemctl restart sshd
```

Users in `sftpusers` can now connect via SFTP, are jailed to their home directory, and cannot open a shell session. SSH key auth works out of the box — add their public key to `~/.ssh/authorized_keys` as usual.



---
## 4. Using SFTP as a Client

If the remote machine runs SSH (port 22, sshd running), SFTP is already available — nothing to install on the server.

```bash
# Password auth
sftp ftpuser@192.168.1.10

# SSH key auth
sftp -i ~/.ssh/id_ed25519 ftpuser@192.168.1.10

# Non-standard SSH port
sftp -P 2222 ftpuser@192.168.1.10
```

Once connected, the prompt works similarly to FTP:

```
sftp> ls              # list remote
sftp> lls             # list local (prefix l = local)
sftp> cd /remote/path
sftp> lcd ~/local/path
sftp> get report.pdf
sftp> put data.csv
sftp> get -r ./docs   # recursive download
sftp> bye
```

> **No binary/ascii modes.** SFTP always transfers bytes as-is. This is the correct default for every file type.

---

