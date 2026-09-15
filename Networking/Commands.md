## Vlan 

```sh
# create vlan
vlan <vlanID>

#Change the defautl native vlan on trunk port  
switchport trunk native vlan [vlan-id]

#Display all trunk ports on the switch:
show interfaces trunk

#remove a sub-interface on a router like g0/0.1 or g0/0.2
no interface g0/0/0.10

#Configure the interface as a trunk port:
switchport mode trunk 

#Configure the allowed VLANs on a trunk port:
switchport trunk allowed vlan allowed-vlans

# Configure the encapsulation type on a trunk port:
switchport trunk encapsulation encapsulation-type



```

## DTP
```sh

```

```
for i in 
```