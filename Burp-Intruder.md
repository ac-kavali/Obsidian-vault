---
tags: [pentesting, burpsuite, intruder, fuzzing, brute-force]
title: Burp Intruder
---

# 🎯 Burp Intruder

> [!info] What it does
> Sends the same HTTP request repeatedly, swapping in different payload values at marked positions — used for fuzzing, brute-forcing, and parameter testing.

---

## 1. Community vs Pro — Speed
| | Community (Free) | Professional |
|---|---|---|
| Request rate | **Throttled** — deliberately slowed, roughly cited around ~1 req/sec in practice | **Unthrottled** — full speed |
| Concurrency control | None | **Resource Pool**: set max concurrent requests + delay between requests |

> [!warning] No official published number
> PortSwigger doesn't publish an exact rate limit for Community — it's simply "intentionally throttled" and not configurable. Fine for a handful of payloads; impractical once you're into the hundreds/thousands. Pro removes the throttle entirely.[^1]

---

## 2. Target Tab
- **Host** — target IP/domain
- **Port** — target port
- **Use HTTPS** — TLS toggle

> Auto-filled when sending a request to Intruder (right-click → *Send to Intruder*, or `Ctrl+I`).

---

## 3. Positions Tab
- Mark insertion points with `§...§` (e.g. `username=§admin§`)
- **Add §** — wrap selected text manually
- **Clear §** — remove all markers
- **Auto §** — auto-detect likely parameters
- **Attack type** selector also lives here (see §6)

---

## 4. Payloads Tab
- **Payload set** — which position (1, 2, 3…) you're currently configuring
- **Payload options** — the actual values: pasted list, loaded file, or generated
- **Payload processing** — transform rules before sending (prefix/suffix, encode, hash, etc.)
- **Payload encoding** — URL-encode special characters (on by default)

---

## 5. Payload Types (per position)
| Type | Use |
|---|---|
| Simple list | Manually pasted / loaded wordlist |
| Runtime file | Streams a large file line-by-line (low memory) |
| Numbers | Sequential or random number range |
| Dates | Date range generator |
| Brute forcer | Generates all combinations for a charset + length |
| Character substitution | Leetspeak-style swaps on a base list |
| Case modification | Upper/lower case variants |
| Username generator | Derives usernames from name lists |
| Extension-generated | Payloads produced by a loaded extension |

> [!tip] Each marked position has its own independent payload set + type.

---

## 6. Attack Types
| Type | Payload sets | Behavior | # Requests |
|---|---|---|---|
| **Sniper** | 1 | Payload goes into **one position at a time**; other positions stay at baseline value | `positions × payloads` |
| **Battering ram** | 1 | **Same payload** inserted into **all positions at once** | `payloads` |
| **Pitchfork** | Multiple (1/position) | All sets **iterate in lockstep** (index *i* of every set together) | `size of smallest set` |
| **Cluster bomb** | Multiple (1/position) | Tries **every combination** across sets (Cartesian product) | `product of all set sizes` |

> [!example]
> - **Sniper** → fuzz one parameter (XSS/SQLi payloads) across several insertion points, one at a time
> - **Battering ram** → same token/value needed in header *and* body simultaneously
> - **Pitchfork** → known username:password **pairs** from a leaked list
> - **Cluster bomb** → brute-force username **×** password with no known pairing

---

## 7. Common Wordlist Paths (Kali / PwnBox)
```

/usr/share/wordlists/rockyou.txt                              # gunzip first if .gz
/usr/share/seclists/                                          # full SecLists collection
/usr/share/seclists/Passwords/
/usr/share/seclists/Usernames/
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/seclists/Discovery/Web-Content/big.txt
/usr/share/wordlists/dirb/common.txt
/usr/share/wordlists/dirb/big.txt
/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

```

> [!note] Extract rockyou if needed:
> `sudo gunzip /usr/share/wordlists/rockyou.txt.gz`

---

## Related Notes
- [[Web-Proxy-Setup-Burp-ZAP]]
- [[Burp Repeater]]
- [[Password Attacks]]

[^1]: Community throttling vs. Pro's unthrottled Intruder is widely documented by third-party Burp guides; PortSwigger itself just states Community includes a "lite" Intruder without publishing exact figures.
