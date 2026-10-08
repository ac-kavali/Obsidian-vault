## RIP

### RIPv1 
- RIPv1 messages are sent as broadcast messages to broad-cast ip (255.255.255.255)
- 
### RIPng 

   


### RIP configuration
>Enter RIP configuration mode
```
(config)# router rip

```


### Modify the administrative destance
```
(config)# distance [distance]
```

### RIP messages types
- request: router
---
### EIGRP router ID selection
1. manually configured
2. Highes ip address on a loopback interface 
3. highest ip address on a physical interface

--- 
### EIGRP messages Multi-cast messages:
- EIGRP messages are Multicast to the ip address `224.0.0.10`
