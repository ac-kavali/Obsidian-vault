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

### Length/Type 
(EherType) this feild size is 2 Bytes, cames right after the source mac adress, before the data payload, this feild has dual meaning, depend on the value :
- if its  <=1500 it represent the length: tells you how many bytes of data follows in the paylaod.
- if its >= 1536 its represent the type : identifies which upper layer is carried in the paylaod.
**Common EtherType values**:
 - 0x800: IPv4
 - 0x806: ARP
 - 0x86DD: IPv6
 - 0x8100: 802.1Q(Vlan tagging)

### Frame Check Sequence FCS
Its the only part of the frame footer, with 4 bytes(32bit) in length, detecte currupted data by running a CRC algorithm over the received data
CRC=Cyclic Redundency Check
