**OWASP Top 10:**

- SQL Injection
- XSS
- Authentication issues
- Broken Access Control
- File upload vulnerabilities

**2. 🧪 Practice immediately (don't stay in theory)**

Use platforms like:

- PortSwigger Web Security Academy (BEST for you)
- Hack The Box
- TryHackMe

👉 Do labs like:

- SQL injection labs
- XSS labs
- Authentication bypass


editable element in html 





- directory gessing(bruteforcing)
- robots.txt -> used to choose the pages that should not 
  being displayed by the search engines(web crawlers)
---
## Directory Enumeration
### **Gobuster**
key modes: 
- **`dir`**: Directory/file brute-forcing.
- **`dns`**: DNS subdomain enumeration.
- **`vhost`**: Virtual host enumeration.
- **`fuzz`**: Custom parameter fuzzing.

```sh
gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt -t 50
```
- `dir`-> directory brute-force mode
- `-u` -> target URL (**this is required**, your version missed it)
- `-w` -> wordlist path
- `-x` -> try also files like `admin.php`, `admin.js`...
- `-t` -> number of threads (speed).
> use `/usr/share/wordlists/dirb/big...`

### **wfuzz**


### fuff

---


