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
  - `Flow controle`: 
