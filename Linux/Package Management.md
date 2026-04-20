>Package management handles software installation, updates, configuration, and removal in Linux. It manages collections of files and tracks software prerequisites automatically.

## Table of Contents
- [[#Package Managers]]
- [[#Packages Repositories]]
- [[#Snap]]
- [[#Listing installed Packages]]
- [[#Package Storage Locations]]
- [[#Update packages]]

---
# Package Managers
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


## aptitude

More advanced, menu-based version of apt
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


## yum

a powerful, open-source command-line package management utility for Linux distributions that use the <span style="color:rgb(255, 0, 0)">Red Hat Package Manager (RPM)</span> format.
**Example use**
```shell
sudo yum install nginx
```


## dnf

DNF = **Dandified YUM** (basically “better yum”) <span style="color:rgb(255, 0, 0)">RHEL</span> family
```shell
sudo dnf install nginx
```

---
# Packages Repositories

**Linux**(open source OS) provides various software tools and applications to users. One of the essential elements of the **Linux** ecosystem is the idea of software **repositories**. Software **packages** are reserved in **repositories** which are centralized zones where the **packages** can be **kept**, **manipulated**, and **distributed**.

|> <mark style="background: #ABF7F7A6;">The package manager</mark> is connected to the package Repositories, 
requist packages by providing **package name**, **version**, **dependencies**, and other **metadata** the system needs

---
# Snap

Snap is a modern Linux package management system by Canonical providing self-contained packages with all dependencies included.

**self-contained package** (or self-contained application) is
a software distribution method that includes the application code, all its dependencies, and the necessary runtime environment (such as the Java Runtime Environment - JRE, or .NET runtime) in a single bundle.

---
# Listing installed Packages

## Debian/Ubuntu (APT-based)
```shell
# List all installed packages
dpkg -l

# List all installed packages (names only)
dpkg --get-selections | grep -v deinstall

# List with apt and grep just installed not also the update
apt list --installed | grep installed 

# Count installed packages
dpkg -l | grep ^ii | wc -l
```

## Red Hat/CentOS/Fedora (RPM-based)
```shell
# List all installed packages (RPM)
rpm -qa

# List all installed packages (DNF - Fedora/newer RHEL)
dnf list installed

# List all installed packages (YUM - older RHEL/CentOS)
yum list installed

# Count installed packages
rpm -qa | wc -l
```
---
# Package Storage Locations


## Debian/Ubunto(dpkg/apt)
```
# Installed package files
/var/lib/dpkg/info/          # Package control files, scripts, file lists
/var/lib/dpkg/status         # Database of installed packages
```
**Downloaded package cache**
```
/var/cache/apt/archives/     # .deb files downloaded by apt
```
**Package lists/metadata**
```
/var/lib/apt/lists/          # Available package information from repositories
```


## Red Hat/CentOS/Fedora (RPM/DNF/YUM)

**RPM database**
```
/var/lib/rpm/                # RPM package database
```
**Downloaded package cache**
```
/var/cache/dnf/              # DNF cache (Fedora/newer RHEL)
/var/cache/yum/              # YUM cache (older RHEL/CentOS)
```
**Package metadata**
```
/var/lib/dnf/                # DNF metadata
/var/lib/yum/                # YUM metadata
```

---
# Update packages

## Ubunto/Debian(apt)

```shell
# Update package lists first
sudo apt update

# Upgrade a specific package
sudo apt install <package-name>

# Or use upgrade command
sudo apt install --only-upgrade <package-name>

# Example
sudo apt install --only-upgrade firefox
```


## RedHat (fedora/centOs)

```shell
# DNF (Fedora/newer RHEL/CentOS)
sudo dnf upgrade <package-name>

# Or
sudo dnf update <package-name>

# Example
sudo dnf upgrade firefox

# YUM (older RHEL/CentOS)
sudo yum update <package-name>
```



in Theme of [[Linux]]
