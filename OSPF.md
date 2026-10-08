_Open Shortest Path First_
- Uses the **Shortest Path First** Algorithm of dutch computer scientist Edsger Dijkstra. AKA _Dijkstra's algorithm_

- have 3 versions 
    OSPFv1(1989): OLD, not in use anymore
    OSPFv2(1998): Used for IPv4 
    OSPFv3(2008): Used for IPv6(can also be used for IPv4, but usually v2 is used)
- Routers store information about the network in _LSAs_ (Link State Advertisements), 
- which are organized in strucure called the LSBD(Link State Database).
---
## Connectivity Maps 

Routers will flood LSAs until all routers in the OSPF area develop the same map of the network (LSDB).
### LSDB
![[Pasted image 20261008163629.png|518]]

**LSDB is identical on all routers**
LSDB is filled using the flooding of LSA by all routers 
- the LSA has 30min *aging timer*.
---
## Determining Best route process

There are three main steps:
1. Bocome Neighbors with other routers connected to the same segment
2. Exchange LSAs with Neighbor routers.
3. Calculate the best routes to reach destination, and insert them into the routing table
---
## Network sigmentation 
OSPF uses areas to divide up the network.

- OSPF devide the network to separate ereas cause single areas network are not efficient and consume processing energy and make it harder to update the LSDB
<span style="color:rgb(0, 176, 240)">Routers in the same area</span>: _internal routers_
<span style="color:rgb(0, 176, 240)">Routers with interfaces in multiple areas</span>: _area border routers (ABRs)_

**ABRs** maintain a separate LSDB for each area they are connected to. 
 > recommended to do not connect an ABR to more than 2 areas cause this overburden the router

**The backbone area**:(area 0) is an area that all other areas must connect to
  #### backbone routers: Routers connected to the backbone area(area 0)

<span style="color:rgb(0, 176, 240)">Intra-area route</span>: is a route to a destination inside the same OSPF area.
<span style="color:rgb(255, 192, 0)">Interarea route</span>: is a route to a destination in a different ospf area.


OSPF areas should be _contigorus_

---
