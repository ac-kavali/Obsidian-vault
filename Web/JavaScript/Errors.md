
A thorough reference for understanding, catching, and managing errors in JavaScript.

---
- [[#1. Error Types|1. Error Types]]
- [[#2. try / catch / finally|2. try / catch / finally]]
- [[#3. Exception Handling in Depth|3. Exception Handling in Depth]]
- [[#4. Selective vs General Catching|4. Selective vs General Catching]]
- [[#5. Strict Mode|5. Strict Mode]]

---

## 1. Error Types

JavaScript has a hierarchy of built-in error constructors, all inheriting from the base `Error` class.

```
Error
 ├── SyntaxError
 ├── ReferenceError
 ├── TypeError
 ├── RangeError
 ├── URIError
 ├── EvalError
 ├── InternalError      (non-standard, Firefox)
 └── AggregateError
```

Every error instance exposes:

|Property|Description|
|---|---|
|`name`|The error constructor name (e.g. `"TypeError"`)|
|`message`|Human-readable description|
|`stack`|Stack trace string (non-standard but universally supported)|
|`cause`|The original error that caused this one (ES2022)|

---

### SyntaxError

Thrown when the JavaScript engine encounters code that **cannot be parsed** — malformed tokens, missing brackets, illegal characters, etc.

```js
// Example: caught via eval (SyntaxErrors in static code crash before execution)
try {
  eval("function (");
} catch (e) {
  console.log(e instanceof SyntaxError); // true
  console.log(e.name);                   // "SyntaxError"
  console.log(e.message);                // "Unexpected token '('"
}
```

> **Note:** A `SyntaxError` in a top-level script or module **cannot** be caught with `try/catch` because the engine refuses to execute the file at all. You can only catch it when the offending code is inside `eval()` or `new Function()`.

---

### ReferenceError

Thrown when code references a **variable or identifier that does not exist** in the current scope.

```js
try {
  console.log(undeclaredVariable);
} catch (e) {
  console.log(e instanceof ReferenceError); // true
  console.log(e.message); // "undeclaredVariable is not defined"
}

// Also thrown when accessing a variable before its declaration (TDZ)
try {
  console.log(x);     // x is in the Temporal Dead Zone
  let x = 5;
} catch (e) {
  console.log(e.message); // "Cannot access 'x' before initialization"
}
```

---

### TypeError

One of the most common errors. Thrown when a **value is not of the expected type**, or when an operation is performed on an incompatible type.

```js
// Calling a non-function
try {
  const num = 42;
  num();
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message); // "num is not a function"
}

// Accessing property on null or undefined
try {
  const user = null;
  console.log(user.name);
} catch (e) {
  console.log(e.message); // "Cannot read properties of null (reading 'name')"
}

// Reassigning a const
try {
  eval('"use strict"; const x = 1; x = 2;');
} catch (e) {
  console.log(e instanceof TypeError); // true
}
```

---

### RangeError

Thrown when a value is **outside the permitted range** for an operation.

```js
// Invalid array length
try {
  const arr = new Array(-1);
} catch (e) {
  console.log(e instanceof RangeError); // true
  console.log(e.message); // "Invalid array length"
}

// Stack overflow via infinite recursion
function infinite() { return infinite(); }
try {
  infinite();
} catch (e) {
  console.log(e instanceof RangeError); // true
  console.log(e.message); // "Maximum call stack size exceeded"
}

// toFixed with out-of-range argument
try {
  (1.5).toFixed(200);
} catch (e) {
  console.log(e instanceof RangeError); // true
}
```

---

### URIError

Thrown when `encodeURI()`, `decodeURI()`, `encodeURIComponent()`, or `decodeURIComponent()` receive a **malformed URI**.

```js
try {
  decodeURIComponent("%");
} catch (e) {
  console.log(e instanceof URIError); // true
  console.log(e.message); // "URI malformed"
}

try {
  encodeURIComponent("\uD800"); // lone surrogate
} catch (e) {
  console.log(e instanceof URIError); // true
}
```

---

### EvalError

Historically thrown for misuse of the global `eval()` function. In modern JavaScript (ES5+), `eval()` itself no longer throws `EvalError` — the error type is kept for backward compatibility and may be thrown by legacy engines or third-party code.

```js
// Modern JS: this won't throw EvalError from the engine itself
// But you can still create one manually for custom error hierarchies
try {
  throw new EvalError("eval was called indirectly");
} catch (e) {
  console.log(e instanceof EvalError); // true
  console.log(e.name);                 // "EvalError"
}
```

> **Practical tip:** In modern code, `EvalError` is rarely seen. Avoid `eval()` entirely when possible.

---

### InternalError

A **non-standard** error thrown by the JavaScript engine itself when an internal error occurs — most commonly in Firefox's SpiderMonkey engine.

```js
// Firefox may throw this for extreme recursion or large switch statements
// InternalError is NOT part of the ECMAScript standard

// Example (Firefox only):
// InternalError: too much recursion
```

> **Compatibility:** Do not rely on `InternalError` in cross-browser or Node.js code. It is not available in V8 (Chrome/Node) or JavaScriptCore (Safari). Catch it generically via the base `Error` class.

---

### AggregateError

Introduced in **ES2021**. Wraps **multiple errors** into a single error object. Used by `Promise.any()` when all promises reject.

```js
// Promise.any() throws AggregateError when all promises fail
const p1 = Promise.reject(new Error("fail 1"));
const p2 = Promise.reject(new Error("fail 2"));
const p3 = Promise.reject(new Error("fail 3"));

try {
  await Promise.any([p1, p2, p3]);
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message);                   // "All promises were rejected"
  console.log(e.errors);                    // [Error: fail 1, Error: fail 2, Error: fail 3]
}

// You can also throw it manually
throw new AggregateError(
  [new Error("alpha"), new Error("beta")],
  "Multiple validation failures"
);
```

---

### Logical Errors

Logical errors are **not thrown by the engine** — they produce incorrect results silently. They are the hardest class of bug to detect.

```js
// Off-by-one error: wrong loop boundary
function sum(arr) {
  let total = 0;
  for (let i = 1; i <= arr.length; i++) {  // Bug: should start at 0
    total += arr[i];
  }
  return total;
}
console.log(sum([1, 2, 3])); // NaN — no error thrown!

// Wrong operator
function isAdult(age) {
  return age = 18;  // Bug: assignment instead of comparison (=== 18)
}

// Order of operations mistake
const avg = 10 + 20 / 2; // 20, not 15 — division happens first

// Floating point precision
console.log(0.1 + 0.2 === 0.3); // false — classic JS gotcha
```

**Strategies to catch logical errors:**

- Write unit tests (Jest, Vitest, Mocha)
- Use assertions: `console.assert(condition, "message")`
- Enable TypeScript for type-level checks
- Code review and pair programming
- Use a debugger with breakpoints

---

### System Errors (Node.js)

In **Node.js**, system-level failures (file I/O, network, OS calls) produce errors with a `code` property containing a POSIX error code.

```js
const fs = require("fs");

// Reading a non-existent file
fs.readFile("/does/not/exist", (err, data) => {
  if (err) {
    console.log(err.code);    // "ENOENT" — No such file or directory
    console.log(err.message); // "ENOENT: no such file or directory, open '/does/not/exist'"
    console.log(err.syscall); // "open"
    console.log(err.path);    // "/does/not/exist"
  }
});

// Async/await version
const { readFile } = require("fs/promises");

async function loadConfig() {
  try {
    const data = await readFile("./config.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("Config file not found, using defaults.");
      return {};
    }
    throw err; // re-throw unexpected errors
  }
}
```

**Common Node.js error codes:**

|Code|Meaning|
|---|---|
|`ENOENT`|No such file or directory|
|`EACCES`|Permission denied|
|`EADDRINUSE`|Address already in use (ports)|
|`ECONNREFUSED`|Connection refused|
|`ETIMEDOUT`|Operation timed out|
|`EEXIST`|File already exists|
|`EISDIR`|Is a directory (expected a file)|

---

### Custom Errors

Creating custom error classes allows you to **model domain-specific failure states**, carry additional metadata, and use `instanceof` for precise selective catching.

```js
// Base pattern: extend Error
class AppError extends Error {
  constructor(message, options) {
    super(message, options); // options.cause sets error.cause (ES2022)
    this.name = this.constructor.name; // "AppError" instead of "Error"
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor); // V8 only
    }
  }
}

// Domain-specific subclasses
class ValidationError extends AppError {
  constructor(message, fields = []) {
    super(message);
    this.fields = fields;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id "${id}" was not found`);
    this.resource = resource;
    this.id = id;
    this.statusCode = 404;
  }
}

class NetworkError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Usage
function getUser(id) {
  if (typeof id !== "string") {
    throw new ValidationError("User ID must be a string", ["id"]);
  }
  if (id === "") {
    throw new NotFoundError("User", id);
  }
  // ...
}

try {
  getUser(123);
} catch (e) {
  if (e instanceof ValidationError) {
    console.error("Bad input:", e.message, "Fields:", e.fields);
  } else if (e instanceof NotFoundError) {
    console.error(`Not found (${e.statusCode}):`, e.message);
  } else {
    throw e; // unknown error — re-throw
  }
}
```

---

## 2. try / catch / finally

The `try...catch...finally` statement is the **primary mechanism** for handling synchronous errors (and `await`-ed async errors).

### Basic Structure

```js
try {
  // Code that might throw
  riskyOperation();
} catch (error) {
  // Runs if try block throws — error is the thrown value
  console.error("Caught:", error.message);
} finally {
  // Always runs — whether try succeeded, catch ran, or even if return was called
  cleanup();
}
```

### The `try` Block

- Marks a protected region of code.
- The moment an error is thrown, execution **immediately jumps** to the `catch` block — no remaining code in `try` runs.

```js
try {
  console.log("step 1");
  throw new Error("boom");
  console.log("step 2"); // NEVER reached
} catch (e) {
  console.log("caught:", e.message);
}
// Output:
// step 1
// caught: boom
```

### The `catch` Block

- Receives the thrown value as its parameter (conventionally named `e`, `err`, or `error`).
- The thrown value can be **anything** — not just an `Error` object.
- The `catch` parameter is **optional** since ES2019 (optional catch binding).

```js
// You can throw any value
try {
  throw "just a string";
} catch (e) {
  console.log(typeof e); // "string"
}

try {
  throw { code: 42, reason: "custom object" };
} catch (e) {
  console.log(e.code); // 42
}

// Optional catch binding (ES2019) — omit parameter if unused
try {
  JSON.parse("invalid json");
} catch {
  console.log("JSON parsing failed");
}
```

### The `finally` Block

- Runs **unconditionally** after `try` and `catch`, regardless of outcome.
- Runs even if `try` or `catch` contains a `return`, `break`, or `continue`.
- Ideal for cleanup: closing connections, releasing locks, hiding spinners.

```js
function readData() {
  let connection = openConnection();
  try {
    return fetchData(connection); // finally still runs after this return
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    connection.close(); // always executed
    console.log("Connection closed.");
  }
}
```

> **Warning — `finally` overrides `return`:** If `finally` itself has a `return` statement, it will **override** the return value from `try` or `catch`. Avoid returning from `finally` unless intentional.

```js
function demo() {
  try {
    return "from try";
  } finally {
    return "from finally"; // ← This wins!
  }
}
console.log(demo()); // "from finally"
```

### try / catch with async / await

`try/catch` works seamlessly with `async/await`:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new NetworkError("Request failed", response.status);
    }
    return await response.json();
  } catch (e) {
    if (e instanceof NetworkError && e.statusCode === 404) {
      return null; // user not found — handle gracefully
    }
    throw e; // unexpected error — re-throw
  } finally {
    console.log("fetch attempt complete");
  }
}
```

---

## 3. Exception Handling in Depth

### Re-throwing Errors

If a `catch` block cannot fully handle an error, **re-throw it** so it propagates up the call stack.

```js
function parseConfig(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error(`Invalid config JSON: ${e.message}`); // wrap with context
    }
    throw e; // re-throw unrecognised errors untouched
  }
}
```

### Error Wrapping with `cause` (ES2022)

Preserve the original error when wrapping it with a higher-level one:

```js
async function loadUserProfile(id) {
  try {
    return await db.users.findById(id);
  } catch (originalError) {
    throw new AppError("Failed to load user profile", { cause: originalError });
  }
}

try {
  await loadUserProfile("abc");
} catch (e) {
  console.error(e.message);       // "Failed to load user profile"
  console.error(e.cause.message); // original DB error message
}
```

### Nested try / catch

Blocks can be nested for granular control at different layers:

```js
function processFile(path) {
  try {
    let content;
    try {
      content = fs.readFileSync(path, "utf-8");
    } catch (readErr) {
      // Handle read failure specifically
      if (readErr.code === "ENOENT") {
        content = "{}"; // fall back to empty config
      } else {
        throw readErr;
      }
    }

    try {
      return JSON.parse(content);
    } catch (parseErr) {
      throw new SyntaxError(`File at ${path} is not valid JSON`);
    }

  } catch (e) {
    console.error("processFile failed:", e.message);
    return null;
  }
}
```

### Propagation through the Call Stack

Uncaught errors bubble up through every stack frame until caught or they reach the global scope.

```js
function a() { b(); }
function b() { c(); }
function c() { throw new Error("deep error"); }

try {
  a();
} catch (e) {
  // Caught here, even though thrown in c()
  console.log(e.stack);
  // Error: deep error
  //   at c (...)
  //   at b (...)
  //   at a (...)
}
```

### Global Error Handlers

For uncaught errors that escape all `try/catch` blocks:

```js
// Browser — synchronous uncaught errors
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Uncaught error:", message);
  return true; // suppress default browser error display
};

// Browser — unhandled Promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
  event.preventDefault();
});

// Node.js
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1); // always exit after uncaughtException
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});
```

---

## 4. Selective vs General Catching

### General Catching

A bare `catch` clause captures **every** thrown value regardless of type. Use this as a last resort or at the top of your call stack.

```js
try {
  doEverything();
} catch (e) {
  // Catches SyntaxError, TypeError, custom errors — everything
  console.error("Something went wrong:", e.message ?? e);
}
```

**Risks of general catching:**

- Silently swallows unexpected programming errors
- Makes debugging harder
- Can hide bugs that should crash loudly

### Selective Catching

Use `instanceof` to test the error type and handle only what you understand:

```js
try {
  await processOrder(order);
} catch (e) {
  if (e instanceof ValidationError) {
    // Known: show user-facing message
    showToast(e.message);
  } else if (e instanceof NetworkError && e.statusCode >= 500) {
    // Known: server issue — retry
    scheduleRetry();
  } else {
    // Unknown: re-throw so it doesn't get buried
    throw e;
  }
}
```

### Selective Catching by Error Code

Useful for Node.js system errors or custom `code` properties:

```js
try {
  await fs.promises.mkdir("./output");
} catch (e) {
  if (e.code === "EEXIST") {
    // Directory already exists — that's fine
  } else {
    throw e;
  }
}
```

### Selective Catching by Error Name

When `instanceof` isn't available (e.g., across iframe boundaries or module realms):

```js
try {
  riskyOperation();
} catch (e) {
  if (e.name === "ValidationError") {
    handle(e);
  } else {
    throw e;
  }
}
```

### Multi-level Error Hierarchy

Design error classes that allow catching at different levels of specificity:

```js
class AppError extends Error {}
class DatabaseError extends AppError {}
class ConnectionError extends DatabaseError {}
class QueryError extends DatabaseError {}

try {
  await runQuery();
} catch (e) {
  if (e instanceof ConnectionError) {
    // Handle specifically: retry connection
  } else if (e instanceof DatabaseError) {
    // Handle broadly: any DB issue
  } else if (e instanceof AppError) {
    // Handle very broadly: any app error
  } else {
    throw e; // Unknown — re-throw
  }
}
```

### Best Practices Summary

|Principle|Recommendation|
|---|---|
|Be specific first|Check for the most specific type before broader ones|
|Always re-throw unknown|If you don't know the error, don't swallow it|
|Avoid empty catch|`catch (e) {}` hides bugs — log at minimum|
|Don't catch to suppress|Catch to handle, not to hide|
|Use `cause` for context|Preserve the original error when wrapping|

---

## 5. Strict Mode

### What is Strict Mode?

`"use strict"` is a **pragma** (a special string literal) that opts your code into a stricter variant of JavaScript. Introduced in ES5, it catches common mistakes at runtime that would otherwise fail silently.

### Enabling Strict Mode

```js
// File-level: place at the very top of a .js file
"use strict";

function example() {
  // whole file is strict
}

// Function-level: place at the top of a function body
function strictFunction() {
  "use strict";
  // only this function (and nested functions) are strict
}

// ES Modules are ALWAYS strict — no directive needed
// <script type="module"> or .mjs files
export function alwaysStrict() {
  // strict by default
}

// Classes are always strict too
class MyClass {
  method() {
    // strict — no directive needed
  }
}
```

### What Strict Mode Enforces

#### 1. No implicit global variables

```js
"use strict";
function badFunction() {
  undeclared = 42; // ReferenceError: undeclared is not defined
}
// Without strict: silently creates window.undeclared
```

#### 2. `this` is `undefined` in plain function calls

```js
"use strict";
function showThis() {
  console.log(this); // undefined
}
showThis();
// Without strict: this === globalThis (window in browser)
```

#### 3. No deleting undeletable properties

```js
"use strict";
delete Object.prototype; // TypeError: Cannot delete property 'prototype'
```

#### 4. Duplicate parameter names are illegal

```js
"use strict";
function bad(a, a) { } // SyntaxError: Duplicate parameter name not allowed
```

#### 5. Octal literals are forbidden

```js
"use strict";
const n = 010; // SyntaxError: Octal literals are not allowed in strict mode
const correct = 0o10; // Use ES6 octal syntax instead
```

#### 6. Writing to read-only properties throws

```js
"use strict";
const obj = {};
Object.defineProperty(obj, "x", { value: 42, writable: false });
obj.x = 100; // TypeError: Cannot assign to read only property 'x'
// Without strict: silently fails
```

#### 7. `with` statement is forbidden

```js
"use strict";
with (Math) { } // SyntaxError: Strict mode code may not include a with statement
```

#### 8. Reserved words cannot be used as identifiers

```js
"use strict";
const let = 5;       // SyntaxError
const static = true; // SyntaxError
```

### Strict Mode and Error Handling

Strict mode **converts silent failures into thrown errors**, which makes `try/catch` far more effective:

```js
"use strict";

const frozen = Object.freeze({ count: 0 });

try {
  frozen.count = 1; // TypeError in strict mode (silent in sloppy mode)
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message); // "Cannot assign to read only property 'count'"
}
```

### Strict Mode Gotchas

```js
// Concatenating strict and non-strict files can cause problems.
// Always use modules (ESM) for isolation.

// Strict mode applies to the function where declared — not called
function outer() {
  "use strict";

  function inner() {
    // Also strict — inherits from outer
  }
}

// Arrow functions inherit strict mode from their lexical scope
const fn = () => {
  // strict if the surrounding scope is strict
};
```

### Recommendation

> **Always use strict mode** — or better, write all code as ES Modules (`import`/`export`), which are strict by default. Strict mode eliminates an entire class of silent bugs and makes your error handling more predictable and reliable.

---

_End of guide. For further reading, see the [MDN Web Docs on Error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) and the [ECMAScript specification](https://tc39.es/ecma262/)._