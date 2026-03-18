# JavaScript Simplified 

---

## 1. Variables

Variables store data. Use `let`, `const`, or `var` to declare them.

```js
let name = "Alice";   // can be changed
const age = 25;       // cannot be changed
var old = true;       // old way, avoid if possible
```
**Why you should avoid var**: `let` is used instead of var because `var` is function-scoped, while let is block-scoped—matching how developers expect variables to behave.

==[Practice Js](https://www.boot.dev/)==

---
## 2. Data Types

### 🔤 Strings

Text wrapped in quotes.

```js
let greeting = "Hello, World!";
let name = 'Alice';
let message = `Hi, ${name}!`; // template literal
```

### ✅ Booleans

Only two values: `true` or `false`.

```js
let isLoggedIn = true;
let hasError = false;
```

### 🔢 Numbers

Integers and decimals — no distinction needed.

```js
let score = 100;
let price = 9.99;
let negative = -5;
```

### 📋 Arrays

Ordered lists of values.

```js
let fruits = ["apple", "banana", "cherry"];
fruits[0];        // "apple"
fruits.length;    // 3
fruits.push("mango"); // adds to end
```

### 🗂️ Objects

Key-value pairs — like a record or dictionary.

```js
let person = {
  name: "Alice",
  age: 25,
  isStudent: true
};

person.name;       // "Alice"
person["age"];     // 25
```

### 🔣 Symbols

Unique, immutable identifiers — rarely needed for beginners.

```js
let id = Symbol("id");
let anotherId = Symbol("id");
id === anotherId; // false — always unique!
```

### 💬 Comments

Notes in your code that JS ignores.

```js
// This is a single-line comment

/*
  This is a
  multi-line comment
*/
```

---

## 3. Statements & Conditions

### `if / else if / else`

Run code based on a condition.

```js
let score = 75;

if (score >= 90) {
  console.log("A grade");
} else if (score >= 70) {
  console.log("B grade");
} else {
  console.log("Try again");
}
```

### Ternary Operator

A shorthand `if/else` in one line.

```js
let age = 20;
let status = age >= 18 ? "adult" : "minor";
```

### `switch`

Match one value against many cases.

```js
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("Just another day");
}
```

### Loops

Repeat code multiple times.

```js
// for loop
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

// while loop
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

// loop over an array
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}
```

---

## 4. JavaScript Semantics

Semantics = **what the code actually means and does**, not just how it looks.

### Truthy & Falsy

JS evaluates non-boolean values as true or false in conditions.

|Falsy (treated as `false`)|Truthy (treated as `true`)|
|---|---|
|`0`|Any non-zero number|
|`""` (empty string)|Any non-empty string|
|`null`|Arrays & objects (even empty)|
|`undefined`|`"false"` (it's a string!)|
|`NaN`||

```js
if ("") console.log("runs?"); // ❌ doesn't run
if ("hi") console.log("runs?"); // ✅ runs
```

### `==` vs `===`

```js
5 == "5"   // true  — loose equality (ignores type)
5 === "5"  // false — strict equality (checks type too)
```

> ✅ Always prefer `===`

### `null` vs `undefined`

```js
let a;           // undefined — declared but not assigned
let b = null;    // null — intentionally empty
```

### Type Coercion

JS automatically converts types — sometimes unexpectedly.

```js
"5" + 3    // "53"  (number becomes string)
"5" - 3    // 2     (string becomes number)
true + 1   // 2     (true becomes 1)
```

### Scope

Where a variable is accessible.

```js
let x = 10; // global scope

function greet() {
  let y = 20; // local scope — only inside this function
  console.log(x); // ✅ can access x
}

console.log(y); // ❌ Error — y doesn't exist here
```

---
## Functions Syntax

![[js_functions.png|697]]

