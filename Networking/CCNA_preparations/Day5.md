# Ethernet fram componnents 


preamble 
you should know its position
its lenght 
the exact two functions

![[What_is_the_Structure_of_the_Ethernet_Frame_Format.png]]

### Prealm 
First part of a Ethernet frame, 7bytes length alternation between 1 and 0s, and used for syncronisation betweent the sender and the receiver.
### Start Frame delimiter(SFD)
Its length is 1byte(8bits), and marks the end of the syncronisation, and the start of the real frame begining at the Destination Address

### Destination and Source MAC addresses
the destination MAC address and the source MAC address.
