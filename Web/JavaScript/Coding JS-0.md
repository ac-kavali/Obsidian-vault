
- [[#1. Variables|1. Variables]]
- [[#2. Data Types|2. Data Types]]
- [[#3. Statements & Conditions|3. Statements & Conditions]]
- [[#4. JavaScript Semantics|4. JavaScript Semantics]]
- [[#Functions Syntax|Functions Syntax]]
- [[#Basic Operations|Basic Operations]]
- [[#Checking the Type|Checking the Type]]
- [[#Useful Built-ins|Useful Built-ins]]
- [[#Key Takeaway|Key Takeaway]]
- [[#1. `undefined` — Declared but Empty|1. undefined — Declared but Empty]]
- [[#2. `ReferenceError` — Never Declared At All|2. ReferenceError — Never Declared At All]]
- [[#3. `const` — No Declaration Without a Value|3. const — No Declaration Without a Value]]
- [[#4. `null` vs `undefined` — The Eternal Confusion|4. null vs undefined — The Eternal Confusion]]
- [[#5. Strings + Numbers — JavaScript's Revenge|5. Strings + Numbers — JavaScript's Revenge]]
- [[#6. Use Explicit Conversions — The Right Way|6. Use Explicit Conversions — The Right Way]]
- [[#Quick Reference Cheatsheet|Quick Reference Cheatsheet]]
- [[#Key Takeaway|Key Takeaway]]
- [[#1. Loose Equality (`==`)|1. Loose Equality (==)]]

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

#### Always Declare Variables in JavaScript

JavaScript lets you write `x = 10` without any keyword — but you shouldn't.

### Why It's Dangerous

Skipping `let`, `const`, or `var` creates an **implicit global variable**, meaning it's accessible everywhere in your app, even from inside functions. This leads to:

- **Accidental overwrites** — two parts of your code sharing the same global name
- **Strict mode errors** — `"use strict"` throws a `ReferenceError` on undeclared variables
- **Unpredictable bugs** — especially in larger codebases

### Which Keyword to Use

|Keyword|Use when...|
|---|---|
|`const`|Value never changes — **default choice**|
|`let`|Value will be reassigned|
|`var`|Legacy code only|

### Rule of Thumb

```
const first → let if needed → var only for old code → never omit
```

> Omitting the keyword is a legacy quirk, not a feature. Always declare explicitly.

---
## 2. Data Types

###  Strings

Text wrapped in quotes.

```js
let greeting = "Hello, World!";
let name = 'Alice';
let message = `Hi, ${name}!`; // template literal
```

- **new line can be used just with backticks "\`"**
if you used newline in `"` or `'` :
```js
let text = "Hello
World";
```
output:
```
Uncaught SyntaxError: Invalid or unexpected token
```

Unicode is a system that assigns a **unique number** to almost every character used in writing systems worldwide.
JavaScript uses **UTF-16**, meaning it assigns **16 bits (2 bytes)** for each string element (technically called a "code unit").
 **The complication**
- Unicode has **more than 65,536 characters**—over 143,000 characters now.
- Some characters, especially emojis and less common symbols, **cannot fit in a single 16-bit unit**.
- JavaScript handles these using **two 16-bit elements** (called a _surrogate pair_).
**Example**

| Variable | Value  | What it is           | Code units         | `.length` |
| -------- | ------ | -------------------- | ------------------ | --------- |
| `str1`   | `"A"`  | A basic Latin letter | 1                  | `1`       |
| `str2`   | `"😃"` | An emoji             | 2 (surrogate pair) | `2`       |
###  Booleans

Only two values: `true` or `false`.

```js
let isLoggedIn = true;
let hasError = false;
```

###  Numbers

Integers and decimals — no distinction needed.

```js
let score = 100;
let price = 9.99;
let negative = -5;
```

###  Arrays

Ordered lists of values.

```js
let fruits = ["apple", "banana", "cherry"];
fruits[0];        // "apple"
fruits.length;    // 3
fruits.push("mango"); // adds to end
```

###  Objects

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

###  Symbols

Unique, immutable identifiers — rarely needed for beginners.

```js
let id = Symbol("id");
let anotherId = Symbol("id");
id === anotherId; // false — always unique!
```

###  Comments

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

---
# Numbers in JavaScript

In JavaScript, **all numbers share a single type**: `number`.  
Unlike many other languages (Java, Python, C...), there is **no distinction** between `Float` and `Integer` — everything is a 64-bit floating-point value under the hood (IEEE 754).

```javascript
typeof 42;      // "number"
typeof 3.14;    // "number"
typeof -7;      // "number"
```

---

## Basic Operations

### Integer ÷ Integer
```javascript
let a = 10;
let b = 3;

let result = a / b;
console.log(result); // 3.3333333333333335
```
> Unlike Java or C, JavaScript does **not** truncate the result — it returns a float automatically.

---

### Float ÷ Integer
```javascript
let price = 9.99;
let quantity = 2;

let total = price / quantity;
console.log(total); // 4.995
```

---

### Integer ÷ Float
```javascript
let distance = 100;
let speed = 2.5;

let time = distance / speed;
console.log(time); // 40
```
> The result happens to be a whole number, but it's still of type `number` — not a special integer type.

---

### Float ÷ Float
```javascript
let x = 7.5;
let y = 2.5;

let ratio = x / y;
console.log(ratio); // 3
```

---

## Checking the Type
```javascript
let intVal   = 10 / 2;     // 5
let floatVal = 10 / 3;     // 3.3333...

console.log(typeof intVal);   // "number"
console.log(typeof floatVal); // "number"
```

Both return `"number"` — JavaScript makes **no distinction** at the type level.

---

## Useful Built-ins

If you ever need to enforce integer-like behavior, JavaScript provides helpers:

```javascript
let n = 7 / 2;              // 3.5

Math.floor(n);              // 3  → round down
Math.ceil(n);               // 4  → round up
Math.round(n);              // 4  → nearest integer
Math.trunc(n);              // 3  → remove decimal part
parseInt(n);                // 3  → parse as integer
n.toFixed(2);               // "3.50" → fixed decimal (returns a string)
```

---

## Key Takeaway

| Language   | Integer type | Float type |
|------------|-------------|------------|
| Java / C#  | `int`       | `float` / `double` |
| Python     | `int`       | `float`    |
| **JavaScript** | ❌ none | ❌ none — just `number` |

> In JavaScript, **the type system doesn't care** whether your number has decimals or not — you do all the distinguishing yourself through logic and built-in methods.

# JavaScript Quirks You Must Know

---

## 1. `undefined` — Declared but Empty

When you declare a variable without assigning a value, JavaScript automatically sets it to `undefined`.

```javascript
let x;
console.log(x); // undefined
```

It exists, it's just... empty. JavaScript is not mad at you. Yet.

---

## 2. `ReferenceError` — Never Declared At All

Try to use a variable that was **never declared**, and JavaScript will crash immediately.

```javascript
console.log(ghost); // ❌ ReferenceError: ghost is not defined
```

> JavaScript: *"I have never seen this variable in my life."*

---

### `undefined` vs `ReferenceError` — Side by Side

```javascript
let x;
console.log(x);      // undefined   ✅ (declared, no value)
console.log(ghost);  // ❌ ReferenceError (never declared)
```

They **sound** the same in English, but one is a value, the other is a full crash. Classic JavaScript.

---

## 3. `const` — No Declaration Without a Value

`const` is strict. You **must** assign a value at the moment of declaration. No exceptions.

```javascript
const PI;           // ❌ SyntaxError: Missing initializer in const declaration
const PI = 3.14;    // ✅
```

This makes sense — if a variable can never be reassigned, what would it even mean to declare it empty?

```javascript
const name = "Alice";
name = "Bob";       // ❌ TypeError: Assignment to constant variable
```

`const` is JavaScript's way of saying: *"Commit now, or don't show up."*

---

## 4. `null` vs `undefined` — The Eternal Confusion

Both mean "no value" — but they mean it differently.

| | `undefined` | `null` |
|---|---|---|
| **Set by** | JavaScript automatically | You, the developer, intentionally |
| **Meaning** | "This was never given a value" | "This intentionally has no value" |
| **Type** | `"undefined"` | `"object"` *(yes, this is a famous JS bug)* |

```javascript
let a;
console.log(a);          // undefined  (JS set this)
console.log(typeof a);   // "undefined"

let b = null;
console.log(b);          // null       (you set this)
console.log(typeof b);   // "object"   ← famous JS quirk, don't panic
```

### Equality trap:
```javascript
null == undefined    // true  ✅ (loose equality)
null === undefined   // false ❌ (strict equality — different types)
```

> Rule of thumb: use `null` when **you** want to say "empty on purpose". `undefined` is what JavaScript says when it doesn't know.

---

## 5. Strings + Numbers — JavaScript's Revenge

This is where JavaScript earns its reputation.

In most languages, mixing strings and numbers in math is an error.  
In JavaScript? It's a *creative choice*.

### The `+` operator — the traitor
```javascript
"5" + 3     // "53"  ← string concatenation, not math!
"5" + "3"   // "53"
5   + 3     // 8     ← only actual math when both are numbers
```

> `+` sees a string and immediately switches to **concatenation mode**. No warning. No error. Pure chaos.

### Other operators — surprisingly fine
```javascript
"10" - 2    // 8   ✅ JS converts the string automatically
"10" * 2    // 20  ✅
"10" / 2    // 5   ✅
"10" ** 2   // 100 ✅
```

> `-`, `*`, `/` have no string version, so JS is forced to convert. `+` is the only traitor.

---

## 6. Use Explicit Conversions — The Right Way

Don't rely on JavaScript's automatic coercion. Convert explicitly before doing math.

### String → Number
```javascript
Number("42")        // 42
Number("3.14")      // 3.14
Number("")          // 0   ← careful!
Number("hello")     // NaN ← Not a Number

parseInt("42px")    // 42  ← ignores non-numeric suffix
parseFloat("3.14")  // 3.14

+"42"               // 42  ← shorthand with unary +
```

### Number → String
```javascript
String(42)          // "42"
(42).toString()     // "42"
(3.14).toFixed(1)   // "3.1"
```

### Safe math with string numbers
```javascript
let input = "20";   // came from a form or user input

// ❌ Wrong
let result = input + 5;           // "205"

// ✅ Right
let result = Number(input) + 5;   // 25
let result = parseInt(input) + 5; // 25
let result = +input + 5;          // 25
```

---

## Quick Reference Cheatsheet

```javascript
// undefined
let x;
console.log(x);              // undefined

// ReferenceError
console.log(notDeclared);    // ❌ ReferenceError

// const without value
const y;                     // ❌ SyntaxError

// null vs undefined
let a = null;                // intentional empty
let b;                       // automatic empty

// string + number trap
"5" + 3                      // "53" ❌
Number("5") + 3              // 8   ✅
```

---

## Key Takeaway

> JavaScript was built for flexibility — but flexibility without awareness leads to bugs.  
> Always declare your variables, always initialize your `const`, know the difference between `null` and `undefined`, and **never trust `+` with strings near numbers**.

# JavaScript Equality Operators: `==` vs `===`

JavaScript provides two main operators for comparing values: **loose equality** (`==`) and **strict equality** (`===`).

---

## 1. Loose Equality (`==`)

- Compares **values** after **type coercion**.
- JavaScript converts the operands to the same type before comparing.

**Examples:**
```js
42 == "42"         // true, string converted to number
0 == false         // true, false converted to 0
null == undefined  // true, special rule

