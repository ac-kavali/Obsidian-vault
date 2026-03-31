## Table of content
- [[#Functions Syntax]]
- [[#What Are Default Parameters?|What Are Default Parameters?]]
- [[#Basic Syntax|Basic Syntax]]
- [[#How JavaScript Evaluates Default Parameters|How JavaScript Evaluates Default Parameters]]
- [[#Anonymous Functions]]
- [[#Arrow Functions]]
- [[#Checking if a Variable Was Not Given to a Function|Checking if a Variable Was Not Given to a Function]]
- [[#Advanced Patterns|Advanced Patterns]]
- [[#Common Pitfalls|Common Pitfalls]]
- [[#Real-World Examples|Real-World Examples]]
- [[#Automatic Semicolon Insertion (ASI)]]
- [[#Summary|Summary]]

---
## Functions Syntax

![[js_functions.png|697]]

## What Are Default Parameters?

Default parameters allow you to assign **fallback values** to function parameters when the caller doesn't pass a value — or passes `undefined` explicitly.

Before ES6 (2015), developers had to manually handle missing arguments inside the function body. Default parameters made this cleaner and more declarative.

---

## Basic Syntax

```js
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}

greet("Alice"); // "Hello, Alice!"
greet(); // "Hello, stranger!"
greet(undefined); // "Hello, stranger!"
greet(null); // "Hello, null!"  ← null does NOT trigger the default
```

> **Key rule:** The default value is used **only** when the argument is `undefined` (missing or explicitly passed as `undefined`). All other values — including `null`, `0`, `""`, and `false` — are used as-is.

---

## How JavaScript Evaluates Default Parameters

Default values are **evaluated at call time**, not at definition time. This means every function call gets a fresh evaluation of the default expression.

```js
function addItem(item, list = []) {
  list.push(item);
  return list;
}

addItem("a"); // ["a"]
addItem("b"); // ["b"] ← fresh array each call, not ["a", "b"]
```

This is different from Python's behavior, where mutable defaults are shared. JavaScript gives you a **new default value per call**.

### Default values can be expressions or function calls

```js
function getTimestamp(time = Date.now()) {
  return time;
}

function double(x = Math.random() * 10) {
  return x * 2;
}
```

### Default values can reference earlier parameters

```js
function createRect(width = 10, height = width) {
  return { width, height };
}

createRect(); // { width: 10, height: 10 }
createRect(5); // { width: 5, height: 5 }
createRect(5, 20); // { width: 5, height: 20 }
```

> ⚠️ A parameter can only reference parameters that come **before** it in the list.

---
## Anonymous Functions

**Definition:**  
An **anonymous function** is a function **without a name**, usually used when the function is needed only once or passed as an argument.

Example:
```js
const greet = function () {
  console.log("Hello");
};

greet();
```

Callback:
```js
setTimeout(function () {
  console.log("Hi after 1 second");
}, 1000);
```


---
## Arrow Functions
**Definition:**  
The `=>` syntax is used to create an **arrow function**, which is a shorter way to write a function expression.

_Basic Example:_
```js
const greet = () => {
  console.log("Hello");
};
```
_Equivalent to :_
```js
const greet = function () {
  console.log("Hello");
};
```
Just instead of typing funtions keyword you use the arrow symbol`=>`. 

---
## Checking if a Variable Was Not Given to a Function

This is a very common need — you want to know whether the caller **actually passed** an argument, or left it out entirely.

### Method 1: Check `arguments.length` (traditional)

```js
function configure(host, port) {
  if (arguments.length < 2) {
    console.log("port was not provided");
  }
}

configure("localhost"); // "port was not provided"
configure("localhost", 3000); // (no message)
configure("localhost", undefined); // "port was not provided" ← still counts as missing
```

`arguments.length` counts **how many arguments were actually passed**, regardless of defaults.

---

### Method 2: Use a sentinel value (recommended)

Create a unique object that can only match itself. This is the most reliable pattern to distinguish "not passed" from any real value.

```js
const NOT_PROVIDED = Symbol("NOT_PROVIDED");

function configure(host, port = NOT_PROVIDED) {
  if (port === NOT_PROVIDED) {
    console.log("port was not provided, using default 8080");
    port = 8080;
  }
  return { host, port };
}

configure("localhost"); // port → 8080
configure("localhost", 3000); // port → 3000
configure("localhost", null); // port → null (explicitly provided)
configure("localhost", undefined); // port → 8080 (treated as not provided)
```

Using a `Symbol` ensures the sentinel can never be accidentally matched by any real value.

---

### Method 3: Check for `undefined` explicitly

The simplest approach when you don't need to distinguish `undefined` from "not passed":

```js
function greet(name) {
  if (name === undefined) {
    name = "stranger";
  }
  return `Hello, ${name}!`;
}
```

Or with the nullish coalescing operator (`??`):

```js
function greet(name) {
  name = name ?? "stranger"; // Only replaces null or undefined
  return `Hello, ${name}!`;
}
```

Or with the OR operator (`||`), which also catches falsy values:

```js
function greet(name) {
  name = name || "stranger"; // Replaces undefined, null, "", 0, false
  return `Hello, ${name}!`;
}
```

> ⚠️ Use `??` over `||` when `0`, `""`, or `false` are valid inputs you want to preserve.

---

### Method 4: Use an options object with `hasOwnProperty`

When functions accept many optional arguments, an **options object** is a clean pattern:

```js
function connect({ host = "localhost", port, timeout = 5000 } = {}) {
  const config = { host, port, timeout };

  // Check if port was explicitly passed in the options object
  // (we can't use the destructured `port` variable since it might be undefined)
  return config;
}

connect({ host: "example.com", port: 443 }); // port: 443
connect({ host: "example.com" }); // port: undefined
connect(); // all defaults
```

To check if a key was truly provided inside an options object:

```js
function connect(options = {}) {
  if (!("port" in options)) {
    console.log("port key was not provided at all");
  }

  const { host = "localhost", port = 8080, timeout = 5000 } = options;
  return { host, port, timeout };
}
```

Using `"key" in object` (or `Object.hasOwn(options, "key")`) is the most reliable way to check presence in an object.

---

## Advanced Patterns

### Require a parameter (throw if missing)

```js
function required(paramName) {
  throw new Error(`Missing required parameter: "${paramName}"`);
}

function createUser(
  name = required("name"),
  email = required("email"),
  role = "viewer",
) {
  return { name, email, role };
}

createUser("Alice", "alice@example.com"); // ✅
createUser("Alice"); // ❌ Error: Missing required parameter: "email"
createUser(); // ❌ Error: Missing required parameter: "name"
```

This is an elegant trick: since defaults are evaluated lazily only when needed, the `required()` function only runs if the argument is missing.

### Default parameters with destructuring

```js
function render({ title = "Untitled", theme = "light", fontSize = 16 } = {}) {
  console.log(title, theme, fontSize);
}

render({ title: "Home" }); // "Home" "light" 16
render(); // "Untitled" "light" 16
```

The `= {}` at the end means the entire options argument is optional too.

---

## Common Pitfalls

### Pitfall 1: `null` does NOT trigger defaults

```js
function greet(name = "World") {
  return `Hello, ${name}`;
}

greet(null); // "Hello, null" — not "Hello, World"
```

`null` is a value. Only `undefined` triggers defaults.

---

### Pitfall 2: `arguments` object doesn't reflect defaults

```js
function test(a = 10) {
  console.log(a); // 10
  console.log(arguments[0]); // undefined ← the raw call had no argument
}

test();
```

`arguments` reflects what was **actually passed**, not the resolved value after defaults are applied.

---

### Pitfall 3: Order matters with dependent defaults

```js
// ❌ This will throw a ReferenceError
function badExample(a = b, b = 5) {
  return a + b;
}

// ✅ This works
function goodExample(b = 5, a = b) {
  return a + b;
}
```

Parameters can only reference earlier (left-side) parameters in the signature.

---

## Real-World Examples

### HTTP request wrapper

```js
async function fetchData(
  url,
  method = "GET",
  headers = { "Content-Type": "application/json" },
  timeout = 5000,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers,
      signal: controller.signal,
    });
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

fetchData("https://api.example.com/users");
fetchData("https://api.example.com/users", "POST");
```

---

### Paginated list utility

```js
function paginate(items, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

paginate(allUsers); // page 1, 10 per page
paginate(allUsers, 3); // page 3, 10 per page
paginate(allUsers, 1, 25); // page 1, 25 per page
```

---
## Automatic Semicolon Insertion (ASI)

JavaScript doesn't require you to write semicolons — the engine inserts them automatically in certain situations. This is called **Automatic Semicolon Insertion (ASI)**. While convenient, it comes with subtle rules that can produce completely unexpected behavior if you're not aware of them.


### How ASI Works

The JS parser inserts a semicolon when it encounters a line break and determines the current statement cannot legally continue onto the next line.

js

```js
// What you write:
const a = 1
const b = 2
console.log(a + b)

// What JS sees:
const a = 1;
const b = 2;
console.log(a + b);
```

Simple cases like these work fine. The problems start at the edges.

---

## Summary

| Technique            | Triggers on           | Use when                                             |
| -------------------- | --------------------- | ---------------------------------------------------- |
| `param = value`      | `undefined` only      | Simple defaults                                      |
| `param \|\| default` | Any falsy value       | Falsy values aren't meaningful inputs                |
| `param ?? default`   | `null` or `undefined` | `0`, `""`, `false` are valid inputs                  |
| Sentinel `Symbol`    | Only `undefined`      | You must distinguish `undefined` from any real value |
| `"key" in options`   | Key absence           | Options object pattern                               |
| `arguments.length`   | Call-time arity       | Legacy or strict arity checks                        |
| `required()` default | Argument missing      | Mandatory parameters                                 |
