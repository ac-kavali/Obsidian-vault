JavaScript has a special numeric value called `Infinity` — a global constant representing a value greater than any finite number. There's also `-Infinity` for the negative counterpart.


---

## What Is Infinity?

```js
console.log(Infinity);   // Infinity
console.log(-Infinity);  // -Infinity
console.log(typeof Infinity); // "number"
```

`Infinity` is of type `number`. It's not a separate data type — it lives on the number line, just at its extreme ends.

---

## How Do You Get Infinity?

You can produce `Infinity` in several ways:

```js
// Direct assignment
const x = Infinity;

// Division by zero
console.log(1 / 0);    // Infinity
console.log(-1 / 0);   // -Infinity

// Overflow past Number.MAX_VALUE
console.log(Number.MAX_VALUE * 2); // Infinity

// Parsing non-numeric strings doesn't give Infinity (gives NaN instead)
console.log(Number("hello")); // NaN

// But this does:
console.log(Number("Infinity")); // Infinity
```

---

## Can You Store Infinity?

**Yes** — `Infinity` can be stored just like any number:

```js
const limit = Infinity;
const negLimit = -Infinity;

let score = Infinity;
score = score + 1000; // Still Infinity

const arr = [1, 2, Infinity, -Infinity];
const obj = { max: Infinity, min: -Infinity };
```

It survives in arrays, objects, variables, and function parameters without any issue.

### ⚠️ JSON Serialization — A Trap!

```js
const data = { value: Infinity };

JSON.stringify(data); // '{"value":null}'
// Infinity becomes null silently — no error thrown!

JSON.parse('{"value":Infinity}'); // SyntaxError!
// JSON does not support Infinity as a value
```

This is one of the most common silent bugs. Always sanitize before serializing to JSON.

---

## Useful Operations with Infinity

`Infinity` is genuinely useful in algorithms, comparisons, and math:

### Finding Min/Max in a List

```js
let min = Infinity;
let max = -Infinity;

const values = [42, 7, 99, 3, 56];

for (const v of values) {
  if (v < min) min = v;
  if (v > max) max = v;
}

console.log(min); // 3
console.log(max); // 99
```

Using `Infinity` as the initial sentinel value is a clean pattern — no need to seed with the first element.

### Dijkstra / Pathfinding Algorithms

```js
const distances = {
  A: 0,
  B: Infinity,
  C: Infinity,
  D: Infinity,
};
// All unvisited nodes start at "unreachable" distance
```

### Clamping / Guards

```js
function divide(a, b) {
  const result = a / b;
  return isFinite(result) ? result : 0; // Guard against Infinity
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // 0 (guarded)
```

---

## Arithmetic Behavior

|Expression|Result|
|---|---|
|`Infinity + 1`|`Infinity`|
|`Infinity - Infinity`|`NaN`|
|`Infinity * 2`|`Infinity`|
|`Infinity * -1`|`-Infinity`|
|`Infinity * 0`|`NaN`|
|`Infinity / Infinity`|`NaN`|
|`1 / Infinity`|`0`|
|`Infinity > 9999999`|`true`|
|`Infinity === Infinity`|`true`|

---

## Errors and Pitfalls

### 1. Silent JSON Corruption

```js
const payload = { timeout: Infinity };
const json = JSON.stringify(payload);
// Result: '{"timeout":null}' — data lost, no error!
```

**Fix:** Replace before serializing:

```js
const safe = JSON.stringify(payload, (key, val) =>
  val === Infinity ? "Infinity" : val
);
```

### 2. Infinite Loops

```js
let i = 0;
while (i < Infinity) {
  i++; // This loop will run until the process crashes or i overflows
}
```

This won't throw an error — it will just hang your program.

### 3. NaN from Infinity Arithmetic

```js
const result = Infinity - Infinity; // NaN
const product = Infinity * 0;       // NaN
```

These don't throw errors but produce `NaN`, which can silently propagate through calculations.

### 4. Comparison Confusion

```js
console.log(Infinity == Infinity);  // true
console.log(Infinity === Infinity); // true
console.log(isFinite(Infinity));    // false ← use this to check!
```

### 5. `Math` Functions Behavior

```js
Math.sqrt(Infinity);  // Infinity
Math.log(Infinity);   // Infinity
Math.floor(Infinity); // Infinity  ← does NOT return a usable integer
Math.round(Infinity); // Infinity
```

Be careful when piping `Infinity` into math utilities expecting a finite result.

---

## Checking for Infinity

JavaScript gives you a few tools:

```js
isFinite(Infinity);       // false
isFinite(42);             // true
isFinite(NaN);            // false  ← also catches NaN!

Number.isFinite(Infinity); // false — stricter, doesn't coerce types
Number.isFinite("42");     // false — won't coerce string to number
isFinite("42");            // true  — coerces first, then checks

// Check specifically for Infinity:
const isInfinity = (v) => v === Infinity || v === -Infinity;
```

Prefer `Number.isFinite()` over the global `isFinite()` to avoid unexpected type coercion.

---

## Summary

|Aspect|Behavior|
|---|---|
|Type|`number`|
|Storable|✅ Yes — in variables, arrays, objects|
|JSON safe|❌ No — becomes `null` silently|
|Useful for|Sentinels, pathfinding, guards, comparisons|
|Produces errors|Rarely throws — usually gives `NaN` silently|
|How to detect|`Number.isFinite()` or `=== Infinity`|

> **Key takeaway:** `Infinity` is a powerful tool when used intentionally — but it fails silently in JSON and arithmetic edge cases, so always guard your outputs with `isFinite()` checks.