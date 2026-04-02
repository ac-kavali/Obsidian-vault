## Table of content
- [[#Async **Programming**|Async Programming]]
- [[#Why Async Code|Why Async Code]]
- [[#SetTimout|SetTimout]]
- [[#SetInterval|SetInterval]]
- [[#Callbacks|Callbacks]]
- [[#Events|Events]]
- [[#Event Listner|Event Listner]]
- [[#Event Handler|Event Handler]]
- [[#Promises|Promises]]

---
## Async **Programming**
JavaScript executes code one line at a time. Each line must finish before the next line can run.

Asynchronous is how JavaScript can allow some code to run in the background, and let their results be handled when they are ready.
**Async code** allows a program to start a long-running task (like fetching data from a file). and continue with other tasks before the first one finishes.

**Async code** prevents the application from freezing, which is critical for user experience.


**Controle flow**: is the order in which statements are executed in a program.
By default, JavaScript runs code _from top to bottom_ and left to right.
And async programing can change this.

---
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

---
## SetTimout
Is a Asynchronous Operation provided by (Browser/node API) that lets you schedule a function to run after a certain delay (in milliseconds), 
**Syntax**
```js
setTimeout(functionToRun, delayInMs);
```
- `functionToRun` → the function you want to execute later
- `delayInMs` → how long to wait (in milliseconds) before running the function
- **Important**: the result of the `setTimout` is not defined till the delay is ended, this means you cannot return the result right away (before they are finished). it's undefined.
![[settimeout.png|453]]

---
## SetInterval 
Is a function provided by the browser or Node.js that repeatedly schedules a callback function to be executed every specified delay (in milliseconds), in an asynchronous way.

Example:
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
- `ClearInterval`: used to stop the function callback, without it will stay infinitly executed.
- It **does NOT run just once**.
- It schedules the callback **repeatedly**, every N milliseconds.

---
## Callbacks
A **callback** is simply a function passed as an argument to another function, which can be called **at some point** by that function.

_exmaple_
```js
function greet(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  const name = "Ahmed";
  callback(name);
}

processUserInput(greet);
```
Here we pass `greet` function as a parameter to the `processUserInput` function to be executed later.

---
## Events
An **event** is something that happens in your program that JavaScript can react to. like user click or typing, page loads, data arrive, timer finish 
Callbacks are often used in JavaScript, especially in **event handling**:

## Event Listner 
The event listner is the built-in function that takes an `event type` like the `"click"`, and a [[#Event Handler|`event handler`]], to be executed when an en event happens.
```js
button.addEventListener("click", function () {  
console.log("Button clicked!");  
});
```
- `"click"` → the event
- `function () { ... }` → the event handler
Let me say it clearly:

_Every event handler is a callback function,  
but not every callback is an event handler._
Why, in this example 
```js
setTimeout(()=>{
	console.log("Time Finished"})
}, 2000);
```
this is a `callback` but not an `Event Handler`!
 

---
## Event Handler
An **event handler** is a **function (callback) that runs when an event happens**. sent as a the seconde parameter of the `eventListner`.
this simple term represent what exactly happens : 
- “When X happens → run this function”

---
## Promises
**JavaScript Promises** were created to make **asynchronous JavaScript easier** to use.
Before promises, JS used **callbacks** to make a nested async function, where one depend on the result of the other, and if they are more than 2 functions, being hard to read and debug, and this problem called callback hell.

**Callbacks Hell**
```js
a(function() {
  b(function() {
    c(function() {
      d(function() {
        e(function() {
          // 💀 nightmare
        });
      });
    });
  });
});
```
Promises let you write the **same logic in a cleaner way**.

**Syntax**
```js
const promise = new Promise((resolve, reject) => {  
// async task  
   if (success) {  
	  resolve(value);  
	} else {  
  reject(error);  
  }  
});
```

👉 `Promise` is actually a **constructor function (or class)** in JavaScript.
So using `new` means:
> “Create a new instance (object) of Promise”

### Promises has 3 States
A promise can be in one of three exclusive states:
- **Pending:** : The initial state; the operation has started but is neither fulfilled nor rejected.
- **Fulfilled:** The operation completed successfully, and a value is available.
- **Rejected:** :The operation failed, and a reason (error) is available

### Resolve & Reject
**Resolve** You call `resolve(value)` when everything worked fine.
```js
resolve("Data loaded");
```
**Reject** You call `reject(value)` when something goes wrong.
```js 
reject("Error");
```
example:
```js
// A simple promise that resolves or rejects randomly
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5; // 50% chance

  if (success) {
    resolve("Yay! It worked!");
  } else {
    reject("Oops! Something went wrong.");
  }
});

// Using .then() for success and .catch() for error
myPromise
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```
`.then`, `.catch` are two promis object methods
**.Then** Runs when the promis resolves successfully.
**.Catch** Runs when the promis is rejected. 
- **.finally(onFinally):**  
    This handler is called when the promise is settled (either fulfilled or rejected), regardless of the outcome. It's useful for cleanup operations.

---
**result** Just a variable name or the function parameter and it takes its value from the return of the promise if it resolved, in this case its "Yay! It worked!".

- Both `.then()` and `.catch()` expect **functions** as arguments.
- You **cannot pass a non-function** (like a string or number) directly; it won’t work.
- `.then()` can take **two functions**; `.catch()` takes only **one**.
- Both return a **new Promise**, so you can chain them.

```js
mypromise
  .then(result => console.log(result))
  .catch(error => console.log(error));
```
Always attach a `.catch()` **to the promise chain**:

## Await and Async

**The async** keyword before a function makes the function return a promise.
`async` = "this function always returns a Promise"

### Use that promise:
1. Using `.then()` (classic way)
```js
async function getNumber() {
   return Promise.resolve(42);
}

getNumber().then(result => {
  console.log(result); // 42
});
```
 2. Using `await` (modern way )
```js
async function getNumber() {
  return 42;
}

async function main() {
  const result = await getNumber();
  console.log(result); // 42
}

main();
```
3. Handling Error :
```js
  async function getData() {
   throw new Error("Something went wrong");
  }

  getData()
   .then(data => console.log(data))
   .catch(err => console.log(err.message));
```


**await**:  is a keyword that lets you **wait for a Promise to finish** and gives you its result.
```js
const result = await somePromise;
```

_Simple example_
```js
function getNumber() {
  return Promise.resolve(10);
}

async function test() {
  const value = await getNumber();
  console.log(value);
}

test();
```