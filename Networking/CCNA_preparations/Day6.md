# Day 6 — Jeremy's IT Lab (CCNA 200-301 Free Course)

## Overview

Day 6 continues **Ethernet LAN Switching**, focusing on Layer 2 of the OSI model: ARP, the Ethernet frame, and how switches build and manage their MAC address table. It includes hands-on demos using GNS3 and Wireshark.

**Topics covered in this lesson:**

- Ethernet Frame (review)
- ARP (Address Resolution Protocol)
- ARP Request / ARP Reply
- ARP Table
- Ping demo (GNS3 + Wireshark packet capture)
- MAC Address Table on switches
- Clearing the MAC Address Table (CLI)

---

### MAC Address Table on Switches

The switch dynamically builds a table mapping **MAC address ↔ switch port**, so it knows where to forward frames instead of flooding them out every interface.

**Show the MAC address table:**

```
Switch# show mac address-table
```

**Show only dynamically learned entries:**

```
Switch# show mac address-table dynamic
```

---

### Clearing the MAC Address Table

**Clear the entire dynamic MAC address table:**

```
Switch# clear mac address-table dynamic
```

**Clear MAC addresses learned on a specific interface only:**

```
Switch# clear mac address-table dynamic interface [interface-id]
```

Example:

```
Switch# clear mac address-table dynamic interface fastEthernet 0/1
```

**Clear a specific MAC address only:**

```
Switch# clear mac address-table dynamic address [mac-address]
```

Example:

```
Switch# clear mac address-table dynamic address 0050.56A3.1B2C
```

---

### Automatic Removal After 5 Minutes — "MAC Address Aging"

The concept name for dynamic MAC addresses being automatically removed from the table after a period of inactivity is:

> **MAC Address Aging** (aka the **Aging Timer** / **Aging Time**)

- Default aging time on Cisco switches: **300 seconds (5 minutes)**
- Only entries with **no traffic seen from that MAC** during the timer window are removed — it's not a full-table wipe.
- Any MAC actively sending frames has its timer reset continuously, so it never ages out while active.
- Check/adjust the aging time:

```
Switch# show mac address-table aging-time
Switch(config)# mac address-table aging-time [seconds]
```

---

## Related Notes

- [[Day5]] — Ethernet Frame structure, EtherTypes
- [[Day7]] — IPv4 Addressing

### Questions:
- how to view the whole mac address table .
- view only dynamic view