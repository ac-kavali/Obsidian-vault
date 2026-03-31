#### Async **Programming**
JavaScript executes code one line at a time. Each line must finish before the next line can run.

Asynchronous is how JavaScript can allow some code to run in the background, and let their results be handled when they are ready.
**Async code** allows a program to start a long-running task (like fetching data from a file). and continue with other tasks before the first one finishes.

**Async code** prevents the application from freezing, which is critical for user experience.


**Controle flow**: is the order in which statements are executed in a program.
By default, JavaScript runs code _from top to bottom_ and left to right.
And async programing can change this.

## Why Async Code

_Some tasks take time to finish_ (network requests, timers, user interaction).
**To stay responsive**, JavaScript can use **async programming**.
**Asynchronous flow** refers to how JavaScript allows certain operations to **run in the background** and let their results be **handled when they are ready**.
If JavaScript waited for these tasks, the page would freeze.
Asych code lets the rest of the program continue to run.
Async code does not run immediately:
- **Timers** run after a specified number of milliseconds.
- **Events** run when triggered by an event or interaction.
- **Network requests** run when the data arrives.

### Async with single thread
JavaScript is single-threaded, so it delegates async work to external APIs — in the browser or Node.js — which handle four things on its behalf: network requests, timers, user interactions, and I/O operations. Once any of those finish, the result is handed back to JavaScript to process.

|Task type|Who handles it|Is it blocking JS?|
|---|---|---|
|Calculation / math / loops|JS engine| yes, blocks|
|Network request|Browser / Node APIs| no, async|
|Timer (`setTimeout`)|Browser / Node APIs| no, async|
|File I/O (Node)|Node’s libuv / OS| no, async|
The JS engine only receives the result (or a notification that something is ready), at which point it runs the callback — which is typically a quick operation that doesn't block other tasks.


## SetTimout
Is a _node/browser API_ that lets you schedule a function to run after a certain delay (in milliseconds).
**Syntax**
```js
setTimeout(functionToRun, delayInMs);
```
- `functionToRun` → the function you want to execute later
- `delayInMs` → how long to wait (in milliseconds) before running the function
```js
let counter = 0;

const intervalId = setInterval(() => {
  counter++;
  console.log("Counter:", counter);
  if(counter === 5) {
    clearInterval(intervalId); // stop after 5 times
  }
}, 1000);
```

- `ClearInterval` 






## JavaScript Events
**Events** are actions or occurrences that happen in the browser, often triggered by user interactions (like clicks, keypresses, or form submissions) or by the browser itself (like page loading or resizing).




When you write:
```js
const p = new Promise((resolve, reject) => {  
  // async work  
});
```
👉 `Promise` is actually a **constructor function (or class)** in JavaScript.

So using `new` means:

> “Create a new instance (object) of Promise”
> 