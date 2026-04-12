

## Ping 
Ping is a network tool used to check if another device is reachable and how long it takes for data to travel to it and back.
- Ping uses the **ICMP** protocol

**Professionnal Use**
```sh
ping -c 1 -W 1 10.11.0.132 
```
`-c` count of signals to send.
`-W` Time deadline perpacket.

Don't assume a host is down just because `ping` fails — ICMP is commonly blocked by firewalls, making the host appear unreachable when it's actually live. This is why tools like **nmap** offer the `-Pn` flag, which skips the ping check entirely and proceeds straight to port scanning, often revealing hosts that would otherwise seem offline.

---
## Netstat
is a network command that show with details your network connectivity and activities. todya the *ss* more replaced it 
```sh
netstat 
```
Show PID / process name`-a`All connections + listening`-r`Routing table`-s`Protocol statistics`-e`Extended info`-c`Continuous output (refresh)

|Flag|Description|
|---|---|
|`-t`|TCP connections|
|`-u`|UDP connections|
|`-l`|Listening ports only|
|`-n`|No DNS resolution (raw IPs)|
|`-p`