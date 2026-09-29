

somthing about how to use remote desktop 
tool used : RDP, xfreerd, remmina, mstsc.exe, rdesktop

some commands to see informations about the system : 
```
Get-WmiObject -Class win32_OperatingSystem | select Version,BuildNumber
```

**Overview about MSPs and MSSPs**
- default port of rdp : `3389`
  
- `remote desktop` the client of rdp by defaul installed on windows

---
## Create user using GUI and CLI


### Using Powershell 
run PowerShell as admin
```powershell
new-localuser <username> 
```
You'll be prompted to enter a password for it



### Delete a user
```powershell
net user /delete <user>
```


## Operating System Structure and navigation



## ICACLS and permissions
Enheritance 


## Services and service permissions

---

