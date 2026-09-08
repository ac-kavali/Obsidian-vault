---
tags: [web, pentesting, http, encoding]
---

# Encoding — The Core Idea

> The one thing to remember: **encoding is not encryption.** It's a reversible *representation* change with no secret key. Anyone can decode it. It exists purely so data survives transport through a channel that can't safely carry certain raw characters or bytes.

## Why encoding exists

Certain characters have **special meaning** to the systems that parse a request or a page. If those characters show up raw inside data (not as syntax), the parser gets confused — so they get swapped for a safe representation first.

| Context | Characters that are "special" | What breaks if not encoded |
|---|---|---|
| URL / query string | space, `&`, `#`, `+`, `%`, `=`, `?`, `/` | `&` looks like a new parameter, `#` looks like a fragment, space can truncate the request |
| HTML page | `<`, `>`, `&`, `"`, `'` | `<script>` in user input gets *parsed as a real tag* → XSS |
| Text protocols carrying binary | any non-text byte | binary bytes corrupt a channel (email, JSON, HTTP body) that only expects printable text |

## How the browser treats it

The browser is constantly encoding/decoding **automatically**, which is exactly why it's easy to miss during testing:

- **Typing a URL / submitting a form** → the browser **URL-encodes** the data before it goes on the wire (spaces → `%20` or `+`, etc.).
- **Rendering a page** → the browser **decodes HTML entities** back into characters before drawing them on screen (`&lt;` is drawn as `<`, but treated as *text*, not a tag).
- **Reading any response** → the browser **decodes based on charset/Content-Type** (e.g. UTF-8) to turn bytes into the right Unicode characters/emoji.
- **JavaScript in the page** → may decode Base64 (`atob()`), hex, or Unicode escapes at runtime — meaning the raw request/response you capture in Burp/ZAP can look nothing like what the app actually uses.

This is *why* manual encoding/decoding matters for testing: you're deliberately doing what the browser normally hides from you, so you can see and manipulate the real underlying data — and so the server (which does its own decoding) parses your tampered input correctly instead of rejecting it.

---

## The 4 encodings you'll actually use

### 1. HTML encoding (entities)
Turns characters that would be parsed as markup into inert text, using `&name;` or `&#code;` form.

```
Plain:   <script>alert('XSS')</script>
Encoded: &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;
```

### 2. Unicode encoding
Represents a character by its code point instead of the literal glyph. Common forms: `\uXXXX` (JS), `%uXXXX` (legacy URL), `&#xXXXX;` (HTML numeric).

```
Plain:            <script
Unicode (JS):     \u003c\u0073\u0063\u0072\u0069\u0070\u0074
HTML numeric:     &#x3C;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;
```
Useful for **filter bypass**: a WAF regex looking for literal `<script>` may not catch its Unicode-escaped form if decoding happens later in the pipeline.

### 3. Base64
Encodes arbitrary bytes as printable ASCII using a 64-character alphabet. Common for cookies, tokens, and Basic-Auth headers.

```
Plain:   {"user":"admin","role":"superadmin"}
Encoded: eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoic3VwZXJhZG1pbiJ9
```

### 4. ASCII Hex
Each byte written as two hexadecimal digits. Common in low-level protocols, some cookies/tokens, and byte-level payload crafting.

```
Plain:   admin
Encoded: 61646d696e
```

*(URL encoding also matters constantly — it's covered above under "why it exists": `user=John Doe&role=admin#profile` → `user%3DJohn%20Doe%26role%3Dadmin%23profile`)*

---

## How to detect which encoding you're looking at

Look at the **alphabet, delimiters, and length** — each encoding has a signature.

| Encoding | Tell-tale signature | Quick check |
|---|---|---|
| **URL encoding** | `%` followed by exactly 2 hex digits (`%20`, `%3D`, `%26`); sometimes `+` for space | If you see repeated `%XX` patterns → URL-decode it |
| **HTML entities** | Starts with `&`, ends with `;` — either a name (`&lt;` `&amp;` `&quot;`) or a number (`&#39;` / `&#x27;`) | `&...;` pattern is unmistakable |
| **Base64** | Alphabet is only `A–Z a–z 0–9 + /`, often padded with `=` or `==` at the end, length is a multiple of 4 | Try decoding it — garbage/binary out = wrong guess, readable text/JSON out = confirmed |
| **ASCII Hex** | Only characters `0–9 a–f A–F`, no `+ / =`, even total length | Split into pairs and convert each pair to a character — if it produces readable text, it's hex |
| **Unicode escape** | Literal `\u` or `%u` followed by 4 hex digits, or `&#x...;` for HTML numeric | The `\u`/`%u` prefix is the giveaway |

**Practical workflow:**
1. **Eyeball the alphabet first** — hex is the narrowest (16 chars), Base64 the widest (64 chars + `=`). If you see letters *and* `+`/`/`/`=`, it's Base64, not hex.
2. **When unsure, just try decoding it** as your best guess and see if the output is readable (JSON, a username, a sentence). Garbage output means wrong encoding — try the next one.
3. **Use the built-in "smart"/"magic" decoders** instead of guessing manually:
   - Burp → **Decoder** tab → paste the value, use **Smart decode** (or the **Inspector** panel in Repeater/Proxy, which auto-detects and shows decode options inline).
   - ZAP → **Encoder/Decoder/Hash** (`Ctrl+E`) → the **Decode** tab tries multiple decoders automatically.
   - CLI: `base64 -d`, or `python3 -c "print(bytes.fromhex('...'))"`, or `urllib.parse.unquote(...)` for quick manual checks.
4. **Multi-layer encoding is common** (e.g. Base64-of-URL-encoded-JSON). Decode one layer, look at the result, repeat if it's still not readable plaintext.

---

## One-line mental model to keep

> **Encoding = safe transport format. Decode to read it. Re-encode the same way before sending it back**, or the server won't understand your tampered value.
