
>Services, called also deamons or units, they are a background processes start automaticaly when booting system, without interaction from the user, like sshd or apache2.

## Table of Contents
- [[#The PID 1]]
- [[#Units]]
- [[#Manage services]]
- [[#Service Directories]]

---
# The PID #1

Process number 1 (PID 1) is the init system. On modern Linux systems, it is called _systemd_.is the **very first user-space process** started by the Linux kernel after booting.
**You can check it usig** 
```bash 
 htop #and click the pid to sort by PID
```

#### What does PID 1 do?
>PID 1 or init process, is basically the **boss of the system**:

 Starts the entire system
- Launches all essential services:
    - networking   
    - SSH    
    - cron 
    - display manager  
    - Docker, databases, etc.

 Parent of (almost) all processes
\- Every process ultimately descends from PID 1
\- if a parent process dies, the orphaned process gets **adopted** by PID 1
* Example :
```bash
pstree -p 
```

---
# Units
#### **systemd = a manager**
>systemd is like a **system manager** that can handle many types of “things”.
#### ****Units = things systemd can manage**
>A **unit** is _anything_ systemd can start, stop, track, or order.

<span class="color-blue">Service </span>its just a type of units. e.g ssh.service

| Unit type  | What it does        |
| ---------- | ------------------- |
| `.service` | Runs a program      |
| `.timer`   | Schedules something |
| `.socket`  | Listens on a port   |
| `.mount`   | Mounts a filesystem |
| `.target`  | Groups other units  |


---
# Manage services

## Systemctl
**is the command to talk to systemd(PID 1).
Think:

> **systemd = the manager**  
> **systemctl = the remote control**

**Command list**
```bash
systemctl start ssh    # start it now not in the boot
systemctl stop ssh     # stop service now not in the boot 
systemctl restart ssh  # Stop then start service again
systemctl reload ssh   # Reload config without stoping service
systemctl enable ssh   # start the service on the boot but not now
systemctl disable ssh  # desable service on the boot and not now 

systemctl status ssh   # show informations like running/no, logs, pid...
```
**`service`** is a ligacy command but, can do the same what do systemctl but systemctl is the real, modern one.

---
# Service Directories

>A service is **not just a running process**  
>It is **defined by a `.service` file**

### Unit Directory Priority ↓
1. **`/etc/systemd/system/`** (highest)
2. **`/run/systemd/system/`** 
3. **`/lib/systemd/system`**/ (lowest)

---
### A) /etc/systemd/system/
**Admin overrides & custom services**

Examples:
```cs
/etc/systemd/system/ssh.service
/etc/systemd/system/myservice.service
```
- Highest priority
- Used for: 
    - custom services    
    - overrides
    - enabling/disabling services

---
#### B) /run/systemd/system/
**Runtime (temporary) services**
> Created at boot
> Disappear after reboot
> Generated dynamically

---
#### C) /lib/systemd/system/
> **Default services provided by packages**

Examples: 
```cs
/lib/systemd/system/ssh.service
/lib/systemd/system/apache2.service
```
Installed by `apt` 

---
[[Linux]]