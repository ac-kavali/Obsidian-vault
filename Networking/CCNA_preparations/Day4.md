# Intro to the CLI


## Console Cables
### RJ45 - DB-9 <!--also refered as DE-9-->
**DB-9 = one physical face implementation of RS-232 serial communication standard (you 'll find RS-232 on cisco packet tracer)** 
 ![[51z24BHjLuL.jpg|400]]

### USB mini-B
![[CAB-CONSOLE-USB-3-800x800.jpg|400]]

## Console cable types
### Rollover:
**pins connections:**
- 1: 8 
- 2: 7
- 3: 6
- 4: 5
- 5: 4
- 6: 3
- 7: 2
- 8: 1

## Terminal Emulator 
**you can use puTTY on windows or minicom in linux**
steps to configure puTTY:
1. Install puTTY 
2. Choose _Serial_ connection type.
3. Click `Win+X` then Device manager and click `Ports (COM & LPT)` to see wich `COM` port is connected.
4. They are a default setting to remember: 
  - `Speed`:  `9600 bit/s`
  - `data bits`: `8`       <!--data bits and stop bit meas for 8bits of data 1 stop bits is sent to mark the end of the 8bits  -->
  - `Stop`: `1`
  - `Parity`: `None`
  - `Flow controle`: `None`


## Connection
1. You connect to a user exec mode `router>` the distingusted by the `>` symbol
2. Type `enable` to start <strong>Previlleged Exec Mode</strong>
3. use ? to see available command to you.
4. the tab command complet you the command you type in a new line
5. entering just a character make you execute the command like `en` will execute `enable` cause its the only one that start with `en`
6. To see available command that start with a specific letter use `<letter+>?`
---
### Global configuration mode 
In a Cisco router CLI, **Global Configuration Mode** is the mode where you make changes to the **router's overall configuration**.
_you enter it with:_
```
Router> enable
Router# configure terminal
Router(config)#
```
<!--Start use just "conf t"-->

**In Global Configuration Mode** you can set a password:
type : `enable password <your pass>` and press enter
now you will be asked each time to enter it when you try to enable the Previlleged Exec mode 

---
### Config files
*There are two separate configurationi files kept on the device at once* 
- <span style="color:rgb(112, 48, 160)">Running config</span> = the current active configuration file one the device, as you enter commands on the cli you edit the active configuration.
- <span style="color:rgb(112, 48, 160)">Startup configuration </span>= the configuration file that will be loaded uppon restart of the device.
### Show running/Startup config
```
Router# show running-config
or 
Router# show startup-config
```
The router start with default configuratoin not the startup, in the begining there no startup-config 
### Save the Running config to startup-config
```
Router# write
```
also 
```
Router# copy running-config startup-config
```
and 
```
Router# write memory
```

**`copy running-config startup-config`** is the one I'd memorize.

---
### service password-encryption

A Cisco IOS global configuration command that **encrypts plaintext passwords** in the running/startup configuration.
**Syntax:**
```text
Router(config)# service password-encryption
```

**Example:**
```text
Router(config)# service password-encryption
```

After enabling it, passwords such as console, VTY, and `enable password` are stored in the configuration in an encrypted/obfuscated form instead of plain text.
**Important:** It provides only **weak encryption (Type 7)** and is **not considered strong security**. For the privileged EXEC password, prefer:
```text
Router(config)# enable secret <password>
```

**CCNA takeaway:**
> `service password-encryption` = prevents passwords from appearing as plain text in the configuration.

---
