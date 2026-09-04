# Web Dev Revision Walkthrough

A recap of everything in your notes — HTML, CSS, JavaScript (core, functions, OOP, arrays, strings, async, errors, DOM), and client-server basics — grouped into 14 modules with checklists and self-test questions.

**How to use this:** go module by module. For each, try to explain every checklist item out loud *before* looking at your notes. Then do the self-test — cover the answer, answer first, check after. If you miss more than half of a module's questions, that's your signal to re-read that section of your notes, not this guide.

---

## Table of Contents
1. [HTML & Page Structure](#1-html--page-structure)
2. [CSS Fundamentals](#2-css-fundamentals)
3. [CSS Text & Display Basics](#3-css-text--display-basics)
4. [CSS Layout & Visual Systems](#4-css-layout--visual-systems)
5. [JS Core: Variables, Types, Semantics](#5-js-core-variables-types-semantics)
6. [JS Functions, Parameters & Scope](#6-js-functions-parameters--scope)
7. [JS Object-Oriented Programming](#7-js-object-oriented-programming)
8. [JS Control Flow: switch](#8-js-control-flow-switch)
9. [JS Arrays](#9-js-arrays)
10. [JS Strings](#10-js-strings)
11. [JS Asynchronous Programming](#11-js-asynchronous-programming)
12. [JS Error Handling](#12-js-error-handling)
13. [The DOM](#13-the-dom)
14. [Client-Server & Networking](#14-client-server--networking)
15. [Suggested Review Schedule](#15-suggested-review-schedule)

---

## 1. HTML & Page Structure

**Checklist**
- [ ] Explain HTML's role as the "skeleton" — structure, not style or behavior
- [ ] Know the required skeleton tags: `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<body>`
- [ ] Multi-page sites = one `.html` file per page, linked via `<a href>`
- [ ] Why `index.html` is special (server default document behavior, e.g. Apache/Nginx)
- [ ] `<div>` vs `<section>` — meaning, SEO, and the "table of contents" rule of thumb
- [ ] Purpose of `<nav>`

**Self-test**
- **Q:** Why does visiting `https://example.com` return `index.html`?
  **A:** Web server software (Apache, Nginx) is configured to serve `index.html` automatically as the default document for a directory request.
- **Q:** When should you reach for `<section>` instead of `<div>`?
  **A:** When the content is a meaningful, thematic chunk that could logically appear in a table of contents (e.g. "About", "Contact"); otherwise use `<div>`.
- **Q:** What's inside `<head>` vs `<body>`?
  **A:** `<head>` = meta info (title, links to CSS/fonts) not shown directly; `<body>` = all visible content.

---

## 2. CSS Fundamentals

**Checklist**
- [ ] Three ways to add CSS: inline (`style=""`), internal (`<style>` in `<head>`), external (`<link rel="stylesheet">`)
- [ ] How to define and reuse a class (`.highlight { }`, `class="highlight"`)
- [ ] CSS comment syntax `/* ... */`
- [ ] Specificity order: inline > ID > class/attribute/pseudo-class > element; `!important` overrides all; ties broken by last-rule-in-file
- [ ] Box model layers, outside-in: **margin → border → padding → content**
- [ ] `box-sizing: border-box` vs default `content-box` — what "width" includes
- [ ] Pseudo-elements style a "part" of an element that isn't a real tag (`::before`, `::-webkit-scrollbar`)
- [ ] Google Fonts `<link>` flow: browser requests CSS → CSS defines fonts → browser downloads font files

**Self-test**
- **Q:** Rank by specificity: `button`, `.btn`, `#submit`, inline `style=""`, `!important`.
  **A:** `!important` > inline style > `#submit` > `.btn` > `button`.
- **Q:** A `<div>` has `width: 200px; padding: 20px; border: 5px solid black;`. What's the rendered width (a) by default, (b) with `box-sizing: border-box`?
  **A:** (a) 250px (200 + 20×2 + 5×2). (b) exactly 200px.
- **Q:** Two rules have equal specificity — which one wins?
  **A:** Whichever is declared last in the CSS (the cascade).

---

## 3. CSS Text & Display Basics

**Checklist**
- [ ] `border-radius`: uniform, per-corner (`10px 20px 30px 40px`), `50%` for circles, `999px` for pills
- [ ] Block vs inline vs inline-block: new line? full width? can set width/height?
- [ ] Default block elements (`div`, `p`, `h1`–`h6`, `section`) vs inline (`span`, `a`, `strong`, `img`)
- [ ] `text-align` (left/right/center/justify) only affects text/inline content, not the element itself
- [ ] `direction: rtl` for Arabic/Hebrew, usually paired with `text-align: right`
- [ ] `text-transform`: uppercase/lowercase/capitalize/none
- [ ] `letter-spacing`, `word-spacing`, `line-height` — 1.5–1.6 line-height is the readability sweet spot

**Self-test**
- **Q:** Can you set `height` on a default `<span>`? How would you fix that if you needed to?
  **A:** No — inline elements ignore width/height. Set `display: inline-block` (or `block`).
- **Q:** Difference between `text-align: right` and `direction: rtl`?
  **A:** `text-align` only shifts where text sits visually; `direction` changes the actual flow direction of the text/characters.
- **Q:** What does `text-transform: capitalize` do to "hello world"?
  **A:** "Hello World" — capitalizes the first letter of *every* word.

---

## 4. CSS Layout & Visual Systems

This is the biggest CSS module — the whole "Part 3" of your notes. Go slow here.

**Checklist — Display & Box Sizing**
- [ ] `display`: block / inline / inline-block / none / flex / grid — what each does
- [ ] `box-sizing: border-box` best practice (`* { box-sizing: border-box; }`)

**Checklist — Flexbox**
- [ ] Applied to the **parent**, not children
- [ ] Container props: `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`
- [ ] Item props: `flex`, `align-self`, `order`
- [ ] The "center anything" pattern: `display:flex; justify-content:center; align-items:center;`

**Checklist — Grid**
- [ ] `grid-template-columns`/`rows`, the `fr` unit, `repeat()`
- [ ] `grid-column` / `grid-row` spanning (`span 2`, `1 / 3`)
- [ ] Flexbox = 1D (row OR column); Grid = 2D (rows AND columns)

**Checklist — Positioning**
- [ ] `position`: static / relative / absolute / fixed / sticky
- [ ] `absolute` anchors to the nearest **positioned** ancestor (or `<body>` if none)
- [ ] `z-index` only works on elements with a non-static position

**Checklist — Sizing, Overflow, Units**
- [ ] Units: `px`, `%`, `vw`/`vh`, `rem` (root font) vs `em` (own font), `min/max/fit-content`
- [ ] `min-width`/`max-width` for clamping responsive containers
- [ ] `overflow`: visible / hidden / scroll / auto, plus `-x`/`-y` variants

**Checklist — Variables, Motion, Effects**
- [ ] CSS variables: `:root { --name: value; }`, used via `var(--name)`
- [ ] `transition: property duration timing-function delay`
- [ ] `transform`: translate/rotate/scale/skew — doesn't affect layout flow
- [ ] `opacity: 0` vs `visibility: hidden` vs `display: none` — visible? space taken?
- [ ] `background`: image/size/position/repeat, gradients
- [ ] `box-shadow` vs `text-shadow` syntax
- [ ] `@keyframes` (full sequences) vs `transition` (two-state animation)

**Checklist — Responsive & Selectors**
- [ ] Mobile-first: default styles for mobile, then `@media (min-width: ...)` to scale up
- [ ] Common breakpoints: 768px (tablet), 1024px (desktop), 1280px (large)
- [ ] Selectors: `>` (direct child), descendant, `+` (adjacent sibling), `~` (general sibling), `[attr]`, `:not()`, `:nth-child()`
- [ ] `calc()` for mixed-unit math
- [ ] `object-fit`: fill/cover/contain/none for images

**Self-test**
- **Q:** Why might `z-index: 999` silently do nothing?
  **A:** The element's `position` is still `static` — z-index only applies to positioned elements.
- **Q:** When would Flexbox fail you and you'd need Grid?
  **A:** When you need precise control over both rows *and* columns simultaneously (e.g. a dashboard layout), not just one direction.
- **Q:** Space taken vs interactive — compare `opacity:0`, `visibility:hidden`, `display:none`.
  **A:** `opacity:0` and `visibility:hidden` both still take up space; `display:none` removes it from layout entirely. (Note: `opacity:0` elements are still technically clickable unless also disabled.)
- **Q:** Write the mobile-first media query pattern in one sentence.
  **A:** Write default (unprefixed) styles for the smallest screen, then override with `@media (min-width: Npx)` blocks as the viewport grows.
- **Q:** What does `absolute` position relative to if no ancestor has `position` set?
  **A:** The `<body>`.

---

## 5. JS Core: Variables, Types, Semantics

**Checklist**
- [ ] `let`/`const`/`var` — block vs function scope, why avoid `var`
- [ ] Never skip the declaration keyword (implicit globals)
- [ ] Primitive types: string, number, boolean, undefined, null, symbol — plus object/array
- [ ] Multi-line strings need backticks, not quotes
- [ ] UTF-16 & surrogate pairs (emoji `.length` is 2, not 1)
- [ ] Truthy/falsy table (`0`, `""`, `null`, `undefined`, `NaN` are falsy)
- [ ] `==` (coerces types) vs `===` (checks type too) — always prefer `===`
- [ ] `null` (you set it) vs `undefined` (JS sets it) — `typeof null === "object"` quirk
- [ ] Coercion: `"5"+3` → `"53"`, but `"5"-3` → `2`, `true+1` → `2`
- [ ] JS has one `number` type — no int/float split; `Math.floor/ceil/round/trunc`, `parseInt`, `toFixed`
- [ ] `Infinity`: how it's produced, arithmetic table, `JSON.stringify` → `null` trap, `Number.isFinite()` > global `isFinite()`
- [ ] `undefined` (declared, empty) vs `ReferenceError` (never declared at all)
- [ ] `const` requires an initializer at declaration

**Self-test**
- **Q:** `typeof null` returns what, and why is it famous?
  **A:** `"object"` — a long-standing JS bug baked into the spec for backward compatibility.
- **Q:** `"5" + 3` vs `"5" - 3` — explain both.
  **A:** `+` triggers string concatenation → `"53"`. `-` has no string equivalent, so JS coerces to numbers → `2`.
- **Q:** Why prefer `Number.isFinite()` over global `isFinite()`?
  **A:** The global version coerces its argument first (`isFinite("42")` → `true`); `Number.isFinite()` doesn't coerce, so it's stricter and more predictable.
- **Q:** What does `JSON.stringify({a: Infinity})` produce?
  **A:** `'{"a":null}'` — silently, with no error.
- **Q:** Name three falsy values besides `false`.
  **A:** Any three of: `0`, `""`, `null`, `undefined`, `NaN`.

---

## 6. JS Functions, Parameters & Scope

**Checklist**
- [ ] Default parameters trigger only on `undefined` — **not** `null`, `0`, `""`, or `false`
- [ ] Defaults are evaluated fresh at **call time** (a default `[]` is a new array every call — unlike Python)
- [ ] A default can only reference parameters declared **before** it
- [ ] Anonymous function syntax vs arrow function syntax
- [ ] Detecting a missing argument: `arguments.length`, sentinel `Symbol`, `??` vs `||`, options-object + `"key" in obj`
- [ ] The "required parameter" trick — a default that calls a function which throws
- [ ] `arguments` reflects the raw call, not the resolved value after defaults apply
- [ ] Automatic Semicolon Insertion (ASI) — JS inserts semicolons at line breaks when a statement can't legally continue

**Self-test**
- **Q:** `function f(x = 5) {}` — what is `x` for `f(null)`, `f(undefined)`, `f()`?
  **A:** `f(null)` → `null` (defaults don't trigger). `f(undefined)` → `5`. `f()` → `5`.
- **Q:** Why is `function addItem(item, list = []) {}` safe in JS but a classic bug source in Python?
  **A:** JS evaluates the default fresh on every call; Python's mutable default is created once and shared across calls.
- **Q:** When should you use `??` instead of `||` for a default?
  **A:** When `0`, `""`, or `false` are valid, meaningful inputs you don't want overwritten.
- **Q:** Describe the "required parameter" trick in one line.
  **A:** Use a default value that's a function call throwing an error — it only runs (and throws) if the caller omits the argument.

---

## 7. JS Object-Oriented Programming

**Checklist**
- [ ] `class` keyword, `constructor` runs first, only one per class
- [ ] `this` = the current instance
- [ ] Methods live on the prototype — shared across instances, memory-efficient
- [ ] The 4 steps `new` performs: create empty object → set prototype → run constructor with `this` bound → return the object
- [ ] Each `new` call produces an independent object (separate properties, shared methods)

**Self-test**
- **Q:** List the 4 steps JS performs for `new ClassName()`.
  **A:** Creates a new empty object → sets its prototype to the class's prototype → runs the constructor with `this` pointing at the new object → returns that object.
- **Q:** Why no `function` keyword inside class method definitions?
  **A:** Class syntax defines methods with shorthand syntax by design — `function` isn't needed or valid there.
- **Q:** Are two instances' methods the same function reference or separate copies?
  **A:** Same reference — methods live on the shared prototype, only instance properties (via `this`) differ.

---

## 8. JS Control Flow: switch

**Checklist**
- [ ] `switch` does **not** stop automatically after a matching case (fall-through)
- [ ] Execution continues into subsequent cases until a `break` or `return`

**Self-test**
- **Q:** `switch(2)` matches `case 2`, and no case has a `break`. What logs?
  **A:** Everything from `case 2` onward — case 2's log, then case 3's, etc.

---

## 9. JS Arrays

**Checklist — Creation & Access**
- [ ] Array literal `[]`, `Array()` constructor, `Array.from()`, `Array.of()`
- [ ] `.at(-1)` for clean end-access

**Checklist — Mutating methods** (change the original)
- [ ] `push`, `pop`, `unshift`, `shift`, `splice`, `reverse`, `sort`, `fill`, `copyWithin`

**Checklist — Non-mutating methods** (return a new array)
- [ ] `concat`, `slice`, `flat`, `flatMap`, `join`, `toReversed`, `toSorted`, `toSpliced`, `with`

**Checklist — Iteration & Searching**
- [ ] `forEach` (not breakable) vs `for...of` (breakable)
- [ ] `indexOf`, `lastIndexOf`, `includes`, `find`, `findIndex`, `findLast`, `findLastIndex`, `some`, `every`

**Checklist — Transformation & Sorting**
- [ ] `map`, `filter`, `reduce`, `reduceRight`
- [ ] **Default `.sort()` is lexicographic** — always pass a comparator for numbers

**Checklist — Spread/Destructuring & 2D Arrays**
- [ ] Spread `...` for merge/clone/args; destructuring with defaults, skipping, swapping; `...rest`
- [ ] 2D array creation pitfall: `new Array(3).fill(new Array(4).fill(0))` shares one array reference across all rows
- [ ] Transpose, flatten, search, sum patterns for matrices

**Checklist — Common Patterns & Performance**
- [ ] Dedupe via `[...new Set(arr)]`, remove falsy via `filter(Boolean)`, chunk, Fisher-Yates shuffle, intersect/difference/zip
- [ ] `for`/`for...of` beats `forEach` in hot paths; use `Set`/`Map` over `indexOf` for large-array lookups; `push` beats `unshift`

**Self-test**
- **Q:** Why doesn't `[10, 1, 21, 2].sort()` give `[1, 2, 10, 21]`? Fix it.
  **A:** Default sort compares as strings ("10" < "2" lexicographically). Fix: `.sort((a, b) => a - b)`.
- **Q:** What's wrong with `new Array(3).fill(new Array(4).fill(0))` as a grid?
  **A:** All three rows point to the *same* inner array — mutating one row mutates all of them. Use `Array.from({length:3}, () => new Array(4).fill(0))`.
- **Q:** Name 5 mutating array methods.
  **A:** Any five of: `push`, `pop`, `shift`, `unshift`, `splice`, `reverse`, `sort`, `fill`, `copyWithin`.
- **Q:** Which loop construct can you `break` out of — `forEach` or `for...of`?
  **A:** `for...of` (and plain `for`). `forEach` cannot be broken early.
- **Q:** Remove duplicates from an array in one line.
  **A:** `[...new Set(arr)]`.

---

## 10. JS Strings

**Checklist**
- [ ] Case: `toUpperCase`/`toLowerCase`
- [ ] Search: `includes`, `startsWith`, `endsWith`, `indexOf`, `lastIndexOf`
- [ ] Trim: `trim`, `trimStart`, `trimEnd`
- [ ] Replace/split: `replace`, `replaceAll`, `split`
- [ ] Pad/repeat: `padStart`, `padEnd`, `repeat`
- [ ] Char access: bracket notation, `.at(-1)`, `.charAt()`
- [ ] `slice` (supports negative indices) vs `substring` (doesn't, treats negatives as 0) vs deprecated `substr`

**Self-test**
- **Q:** `"hello world".substring(-3)` — what happens, and how does `.slice(-3)` differ?
  **A:** `substring` treats `-3` as `0`, returning the whole string. `slice(-3)` correctly returns the last 3 characters (`"rld"`).
- **Q:** Cleanest way to get the last character of a string?
  **A:** `str.at(-1)`.

---

## 11. JS Asynchronous Programming

**Checklist**
- [ ] Why async exists — prevents the page from freezing on slow tasks
- [ ] JS is single-threaded; delegates network/timers/I/O/events to browser or Node APIs, then processes the result via callback
- [ ] `setTimeout(fn, ms)` — result is undefined until the delay finishes; it can't be returned synchronously
- [ ] `setInterval` + `clearInterval` to stop repetition
- [ ] Callbacks — a function passed to run later
- [ ] Event listener vs event handler: **every handler is a callback, but not every callback is a handler** (e.g. a `setTimeout` callback isn't an event handler)
- [ ] Promises: 3 states (pending/fulfilled/rejected), `resolve`/`reject`, `.then`/`.catch`/`.finally`, always attach a `.catch`
- [ ] Callback hell → why promises/async-await are cleaner
- [ ] `async` functions always return a Promise; `await` pauses until it resolves; wrap in `try/catch` for errors

**Self-test**
- **Q:** Why can't you use the return value of `setTimeout`'s callback immediately after calling it?
  **A:** The callback runs asynchronously after the delay — the surrounding code has already moved on by the time it fires.
- **Q:** Name the 3 Promise states.
  **A:** Pending, fulfilled, rejected.
- **Q:** Is every event handler a callback? Is every callback an event handler?
  **A:** Every event handler is a callback, but not every callback is a handler — e.g. a `setTimeout` callback is a plain callback, not triggered by a user/DOM event.
- **Q:** How do you handle a rejected promise inside an `async` function?
  **A:** Wrap the `await` in `try { ... } catch (e) { ... }`.

---

## 12. JS Error Handling

**Checklist**
- [ ] Error hierarchy: `SyntaxError`, `ReferenceError`, `TypeError`, `RangeError`, `URIError`, `EvalError`, `AggregateError` (all extend `Error`)
- [ ] A **top-level** `SyntaxError` can't be caught by `try/catch` (the file never runs); only catchable via `eval`/`new Function`
- [ ] `try/catch/finally` mechanics — `finally` always runs, even after a `return`
- [ ] **Gotcha:** a `return` inside `finally` overrides a `return` from `try`/`catch`
- [ ] Optional catch binding (ES2019): `catch { }` with no parameter
- [ ] Re-throwing, and wrapping errors with `{ cause: originalError }` (ES2022)
- [ ] Global handlers: `window.onerror`, `unhandledrejection`, Node's `process.on('uncaughtException'/'unhandledRejection')`
- [ ] Selective catching (`instanceof`, `.code`, `.name`) vs bare `catch(e){}` — always re-throw what you don't recognize
- [ ] Custom error classes extending `Error`
- [ ] Strict mode: no implicit globals, `this` is `undefined` in plain calls, no duplicate params, no octal literals, no `with`, throws on writes to frozen/read-only props

**Self-test**
- **Q:** Why can't you catch a top-level `SyntaxError` with `try/catch`?
  **A:** The JS engine refuses to execute the file at all if it can't parse it — the error happens before any code, including your `try` block, can run.
- **Q:** Describe the "finally overrides return" gotcha in one line.
  **A:** If `finally` has its own `return`, it silently replaces whatever `try` or `catch` was about to return.
- **Q:** Give 2 reasons to prefer selective catching over a bare `catch(e){}`.
  **A:** It avoids silently swallowing unexpected bugs, and it keeps debugging easier by only handling errors you actually understand.
- **Q:** Name 3 things strict mode changes.
  **A:** Any three of: throws on undeclared globals, `this` is `undefined` in plain function calls, disallows duplicate parameter names, disallows octal literals, disallows `with`, throws when writing to read-only properties.
- **Q:** What produces an `AggregateError`?
  **A:** `Promise.any()` when *all* the given promises reject.

---

## 13. The DOM

**Checklist — What it is**
- [ ] The DOM is the browser's **in-memory representation** of the page — not a file or object you can "download"

**Checklist — Selecting**
- [ ] `getElementById`, `getElementsByClassName` (live), `getElementsByTagName` (live), `querySelector` (first match), `querySelectorAll` (static NodeList)
- [ ] Live vs static: live collections auto-update as the DOM changes; `querySelectorAll` is a frozen snapshot

**Checklist — Traversing**
- [ ] `parentNode`/`parentElement`/`closest()`
- [ ] `children`/`childNodes`, `firstElementChild`/`lastElementChild`
- [ ] `nextElementSibling`/`previousElementSibling`

**Checklist — Creating, Inserting, Removing**
- [ ] `createElement`, `createTextNode`, `createDocumentFragment` (batches inserts, one reflow), `cloneNode(deep)`
- [ ] `appendChild`, `insertBefore`, `insertAdjacentElement/HTML/Text`, `prepend`/`append`, `before`/`after`, `replaceWith`
- [ ] `remove()`, `removeChild`, `replaceChild`

**Checklist — Content, Attributes, Classes, Styles**
- [ ] `textContent` (safe, plain text) vs `innerHTML` (parses HTML, **XSS risk**) vs `innerText` (render-aware) vs `outerHTML` vs `.value` (form fields)
- [ ] `getAttribute`/`setAttribute`/`removeAttribute`/`hasAttribute`/`toggleAttribute`, and `dataset` for `data-*`
- [ ] `classList.add/remove/toggle/contains/replace` vs raw `className`
- [ ] `element.style` (inline) vs `getComputedStyle()` (final, read-only, post-cascade)

**Checklist — Events, Forms, Dimensions**
- [ ] `addEventListener`/`removeEventListener` (needs the same function reference to remove) / `dispatchEvent`
- [ ] Event delegation: one listener on a parent instead of many on children
- [ ] `focus`/`blur`/`click`/`select`, `checkValidity`/`reportValidity`/`setCustomValidity`
- [ ] `getBoundingClientRect()`; `offsetWidth` (incl. padding+border) vs `clientWidth` (incl. padding, excl. border/scrollbar) vs `scrollWidth` (full scrollable size)
- [ ] `scrollTo`/`scrollBy`/`scrollIntoView`

**Checklist — Observers & Best Practices**
- [ ] `IntersectionObserver` (visibility — beats scroll listeners for performance), `MutationObserver` (DOM changes), `ResizeObserver` (size changes)
- [ ] Cache DOM queries in variables, use `textContent` for safety, batch with `DocumentFragment`, prefer `classList`

**Self-test**
- **Q:** Which selection methods return "live" collections?
  **A:** `getElementsByClassName` and `getElementsByTagName`. `querySelectorAll` is static.
- **Q:** Why is `textContent` safer than `innerHTML`?
  **A:** `textContent` treats everything as plain text, so it can't inject executable markup — `innerHTML` parses HTML and is vulnerable to XSS with untrusted input.
- **Q:** Explain event delegation and its main benefit.
  **A:** Attach one listener to a parent and check `e.target` instead of attaching listeners to every child — fewer listeners, and it automatically covers dynamically added children.
- **Q:** `offsetWidth` vs `clientWidth` vs `scrollWidth` — what's the difference?
  **A:** `offsetWidth` includes padding + border; `clientWidth` includes padding but excludes border/scrollbar; `scrollWidth` is the full scrollable content width, including overflow.
- **Q:** When would you use `IntersectionObserver` instead of a `scroll` listener?
  **A:** When you need to know if an element has entered/exited the viewport (e.g. lazy-loading, scroll animations) — it's far more performant than polling scroll position.

---

## 14. Client-Server & Networking

**Checklist**
- [ ] The 5-step front-end/back-end cycle: request → server receives → processes → responds → front-end updates
- [ ] `fetch()` as the JS bridge to that cycle
- [ ] Full URL-to-page flow: DNS lookup → connection established → HTTP(S) request sent → server responds with HTML/CSS/JS/images → browser renders
- [ ] Definitions: **Client** (requests data), **Server** (handles requests, returns resources), **Network** (DNS/TCP/TLS/HTTP infrastructure), **API** (the request/response contract)
- [ ] Kernel-level listening (conceptual): NIC interrupt → kernel processes packet → wakes the sleeping process via its file descriptor → `accept()`/`recv()` returns data
- [ ] The abstraction stack: your code → framework (Express/Django/Laravel) → HTTP library → runtime → libc → syscalls → kernel → hardware — as an app developer you live at the *top*, not near syscalls
- [ ] Web server root directory concept (`/var/www/html`, `index.html` as the default file served)

**Self-test**
- **Q:** Walk through what happens between typing a URL and seeing a rendered page, in order.
  **A:** DNS lookup resolves the domain to an IP → browser opens a connection and sends an HTTP(S) request → server responds with HTML/CSS/JS/images → browser parses and renders them.
- **Q:** As a backend dev using Express or Django, do you ever call `accept()` or `recv()` yourself? Why not?
  **A:** No — the framework and its underlying HTTP library/runtime handle the socket-level syscalls; you only work with requests, routes, and responses.
- **Q:** What is a web server's "root directory," and how does it relate to a request?
  **A:** It's the folder the server serves files from (e.g. `/var/www/html`); a request like `/picture.jpg` maps directly to a file inside that directory.

---

## 15. Suggested Review Schedule

| Day | Focus |
|---|---|
| 1 | HTML (Mod 1) + CSS Fundamentals & Text/Display (Mods 2–3) |
| 2 | CSS Layout & Visual Systems (Mod 4) — the densest module, don't rush it |
| 3 | JS Core + Functions + OOP + switch (Mods 5–8) |
| 4 | Arrays + Strings (Mods 9–10) |
| 5 | Async + Error Handling (Mods 11–12) |
| 6 | The DOM (Mod 13) |
| 7 | Networking (Mod 14) + redo every self-test in this guide cold, no notes |

If a module gives you trouble twice in a row, that's the one worth actual practice problems on, not just re-reading.
