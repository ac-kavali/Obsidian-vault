## Introduction : 
**Document Object Module**: The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects, manipulated and edited using JavaScript. 

---
## Nodes 
The browser load an html file, but it not work with html as text, instead it convert
the HTML into a structure called Document Object Module, consisting of Nodes
where each node represent an html element (</a>, </h>, </img>)
*Example*:
```js
const title = document.querySelector("h1");
```
- `document` → represents the **entire HTML page (DOM)** loaded in the browser.
- `.querySelector("h1")` → a DOM method to searches for the **first `<h1>` element**.
- `title` → becomes a **reference (variable pointing to that DOM node)**.

```js
title.textContent = "Hello";
```
Here we used the title constant to directly modify the `h1` Node in the DOM.
And this way how js works 

--- 
## DOM Methods 
