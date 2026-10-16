# OSPF Neighbor Requirements


## to see the LSDB
```
R1# show ip ospf database
```

> [!abstract] Two routers will only become OSPF neighbors (and reach **Full** / **2-Way**) if all the conditions below are met. If one is wrong, the neighbor is missing from `show ip ospf neighbor` or stuck in a transition state.

## Checklist

| #   | Requirement                      | Symptom if wrong                | Verify with                            |
| --- | -------------------------------- | ------------------------------- | -------------------------------------- |
| 1   | Same **area number** on the link | No neighbor                     | `show ip ospf interface`               |
| 2   | Same **subnet and mask**         | No neighbor                     | `show ip interface brief`              |
| 3   | OSPF **enabled** (not shut down) | No neighbor                     | `show ip protocols`                    |
| 4   | **Unique router IDs**            | No neighbor / LSDB problems     | `show ip ospf`                         |
| 5   | **Hello / Dead timers** match    | No neighbor                     | `show ip ospf interface`               |
| 6   | **Authentication** matches       | No neighbor                     | `show ip ospf interface`               |
| 7   | **IP MTU** matches               | Stuck in **EXSTART / EXCHANGE** | `show interface` / `show ip interface` |
| 8   | **Network type** compatible      | No neighbor or missing routes   | `show ip ospf interface`               |

---

## 1. Area number

Both interfaces on the shared link must be in the **same area**. A link cannot belong to two different areas.

```text
router ospf 1
 network 10.0.0.0 0.0.0.3 area 0        ! or: ip ospf 1 area 0 (interface level)
```

## 2. Same subnet

The two interfaces must be in the **same subnet with the same mask**. Example: `10.0.0.1/30` and `10.0.0.2/30` ✅, but `10.0.0.1/30` and `10.0.0.2/24` ❌.

> [!note] On a **point-to-point** network type, IOS does not check for a subnet match, but you should still keep them identical.

## 3. OSPF not shut down

OSPF can be disabled at three levels. Any of them stops neighbor formation.

```text
! Process level: disables the whole OSPF process (config is kept)
router ospf 1
 shutdown               ! disable
 no shutdown            ! enable

! Interface level: disables OSPF on one interface only
interface g0/0
 ip ospf shutdown       ! disable
 no ip ospf shutdown    ! enable

! Interface itself must be up/up
interface g0/0
 no shutdown
```

> [!warning] Also check `passive-interface` A passive interface is advertised but sends **no Hellos**, so no neighbor forms. Fix: `no passive-interface g0/0`.

## 4. Unique router IDs

Each router needs its own router ID (RID). Duplicate RIDs break neighbor formation or corrupt the LSDB.

```text
router ospf 1
 router-id 1.1.1.1
! apply the change:
clear ip ospf process
```

RID order: manual `router-id` → highest **loopback** IP → highest active **physical** IP.

## 5. Hello and Dead timers

Must be **identical** on both sides. Defaults: **10 / 40** (broadcast, point-to-point) and **30 / 120** (NBMA types).

```text
interface g0/0
 ip ospf hello-interval 10
 ip ospf dead-interval 40
```

> [!tip] Changing Hello on Cisco automatically sets Dead to **4× Hello**.

## 6. Authentication

Auth **type** (none / simple / MD5 / SHA) and **key** must match on both ends, otherwise Hellos are dropped.

```text
interface g0/0
 ip ospf authentication message-digest
 ip ospf message-digest-key 1 md5 MyKey
```

## 7. IP MTU

OSPF exchanges database descriptions (DBD) containing the interface MTU. If they differ, the neighbors get stuck in **EXSTART / EXCHANGE**.

```text
interface g0/0
 ip mtu 1500                 ! make both sides equal (preferred fix)
 ip ospf mtu-ignore          ! workaround: ignore the mismatch
```

## 8. Network type

Both ends should use the **same network type**. The effect depends on the mismatch:

|Mismatch|Result|
|---|---|
|Broadcast ↔ **Point-to-point**|Timers are both 10/40, so a neighbor may appear, but DR/BDR behaviour differs and **routes may be missing**|
|Broadcast ↔ **Point-to-multipoint / non-broadcast**|Timers differ (10/40 vs 30/120) → **no neighbor**|

```text
interface g0/0
 ip ospf network point-to-point
```

---

## Quick troubleshooting flow

```text
show ip ospf neighbor            ! is the neighbor there? which state?
show ip ospf interface g0/0      ! area, timers, network type, auth, passive
show ip protocols                ! router ID, networks, passive interfaces
debug ip ospf adj               ! shows the exact mismatch (use with care)
```

> [!success] Remember **A**rea · **S**ubnet · **S**hutdown · **R**ID · **T**imers · **A**uth · **M**TU · **N**etwork type