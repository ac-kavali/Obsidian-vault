> A comprehensive reference covering everything you need to handle arrays effectively in modern web development.

## Table of content:
- [[#What is an Array?|What is an Array?]]
- [[#Creating Arrays|Creating Arrays]]
- [[#Accessing & Modifying Elements|Accessing & Modifying Elements]]
- [[#Array Properties|Array Properties]]
- [[#Mutating Methods|Mutating Methods]]
- [[#Non-Mutating Methods|Non-Mutating Methods]]
- [[#Iteration Methods|Iteration Methods]]
- [[#Searching Methods|Searching Methods]]
- [[#Transformation Methods|Transformation Methods]]
- [[#Sorting & Ordering|Sorting & Ordering]]
- [[#Spread, Destructuring & Rest|Spread, Destructuring & Rest]]
- [[#2D Arrays (Matrices)|2D Arrays (Matrices)]]
- [[#Common Web Dev Patterns|Common Web Dev Patterns]]
- [[#Performance Tips|Performance Tips]]
- [[#Quick Reference Cheat Sheet|Quick Reference Cheat Sheet]]

---

## What is an Array?

An **array** is an ordered, indexed collection of values. In JavaScript, arrays are objects and can hold values of **any type** — numbers, strings, booleans, objects, functions, or even other arrays.

```js
const mixed = [42, "hello", true, null, { name: "Yassine" }, [1, 2, 3]];
```

Arrays are **zero-indexed**: the first element is at index `0`.

---

## Creating Arrays

### Array Literal (most common)

```js
const fruits = ["apple", "banana", "cherry"];
```

### `Array()` Constructor

```js
const empty = new Array(5);       // [ <5 empty slots> ]
const filled = new Array(1, 2, 3); // [1, 2, 3]
```

### `Array.from()`

Creates an array from any iterable or array-like object.

```js
Array.from("hello");          // ["h", "e", "l", "l", "o"]
Array.from({ length: 3 }, (_, i) => i * 2); // [0, 2, 4]
Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
```

### `Array.of()`

```js
Array.of(7);        // [7]   (unlike new Array(7) which creates 7 empty slots)
Array.of(1, 2, 3);  // [1, 2, 3]
```

---

## Accessing & Modifying Elements

```js
const arr = ["a", "b", "c", "d"];

arr[0];        // "a"  — first element
arr[arr.length - 1]; // "d" — last element
arr.at(-1);    // "d"  — modern way to access from the end
arr.at(-2);    // "c"

arr[1] = "Z";  // Mutates: ["a", "Z", "c", "d"]
arr[10] = "x"; // Sparse array — gaps filled with empty slots
```

---

## Array Properties

|Property|Description|
|---|---|
|`arr.length`|Number of elements in the array|

```js
const arr = [1, 2, 3];
arr.length;      // 3
arr.length = 2;  // Truncates: [1, 2]
```

---

## Mutating Methods

These methods **change the original array**.

### `push()` — Add to end

```js
const arr = [1, 2];
arr.push(3, 4); // returns new length: 4
// arr → [1, 2, 3, 4]
```

### `pop()` — Remove from end

```js
const arr = [1, 2, 3];
arr.pop(); // returns 3
// arr → [1, 2]
```

### `unshift()` — Add to beginning

```js
const arr = [2, 3];
arr.unshift(0, 1); // returns new length: 4
// arr → [0, 1, 2, 3]
```

### `shift()` — Remove from beginning

```js
const arr = [1, 2, 3];
arr.shift(); // returns 1
// arr → [2, 3]
```

### `splice()` — Add/remove at any position

```js
const arr = ["a", "b", "c", "d"];

// Remove 2 elements starting at index 1
arr.splice(1, 2); // returns ["b", "c"]
// arr → ["a", "d"]

// Insert without removing
arr.splice(1, 0, "X", "Y"); // arr → ["a", "X", "Y", "d"]

// Replace
arr.splice(1, 1, "Z"); // arr → ["a", "Z", "Y", "d"]
```

### `reverse()` — Reverse in place

```js
const arr = [1, 2, 3];
arr.reverse(); // arr → [3, 2, 1]
```

### `sort()` — Sort in place

```js
const arr = [3, 1, 4, 1, 5];
arr.sort((a, b) => a - b); // ascending: [1, 1, 3, 4, 5]
arr.sort((a, b) => b - a); // descending: [5, 4, 3, 1, 1]
```

### `fill()` — Fill with a value

```js
new Array(5).fill(0);          // [0, 0, 0, 0, 0]
[1, 2, 3, 4].fill(9, 1, 3);   // [1, 9, 9, 4]
```

### `copyWithin()` — Copy elements within the array

```js
[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

---

## Non-Mutating Methods

These methods **return a new array** without changing the original.

### `concat()` — Merge arrays

```js
const a = [1, 2];
const b = [3, 4];
a.concat(b);        // [1, 2, 3, 4]
a.concat(b, [5, 6]); // [1, 2, 3, 4, 5, 6]
// a is unchanged
```

### `slice()` — Extract a portion

```js
const arr = ["a", "b", "c", "d", "e"];
arr.slice(1, 3);  // ["b", "c"]   (index 1 to 2)
arr.slice(-2);    // ["d", "e"]   (last 2 elements)
arr.slice();      // shallow copy of the whole array
```

### `flat()` — Flatten nested arrays

```js
[1, [2, [3, [4]]]].flat();     // [1, 2, [3, [4]]]   (1 level)
[1, [2, [3, [4]]]].flat(2);    // [1, 2, 3, [4]]     (2 levels)
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]   (fully flat)
```

### `flatMap()` — Map then flatten one level

```js
const sentences = ["hello world", "foo bar"];
sentences.flatMap(s => s.split(" ")); // ["hello", "world", "foo", "bar"]
```

### `join()` — Convert to string

```js
["a", "b", "c"].join("-"); // "a-b-c"
["a", "b", "c"].join("");  // "abc"
["a", "b", "c"].join();    // "a,b,c" (default comma)
```

### `toString()`

```js
[1, 2, 3].toString(); // "1,2,3"
```

### `toReversed()` _(ES2023)_

```js
const arr = [1, 2, 3];
arr.toReversed(); // [3, 2, 1] — original unchanged
```

### `toSorted()` _(ES2023)_

```js
const arr = [3, 1, 2];
arr.toSorted((a, b) => a - b); // [1, 2, 3] — original unchanged
```

### `toSpliced()` _(ES2023)_

```js
const arr = ["a", "b", "c"];
arr.toSpliced(1, 1, "X"); // ["a", "X", "c"] — original unchanged
```

### `with()` _(ES2023)_

```js
const arr = [1, 2, 3];
arr.with(1, 99); // [1, 99, 3] — original unchanged
```

---

## Iteration Methods

### `forEach()` — Loop through elements

```js
["a", "b", "c"].forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// 0: a  /  1: b  /  2: c
// Returns undefined — cannot break out of it
```

### `for...of` — Modern loop (breakable)

```js
const arr = [10, 20, 30];
for (const item of arr) {
  if (item === 20) break;
  console.log(item); // 10
}
```

### `entries()`, `keys()`, `values()`

```js
const arr = ["x", "y", "z"];

for (const [i, val] of arr.entries()) {
  console.log(i, val); // 0 x, 1 y, 2 z
}

[...arr.keys()];   // [0, 1, 2]
[...arr.values()]; // ["x", "y", "z"]
```

---

## Searching Methods

### `indexOf()` — First index of a value

```js
[1, 2, 3, 2].indexOf(2);     // 1
[1, 2, 3, 2].indexOf(2, 2);  // 3 (search from index 2)
[1, 2, 3].indexOf(99);       // -1 (not found)
```

### `lastIndexOf()` — Last index of a value

```js
[1, 2, 3, 2].lastIndexOf(2); // 3
```

### `includes()` — Check existence

```js
[1, 2, 3].includes(2);    // true
[1, 2, NaN].includes(NaN); // true  (unlike indexOf)
```

### `find()` — First matching element

```js
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
users.find(u => u.id === 2); // { id: 2 }
users.find(u => u.id === 99); // undefined
```

### `findIndex()` — Index of first match

```js
[10, 20, 30].findIndex(x => x > 15); // 1
```

### `findLast()` _(ES2023)_ — Last matching element

```js
[1, 2, 3, 4].findLast(x => x % 2 === 0); // 4
```

### `findLastIndex()` _(ES2023)_

```js
[1, 2, 3, 4].findLastIndex(x => x % 2 === 0); // 3
```

### `some()` — At least one match?

```js
[1, 2, 3].some(x => x > 2); // true
[1, 2, 3].some(x => x > 5); // false
```

### `every()` — All match?

```js
[2, 4, 6].every(x => x % 2 === 0); // true
[2, 3, 6].every(x => x % 2 === 0); // false
```

---

## Transformation Methods

### `map()` — Transform each element

```js
[1, 2, 3].map(x => x * 2);            // [2, 4, 6]
["alice", "bob"].map(s => s.toUpperCase()); // ["ALICE", "BOB"]

// Real-world: transform API data
const users = [{ name: "Alice", age: 25 }];
users.map(u => u.name); // ["Alice"]
```

### `filter()` — Keep matching elements

```js
[1, 2, 3, 4, 5].filter(x => x % 2 === 0); // [2, 4]

// Real-world: filter active users
const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false }
];
users.filter(u => u.active); // [{ name: "Alice", active: true }]
```

### `reduce()` — Accumulate into a single value

```js
// Sum
[1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0); // 10

// Flatten
[[1, 2], [3, 4]].reduce((acc, arr) => acc.concat(arr), []); // [1, 2, 3, 4]

// Group by property
const people = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Carol", role: "admin" }
];
people.reduce((groups, person) => {
  const key = person.role;
  groups[key] = groups[key] || [];
  groups[key].push(person);
  return groups;
}, {});
// { admin: [Alice, Carol], user: [Bob] }
```

### `reduceRight()` — Reduce from right to left

```js
[[1, 2], [3, 4], [5]].reduceRight((acc, arr) => acc.concat(arr), []);
// [5, 3, 4, 1, 2]
```

---

## Sorting & Ordering

```js
// Strings (alphabetical)
["banana", "apple", "cherry"].sort();
// ["apple", "banana", "cherry"]

// Numbers (ALWAYS use a comparator)
[10, 1, 21, 2].sort();              // ❌ ["1", "10", "2", "21"] (lexicographic!)
[10, 1, 21, 2].sort((a, b) => a - b); // ✅ [1, 2, 10, 21]

// Sort objects by property
const products = [
  { name: "Pen", price: 1.5 },
  { name: "Notebook", price: 3.0 },
  { name: "Eraser", price: 0.75 }
];
products.sort((a, b) => a.price - b.price);
// Sorted cheapest to most expensive

// Sort strings with localeCompare
["éclair", "apple", "über"].sort((a, b) => a.localeCompare(b));
// ["apple", "éclair", "über"]
```

---

## Spread, Destructuring & Rest

### Spread `...`

```js
const a = [1, 2, 3];
const b = [4, 5, 6];

// Merge
const merged = [...a, ...b]; // [1, 2, 3, 4, 5, 6]

// Clone (shallow)
const clone = [...a]; // [1, 2, 3]

// Pass as arguments
Math.max(...a); // 3
```

### Array Destructuring

```js
const [first, second, ...rest] = [10, 20, 30, 40];
first;  // 10
second; // 20
rest;   // [30, 40]

// Skip elements
const [, , third] = [1, 2, 3]; // 3

// Default values
const [x = 0, y = 0] = [5]; // x=5, y=0

// Swap variables
let p = 1, q = 2;
[p, q] = [q, p]; // p=2, q=1
```

### Rest in function parameters

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

---

## 2D Arrays (Matrices)

A **2D array** is an array of arrays — used to represent grids, tables, matrices, game boards, image pixels, and more.

### Creating a 2D Array

```js
// Manual
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Programmatic (N rows × M cols filled with 0)
const rows = 3, cols = 4;
const grid = Array.from({ length: rows }, () => new Array(cols).fill(0));
// [[0,0,0,0], [0,0,0,0], [0,0,0,0]]
```

> ⚠️ **Avoid this common mistake:**
> 
> ```js
> // WRONG — all rows share the same array reference!
> const bad = new Array(3).fill(new Array(4).fill(0));
> bad[0][0] = 99; // Mutates ALL rows
> 
> // CORRECT
> const good = Array.from({ length: 3 }, () => new Array(4).fill(0));
> ```

### Accessing Elements

```js
matrix[row][col]

matrix[0][0]; // 1 (top-left)
matrix[1][2]; // 6 (row 1, col 2)
matrix[2][2]; // 9 (bottom-right)
```

### Iterating a 2D Array

```js
// Nested for loop
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    console.log(`[${r}][${c}] = ${matrix[r][c]}`);
  }
}

// With forEach
matrix.forEach((row, r) => {
  row.forEach((val, c) => {
    console.log(val);
  });
});

// With for...of
for (const row of matrix) {
  for (const val of row) {
    console.log(val);
  }
}
```

### Common 2D Array Operations

#### Transpose (rows ↔ columns)

```js
const transpose = matrix =>
  matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

transpose([[1, 2], [3, 4], [5, 6]]);
// [[1, 3, 5], [2, 4, 6]]
```

#### Flatten a 2D array

```js
matrix.flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### Search in a 2D array

```js
const findIn2D = (grid, target) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === target) return [r, c];
    }
  }
  return null;
};

findIn2D(matrix, 5); // [1, 1]
```

#### Sum all values

```js
const total = matrix.flat().reduce((sum, n) => sum + n, 0); // 45
```

#### Map over a 2D array

```js
const doubled = matrix.map(row => row.map(val => val * 2));
// [[2,4,6], [8,10,12], [14,16,18]]
```

### Real-World 2D Array Example — Grid/Game Board

```js
// Tic-Tac-Toe board
const board = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["O", "X", "X"]
];

// Check if a row is a win
const isWinner = (board, player) => {
  const size = board.length;

  // Check rows
  for (const row of board) {
    if (row.every(cell => cell === player)) return true;
  }
  // Check columns
  for (let c = 0; c < size; c++) {
    if (board.every(row => row[c] === player)) return true;
  }
  // Check main diagonal
  if (board.every((row, i) => row[i] === player)) return true;
  // Check anti-diagonal
  if (board.every((row, i) => row[size - 1 - i] === player)) return true;

  return false;
};

isWinner(board, "X"); // true
```

---

## Common Web Dev Patterns

### Remove duplicates

```js
const unique = [...new Set([1, 2, 2, 3, 3, 4])]; // [1, 2, 3, 4]
```

### Remove falsy values

```js
[0, 1, false, 2, "", 3, null, undefined].filter(Boolean); // [1, 2, 3]
```

### Chunk an array

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### Shuffle an array (Fisher-Yates)

```js
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
```

### Get random element

```js
const random = arr => arr[Math.floor(Math.random() * arr.length)];
```

### Intersection of two arrays

```js
const intersect = (a, b) => a.filter(x => b.includes(x));
intersect([1, 2, 3], [2, 3, 4]); // [2, 3]
```

### Difference of two arrays

```js
const difference = (a, b) => a.filter(x => !b.includes(x));
difference([1, 2, 3], [2, 3, 4]); // [1]
```

### Zip two arrays

```js
const zip = (a, b) => a.map((val, i) => [val, b[i]]);
zip([1, 2, 3], ["a", "b", "c"]); // [[1,"a"], [2,"b"], [3,"c"]]
```

---

## Performance Tips

|Tip|Why|
|---|---|
|Use `for` loop or `for...of` for large arrays|Faster than `forEach` in hot paths|
|Avoid `indexOf` in large arrays — use a `Set` or `Map` for lookups|O(1) vs O(n)|
|Prefer `push()` over `unshift()`|`unshift` re-indexes all elements|
|Use `slice()` to clone, not `JSON.parse(JSON.stringify(...))`|Faster for flat arrays|
|Avoid sparse arrays|Can cause deoptimization in JS engines|
|Use `flat(Infinity)` carefully on deeply nested data|Can be slow on very large trees|
|Batch DOM updates using arrays|Collect changes, then apply once|

---

## Quick Reference Cheat Sheet

|Method|Mutates?|Returns|Use For|
|---|---|---|---|
|`push`|✅|new length|Add to end|
|`pop`|✅|removed item|Remove from end|
|`shift`|✅|removed item|Remove from start|
|`unshift`|✅|new length|Add to start|
|`splice`|✅|removed items|Insert/remove anywhere|
|`reverse`|✅|array|Reverse order|
|`sort`|✅|array|Sort elements|
|`fill`|✅|array|Fill with value|
|`map`|❌|new array|Transform elements|
|`filter`|❌|new array|Select elements|
|`reduce`|❌|any value|Accumulate|
|`find`|❌|element/undefined|Find first match|
|`findIndex`|❌|index/-1|Find index of match|
|`some`|❌|boolean|At least one match|
|`every`|❌|boolean|All match|
|`includes`|❌|boolean|Existence check|
|`indexOf`|❌|index/-1|Find index by value|
|`slice`|❌|new array|Extract portion|
|`concat`|❌|new array|Merge arrays|
|`flat`|❌|new array|Flatten nested|
|`flatMap`|❌|new array|Map + flatten|
|`join`|❌|string|To string|
|`forEach`|❌|undefined|Side effects/loop|
|`at`|❌|element|Access by index (supports negative)|
|`toReversed`|❌|new array|Reverse without mutation|
|`toSorted`|❌|new array|Sort without mutation|

---

_Documented for modern JavaScript (ES2023+). All examples are runnable in any modern browser console._