### Why i choosed debian 
it a friendly use operating system for staping a server easly and from the instruction they tell that rocky is need more technical experience, this in simple why i prefer debian and it's a long time from start using debian in my kali linux laptop.
<span class="color-yellow">CentOS vs Debian</span>

| Feature             | CentOS                                    | Debian                                 |
| ------------------- | ----------------------------------------- | -------------------------------------- |
| **Linux Family**    | RHEL (Red Hat Enterprise Linux)           | Independent, community-driven          |
| **Based on**        | RHEL source code                          | Original distribution                  |
| **Target Audience** | Enterprise servers, stability-focused     | Servers, desktops, and community users |
| Use                 | entreprise, web hosting, professional use | community projects, servers, education |

---
# Vertualisation

**Virtualization** is a technology that lets you run **multiple operating systems** on a _single_ physical computer **at the same time**.
A **Virtual Machine (VM)** is a _fake computer_ that runs inside your real computer.
in simple way : **Virtualization** = technique to create isolated computers inside your real computer
**Virtual Machine** = one of those isolated computers

---
# Hypervisors 

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

**LVM (Logical Volume Manager)** is a flexible disk management system for Linux. Think of it as a layer between your physical hard drives and your file system that makes managing storage much easier.

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
    - **Why separate?** because the **BIOS** can't read from logical partitionis, and GRUB bootloader needs a simple, unencrypted partition it can read before the OS loads
    - Must be outside LVM/encryption so the system can boot
- **`sda2` (1KB)**: Extended partition container (holds sda5)

## The Encryption Layer
### sda5_crypt (LUKS Encrypted Container)
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
# Server

A **server** is a computer — often with stronger resources — that **responds to requests from client devices** by providing specific services such as websites, email, DNS, files, databases, or applications.

---
# apt and aptitude 

## apt

**`APT`Advanced Package Tool**
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
```shell
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
# SSH

**SSH** is a secure protocol that lets you **remotely connect to another computer** through an encrypted terminal.  
You can use it to run commands, manage servers, transfer files, and administer machines safely over a network.

```shell
sudo apt install openssh-server
```
### change the default port of ssh

```shell
nano /etc/ssh/sshd_config
```
**<span class="color-yellow">Change Port 22 to Port 4242 and set PermitRootLogin to no. Remember to uncomment the lines after making changes.</span>**
```shell
Port 4242
.
.
. 
PermitRootLogin no
```

**start service **
```shell
sudo systemctl enable ssh
sudo systemctl start ssh
sudo systemctl restart ssh
```
**to see ip address to connect using other machine:** 
```shell
hostname -I
```
**check ssh status** 
```shell
sudo systemctl status sshd
```

**Connect with ssh server
```sh 
ssh hostname@ipaddress
```

**Execute command without login**
```sh
ssh hostname@ipaddress "sh -c 'commadn'"
```

**verify the listening port on the server:**
```shell
sudo ss -tulpn | grep ssh
```
**debugging ssh**
```sh
ssh -v -p 2343 user@ip 
ssh -vvv -p 2343 user@ip 
```
### <span class="color-purple">You need also</span> 

- what is **Hostname** : is the name of a device on a network.
to see your hostname :
```shell
hostname 
```
see the ip address of your machine
```shell 
hostname -I 
```
change the hostname : 
```shell
sudo hostnamectl set-hostname newhostname 
```
and change it also in this file:
```shell
vim /etc/hosts
```

--- 
# AppArmor Security

AppArmor is a **Linux security module** (LSM) that **limits application kernel access AppArmor is a firewall, but for applications instead of network traffic**.


### **Just To know **
#### **<span class="color-yellow">What a profile is</span>**
A file that defines permissions for an application (file access, network, capabilities).
Starting from **Debian 10 (Buster)** and later (11, 12, now 13), **AppArmor is installed and enabled by default**.
#### **Where profiles are located**
```shell
/etc/apparmor.d/
```
#### **Check AppAromor status**
```shell
sudo aa-status
```
#### How to check systemd service
```java
sudo systemctl status apparmor
```


---
# Firewalls   

A firewall is a security system that controls network traffic
and decides which IP addresses and which ports should be accessed.
In general, it protects your private network from unauthorized connections.
### It takes the actions
- **ACCEPT** → let packet pass
- **DROP** → silently drop packet (no response)  
- **REJECT** → block and send "connection refused"

### Linux ufw

(Unconplicated Firewall) is a simple command-line tool on Linux (mainly Ubuntu/Debian) used to configure the system firewall easily.
is not a firewall itself it just a tool to controle linux system firewall So when you use UFW, you're really just telling Netfilter what rules to enforce, but in a much simpler way than writing iptables commands directly.

#### See active rules
```cs
sudo ufw status
```
#### Install it If not installed
```bash 
sudo apt install ufw
```
#### Enable/Desable
```bash
sudo ufw enable    # or disable
```
#### Allow Port
```cs
sudo ufw allow 22
```
#### Deny
```cs
sudo ufw deny 23
```
#### Delete a rule
```cs
sudo ufw delete deny 10.13.100.13
sudo ufw delete deny from 10.13.100.13
```
#### Allow/Deny all in/out
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

# Password Policies

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

### 2. part II
To strengthten the password policy, we will utilize a module called pwquality:
```cs
sudo apt install libpam-pwquality
```
### configure
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



### 4. Apply expiration settings to existing users

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
# Superuser do configuration

It allows a normal user to run commands with root (administrator) priviliges, without logging in as root.
sudo is a program and it uses a special group (sudo) to control who can use it.Wordpress
#### 1. change time for test issues
```cs
timedatectl set-time yyyy-mm-dd
```

#### 2. add or remove a user from sudoers
add : 
```c
usermod -aG sudo username
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
#### 2. How to use visudo
run `visudo` , you will se something like this:
```sql
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL
```

This means:
- **root** can run everything
- **members of sudo group** can run everything with sudo
#### 3. adding a specifc user with previlige
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
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
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
## configure new user
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
sudo chsh -s /bin/zsh #and restart session
```

---
# Monitoring Script

`uname -a` command
```c
Linux achahi42 6.1.0-41-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.158-1 (date) x86_64 GNU/Linux
```
`Linux` is the name of the kernel
`achahi` the hostname.
`6.1.0-41-amd` the kernel version.
`debian 6.1.158-1` base system distribution

```cs 
   lscpu
```
This command display more details about the cpu.

###  `ss` command : 
it stand for socket statistic.
`-a` option to show all sockets.
`-t` show tcp connections.

#### Essential System Utilities for the the script 

#### **`bc` (Basic Calculator)**
Command-line calculator for mathematical operations and floating-point calculations in scripts.
#### **`sysstat1` (System Statistics)**
Collection of performance monitoring tools (sar, iostat, mpstat) to track CPU, memory, and I/O usage.

#### Instalation
```cs
sudo apt install bc sysstat
```

### remember we excluded the /boot partition because: 
 not user-accessible storage
### remember we use the seconde sample of the output
 because the first one not for live statements 

#### `journalctl` is **the tool/command set that lets you read, filter, and query logs stored in systemd’s binary format**.
and this `_COMM=name` make able to filtre its output to just the command names 

## What `cron` is
- **`cron`** is a Linux utility to run scripts or commands **automatically at scheduled times**.
- **You do not need “all terminals”** — cron runs tasks in the background, independent of terminal sessions.

### to edit it : 
```bash
crontab -e 
```
it open a file that you can add your script:
add this in the end of file 
```bash
*/10 * * * * /path/to/your/script.sh
```
each start means a timeline just add slash and type number after:
```cs
* * * * * command_to_run
│ │ │ │ │
│ │ │ │ └─ day of week (0-7, Sunday=0 or 7)
│ │ │ └── month (1-12)
│ │ └─── day of month (1-31)
│ └──── hour (0-23)
└───── minute (0-59)
```



--- 
# Super Simple WordPress Setup Guide

### STEP 1: Install the Web Server

```bash
sudo apt install lighttpd
```

**What just happened?** You installed a program that shows websites to people on the internet.
**lighttpd** is a webserver, it manage client requistes, listens for visitors and shows them web pages.

### STEP 2: Open the Door for Visitors

```bash
sudo ufw allow 80
```

You told the firewall to let people visit your website.

### STEP 3: Install the Database

WordPress needs a place to save your posts and settings.
```bash
sudo apt install mariadb-server
```
You installed a database (like a filing a storage space for your website's information).

### STEP 4: Make the Database Secure

```bash
sudo mysql_secure_installation
```

You'll be asked some questions. Here's what to answer:

- **Use unix authentication?** → Type `N` and press Enter
- **Change root password?** → Type `N` and press Enter
- **Remove anonymous users?** → Type `Y` and press Enter
- **Disallow root remote login?** → Type `Y` and press Enter
- **Remove test database?** → Type `Y` and press Enter
- **Reload privileges?** → Type `Y` and press Enter



### STEP 5: Create a Space for WordPress

Now we'll create a special storage area for WordPress.
**Copy each line one at a time:**

```bash
sudo mariadb
```

You're now inside the database. Copy these commands **one by one**:

```sql
CREATE DATABASE my_wordpress;
SHOW DATABASES;
```

```sql
GRANT ALL ON my_wordpress.* TO 'wpuser'@'localhost' IDENTIFIED BY 'ChangeThisPassword123!' WITH GRANT OPTION;
```

⚠️ **IMPORTANT:** Change `ChangeThisPassword123!` to your own password!

```sql
FLUSH PRIVILEGES;
```

```sql
exit;
```
You created a storage box called "my_wordpress" and gave WordPress a key to access it.

### STEP 6: Install PHP (WordPress's Language) 

```bash
sudo apt install php-cgi php-mysql
```
**php-cgi** : PHP Common Gateway Interface, is a php script interpreter
because the webservices use php in backend like wordpress pages.

WordPress is written in PHP, so you installed the translator that makes it work.

### STEP 7: Download WordPress

```bash
apt install wget
```

```bash
cd /var/www/
wget http://wordpress.org/latest.tar.gz 
```

```bash
tar -xzvf latest.tar.gz
```

```bash
rm latest.tar.gz
```

```bash
#rename the html file to another name and give the name to the wordpress dir
mv html/ html_back
mv wordpress/ html
```

```bash
sudo chmod -R 755 html
```
`-R` = Recursive
- It means the command applies **to the folder and everything**

You downloaded WordPress and put it in the right place.



### STEP 8: Connect WordPress to the Database
always inside /var/www/html
```bash
sudo cp wp-config-sample.php wp-config.php
```

```bash
sudo vim wp-config.php
```

A text editor will open. Find these three lines and change them:

**Change this** with the mariadb database name, user and password.

```php
define( 'DB_NAME', 'database_name_here' );
define( 'DB_USER', 'username_here' );
define( 'DB_PASSWORD', 'password_here' );
```
**Save and exit:**

### STEP 9: Make Everything Work Together

```bash
sudo lighty-enable-mod fastcgi-php
```

```bash
sudo service lighttpd force-reload
```

**What just happened?** You connected PHP to your web server.


### STEP 10: Finish the Setup

Open your web browser and go to:

```
http://YOUR_SERVER_IP
```

You should see WordPress asking you to:

1. Choose your language
2. Create your admin account
3. Name your website

**Follow the steps on screen and you're done!**



## Log In to Your Website

After setup, visit:

```
http://YOUR_SERVER_IP/wp-admin
```

Use the admin username and password you just created.



### Success Checklist
- [ ] Can you see the WordPress setup screen?
- [ ] Can you create your admin account?
- [ ] Can you log in to `/wp-admin`?

If you answered YES to all three → **Congratulations! Your WordPress site is live!** 🎊



### Quick Troubleshooting

**Can't connect to database?**  
Go back to Step 8 and double-check your password matches Step 5.

**Can't access the website?**  
Make sure you completed Step 2 (firewall) and your server IP is correct.

**See a blank page?**  
Run Step 9 again to restart the server.

### What Next?

i shoosed a service that display the state of your service, and resources used by the server `monixtorix`.

**instalation**
```bash
sudo apt install monitorix -y
```

**Enable service**
```bash 
systemctl restart monitorix
```

**Allow the port 8080 Used by the service**
```bash 
sudo ufw allow 8080
```
