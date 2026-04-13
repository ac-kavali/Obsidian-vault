_(Network Maper)_
Nmap is highest industry used tool, that scan and enumerate networks, and provide further information on targets, open ports, services, including reverse DNS names, operating system guesses, device types, and MAC addresses.
\- **What is the core questions that Nmap answers for us**
- Which **system** are **up**?
- What **services** are <span style="color:rgb(6, 178, 8)">running</span> on these systems?

### Command Line Example
```sh
nmap 10.121.12.1
#or 
nmap www.scanme.com
```
The default scan without specifying port or flags make you scan the top 1000 *well know* ports
- **Host discovery Types**: : 
arp 
icpm 
tcp 
udp


-O to search of Operating Systems 
-sT: `s` means scan and `T` means TCP
-sS Means SYN scan
-sn Ping scan no port scaning 
sp means ping scan 
-O used to perform an Operating system scaning and identifing system services on the fsdnetwork. 
-A (agressive scaning) make you able to perform mixed multiple scan types like os scaning, Version scaning, Script scaning, and traceroot.
Speedup your scan 
when you choose speed you may risqu by you being detectable in the target network firewalls. 

 you can list all targets in one command: 
 ```sh
 nmap 192.164.1.1 192.164.0.2 192.168.0.3
 ```
- or scan an astros \* to scan full bloc of ip addresses:
 ```sh
nmap 192.168.1.* 
 ```
 - or scan a few specific devices
```sh
nmap 192.168.1.0,1,2,3,4
```
- or also as a file 
```sh
nmap -iL list_of_hosts.txt
```
