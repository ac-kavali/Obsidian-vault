
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
### <span class="color-green">Vertualisation </span>
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
you know that a vertual machine is a computer in a computer, 
but in real what you need to say i have a computer is a real hardware (cpu, Ram, cach, gpu ...) , the concepte of vertualisation is to make multiple computer on a one peace of hardware and this is the role of hypervisor that manager one multipe operating systems on a single hardware peaces.

---
## <span class="color-green">Mount point </span>
الـ _mount point_ هو واحد النقطة اللي كيتربط فيها شي بارتيشن ولا شي ديسك فالسيستيم باش تقدر تشوفو وتخدم بيه.
إذا درتي `mount /dev/sda1 /mnt`  
راك كتقول للّينكس: **ربط ليا هاد البرتيشن مع /mnt**.
A **mount point** is basically a **directory in your file system where an external storage device or filesystem is attached so you can access its contents**. It’s like a gateway that lets the operating system treat another storage device (like a USB drive, a hard disk partition, or a network share) as part of your existing directory structure.
Think of a mount point as **a doorway into another storage space**, letting your computer seamlessly access multiple disks under one unified file system.

---
## <span class="color-green">LVM partitionning </span>
هو واحد النظام فـ Linux اللي كيعطيك الحرّية تتحكم فالبارتيشنات بطريقة مرنة بزاف.
LVM فيه **3 مستويات رئيسية**:
1) Physical Volume (PV)
هدا هو **الأساس**.  
PV = LVM الديسك الحقيقي ولا البرتيشن اللي كتحولو باش يدخل فـ .
2) Volume Group (VG)
 هدا هو **المجمع**.  
كتجمع فيه بزاف ديال الـ PVs باش يصنع لينا **pool واحد كبير**.
##### **3) Logical Volume (LV)**

هدا هو **البارتيشن اللي غادي تستعمل**.  
هو اللي كيدير فيه `/home`, `/`, `/var` …

#### **<span class="color-purple">What is /dev/sda </span>

`/dev/sda` is **just a block device**.  
It _usually_ represents:

- a real physical disk **if you are on a real machine**
- **a virtual disk** if you are inside a VM (VirtualBox, VMware, QEMU, etc.)
A **PV (Physical Volume)** is **any block device used by LVM**, for example:
- an entire disk → `/dev/sda`
- a partition → `/dev/sda2`
- a RAID device → `/dev/md0` 
- a loop device → `/dev/loop3`
- even an encrypted device → `/dev/mapper/cryptdisk`

So:
LVM doesn’t know and doesn’t care if:

- that block device is a real disk 
- a partition 
- a USB stick
- a network storage
- a RAID volume  
- a virtual disk 
- a loop device
### 🔹 **PV does NOT require a real physical hard disk.**
**LVM (Logical Volume Manager)** is a **technology** (implemented as software and a set of command-line tools within the kernel), lets you **combine physical disks or partitions** (called _physical volumes_) into **one big storage pool** (called a _volume group_). it make you able to :

LVM has **3 layers**:
1. **PV – Physical Volume**  
  Real disks or partitions (ex: `/dev/sda1`, `/dev/sdb`)
2. **VG – Volume Group**  
  A _big pool_ created by combining PVs (ex: 100GB + 40GB = 140GB pool)
3. **LV – Logical Volume**  
  Virtual partitions created inside the VG (ex: root LV, homeLV, swap LV)

# ⭐ علاش الـ Primary Partition مهم؟

السبب **ماشي** حيث هو “قوي”…  
ولكن لأن **النظام القديم ديال تقسيم الديسك (MBR)** كان **كيعطي قيمة خاصة للـ primary**.

كنشرح ليك علاش:
GPT كيخليك تخلق 128

---

## 🔥 1) حيث الـ BIOS ما كيقدرش يقلّع (boot) إلا من الـ Primary

فالأيام ديال MBR، **الـ BIOS** كان يقرأ غير **الـ primary partitions** باش يلقّى:

- bootloader
- system files

يعني إذا بغيتي تقلّع OS (بحال Windows ولا Linux)،  
خاصو يكون فـ **primary partition**.

الـ logical مكيقدّروش يقلّعو منه مباشرة.

# ⭐ شنو هو Bootloader؟

**Bootloader = البرنامج الصغير اللي كيخدم أول حاجة ملي كتشرّع الكمبيوتر.**

يعني **كيستقبل السيستيم من BIOS/UEFI** وكيقلب على نظام التشغيل باش يشغلو.

بمعنى آخر:

- الكمبيوتر كيولي شغّال → BIOS/UEFI كيشوف الجهاز
    
- BIOS/UEFI ما عندو ما يدير بلا Bootloader
    
- Bootloader كيقول: “آه، هاد OS هو اللي خاص يتشغّل، ندير ليه load فـ RAM”
زيد عليها اخاي حتى  os حتا هو كيكون ف primary partition و ميقدرس يتلاودا الا الى كان ف primary partition  
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

### APT:
- Usually picks **one automatic solution**
- Example: "Remove package B to install A"   
### Aptitude:
- Gives **multiple choices**
- Example: 
    1. Remove B     
    2. Install older version of A   
    3. Cancel the operation

---
### <span class="color-green">SSH </span>

**SSH** is a secure protocol that lets you **remotely connect to another computer** through an encrypted terminal.  
You can use it to run commands, manage servers, transfer files, and administer machines safely over a network.

```css
sudo apt install openssh-server
```
doing ssh:
### <span class="color-purple">change the default port of ssh</span> 

```java
nano /etc/ssh/sshd_config
```
change :
```java
Port 4242
.
.
. 
 no
```

start service :
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
`ss` : socket statistics (information about network connextions).
`-t` : show tcp only.
`-u` : Show udp only.
`-l` : show listening prots.
`-p` : show the process (PID and program name)
`-n` : show numeric addresses (no domains or dns addresses)
## 🔵 **1. SSH Basics (Foundation)**

Search for:
- wha is hostname : it's simply the name of a device on a network.
to see your hostname :
```cs 
hostname
```
change the hostname : 
```cs
sudo hostnamectl set-hostname NEW-HOSTNAME
```


---
## 🔵 **2. SSH Configuration**

Search for:
- _sshd_config explained_
- Important directives:
    - `Port`    
    - `PermitRootLogin`  
    - `PasswordAuthentication`  
    - `PermitEmptyPasswords` 
    - `PubkeyAuthentication`  
    - `ListenAddress`
    - `MaxAuthTries`
    - `AllowUsers`, `AllowGroups` 
    - `LoginGraceTime`  
Also search:
- _How to restart sshd service_
- _How to test config with: `sshd -t`_

--- 
### <span class="color-green">AppArmor Security </span>

AppArmor is a **Linux security module** (LSM) that **limits application kernel access AppArmor is a firewall, but for applications instead of network traffic.

**what problemes can solve**
  - Normally, a program can do anything that user running it can do.
  Example:  
If Firefox gets hacked, the hacker can do everything _your user_ can do — read files, write files, run commands…
AppArmor stops this by **restricting each application**.
**AppArmor profiles** exist in `/etc/apparmor.d/`
- At boot, AppArmor loads these profiles into the **kernel*
- When a program runs, AppArmor checks:
- “Is there a profile for this executable?”
- If yes → the kernel **restricts** the program based on the profile
- If the program tries something **not allowed**, AppArmor: 
    - blocks it     
    - logs it in `/var/log/syslog` or `/var/log/apparmor/`

### **WHAT YOU _MUST_ KNOW for Born2beroot (minimal scope)**
#### 1. What AppArmor is
"A mandatory access control system that restricts what applications can do using profiles."
#### 2. What a profile is
"A file that defines permissions for an application (file access, network, capabilities)."
Starting from **Debian 10 (Buster)** and later (11, 12, now 13), **AppArmor is installed and enabled by default**.
#[[profiles]]
#### 3. Where profiles are located
```java
/etc/apparmor.d/
```
#### 4. How to check AppArmordf status
```java
sudo aa-status
```
You must be able to recognize:
- AppArmor module loaded
- Profiles loaded
- Profiles in enforce mode
#### 5. How to check systemd service
```java
sudo systemctl status apparmor
```
#### 6. AppArmor must be in **enforce** mode (not complain mode)
You should know:
- Enforce mode = block + log
- Complain mode = allow + log
##### 7. AppArmor is enabled byatest installer).
FileManager#generateMarkdownLin default on Debian

---
### <span class="color-green">Firewalls </span>  

A firewall is a security system that controls network traffic
and decides which IP addresses and which ports should be accessed.
In general, it protects your private network from unauthorized connections.
**exist two forms of firewalls**
	physical firewall 
	application firewall 
### 3. **It takes an action**
- **ACCEPT** → let packet pass
- **DROP** → silently drop packet (no response)  
- **REJECT** → block and send "connection refused"
#### linux UFW 

(Unconplicated Firewall) is a simple command-line tool on Linux (mainly Ubuntu/Debian) used to configure the system firewall easily.
what UFW can do :
- Allow or deny specific ports.
- allow or deny IP addresses.
- Enable/disable the firewall.
- check the firewall status.
- Create rules for services (SSH, HTTPS, etc).
is not a firewall itself it just a tool to controle linux system firewall : 
So when you use UFW, you're really just telling Netfilter what rules to enforce, but in a much simpler way than writing iptables commands directly.

To see the list of active UFW rules, use one of these commands:
```bash
sudo ufw status
```

install if not 
```bash 
sudo apt install ufw
```

Enable/Disable the firewall 
```bash
sudo ufw enable    # or disable
```

Allow Ports 
```cs
sudo ufw allow 22
```

Deny Ports
```cs
sudo ufw deny 23
```
Delete a rule :
```cs
sudo ufw delete deny 10.13.100.13
sudo ufw delete deny from 10.13.100.13
```
#### Allow or Block Specific IP Addresses
Allow on ip 
```cs
sudo ufw allow from 192.168.1.5
```

Deny from an IP:
```cs
sudo ufw deny from 192.168.1.5
```

allow or deny all incoming/outgoin connexions
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

### <span class="color-green">Password Policies </span>

### <span class="color-purple">1. Instal the password policy module</span>

(libpam-pwquality)
Debian uses **PAM** and the **pwquality** module to enforce password rules.
Install it:
```cs
sudo apt install libpam-pwquality
```

### <span class="color-purple">2. configure</span>
This file controls password strength rules.
to edit it :
```css
/etc/login.defs & /etc/security/pwquality.conf
```

find this line:
```ruby
password requisite pam_pwquality.so retry=3 minlen=10 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1 enforce_for_root
```

| Rule               | Description                  |
| ------------------ | ---------------------------- |
| `minlen=10`        | Minimum 10 characters        |
| `ucredit=-1`       | Requires 1 uppercase         |
| `lcredit=-1`       | Requires 1 lowercase         |
| `dcredit=-1`       | Requires 1 digit             |
| `ocredit=-1`       | Requires 1 special character |
| `retry=3`          | Allows 3 attempts            |
| `enforce_for_root` | Applies rules to root also   |

### <span class="color-purple">3. Configure password expiration policy</span>

(`/etc/login.defs`)
Edit
```cs
sudo vim /etc/login.defs
```

set :
```cs
PASS_MAX_DAYS   30
PASS_MIN_DAYS   2
PASS_WARN_AGE   7
PASS_MIN_LEN    10
```
Meaning:
- **PASS_MAX_DAYS** → password expires after 30 day
- **PASS_MIN_DAYS** → must wait 2 days before changing again
- **PASS_WARN_AGE** → warn user 7 days before expiration 
- **PASS_MIN_LEN** → minimum password length (used by `passwd`)

### <span class="color-purple">4. Apply expiration settings to existing users</span>

for each user:
```cs
sudo chage -M 30 -m 2 -W 7 username
```

check :
```cs
sudo chage -l username
```

### <span class="color-purple">5.Disable password reuse </span>
Edit `/etc/pam.d/common-password` again and add:
```cs
... ocredit=-1 remember=5 enforece_for_root
```

---
### <span class="color-green">Superuser do configuration </span>

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
```sql
Defaults        passwd_tries=3
Defaults        badpass_message="Wrong password"
Defaults        logfile="/var/log/sudo/sudo.log"
Defaults        requiretty
Defaults   ^secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Defaults        timestamp_timeout=0
```

Most important is:
```cs 
Default          timestamp_timeout=0 
```
This forces sudo to always ask for password (no 15‑min session).
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
edit the `/etc/ssh/sshd_config` and add
```cs
AllowUsers achahi username
```

---
## LOG ALL SUDO COMMANDS

Create a sudo log directory:
```cs
sudo mkdir -p /var/log/sudo
sudo chmod 750 /var/log/sudo
sudo touch /var/log/sudo/sudo.log
sudo chmod 640 /var/log/sudo/sudo.log
```
In sudoers :
```cs
Defaults        logfile="/var/log/sudo/sudo.log"
```

---
## LIMIT NUMBER OF PASSWORD ATTEMPTS
```CS
Defaults        passwd_tries=3
```
if the user enters the wrong sudo password more than 3 times -> denied.

---
### REQUIRE TTY FOR SECURITY
TTY stands for Teletypewriter and refers to a tertminal interface in Unix/Linux systems. It allows users to interact with the system throught a command-line interface. Each terminal session (like SSH or a TTY device)
```cs
Defaults      requiretty
```
This ensures sudo is allowed **only** in a real terminal (not from scripts).

---
### USE SECURE PATH 
```cs
Defaults    secure_path="/usr/local/sbin:/usr/losr/sbin:/usr/bin:/sbin:/bin"
//this just example not use the text
```

This means **sudo only runs programs from specific, trusted locations** on your system. It prevents a hacker from putting a fake program somewhere else and tricking `sudo` into running it instead of the real system command.
Think of it like a VIP list of safe places—sudo will **ignore programs outside that list**.

---
## MONINORING SCRIPT PART

---
## Primary and logical partitions
Great observation! The **sda2 partition is created automatically by the Debian installer** in certain scenarios. Let me explain when and why:

## Why sda2 Appears Automatically

### Scenario 1: Extended Partition (MBR/MSDOS)

When using **MBR/MSDOS partition table** with more than 4 partitions:

```
sda1 - Primary partition (/boot)
sda2 - Extended partition (container) - AUTOMATIC
  └─ sda5 - Logical partition (LVM/encrypted) - inside sda2
```

**What happens:**

- You can only have 4 primary partitions in MBR
- If you create a logical partition (sda5), the installer **automatically creates sda2 as an extended partition** to contain it
- The extended partition (sda2) is just a container with 1K size
- **You don't manually create it** - it appears automatically

---
## what is PAM

--
### <span class="color-green">Host Wordpress page </span>

![[Wordpress page]]


- `/boot`: stores kernel & bootloader files
- `/ (root)`: main filesystem where **OS and most files live**.
    **Why** : without it, the system can't run.
- `swap`: space extends RAM when real one is full.
    **Why** : helps the system not crush if memory is low.
- `/home`: where user files (documents, pictures, setting) are stored.
    **Why** : keeps personal files separate from system files.
- `/var`: Stores **changing data** like logs, emails, databases.
    **Why** : prevents changing files from filling up the main closet /.
- `/srv` : Data for **services you run**, like a web server or FTP server.
    **Why** : keeps service-related files organized and separate.
- `/tmp` : Temporary files programs create.
    **Why** : can be cleaned anytime without affecting other files
- `/var/log` : stores system logs
    **Why** : Keeps a record of what the system is doing without cluttering `/var` or `/`.