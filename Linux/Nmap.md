_(Network Maper)_
Nmap can provide further information on targets, including reverse DNS names, operating
system guesses, device types, and MAC addresses.

the default scan without specifying port or flags make you scan 

nmap has 4 types of scans : 
arp 
icpm 
tcp 
  udp

-O to search of Operating Systems 
sT: `s` means scan and `T` means TCP
sS Means SYN scan
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