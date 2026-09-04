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
Uses the keyword `FUZZ` as a placeholder anywhere in the request (URL, params, headers, POST body) instead of a fixed `-u` flag.
```sh 
wfuzz -c -z file,wordlist.txt --hc 404 http://target.com/FUZZ
```
- `-c` -> colorize output (easier to read)
- `-z file,wordlist.txt` -> payload source: a file/wordlist
- `--hc 404` -> hide responses with this HTTP code (also `--hl`, `--hw`, `--hh` to hide by line count / word count / char count — useful for filtering out a noisy "custom 404" page)
- `FUZZ` -> placeholder in the URL that gets replaced with each wordlist entry
- `-t` -> threads (same idea as gobuster)


Fuzzing extensions with two payload sets:
```sh
wfuzz -c -z file,wordlist.txt -z list,php-html-txt --hc 404 http://target.com/FUZZ.FUZ2Z
```
- `-z list,php-html-txt` -> a second payload set given inline (comma-separated), referenced as `FUZ2Z`


Fuzzing a POST parameter or header works the same way — just put `FUZZ` where the value would go:
```sh
wfuzz -c -z file,wordlist.txt -d "username=admin&password=FUZZ" --hc 404 http://target.com/login
```

### fuff
(you wrote "fuff" — the tool is **ffuf**, "Fuzz Faster U Fool"). Same `FUZZ` keyword idea as wfuzz, but faster (written in Go) and with cleaner filtering flags.
```sh
ffuf -w wordlist.txt -u http://target.com/FUZZ -e .php,.html,.txt -t 50
```
- `-w wordlist.txt` -> wordlist path (can prefix like `-w wordlist.txt:FUZZ` if using multiple wordlists with different keywords)
- `-u` -> target URL, with `FUZZ` marking where the wordlist gets injected
- `-e` -> extensions to append (like gobuster's `-x`)
- `-t` -> threads
- `-mc` -> match specific status codes, e.g. `-mc 200,301,403`
- `-fc` -> filter OUT status codes, e.g. `-fc 404`
- `-fs` -> filter out responses of a given size (great for killing false positives from a custom 404 page)
- `-recursion` + `-recursion-depth` -> automatically fuzz into discovered directories



Vhost enumeration with ffuf (put `FUZZ` in the Host header instead of the URL path):
```sh
ffuf -w subdomains.txt -u http://target.com -H "Host: FUZZ.target.com" -fs 1234
```

**Quick comparison / when to reach for which:**

|Tool|Strength|
|---|---|
|gobuster|Simple, fast, great default for plain dir/file busting|
|wfuzz|Very flexible payload positions (params, headers, multiple FUZZ points)|
|ffuf|Fastest, best filtering flags, best for recursive + vhost fuzzing|

For wordlists, alongside `/usr/share/wordlists/dirb/big.txt`, it's worth also having SecLists on hand (`/usr/share/wordlists/seclists/Discovery/Web-Content/`) — `raft-medium-directories.txt` and `common.txt` are the ones people reach for most.


---


