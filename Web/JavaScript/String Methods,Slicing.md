Strings in JavaScript come with a rich set of built-in methods for searching, transforming, and extracting text.

## Table of Content:
- [[#Common String Methods|Common String Methods]]
- [[#String Slicing|String Slicing]]
- [[#Quick Comparison: `slice` vs `substring`|Quick Comparison: `slice` vs `substring`]]
- [[#Tips|Tips]]

---
## Common String Methods

### Case Conversion

```js
"hello".toUpperCase()  // "HELLO"
"WORLD".toLowerCase()  // "world"
```

### Searching

```js
"hello world".includes("world")    // true
"hello world".startsWith("hello")  // true
"hello world".endsWith("world")    // true
"hello world".indexOf("o")         // 4
"hello world".lastIndexOf("o")     // 7
```

### Trimming Whitespace

```js
"  hello  ".trim()       // "hello"
"  hello  ".trimStart()  // "hello  "
"  hello  ".trimEnd()    // "  hello"
```

### Replacing

```js
"hello world".replace("world", "JS")     // "hello JS"
"aabbcc".replaceAll("b", "x")           // "aaxxcc"
```

### Splitting

```js
"a,b,c".split(",")   // ["a", "b", "c"]
"hello".split("")    // ["h", "e", "l", "l", "o"]
```

### Padding & Repeating

```js
"5".padStart(3, "0")   // "005"
"hi".padEnd(5, "!")    // "hi!!!"
"ha".repeat(3)         // "hahaha"
```

### Getting a Character

```js
"hello"[1]          // "e"
"hello".at(-1)      // "o"  (supports negative index)
"hello".charAt(0)   // "h"
```

---

## String Slicing

There are three methods for extracting a substring:

### `slice(start, end)`

The most commonly used. Supports **negative indices**.

```js
"hello world".slice(0, 5)   // "hello"
"hello world".slice(6)      // "world"
"hello world".slice(-5)     // "world"
"hello world".slice(-5, -1) // "worl"
```

### `substring(start, end)`

Similar to `slice`, but **does not support negative indices** (treats them as `0`).

```js
"hello world".substring(0, 5)  // "hello"
"hello world".substring(6)     // "world"
"hello world".substring(-3)    // "hello world" (treated as 0)
```

### `substr(start, length)` ⚠️ Deprecated

Takes a **length** as the second argument instead of an end index. Avoid in new code.

```js
"hello world".substr(6, 5)  // "world"
```

---

## Quick Comparison: `slice` vs `substring`

|Feature|`slice`|`substring`|
|---|---|---|
|Negative indices|✅ Yes|❌ No|
|End index exclusive|✅ Yes|✅ Yes|
|Swaps args if start > end|❌ No|✅ Yes|
|Recommended|✅ Yes|Situational|

---

## Tips

- Strings are **zero-indexed** — the first character is at index `0`.
- The `end` index in slicing methods is **exclusive** (not included in the result).
- Prefer `slice` over `substring` and avoid the deprecated `substr`.
- Use `at()` when you need to access characters from the end of a string cleanly.