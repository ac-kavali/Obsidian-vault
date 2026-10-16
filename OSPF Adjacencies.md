## The neighbor states :
##### 1. Down
No valide hello has been received from the neighbor.


--- 
## Designated Router (DR&BDR)
##### First let's know the types of networks

<span style="color:rgb(0, 176, 240)">Broadcast</span>: Enabled on `Ethernet` and `FDDI` interfaces by default.

<span style="color:rgb(0, 176, 240)">Point-to-point</span>:

<span style="color:rgb(0, 176, 240)">Non broadcast</span>:


#### Serail connection
One side of  serial connection functions as <span style="color:rgb(0, 176, 80)">DCE</span> (Data Communication Equipement)
Where you need to configure the clock rate with the command of : 
```
clock rate xxxx
```
ethernet connection use the `speed` command but serial connection use `clock rate`

The other side function as functions as <span style="color:rgb(0, 176, 80)">DTE</span> (Data Terminal Equipement).

##### Change the encapsulation
_Default encapsulation of a serial port is HDLC_
- Change it to PPP:
```
R1(config-if)# encapsulation ppp
```

##### Command to identify DCE and DTE ends:
```
R1# show controllers s2/0
``` 

