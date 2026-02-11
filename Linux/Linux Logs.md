Traditional Log Files (/var/log/)

## Table of Contents
- [[#Key locations]]
- [[#View Traditional logs]]
- [[#Systemd journal (journalctl)]]

---
# Key locations

```shell
/var/log/syslog          # General system log (Debian/Ubuntu)
/var/log/messages        # General system log (RHEL/CentOS)
/var/log/auth.log        # Authentication logs (Debian/Ubuntu)
/var/log/secure          # Authentication logs (RHEL/CentOS)
/var/log/kern.log        # Kernel messages
/var/log/dmesg           # Boot messages
/var/log/boot.log        # System boot
/var/log/cron            # Cron jobs
/var/log/apache2/        # Apache logs
/var/log/nginx/          # Nginx logs
/var/log/mysql/          # MySQL logs
```

# View Traditional logs

```shell
tail -f /var/log/syslog                    # Follow in real-time
tail -n 50 /var/log/auth.log               # Last 50 lines
grep "error" /var/log/syslog               # Search for term
less /var/log/syslog                       # Page through log
```


---
# Systemd journal (journalctl)

**journalctl** is powerfull command, show a compilation of all recent logs and actions.
_Example:_
```shell
journalctl                                 # View all logs
journalctl -b                              # Current boot only
journalctl -b -1                           # Previous boot
journalctl -f                              # Follow in real-time
journalctl -n 50                           # Last 50 entries
journalctl -r                              # Reverse order (newest first)
```







[[Linux]]