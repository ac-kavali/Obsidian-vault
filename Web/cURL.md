cURL _(Client URL)_ is a powerful command-line tool and library (`libcurl`) used to transfer data to and from servers, supporting numerous protocols including HTTP, HTTPS, FTP, and SFTP. It is widely used by developers for API testing, web scraping, and automating data transfers, allowing detailed control over requests such as headers, cookies, and authentication.

cURL was created by Daniel Stenberg in **1997**.
He needed a tool to:
- download currency exchange rates automatically
- from early web servers (HTTP)
Then it evolved into:
- A universal **data transfer tool**
- Supporting tons of protocols (not just HTTP)

## Most case use (Web Requests) : 
This is where it becomes powerful:

### 1. Perform GET request (default)
```sh
curl https://example.com
```
_Same as opening a page in browser (but raw)_

---
### 2. See full request/response
```sh
curl -v https://example.com
```
Useful for:
- request headers
- response headers
- connexion details
---
### 3. Show Only headers
```sh
curl -I https://example.com
```
Useful for:
- status codes
- redirects
- server info
---
