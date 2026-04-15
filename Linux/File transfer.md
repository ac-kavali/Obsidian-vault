
> A practical introduction to copying and moving files between systems over a network using the Linux command line.

## Table of Contents
- [[#What Is Linux File Transfer?|What Is Linux File Transfer?]]
- [[#Supported Protocols|Supported Protocols]]
- [[#Common Tools & Commands|Common Tools & Commands]]
- [[#Common Tools & Commands#`scp` – Secure Copy|`scp` – Secure Copy]]
- [[#Common Tools & Commands#`rsync` – Remote Sync|`rsync` – Remote Sync]]
- [[#Common Tools & Commands#`wget` – Web Get|`wget` – Web Get]]
- [[#Common Tools & Commands#`ftp` – File Transfer Protocol|`ftp` – File Transfer Protocol]]
- [[#Common Tools & Commands#SMB|SMB]]
- [[#Quick Reference Table|Quick Reference Table]]
- [[#Free Learning Resources|Free Learning Resources]]

---

## What Is Linux File Transfer?

Linux file transfer refers to the process of **copying or moving files between two systems** — typically over a network. Whether you're uploading a config file to a remote server, downloading a package from the web, or syncing a local folder with a backup machine, Linux provides powerful command-line tools to handle all of these tasks.

These tools are:

- **Fast** — optimized for large files and directories
- **Secure** — many use encryption (e.g., SSH-based protocols)
- **Scriptable** — easy to automate in shell scripts and cron jobs

---

## Supported Protocols

Linux file transfer tools support several standard network protocols:

| Protocol       | Full Name                   | Description                                   |
| -------------- | --------------------------- | --------------------------------------------- |
| **FTP**        | File Transfer Protocol      | Basic, unencrypted file transfer (legacy use) |
| **HTTP/HTTPS** | HyperText Transfer Protocol | Download files from web servers               |
| **SCP**        | Secure Copy Protocol        | Encrypted file copy over SSH                  |
| **SFTP**       | SSH File Transfer Protocol  | Interactive encrypted file transfer over SSH  |
| **NFS**        | Network File System         | Mount and access remote filesystems locally   |

> ⚠️ **Note:** Avoid plain FTP when possible — it transmits data (including passwords) in plaintext. Prefer SCP or SFTP for secure transfers.

---

## Common Tools & Commands

### `scp` – Secure Copy

`scp` copies files between a local machine and a remote server (or between two remote servers) using the SSH protocol. It's simple and secure.

**Basic syntax:**

```bash
scp [options] source destination
```

**Copy a local file to a remote server:**

```bash
scp /local/file username@remote:/destination
```

**Copy a file from a remote server to your local machine:**

```bash
scp username@remote:/path/to/file /local/destination
```

**Copy an entire directory (use `-r` for recursive):**

```bash
scp -r /local/folder username@remote:/destination
```

---

### `rsync` – Remote Sync

`rsync` is a powerful tool for syncing files and directories. It only transfers the **differences** between source and destination, making it much faster than `scp` for repeated syncs.

**Basic syntax:**

```bash
rsync [options] source destination
```

**Sync a local folder to a remote server:**

```bash
rsync -avz /local/folder/ username@remote:/destination/
```

**Common flags:**

|Flag|Meaning|
|---|---|
|`-a`|Archive mode (preserves permissions, timestamps, etc.)|
|`-v`|Verbose output|
|`-z`|Compress data during transfer|
|`--delete`|Delete files on destination that no longer exist on source|
|`-n` or `--dry-run`|Simulate the transfer without making changes|

---

### `wget` – Web Get

`wget` is a non-interactive tool for downloading files from the web over HTTP, HTTPS, or FTP.

**Download a file:**

```bash
wget https://example.com/file.tar.gz
```

**Download and save with a custom filename:**

```bash
wget -O myfile.tar.gz https://example.com/file.tar.gz
```

**Download in the background:**

```bash
wget -b https://example.com/largefile.iso
```

**Resume an interrupted download:**

```bash
wget -c https://example.com/largefile.iso
```

---

### `ftp` – File Transfer Protocol

`ftp` is a classic command-line client for connecting to FTP servers. It's interactive, but unencrypted — use only on trusted networks or when SFTP isn't available.
**See also [[FTP]] for more informations**

**Connect to an FTP server:**

```bash
ftp ftp.example.com
```

Once connected, common FTP commands include:

|Command|Description|
|---|---|
|`ls`|List remote files|
|`get filename`|Download a file|
|`put filename`|Upload a file|
|`cd /path`|Change remote directory|
|`bye`|Close the connection|

---
### SMB
#### What Is SMB?

**SMB (Server Message Block)** is a network file-sharing protocol that allows systems to share files, printers, and other resources over a local network. It was originally developed by Microsoft and is the backbone of Windows file sharing (the "Network Drives" you see in Windows Explorer).

On Linux, SMB is implemented through a suite called **Samba**, which lets Linux machines communicate with Windows systems seamlessly.


#### Common Use Cases

- Accessing shared folders on a Windows machine from Linux

- Sharing files between Linux and Windows on the same network

- Mounting a remote network drive locally

- Connecting to a NAS (Network Attached Storage) device
#### Key Tools on Linux

#### `smbclient` – Access SMB Shares from the Command Line`

Works similarly to an FTP client — lets you browse and transfer files interactively.
**Connect to a shared folder:**

 ```bash 
smbclient //server_ip/share_name -U username
 ``` 

**Common commands once connected:**

| Command | Description |
|---------|-------------|
| `ls` | List files on the share |
| `get filename` | Download a file |
| `put filename` | Upload a file |
| `cd /path` | Change directory |
| `exit` | Disconnect |


---
## Quick Reference Table

|Tool|Protocol|Use Case|Encrypted?|
|---|---|---|---|
|`scp`|SSH/SCP|Simple file copy to/from remote|✅ Yes|
|`rsync`|SSH or local|Sync directories, incremental backups|✅ Yes (over SSH)|
|`wget`|HTTP/HTTPS/FTP|Download files from URLs|✅ Yes (HTTPS)|
|`ftp`|FTP|Legacy FTP server access|❌ No|
|`sftp`|SSH/SFTP|Interactive secure file transfer|✅ Yes|

---

## Free Learning Resources

Ready to dive deeper? Here are some great free articles to continue your learning:

- 📄 [How to Use Linux FTP Command to Transfer Files](https://www.example.com/linux-ftp)
- 📄 [Rsync Command in Linux with Examples](https://www.example.com/linux-rsync)
- 📄 [Using scp Command in Linux](https://www.example.com/linux-scp)
- 📄 [Wget Command in Linux with Examples](https://www.example.com/linux-wget)

---

_Happy transferring! 🐧_