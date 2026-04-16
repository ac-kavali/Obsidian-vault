---
words:
  2026-04-15: 1110
---

## What is Compression?

**Compression** is the concept of making data smaller, thereby requiring less storage capacity and making data easier to transmit over a network.

---
## Common Archive Extensions

|Extension|Tool|
|---|---|
|`.tar`|tar|
|`.gz`|gzip|
|`.bz2`|bzip2|
|`.cpio`|cpio|
|`.zip`|zip|

---
## General Option

| Flag | Description                                                    |
| ---- | -------------------------------------------------------------- |
| `-v` | **Verbose mode** — displays the files being archived/extracted |

---
## 1. `tar`

`tar` is the standard Linux archiving tool. It bundles multiple files into a single archive (without compression by default).

```bash
# Create an archive
tar -cf archivename file1 file2 ...

# Extract an archive
tar -xf archivename
```

| Flag | Meaning                       |
| ---- | ----------------------------- |
| `-c` | Create archive                |
| `-x` | Extract archive               |
| `-f` | Specify the archive file name |

---
## 2. `gzip` / `gunzip`

`gzip` compresses a single file into the `.gz` format. `gunzip` (or `gzip -d`) decompresses it.

```bash
# Compress a file
gzip filename

# Decompress a file
gunzip filename
# or equivalently:
gzip -d filename

# Keep the original file after compression
gzip -k filename
```

> ⚠️ **Note:** `gzip` **deletes** the original file after compression by default. Use `-k` to keep it.

> ⚠️ **Note:** `gzip` cannot compress **multiple files** directly. Use `tar` first to bundle them, then pipe to `gzip`:

```bash
# Bundle multiple files and compress with gzip
tar -cvf - file1 file2 file3 | gzip > archive.tar.gz

# Extract a .tar.gz archive
tar -xzf archive.tar.gz
```

|Flag|Meaning|
|---|---|
|`-k`|Keep original file|
|`-d`|Decompress|
|`-v`|Verbose output|
|`-z` (in `tar`)|Handle `.gz` decompression|

---

## 3. `cpio`

`cpio` is a file archiver commonly used for **backup and recovery**. It reads a list of files from standard input (e.g., from `ls` or `find`).

```bash
# Create a cpio archive from a file list
ls file1 file2 file3 | cpio -ov > archive.cpio

# Extract a cpio archive
cpio -i < archive.cpio
```

|Flag|Meaning|
|---|---|
|`-o`|Output mode (create archive)|
|`-i`|Input mode (extract archive)|
|`-v`|Verbose output|

> 💡 You can use both `ls` and `find` to generate the list of files to pass into `cpio`:
> 
> ```bash
> find . -name "*.log" | cpio -ov > logs.cpio
> ```

---

## 4. `bzip2`

`bzip2` compresses files using the BWT algorithm, generally achieving better compression than `gzip`.

```bash
# Compress a file
bzip2 file

# Decompress a file
bzip2 -d file
# or equivalently:
bunzip2 file
```

|Flag|Meaning|
|---|---|
|`-d`|Decompress|
|`-v`|Verbose output|

---

## 5. `zip`

`zip` compresses and bundles multiple files in one step, producing a `.zip` archive. Compatible with Windows and macOS.

```bash
# Compress files into a zip archive
zip archive.zip file1 file2

# Extract a zip archive
unzip archive.zip
```

---

## Naming Conventions

You can name archived files **anything you want**, but it's good practice to use the extension that reflects the tools used — so you know how to decompress it later.

| Contents    | Recommended Name                  |
| ----------- | --------------------------------- |
| tar only    | `archive.tar`                     |
| tar + gzip  | `archive.tar.gz` or `archive.tgz` |
| tar + bzip2 | `archive.tar.bz2`                 |
| gzip only   | `file.gz`                         |
| bzip2 only  | `file.bz2`                        |
| cpio        | `archive.cpio`                    |
| zip         | `archive.zip`                     |

---

## Quick Reference Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║              ARCHIVING & COMPRESSION CHEAT SHEET                ║
╠══════════════════════════════════════════════════════════════════╣
║  TAR                                                            ║
║  tar -cf archive.tar file1 file2     Create archive             ║
║  tar -xf archive.tar                 Extract archive            ║
║  tar -cvf archive.tar file1 file2    Create (verbose)           ║
╠══════════════════════════════════════════════════════════════════╣
║  GZIP                                                           ║
║  gzip file                           Compress file              ║
║  gunzip file.gz                      Decompress file            ║
║  gzip -k file                        Compress, keep original    ║
║  tar -cvf - f1 f2 | gzip > a.tar.gz  Multi-file compress        ║
║  tar -xzf archive.tar.gz             Extract .tar.gz            ║
╠══════════════════════════════════════════════════════════════════╣
║  BZIP2                                                          ║
║  bzip2 file                          Compress file              ║
║  bzip2 -d file.bz2                   Decompress file            ║
╠══════════════════════════════════════════════════════════════════╣
║  CPIO                                                           ║
║  ls f1 f2 | cpio -ov > archive.cpio  Create archive             ║
║  cpio -i < archive.cpio              Extract archive            ║
╠══════════════════════════════════════════════════════════════════╣
║  ZIP                                                            ║
║  zip archive.zip file1 file2         Compress files             ║
║  unzip archive.zip                   Extract archive            ║
╚══════════════════════════════════════════════════════════════════╝
```