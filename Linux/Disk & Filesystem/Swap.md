
### Introduction
> Swap space is a critical memory management feature in Linux systems that extends physical RAM capacity by utilizing disk storage. When RAM becomes full, the system moves inactive memory pages to swap, trading performance for stability.

## Table of Contents
- [[#What is Swap]]
- [[#Performance Impact]]
- [[#Purpose and Use Cases]]
- [[#Types of Swap Areas]]
- [[#Creating Swap Space]]
- [[#Managing Swap]]
---

# What is Swap

Swap space is a designated area on disk that serves as **overflow storage** for physical RAM. When system memory reaches capacity, the kernel transfers inactive memory pages to swap, freeing RAM for active processes.

**Key characteristics:**
- Slower than physical RAM due to disk I/O limitations
- Essential for system stability under memory pressure
- Can prevent out-of-memory (OOM) crashes
- Configurable at installation or post-installation
```bash
# Check current swap usage
free -h
swapon --show
```

### Performance Impact

While swap prevents crashes, excessive swapping (thrashing) significantly degrades performance. Disk access is **orders of magnitude slower** than RAM access, making swap suitable only for infrequently accessed data.

---

# Purpose and Use Cases

Swap space serves two primary functions in Linux systems:

### 1. Virtual Memory Extension
When physical RAM is **exhausted**, swap acts as overflow storage. The kernel's memory management subsystem identifies least-recently-used (LRU) pages and moves them to disk.
```bash
# Monitor swap activity
vmstat 1 5
```

### 2. Hibernation Support
Hibernation requires writing the **entire RAM contents** to persistent storage. Swap provides this storage, allowing systems to power off completely while preserving session state.
```bash
# Enable hibernation (requires swap >= RAM size)
systemctl hibernate
```

---

# Types of Swap Areas

Linux supports two swap implementations, each with distinct advantages:

### Swap Partition
A dedicated disk partition formatted exclusively for swap use.

**Advantages:**
- Better performance (contiguous disk space)
- Set at installation time
- Traditional approach
```bash
# Create swap partition (after partitioning with fdisk/gdisk)
mkswap /dev/sda2
swapon /dev/sda2
```

### Swap File
A regular file within an existing filesystem allocated for swap.

**Advantages:**
- Flexible sizing without repartitioning
- Easy to create/remove
- Modern default on many distributions
```bash
# Create 4GB swap file
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

---

# Creating Swap Space

Users can establish swap during **OS installation** or add it later using command-line tools. The process involves allocation, formatting, and activation.

### Method 1: Using fallocate

The `fallocate` command **instantly allocates** disk space without writing zeros.
```bash
# Allocate 2GB swap file
sudo fallocate -l 2G /swapfile

# Secure permissions (critical for security)
sudo chmod 600 /swapfile

# Format as swap
sudo mkswap /swapfile

# Activate immediately
sudo swapon /swapfile

# Verify
swapon --show
```

### Method 2: Using dd

The `dd` command writes actual data, making it **slower but more compatible** with some filesystems.
```bash
# Create 2GB swap file (bs=1M count=2048)
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress

# Follow same steps as fallocate method
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

# Managing Swap

### Making Swap Permanent

Add entry to `/etc/fstab` to **persist across reboots**:
```bash
# Edit /etc/fstab
/swapfile none swap sw 0 0
```

### Adjusting Swap Usage (Swappiness)

The `vm.swappiness` parameter controls swap **aggressiveness** (0-100):
```bash
# Check current value
cat /proc/sys/vm/swappiness

# Set temporarily (60 is default)
sudo sysctl vm.swappiness=10

# Make permanent in /etc/sysctl.conf
vm.swappiness=10
```

### Removing Swap
```bash
# Deactivate swap
sudo swapoff /swapfile

# Remove file
sudo rm /swapfile

# Remove from /etc/fstab
```

### Resizing Swap

To **increase swap capacity**, simply create additional swap files or deactivate and recreate:
```bash
# Deactivate current swap
sudo swapoff /swapfile

# Create larger swap
sudo fallocate -l 8G /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```