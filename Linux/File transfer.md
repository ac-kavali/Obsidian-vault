
> A practical introduction to copying and moving files between systems over a network using the Linux command line.

---

## Table of Contents

1. [What Is Linux File Transfer?](#what-is-linux-file-transfer)
2. [Supported Protocols](#supported-protocols)
3. [Common Tools & Commands](#common-tools--commands)
- [scp – Secure Copy](#scp--secure-copy)
- [rsync – Remote Sync](#rsync--remote-sync)
- [wget – Web Get](#wget--web-get)
- [ftp – File Transfer Protocol](#ftp--file-transfer-protocol)
4. [Quick Reference Table](#quick-reference-table)
5. [Free Learning Resources](#free-learning-resources)

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