
### <span class="color-green">Why i choosed debian </span>
it a friendly use operating system for staping a server easly and from the instruction they tell that rocky is need more technical experience, this in simple why i prefer debian and it's a long time from start using debian in my kali linux laptop.
<span class="color-yellow">CentOS vs Debian</span>

| Feature             | CentOS                                    | Debian                                 |
| ------------------- | ----------------------------------------- | -------------------------------------- |
| **Linux Family**    | RHEL (Red Hat Enterprise Linux)           | Independent, community-driven          |
| **Based on**        | RHEL source code                          | Original distribution                  |
| **Target Audience** | Enterprise servers, stability-focused     | Servers, desktops, and community users |
| Use                 | entreprise, web hosting, professional use | community projects, servers, education |

---
# <span class="color-green">Vertualisation </span>
**Virtualization** is a technology that lets you run **multiple operating systems** on a _single_ physical computer **at the same time**.
A **Virtual Machine (VM)** is a _fake computer_ that runs inside your real computer.
in simple way : **Virtualization** = technique to create isolated computers inside your real computer
**Virtual Machine** = one of those isolated computers

---
# <span class="color-green">Hypervisors </span>

A **hypervisor** is a piece of software that enables a user to create and run one or more virtual machines simultaneously. A hypervisor is also known as the virtual machine monitor (VMM) and controls the resources of the host machine and allocates to each VM the resources it needs (memory, CPU...), making sure that these VM's do not interfere with each other.

![[hypervisor_types.png]]

### <span class="color-purple">Bar metal  </span> 

installed directly on the hardware, it means:
  |> The hypervisor is installed **on the disk**, just like an operating system.
  |>it boots **without any host OS**, and becomes the **first layer that controls the hardware**.
  <span class="color-yellow">so booting process look like </span>
```css
BIOS/UEFI → loads hypervisor → hypervisor controls hardware → runs VMs
```


### <span class="color-purple"> Hosted </span>
##### Type 2 came installed on OS 
It is installed like any normal program: VmWare, vertual box 
- On Linux: via `.deb`, `.rpm`, AppImage, etc.
- On Windows: `.exe` installed like  
- On macOS: `.dmg` application 
---
# <span class="color-green">LVM and Disk Partitioning</span>

## <span class="color-purple">What is LVM?</span> 

**LVM (Logical Volume Manager)** is a flexible disk management system for Linux. Think of it as a layer between your physical hard drives and your file systems that makes managing storage much easier.

### <span class="color-purple">Why use LVM?</span>

- **Resize volumes** without unmounting (grow or shrink partitions on the fly)
- **Move data** between physical drives without downtime
- **Create snapshots** for backups
- **Combine multiple disks** into one large storage pool

## <span class="color-purple">Primary Partitions vs LVM</span>

### <span class="color-yellow">Primary Partitions (sda1, sda2)</span>
These are traditional, fixed-size partitions created directly on the physical disk.

**In your system:**
- **`/boot` (sda1 - 500MB)**: Contains kernel and boot files
    - **Why separate?** GRUB bootloader needs a simple, unencrypted partition it can read before the OS loads
    - Must be outside LVM/encryption so the system can boot
- **`sda2` (1KB)**: Extended partition container (holds sda5)

## <span class="color-purple">The Encryption Layer</span>
### <span class="color-yellow">sda5_crypt (LUKS Encrypted Container)</span>
Before LVM comes into play, your main partition (sda5) is **encrypted** using LUKS (Linux Unified Key Setup).
```
Physical Disk → Encryption (sda5_crypt) → LVM → Logical Volumes
```

This means all your data is protected. Even if someone steals your hard drive, they can't read your data without the encryption password.

## LVM Architecture - The Three Levels
LVM has three main layers that work together:
### 1. **PV (Physical Volume)** - The Foundation
- **What it is:** A physical disk or partition prepared for LVM use
- **In your system:** `sda5_crypt` (the encrypted partition)
- **Identifier:** `254:0`
- **Think of it as:** The raw storage space available
### 2. **VG (Volume Group)** - The Storage Pool

- **What it is:** A collection of Physical Volumes combined into one storage pool
- **In your system:** `LVMGroup`
- **Think of it as:** A flexible storage container that can grow by adding more PVs
### 3. **LV (Logical Volume)** - The Usable Partitions

- **What it is:** Virtual partitions carved out of the Volume Group
- **In your system:** root, swap, home, var, srv, tmp, var-log
- **Think of it as:** Like traditional partitions, but flexible and resizable
## Your System's Logical Volumes Explained

| Volume                | Size  | Mount Point | Purpose                                                    |
| --------------------- | ----- | ----------- | ---------------------------------------------------------- |
| **LVMGroup-root**     | 10GB  | `/`         | Core operating system files (binaries, libraries, configs) |
| **LVMGroup-swap**     | 2.3GB | `[SWAP]`    | Virtual memory for RAM overflow                            |
| **LVMGroup-home**     | 5GB   | `/home`     | User files, documents, personal data                       |
| **LVMGroup-var**      | 3GB   | `/var`      | Variable data (databases, caches, spool files)             |
| **LVMGroup-srv**      | 3GB   | `/srv`      | Service data (web servers, FTP, etc.)                      |
| **LVMGroup-tmp**      | 3GB   | `/tmp`      | Temporary files (cleared on reboot)                        |
| **LVMGroup-var--log** | 4GB   | `/var/log`  | System and application logs                                |

## Visual Hierarchy

```
sda (30.8GB Physical Disk)
│
├── sda1 (500MB) → /boot [Primary Partition]
│   └── Bootloader & Kernel files
│
├── sda2 (1KB Extended Partition Container)
│
└── sda5 (30.3GB) → Encrypted with LUKS
    └── sda5_crypt (Decrypted Device)
        └── PV (Physical Volume)
            └── VG: LVMGroup (Volume Group)
                ├── LV: root (10GB) → /
                ├── LV: swap (2.3GB) → [SWAP]
                ├── LV: home (5GB) → /home
                ├── LV: var (3GB) → /var
                ├── LV: srv (3GB) → /srv
                ├── LV: tmp (3GB) → /tmp
                └── LV: var--log (4GB) → /var/log
```

## Key Concepts

### MAJ:MIN Numbers
- **Major:Minor device numbers** that the kernel uses to identify devices
- `8:0` = sda (main disk)
- `254:x` = dm (device-mapper) devices (LVM/encryption)
### RM (Removable)
- `0` = Not removable (internal drive)
- `1` = Removable (USB, CD/DVD)
### RO (Read-Only)
- `0` = Read/Write enabled
- `1` = Read-only mode

---
# <span class="color-green">Server </span>

A **server** is a computer — often with stronger resources — that **responds to requests from client devices** by providing specific services such as websites, email, DNS, files, databases, or applications.

---
# <span class="color-green">apt and aptitude </span>

## <span class="color-purple">apt</span>

**APT** = **`Advanced Package Tool`**
It is the **package manager** used by Debian-based Linux systems (Ubuntu, Kali, Linux Mint, Pop!_OS…).
Main Roles : 
 - download software packages.
 - install them.
 - update them.
 - Remove them : **`sudo apt remove [package]`**
 - Manage all their dependencies automatically
#### **<span class="color-yellow"> What is a package?</span>**

A **package** is a `.deb` file that contains:
- the program
- metadata
- scripts (install, remove)
- its dependencies


## <span class="color-purple">aptitude</span>

a more advanced, menu-based version of apt
It can be used **from the command line** or with a **text-based GUI**

some command line examples: 
```css 
sudo aptitude upgrade
sudo aptitude full-upgrade
sudo aptitude install nmap

```
example of aptitude conflict handling : 

##### APT:
- Usually picks **one automatic solution**
- Example: "Remove package B to install A"   
##### Aptitude:
- Gives **multiple choices**
- Example: 
    1. Remove B     
    2. Install older version of A   
    3. Cancel the operation

---
# <span class="color-green">SSH </span>

**SSH** is a secure protocol that lets you **remotely connect to another computer** through an encrypted terminal.  
You can use it to run commands, manage servers, transfer files, and administer machines safely over a network.

```css
sudo apt install openssh-server
```
### <span class="color-purple">change the default port of ssh</span> 

```java
nano /etc/ssh/sshd_config
```
**<span class="color-yellow">Change Port 22 to Port 4242 and set PermitRootLogin to no. Remember to uncomment the lines after making changes.</span>**
```css
Port 4242
.
.
. 
PermitRootLogin no
```

**<span class="color-yellow">start service :</span>**
```java
sudo systemctl enable ssh
sudo systemctl start ssh
sudo systemctl restart ssh
```
to see ip address to connect using other machine : 
```cs
hostname -I
```
check ssh status 
```css
sudo systemctl status sshd
```
verify the listening port on the server:
```java
sudo ss -tulpn | grep ssh
```

### <span class="color-purple">You need also</span> 

Search for:
- wha is hostname : it's simply the name of a device on a network.
to see your hostname :
```cs
hostname //command to see your hostname
```
see the ip address of your machine
```cs 
hostname -I 
```
change the hostname : 
```cs
sudo hostnamectl set-hostname newhostname 
```

--- 
# <span class="color-green">AppArmor Security </span>

AppArmor is a **Linux security module** (LSM) that **limits application kernel access AppArmor is a firewall, but for applications instead of network traffic.


### **<span class="color-purple">Just To know </span>**
#### **<span class="color-yellow">What a profile is</span>**
A file that defines permissions for an application (file access, network, capabilities).
Starting from **Debian 10 (Buster)** and later (11, 12, now 13), **AppArmor is installed and enabled by default**.
#### **<span class="color-yellow">Where profiles are located </span>**
```java
/etc/apparmor.d/
```
#### **<span class="color-yellow">Check AppAromor status</span> 
```java
sudo aa-status
```
#### <span class="color-yellow">How to check systemd service</span>
```java
sudo systemctl status apparmor
```


---
# <span class="color-green">Firewalls </span>  

A firewall is a security system that controls network traffic
and decides which IP addresses and which ports should be accessed.
In general, it protects your private network from unauthorized connections.
### <span class="color-purple">It takes the actions</span>
- **ACCEPT** → let packet pass
- **DROP** → silently drop packet (no response)  
- **REJECT** → block and send "connection refused"

### <span class="color-purple">Linux ufw</span>

(Unconplicated Firewall) is a simple command-line tool on Linux (mainly Ubuntu/Debian) used to configure the system firewall easily.
is not a firewall itself it just a tool to controle linux system firewall So when you use UFW, you're really just telling Netfilter what rules to enforce, but in a much simpler way than writing iptables commands directly.

#### <span class="color-yellow">See active rules</span>
```cs
sudo ufw status
```
#### <span class="color-yellow">Install it If not installed</span>
```bash 
sudo apt install ufw
```
#### <span class="color-yellow">Enable/Desable</span>
```bash
sudo ufw enable    # or disable
```
#### <span class="color-yellow">Allow Port</span>
```cs
sudo ufw allow 22
```
#### <span class="color-yellow">Deny</span>
```cs
sudo ufw deny 23
```
#### <span class="color-yellow">Delete a rule</span>
```cs
sudo ufw delete deny 10.13.100.13
sudo ufw delete deny from 10.13.100.13
```
#### <span class="color-yellow">Allow/Deny all in/out</span>
```cs
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

logging is : creates detailed records of network traffic (allowed and denied) that passes through a firewall, helping with network security, troubleshooting, and compliance
```cs
sudo ufw logging on
```
to see it :
```cs 
journalctl -u ufw
journalctl | grep ufw
```

---

# <span class="color-green">Password Policies </span>

### <span class="color-purple">1. M,m,W</span>

Go to the **`/etc/login.defs`** configuration file and modify the following lines:
```cs
PASS_MAX_DAYS 30 //make password expaire > 30 day
PASS_MIN_DAYS 2 //minimum day before the modification of password 
PASS_WARN_AGE 7 //Number of days given before a password expire.
```

**The changes will applied to new users only, to ensure that the changes you maked are applied to current user use chage command with `-M` , `-m`, `-W`.
```cs
sudo chage -M 30 username
sudo chage -m 2 username
sudo chage -W 7 username
```

### <span class="color-purple">2. part II</span>
To strengthten the password policy, we will utilize a module called pwquality:
```cs
sudo apt install libpam-pwquality
```
### <span class="color-cyan">configure</span>
go to the file 
```cs
sudo vim /etc/pam.d/common-password
```
find this line : 
```cs
password requisite pam_pwquality.so 
```
edit it to be:
```css
password requisite pam_pwquality.so retry=3 minlen=10 ucredit=-1 dcredit=-1 maxrepeat=3 reject_username enforce_for_root

password requisite pam_pwquality.so retry=3 minlen=10 ucredit=-1 dcredit=-1 maxrepeat=3 reject_username difok=7
```
**we added all rules except the difok to the root as well and the seconde line we added difok but not applied to root.**

| Rule              | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `minlen=10`       | Minimum 10 characters                                     |
| `ucredit=-1`      | Requires 1 uppercase                                      |
| `lcredit=-1`      | Requires 1 lowercase                                      |
| `dcredit=-1`      | Requires 1 digit                                          |
| `ocredit=-1`      | Requires 1 special character                              |
| `retry=3`         | Allows 3 attempts                                         |
| `reject_username` | avoid user in password                                    |
| `difok=7`         | at least 7 characters different to the previouse password |
| `maxrepeat=3`     | no more than 3 repetions of a character in the password   |



### <span class="color-purple">4. Apply expiration settings to existing users</span>

for each user:
```cs
sudo chage -M 30 -m 2 -W 7 username
```

check :
```cs
sudo chage -l username
```
expected output : 
```cs
Last password change                                    : Nov 28, 2025
Password expires                                        : Dec 28, 2025
Password inactive                                       : never
Account expires                                         : never
Minimum number of days between password change          : 2
Maximum number of days between password change          : 30
Number of days of warning before password expires       : 7
```

---
# <span class="color-green">Superuser do configuration </span>

It allows a normal user to run commands with root (administrator) priviliges, without logging in as root.
sudo is a program and it uses a special group (sudo) to control who can use it.Wordpress

#### <span class="color-purple">1. add or remove a user from sudoers</span>
add : 
```c
usermode -aG sudo username
```
delete :
```css
sudo deluser user group
```
check membership:
```c
groups username
```
sudoers ascii file
```cs
/etc/sudoers
```
direct access with root user:
```bash
visudo
```
#### <span class="color-purple">2. How to use visudo </span>
run `visudo` , you will se something like this:
```sql
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
```

This means:
- **root** can run everything
- **members of sudo group** can run everything with sudo
#### <span class="color-purple">3. adding a specifc user with previlige</span>
Example: Give user `ahmed` full sudo rights:
```sql
ahmed ALL=(ALL:ALL) ALL
```

B2BR steps:
#### **The user must NOT be root**

You must create a **new user** (often called _your_login_) and give it sudo rights.
example :
```cs
sudo usermod -aG sudo your_login
```

#### SUDO must ask for a password every time

The subject _requires_ that every `sudo` command asks for password.
- inside `visudo`:
```cs
Defaults        passwd_tries=3
Defaults        badpass_message="Wrong password"
Defaults        logfile="/var/log/sudo/sudo.log"
Defaults        log_input,log_output
Defaults        iolog_dir="/var/log/sudo"
Defaults        requiretty
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Defaults        timestamp_timeout=0
```
**`requiretty`**:This setting means: **sudo commands can ONLY be run from an actual TTY (interactive terminal)**, this prevent the background script to use the sudo previliges.

Most important is:
```cs 
Default          timestamp_timeout=0 
```
By default the `timestamp_timeout=15` this means that you will use the sudo without reenter the password for 15 min, 0 means each time you use sudo you will enter the password. 


sudo will not create the directory automaticaly : 
```cs
sudo mkdir -p /var/log/sudo 
```
# <span class="color-red">configure new user</span>
after using
```cs
sudo useradd -m newuser
```
give the newuser a password : 
```cs
passwd newuser
```
configure its shell if needed
```cs
sudo usermod -s /bin/bash username
```

---
# <span class="color-green">Monitoring Script </span>
#### Essential System Utilities for the the script 

#### **`bc` (Basic Calculator)**
Command-line calculator for mathematical operations and floating-point calculations in scripts.
#### **`sysstat1` (System Statistics)**
Collection of performance monitoring tools (sar, iostat, mpstat) to track CPU, memory, and I/O usage.

#### <span class="color-purple">Instalation </span>
```cs
sudo apt install bc sysstat
```

### remember we excluded the /boot partition because: 
 not user-accessible storage
### remember we use the seconde simple of the output
 because the first one not for live statementws 

#### `journalctl` is **the tool/command set that lets you read, filter, and query logs stored in systemd’s binary format**.
and this `_COMM=name` make able to filtre its output to just the command names 
