s_Open Shortest Path First_
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

**ABRs** is an OSPF router that connects two or more OSPF areas, including the backbone area0 and exchanges routing informations between them.

**The backbone area**:(area 0) is an area that all other areas must connect to
  #### backbone routers: Routers connected to the backbone area(area 0)

<span style="color:rgb(0, 176, 240)">Intra-area route</span>: is a route to a destination inside the same OSPF area.
<span style="color:rgb(255, 192, 0)">Interarea route</span>: is a route to a destination in a different ospf area.


OSPF areas should be _contigorus_

---
## OSPF Configuration (Cisco IOS)

### 1. Enable OSPF on a router

```
Router(config)# router ospf 1
```

- `router ospf`: Starts an OSPF routing process.
- `1`: OSPF process ID (PID), ranging from **1 to 65535**.
- The **OSPF process ID is locally significant**. Routers with different process IDs can still become OSPF neighbors.
    
### 2. Add networks to an OSPF area
**Syntax:**
```
Router(config-router)# network <network-address> <wildcard-mask> area <area-id>
```
**Example: Add two networks to Area 1**
```
Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 1
Router(config-router)# network 10.0.0.0 0.0.0.3 area 1
```

- `192.168.1.0`: Network address used to match interfaces.
- `0.0.0.255`: Wildcard mask (inverse of `255.255.255.0`).
- `area 1`: Assigns matching interfaces to OSPF Area 1.

**Important:** The OSPF `network` command requires an area ID. It selects interfaces based on their IP addresses, enables OSPF on those interfaces, and advertises their connected networks.

### 3. Configure the OSPF Router ID (optional)

```
Router(config-router)# router-id 1.1.1.1
```

The Router ID is a unique 32-bit identifier for an OSPF router.

If not configured manually, OSPF typically selects:
1. Highest IP address on an active loopback interface.
2. Otherwise, highest IP address on an active physical interface.

### 4. Verify OSPF

```
Router# show ip ospf neighbor
Router# show ip ospf interface brief
Router# show ip protocols
Router# show ip route ospf
```

- `show ip ospf neighbor`: Displays OSPF neighbors and adjacency states.
- `show ip ospf interface brief`: Shows interfaces participating in OSPF and their areas.
- `show ip protocols`: Displays routing process configuration.
- `show ip route ospf`: Displays routes learned through OSPF.

### 5. Important CCNA Notes

- OSPF **process IDs do not need to match** between routers.
- The **area ID must match** between OSPF neighbors on the same link.
- Every OSPF `network` command must specify an area.
- **Area 0 is the backbone area** in multi-area OSPF.
- For the **CCNA exam**, you are expected to configure single-area OSPF (Area 0), while understanding multi-area OSPF concepts.
- OSPF uses **cost**, primarily based on interface bandwidth, as its routing metric.


---
## OSPF's metrics 

**is called <span style="color:rgb(255, 192, 0)">cost</span>***

**Cost** = _reference bandwith/interface bandwith_
- but if the cost calculation result is less than 1 it be by default 1.

##### Show ip informations about an interface
```
router# show ospf interface f0/1
```

##### Change the reference bandwith 
!! You should 
```
(config-router)# auto-cost reference-bandwith <mum>
```
<span style="color:rgb(255, 192, 0)"><span style="color:rgb(255, 192, 0)">Please enssure reference bandwith is consistent accross all routers</span></span> 


##### Mannually configure cost of interface
```
(config-if)# ip ospf cost <num>
```

---
 