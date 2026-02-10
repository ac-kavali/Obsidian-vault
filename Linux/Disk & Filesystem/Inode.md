### Introduction
> An inode (index node) is a fundamental data structure in Unix-like filesystems that stores metadata about files and directories. Every file has an inode containing crucial information like permissions, ownership, timestamps, and pointers to data blocks, but notably **not the filename itself**.

## Table of Contents
- [[#What is an Inode]]  
- [[#Inode Structure and Contents]]  
- [[#How Inodes Work]] 
- [[#Inode Limitations]]  
- [[#Working with Inodes]]  
- [[#Hard Links]]

---

# What is an Inode

An inode is a **data structure** on a filesystem that stores all information about a file except its name and actual data content. Each file or directory is assigned a unique inode number within its filesystem.

**Key characteristics:**
- Contains file metadata (permissions, ownership, size, timestamps)
- Stores pointers to data blocks where actual file content resides
- Unique identifier within a filesystem
- Fixed number allocated at filesystem creation
- Separate from directory entries (filenames)
```bash
# View inode numbers
ls -li

# Display inode information for a specific file
stat filename.txt
```

## The Separation of Name and Data

The filename is stored in the **directory entry**, which maps the name to an inode number. This separation allows multiple filenames (hard links) to point to the same inode.

---

# Inode Structure and Contents

An inode contains comprehensive metadata about a file, organized into several categories:

### File Metadata Stored in Inode

**Ownership and Permissions:**
- User ID (UID) of owner
- Group ID (GID) of owner
- Permission bits (read, write, execute for owner, group, others)
- Special permissions (SUID, SGID, sticky bit)

**Timestamps:**
- **atime**: Last access time
- **mtime**: Last modification time (content changed)
- **ctime**: Last change time (metadata changed)

**File Information:**
- File size in bytes
- Number of hard links pointing to this inode
- File type (regular file, directory, symbolic link, device file, etc.)
- Number of blocks allocated

**Data Location:**
- Direct pointers to data blocks (typically 12-15)
- Indirect pointers (single, double, triple) for large files
```bash
# Detailed inode information
stat /etc/passwd

# Output shows:
#   Inode: 123456
#   Links: 1
#   Access: (0644/-rw-r--r--)
#   Uid: (0/root)
#   Gid: (0/root)
#   Size: 2847
#   Access: 2024-02-09 10:30:15
#   Modify: 2024-02-08 14:22:10
#   Change: 2024-02-08 14:22:10
```

### What's NOT in an Inode

- **Filename** (stored in directory entry)
- **Actual file data** (stored in separate data blocks)

---

## How Inodes Work

The relationship between filenames, inodes, and data blocks forms the foundation of filesystem organization.

## File Access Process

1. User requests file by **name**
2. System searches directory for matching entry
3. Directory entry provides **inode number**
4. System reads inode to get metadata and data block pointers
5. System follows pointers to access **actual data**
```bash
# Trace the inode lookup process
# 1. Get inode number for a file
ls -i /etc/hosts
# Output: 98765 /etc/hosts

# 2. View what that inode contains
stat -c '%i %n %s %h' /etc/hosts
# Output: 98765 /etc/hosts 221 1
```

### Direct and Indirect Block Pointers

For **small files**, the inode contains direct pointers to data blocks:
```
Inode → [Direct Block 1] → Data
        [Direct Block 2] → Data
        [Direct Block 3] → Data
```

For **large files**, the inode uses indirect pointers:
```
Inode → [Single Indirect] → [Pointer Block] → Data Blocks
        [Double Indirect] → [Pointer Block] → [Pointer Blocks] → Data
        [Triple Indirect] → [Pointer Block] → [Pointer Blocks] → [Pointer Blocks] → Data
```

---

## Inode Limitations

Filesystems allocate a **fixed number of inodes** at creation time, which can create practical limitations.

### Inode Exhaustion

Running out of inodes prevents new file creation **even with available disk space**:
```bash
# Check inode usage
df -i

# Output:
# Filesystem      Inodes  IUsed   IFree IUse% Mounted on
# /dev/sda1      3840000 450000 3390000   12% /
```

### Common Causes of Inode Exhaustion

- **Many small files** (each file consumes one inode regardless of size)
- Email servers with millions of individual messages
- Cache directories with temporary files
- Log files split into many small segments
```bash
# Find directories with most files (inode consumers)
find /var -xdev -printf '%h\n' | sort | uniq -c | sort -rn | head -10

# Count files in a directory tree
find /path/to/directory -type f | wc -l
```

### Solutions for Inode Exhaustion

**Prevention:**
- Choose appropriate inode ratio at filesystem creation
- Regular cleanup of temporary files
- Archive or compress small files

**Resolution:**
```bash
# Delete unnecessary files
find /tmp -type f -mtime +7 -delete

# Create filesystem with more inodes
mkfs.ext4 -N 10000000 /dev/sdb1
```

---

# Working with Inodes

### Viewing Inode Information
```bash
# List files with inode numbers
ls -i
ls -li  # Long format with inodes

# Show inode number only
stat -c '%i' filename.txt

# Find files by inode number
find / -inum 123456

# Display filesystem inode statistics
tune2fs -l /dev/sda1 | grep -i inode
```

### Inode-Based File Operations
```bash
# Delete a file by inode (useful for files with special characters)
find . -inum 123456 -delete

# Or using find with exec
find . -inum 123456 -exec rm -i {} \;

# Compare if two files share the same inode (hard links)
stat -c '%i' file1.txt
stat -c '%i' file2.txt
```

### Checking Inode Capacity
```bash
# Show inode usage per filesystem
df -i

# Show inode size and count
dumpe2fs /dev/sda1 | grep -i inode

# Calculate inode usage percentage
df -i | awk 'NR>1 {print $1, $5}'
```

---

# Hard Links vs Soft Links

Understanding inodes is essential for comprehending the difference between hard and soft (symbolic) links.

### Hard Links

A hard link creates **another directory entry** pointing to the same inode. Multiple filenames share one inode and data.

**Characteristics:**
- Same inode number as original
- Cannot cross filesystem boundaries
- Cannot link to directories (prevents loops)
- File persists until all hard links are deleted
```bash
# Create a hard link
ln original.txt hardlink.txt

# Verify same inode
ls -li original.txt hardlink.txt
# Output:
# 123456 -rw-r--r-- 2 user group 1024 Feb 09 10:00 original.txt
# 123456 -rw-r--r-- 2 user group 1024 Feb 09 10:00 hardlink.txt

# Note: Link count is 2
stat original.txt | grep Links
# Links: 2
```

### Soft Links (Symbolic Links)

A soft link is a **special file** with its own inode that contains a path to another file.

**Characteristics:**
- Different inode from original
- Can cross filesystem boundaries
- Can link to directories
- Breaks if original is deleted
- Slightly slower (extra inode lookup)
```bash
# Create a symbolic link
ln -s /path/to/original.txt symlink.txt

# Verify different inodes
ls -li original.txt symlink.txt
# Output:
# 123456 -rw-r--r-- 1 user group 1024 Feb 09 10:00 original.txt
# 789012 lrwxrwxrwx 1 user group   23 Feb 09 10:05 symlink.txt -> /path/to/original.txt

# Symlink has its own inode (789012) and file type 'l'
```

### Visual Comparison

**Hard Link:**
```
Directory Entry "original.txt" ──┐
                                 ├──> Inode 123456 ──> Data Blocks
Directory Entry "hardlink.txt" ──┘
```

**Soft Link:**
```
Directory Entry "original.txt" ──> Inode 123456 ──> Data Blocks

Directory Entry "symlink.txt" ──> Inode 789012 ──> "/path/to/original.txt"
```

### Practical Examples
```bash
# Test hard link behavior
echo "test data" > original.txt
ln original.txt hardlink.txt
rm original.txt
cat hardlink.txt  # Still works! Data remains accessible

# Test soft link behavior
echo "test data" > original.txt
ln -s original.txt symlink.txt
rm original.txt
cat symlink.txt  # Error: No such file or directory (broken link)

# Find all hard links to a file
find / -samefile original.txt
# Or by inode number
find / -inum $(stat -c '%i' original.txt)
```

---

# Advanced Inode Topics

### Inode Reservations

Most filesystems reserve **5% of inodes** for root user to prevent system failures when normal users exhaust inodes.
```bash
# Adjust reserved inode percentage (ext4)
tune2fs -m 2 /dev/sda1  # Reserve 2% instead of 5%
```

### Inode Size

Modern filesystems use **256-byte inodes** (vs older 128-byte), allowing storage of extended attributes and larger timestamps.
```bash
# Check inode size
tune2fs -l /dev/sda1 | grep "Inode size"
# Output: Inode size: 256
```

### Zero-Length Files

Even **empty files** consume an inode, which is why creating millions of empty files can exhaust inodes while using minimal disk space.
```bash
# Create 1000 empty files (consumes 1000 inodes, ~0 bytes)
touch file{1..1000}.txt
```

[[Linux]]