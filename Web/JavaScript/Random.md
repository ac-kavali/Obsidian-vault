## Table of content
- [[#Overview|Overview]]
- [[#`Math.random()`|Math.random()]]
- [[#Common Patterns|Common Patterns]]
- [[#`crypto.getRandomValues()`|crypto.getRandomValues()]]
- [[#`crypto.randomUUID()` _(ES2021)_|crypto.randomUUID() _(ES2021)]]
- [[#Comparison Table|Comparison Table]]
- [[#Browser & Node.js Compatibility|Browser & Node.js Compatibility]]
- [[#Best Practices|Best Practices]]
- [[#Further Reading|Further Reading]]

## Overview

JavaScript provides randomness through the built-in `Math.random()` method. While the language doesn't have a dedicated "random" module, `Math.random()` serves as the foundation for all random number generation, and can be extended to cover a wide range of use cases.

---

## `Math.random()`

### Description

Returns a pseudo-random floating-point number in the range **[0, 1)** — meaning `0` is inclusive, but `1` is exclusive.

### Syntax

```js
Math.random()
```

### Return Value

A `Number` between `0` (inclusive) and `1` (exclusive).

### Example

```js
console.log(Math.random()); // e.g. 0.7364823910482
console.log(Math.random()); // e.g. 0.0219374820193
```

> ⚠️ **Note:** `Math.random()` does **not** provide cryptographically secure randomness. For security-sensitive use cases, use [`crypto.getRandomValues()`](https://claude.ai/chat/9f04aad4-f87f-421b-9a90-7e2645ac93f7#cryptogetrandomvalues).

---

## Common Patterns

### Random Integer Between Two Values

```js
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomInt(1, 10);  // e.g. 7
randomInt(0, 100); // e.g. 42
```

### Random Float Between Two Values

```js
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

randomFloat(1.5, 5.5); // e.g. 3.2841
```

### Random Boolean

```js
function randomBool() {
  return Math.random() < 0.5;
}

randomBool(); // true or false
```

### Random Element from an Array

```js
function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

randomElement(['apple', 'banana', 'cherry']); // e.g. 'banana'
```

### Shuffle an Array (Fisher-Yates Algorithm)

```js
function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

shuffle([1, 2, 3, 4, 5]); // e.g. [3, 1, 5, 2, 4]
```

### Random String (Alphanumeric)

```js
function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

randomString(8); // e.g. 'aZ3kRp1M'
```

### Weighted Random Selection

```js
function weightedRandom(options) {
  // options: [{ value, weight }, ...]
  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let rand = Math.random() * total;
  for (const option of options) {
    rand -= option.weight;
    if (rand <= 0) return option.value;
  }
}

weightedRandom([
  { value: 'common', weight: 70 },
  { value: 'rare',   weight: 25 },
  { value: 'epic',   weight: 5  },
]); // e.g. 'common'
```

---

## `crypto.getRandomValues()`

For cryptographically secure random values, use the Web Crypto API.

### Syntax

```js
crypto.getRandomValues(typedArray)
```

### Parameters

|Parameter|Type|Description|
|---|---|---|
|`typedArray`|`TypedArray`|An integer-based typed array to fill with random values (e.g. `Uint8Array`, `Int32Array`)|

### Example

```js
// Generate 4 cryptographically secure random bytes
const array = new Uint8Array(4);
crypto.getRandomValues(array);
console.log(array); // e.g. Uint8Array [203, 17, 98, 255]

// Secure random integer between 0 and 255
const [secureInt] = crypto.getRandomValues(new Uint8Array(1));
console.log(secureInt); // e.g. 134
```

### Secure Random Token

```js
function secureToken(byteLength = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

secureToken(); // e.g. 'a3f2c91b44de78e501bc39ff02a1d847'
```

> ✅ **Use `crypto.getRandomValues()`** for passwords, tokens, session IDs, or any security-sensitive randomness.

---

## `crypto.randomUUID()` _(ES2021)_

Generates a version 4 UUID (Universally Unique Identifier) using cryptographically secure randomness.

### Syntax

```js
crypto.randomUUID()
```

### Example

```js
crypto.randomUUID(); // e.g. '550e8400-e29b-41d4-a716-446655440000'
```

---

## Comparison Table

|Method|Secure|Returns|Use Case|
|---|---|---|---|
|`Math.random()`|❌|Float [0, 1)|General-purpose randomness|
|`crypto.getRandomValues()`|✅|Typed array filled|Security tokens, passwords|
|`crypto.randomUUID()`|✅|UUID string|Unique identifiers|

---

## Browser & Node.js Compatibility

|Method|Browser|Node.js|
|---|---|---|
|`Math.random()`|✅ All|✅ All|
|`crypto.getRandomValues()`|✅ All|✅ v15+|
|`crypto.randomUUID()`|✅ All|✅ v14.17+|

> In **Node.js**, you can also use the built-in `node:crypto` module:
> 
> ```js
> import { randomInt, randomBytes, randomUUID } from 'node:crypto';
> 
> randomInt(1, 100);   // e.g. 57
> randomBytes(16);     // Buffer of 16 random bytes
> randomUUID();        // UUID v4
> ```

---

## Best Practices

- **Never** use `Math.random()` for security-sensitive purposes (tokens, passwords, session IDs).
- Prefer `crypto.randomUUID()` over manual UUID generation.
- When generating random integers, always use `Math.floor()` (not `Math.round()`) with `Math.random()` to avoid bias at the boundaries.
- For large-scale simulations or statistical work requiring seeded randomness, consider a library like [**seedrandom**](https://github.com/davidbau/seedrandom), since native JS provides no seeding mechanism.

---

## Further Reading

- [MDN – Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [MDN – Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
- [MDN – Crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
- [Node.js Crypto Docs](https://nodejs.org/api/crypto.html)
- 