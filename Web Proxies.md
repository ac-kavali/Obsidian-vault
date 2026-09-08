
## 1. Fastest Option: Pre-configured Browser

No manual config needed — proxy settings + CA cert already baked in.

- **Burp Suite** → `Proxy` tab → `Intercept` → **Open Browser**
- **ZAP** → click the **Firefox icon** in the top toolbar

> [!tip] Good enough for most module/lab work.

---

## 2. Manual Setup (using your own Firefox)

### Default proxy values

|Setting|Value|
|---|---|
|IP|`127.0.0.1`|
|Port|`8080` (default for **both** Burp & ZAP)|

> [!warning] Port conflict If the port is already in use, the proxy **fails to start** — pick a free one.

### Changing the listening port

- **Burp:** `Proxy → Proxy settings → Proxy listeners`
- **ZAP:** `Tools → Options → Network → Local Servers/Proxies`

⚠️ Whatever port you set here **must match** the port configured in Firefox.

### Recommended: FoxyProxy extension

Quick proxy on/off switching without digging through Firefox settings.

- Already pre-installed on **PwnBox**
- Otherwise: install from the Firefox Add-ons page

**Setup steps:**

1. FoxyProxy icon → **Options**
2. **Add** a new proxy:
    - IP: `127.0.0.1`
    - Port: `8080`
    - Name: `Burp` / `ZAP`
3. **Save**
4. Click the FoxyProxy icon → select **Burp/ZAP** to activate

---

## 3. Install the CA Certificate

Without this: HTTPS traffic breaks or Firefox nags you to "accept the risk" constantly.

### Download the certificate

- **Burp:** with Burp active as proxy, browse to `http://burp` → click **CA Certificate**
- **ZAP:** `Tools → Options → Network → Server Certificates` → **Save** _(can also click **Generate** for a new cert)_

### Import into Firefox

1. `about:preferences#privacy` → scroll down → **View Certificates**
2. **Authorities** tab → **Import** → select the downloaded cert
3. ✅ Check **both**:
    - Trust this CA to identify **websites**
    - Trust this CA to identify **email users**
4. **OK**

---

## ✅ End Result

Proxy configured + CA cert trusted → all Firefox traffic flows through Burp/ZAP for inspection and manipulation.

## 4. Intercepting & Manipulating Requests

- **Burp:** Intercept is **ON** by default (`Proxy → Intercept`). Click **Forward** to release each request (may need multiple Forwards to skip other traffic).

``- **ZAP:** Intercept is **OFF** by default. Toggle via the green button or `Ctrl+B`. The **HUD** lets you intercept from inside the browser — **Step** (send + inspect next) vs **Continue** (release the rest).``

> [!example] Command injection test

> Ping form only accepts numbers → intercept request → change `ip=1` to `ip=;ls;` → forward → server returns a file listing instead of ping output. Front-end JS validation ≠ back-end validation.

**Use cases:** SQLi, command injection, upload/auth bypass, XSS, XXE, deserialization.

## Related Notes

- [[Burp Suite Basics]]
- [[OWASP ZAP Basics]]
- [[HTTP Request Interception]]