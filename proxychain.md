---
tags: [linux, pentesting, proxy, tooling]
---

# Proxychains — Force Any CLI Tool Through a Proxy

> The core idea: **proxychains doesn't need the target tool to support proxies at all.** It hooks into the tool's network calls at the OS level (via `LD_PRELOAD`) and silently redirects them through whatever proxy you configure — so `curl`, a Python script, an exploit module, or a thick client all get proxied the same way, with zero code changes.

## Why this matters for testing

Not every tool has a `--proxy` flag. Scripts, compiled binaries, thick clients, and framework modules (Metasploit, etc.) often talk to the network directly with no proxy option exposed. Proxychains solves that generically: point it at Burp/ZAP, and now **every request that tool makes shows up in your proxy history** — inspectable, repeatable, and editable, exactly like traffic from a browser.

---

## ⚠️ Version note: use `proxychains-ng` (`proxychains4`)

The original `proxychains` project is unmaintained. What you actually want is **`proxychains-ng`**, whose binary is called `proxychains4` — this is what ships in Kali and is the actively maintained version. Keep in mind:

- Command: `proxychains4` (not the old `proxychains`)
- Config file: **`/etc/proxychains4.conf`** (some distros still symlink `/etc/proxychains.conf` to it — check which one your `proxychains4` binary actually reads)
- Functionally a drop-in replacement, but the config file has a few extra options the legacy version didn't (chain modes, remote DNS handling) — covered below

---

## The config file, section by section

```
# --- Chain type: uncomment exactly ONE ---
# dynamic_chain    -> skip dead proxies, chain the rest in order
strict_chain        # -> use ALL proxies, in the exact order listed; fail if one is down
# round_robin_chain -> rotate proxies per connection
# random_chain      -> pick a random proxy per connection

# --- DNS handling ---
proxy_dns            # resolve hostnames THROUGH the chain, not locally (prevents DNS leaks)
remote_dns_subnet 224   # internal fake subnet (224.x.x.x) proxychains uses to map
                        # hostnames when doing remote DNS resolution — leave at default

# --- Timeouts (ms) ---
tcp_read_time_out 15000
tcp_connect_time_out 8000

# --- The actual proxy list ---
[ProxyList]
http 127.0.0.1 8080
```

**What each part does:**

| Directive | Purpose |
|---|---|
| `strict_chain` (or `dynamic_chain` / `random_chain` / `round_robin_chain`) | Only **one** of these should be active. `strict_chain` = predictable single-proxy-in-order behavior — the one you want when routing to Burp/ZAP. |
| `proxy_dns` | Sends DNS lookups through the chain instead of resolving locally first — avoids leaking the target hostname outside the proxy. |
| `remote_dns_subnet 224` | Internal bookkeeping value proxychains uses for remote DNS mapping. Not something you normally change. |
| `[ProxyList]` | **This header is required exactly as written** (case-sensitive). Everything below it is a proxy entry. |
| Proxy entry format | `type host port [user pass]` — e.g. `http 127.0.0.1 8080` or `socks5 127.0.0.1 9050 user pass`. Supported types: `http`, `socks4`, `socks5`. |

For pointing at a web proxy like **Burp or ZAP**, you only need one line under `[ProxyList]`:

```
[ProxyList]
http 127.0.0.1 8080
```

---

## Quiet mode: `-q`

By default, proxychains prints a line to your terminal for every connection it routes — useful once, noisy forever. Add `-q` to suppress that and keep the tool's own output clean:

```bash
proxychains4 -q curl http://SERVER_IP:PORT
```

---

## Usage examples

### `curl`
```bash
proxychains4 -q curl http://SERVER_IP:PORT
```
The request/response prints normally in the terminal, and the **same request appears in your Burp/ZAP history** — confirming it actually transited the proxy.

### Metasploit
Metasploit modules also don't natively speak "system proxy," so proxychains works the same way here — or you can set it per-module with `PROXIES` if the module supports it:

```
msfconsole

use auxiliary/scanner/http/robots_txt
set PROXIES HTTP:127.0.0.1:8080
set RHOST SERVER_IP
set RPORT PORT
run
```

Either way (wrapping `msfconsole` itself in `proxychains4`, or setting `PROXIES` inside a module), the request lands in your proxy history and can be repeated/modified from there.

### General rule
The same pattern extends to **any** command-line tool, script, or thick client: either prefix it with `proxychains4 -q`, or set the app's own proxy option if it has one. Either way, the goal is the same — get the traffic into Burp/ZAP so you can see and manipulate exactly what's being sent.
