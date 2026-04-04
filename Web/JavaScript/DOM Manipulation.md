## Table of Contents
- [[#Introduction :|Introduction :]]
- [[#Nodes|Nodes]]
- [[#1. Selecting Elements|1. Selecting Elements]]
- [[#2. Traversing the DOM|2. Traversing the DOM]]
- [[#3. Creating & Cloning Nodes|3. Creating & Cloning Nodes]]
- [[#4. Inserting Nodes|4. Inserting Nodes]]
- [[#5. Removing & Replacing Nodes|5. Removing & Replacing Nodes]]
- [[#6. Reading & Writing Content|6. Reading & Writing Content]]
- [[#7. Working with Attributes|7. Working with Attributes]]
- [[#8. Working with Classes|8. Working with Classes]]
- [[#9. Working with Styles|9. Working with Styles]]
- [[#10. Event Handling|10. Event Handling]]
- [[#11. Form & Input Methods|11. Form & Input Methods]]
- [[#12. Dimensions, Scroll & Position|12. Dimensions, Scroll & Position]]
- [[#13. Document & Window Methods|13. Document & Window Methods]]
- [[#14. Modern / Utility Methods|14. Modern / Utility Methods]]
- [[#15. Quick Reference Table|15. Quick Reference Table]]
- [[#Tips & Best Practices|Tips & Best Practices]]

---
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
# DOM Methods
## 1. Selecting Elements

These methods are used to find and retrieve elements from the DOM.

### `document.getElementById(id)`

Returns the single element that has the given `id` attribute. Returns `null` if not found.

```js
const header = document.getElementById('main-header');
```

### `document.getElementsByClassName(className)`

Returns a live `HTMLCollection` of all elements with the specified class name. Can be called on any element, not just `document`.

```js
const cards = document.getElementsByClassName('card');
// cards[0], cards[1], etc.
```

### `document.getElementsByTagName(tagName)`

Returns a live `HTMLCollection` of all elements with the given tag name. Use `'*'` to select all elements.

```js
const paragraphs = document.getElementsByTagName('p');
const all = document.getElementsByTagName('*');
```

### `document.querySelector(selector)`

Returns the **first** element that matches the given CSS selector. Returns `null` if no match is found.

```js
const btn = document.querySelector('.btn-primary');
const input = document.querySelector('form > input[type="email"]');
```

### `document.querySelectorAll(selector)`

Returns a **static** `NodeList` of all elements matching the CSS selector.

```js
const items = document.querySelectorAll('ul.menu > li');
items.forEach(item => console.log(item.textContent));
```

> **Live vs Static:** `getElementsByClassName` and `getElementsByTagName` return _live_ collections that update automatically. `querySelectorAll` returns a _static_ snapshot.

### `document.getElementsByName(name)`

Returns a live `NodeList` of elements with the specified `name` attribute. Primarily used with form elements.

```js
const radios = document.getElementsByName('gender');
```

---

## 2. Traversing the DOM

Navigate the node tree relative to a selected element.

### Parent Navigation

|Property|Returns|
|---|---|
|`element.parentNode`|The parent node (could be any node type)|
|`element.parentElement`|The parent element (only element nodes)|
|`element.closest(selector)`|Nearest ancestor matching the CSS selector|

```js
const li = document.querySelector('li.active');
const ul = li.parentElement;
const nav = li.closest('nav');
```

### Child Navigation

|Property|Returns|
|---|---|
|`element.childNodes`|Live NodeList of all child nodes (including text/comments)|
|`element.children`|Live HTMLCollection of child _elements_ only|
|`element.firstChild`|First child node|
|`element.lastChild`|Last child node|
|`element.firstElementChild`|First child _element_|
|`element.lastElementChild`|Last child _element_|
|`element.childElementCount`|Number of child elements|

```js
const list = document.querySelector('ul');
console.log(list.children);          // all <li> elements
console.log(list.firstElementChild); // first <li>
```

### Sibling Navigation

|Property|Returns|
|---|---|
|`element.nextSibling`|Next sibling node|
|`element.previousSibling`|Previous sibling node|
|`element.nextElementSibling`|Next sibling _element_|
|`element.previousElementSibling`|Previous sibling _element_|

```js
const active = document.querySelector('.active');
const next = active.nextElementSibling;
const prev = active.previousElementSibling;
```

---

## 3. Creating & Cloning Nodes

### `document.createElement(tagName)`

Creates a new HTML element node. The element is not yet in the DOM until inserted.

```js
const div = document.createElement('div');
div.className = 'card';
```

### `document.createTextNode(text)`

Creates a new text node. Useful for safely inserting plain text without HTML parsing.

```js
const text = document.createTextNode('Hello, World!');
```

### `document.createDocumentFragment()`

Creates a lightweight container that lives outside the DOM. Use it to batch DOM insertions for better performance.

```js
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment); // single reflow
```

### `element.cloneNode(deep)`

Returns a copy of the element. Pass `true` to deep-clone all descendants; `false` to clone only the element itself.

```js
const original = document.getElementById('template');
const copy = original.cloneNode(true); // includes children
```

---

## 4. Inserting Nodes

### `parentElement.appendChild(node)`

Appends a node as the **last child** of the parent. If the node already exists in the DOM, it is moved.

```js
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'New item';
ul.appendChild(li);
```

### `parentElement.insertBefore(newNode, referenceNode)`

Inserts `newNode` before `referenceNode` inside the parent.

```js
const parent = document.querySelector('ul');
const newLi = document.createElement('li');
const firstLi = parent.firstElementChild;
parent.insertBefore(newLi, firstLi); // inserts at beginning
```

### `element.insertAdjacentElement(position, element)`

Inserts an element at a specified position relative to the target. Position values:

|Position|Where|
|---|---|
|`'beforebegin'`|Before the element itself|
|`'afterbegin'`|Just inside the element, before its first child|
|`'beforeend'`|Just inside the element, after its last child|
|`'afterend'`|After the element itself|

```js
const section = document.querySelector('section');
const newDiv = document.createElement('div');
section.insertAdjacentElement('afterend', newDiv);
```

### `element.insertAdjacentHTML(position, htmlString)`

Parses and inserts an HTML string at the given position. **Avoid using with untrusted input** (XSS risk).

```js
const list = document.querySelector('ul');
list.insertAdjacentHTML('beforeend', '<li class="new">Added</li>');
```

### `element.insertAdjacentText(position, text)`

Inserts plain text at the given position. Safe alternative to `insertAdjacentHTML` for text content.

```js
document.querySelector('p').insertAdjacentText('beforeend', ' — updated');
```

### `element.prepend(...nodesOrStrings)`

Inserts nodes or strings at the **beginning** of the element.

```js
const ul = document.querySelector('ul');
ul.prepend('First: ', document.createElement('li'));
```

### `element.append(...nodesOrStrings)`

Inserts nodes or strings at the **end** of the element. Unlike `appendChild`, can accept multiple arguments and strings.

```js
const div = document.querySelector('.container');
div.append('Some text', newElement);
```

### `element.before(...nodesOrStrings)` / `element.after(...nodesOrStrings)`

Inserts nodes or strings directly before or after the element (outside of it).

```js
const h2 = document.querySelector('h2');
h2.before(document.createElement('hr'));  // <hr> before <h2>
h2.after(document.createElement('hr'));   // <hr> after <h2>
```

### `element.replaceWith(...nodesOrStrings)`

Replaces the element in the DOM with the provided nodes/strings.

```js
const old = document.getElementById('old-banner');
const newBanner = document.createElement('div');
old.replaceWith(newBanner);
```

---

## 5. Removing & Replacing Nodes

### `element.remove()`

Removes the element from the DOM. Simple and direct.

```js
document.querySelector('.toast').remove();
```

### `parentElement.removeChild(childNode)`

Removes and returns the specified child node. The removed node can be re-inserted later.

```js
const ul = document.querySelector('ul');
const li = ul.lastElementChild;
ul.removeChild(li);
```

### `parentElement.replaceChild(newChild, oldChild)`

Replaces `oldChild` with `newChild` inside the parent.

```js
const parent = document.querySelector('div');
const oldEl = document.getElementById('old');
const newEl = document.createElement('span');
parent.replaceChild(newEl, oldEl);
```

---

## 6. Reading & Writing Content

### `element.textContent`

Gets or sets all text content inside an element, including text in hidden elements. Ignores HTML tags and treats everything as plain text — safe against XSS.

```js
const p = document.querySelector('p');
console.log(p.textContent);       // read
p.textContent = 'New text here';  // write (overwrites children)
```

### `element.innerHTML`

Gets or sets the HTML markup inside an element. Parses HTML on write. **Never set with untrusted user input** (XSS risk).

```js
const div = document.querySelector('#output');
div.innerHTML = '<strong>Bold text</strong>';
```

### `element.outerHTML`

Gets or sets the entire element including its own tag. Setting it replaces the element in the DOM.

```js
console.log(div.outerHTML); // "<div id="output"><strong>Bold text</strong></div>"
```

### `element.innerText`

Similar to `textContent` but is **rendering-aware**: it respects CSS styling (e.g. `display: none` elements are excluded) and normalizes whitespace.

```js
// If an element is hidden with display:none, innerText excludes it
const visible = document.querySelector('.text');
console.log(visible.innerText);
```

> **`textContent` vs `innerText`:** Prefer `textContent` for performance and when rendering state doesn't matter. Use `innerText` when you need the text as visually rendered.

### `element.value`

Reads or sets the current value of form elements like `<input>`, `<textarea>`, and `<select>`.

```js
const input = document.querySelector('#username');
console.log(input.value);
input.value = 'john_doe';
```

---

## 7. Working with Attributes

### `element.getAttribute(name)`

Returns the value of the specified attribute, or `null` if it doesn't exist.

```js
const link = document.querySelector('a');
console.log(link.getAttribute('href'));
```

### `element.setAttribute(name, value)`

Sets the value of an attribute. Creates the attribute if it doesn't exist.

```js
const img = document.querySelector('img');
img.setAttribute('alt', 'Profile picture');
img.setAttribute('data-id', '42');
```

### `element.removeAttribute(name)`

Removes the specified attribute entirely from the element.

```js
document.querySelector('button').removeAttribute('disabled');
```

### `element.hasAttribute(name)`

Returns `true` if the element has the specified attribute, `false` otherwise.

```js
if (input.hasAttribute('required')) {
  console.log('This field is required');
}
```

### `element.toggleAttribute(name, force?)`

Toggles a boolean attribute. If `force` is `true`, adds it; if `false`, removes it.

```js
button.toggleAttribute('disabled');       // toggle
button.toggleAttribute('disabled', true); // force add
```

### `element.attributes`

Returns a live `NamedNodeMap` of all attributes on the element.

```js
const el = document.querySelector('input');
for (const attr of el.attributes) {
  console.log(`${attr.name} = ${attr.value}`);
}
```

### Dataset (`element.dataset`)

Access `data-*` attributes as a `DOMStringMap`. Attribute names are camelCased.

```js
// HTML: <div data-user-id="123" data-role="admin">
const div = document.querySelector('div');
console.log(div.dataset.userId); // "123"
console.log(div.dataset.role);   // "admin"
div.dataset.status = 'active';   // sets data-status="active"
```

---

## 8. Working with Classes

### `element.classList`

The `classList` property exposes a `DOMTokenList` with methods to manage CSS classes cleanly.

|Method|Description|
|---|---|
|`.add(cls1, cls2, ...)`|Adds one or more class names|
|`.remove(cls1, cls2, ...)`|Removes one or more class names|
|`.toggle(cls, force?)`|Toggles a class; optional `force` boolean|
|`.contains(cls)`|Returns `true` if the class exists|
|`.replace(old, new)`|Replaces an existing class with a new one|
|`.item(index)`|Returns the class at the given index|

```js
const el = document.querySelector('.card');

el.classList.add('active', 'highlighted');
el.classList.remove('inactive');
el.classList.toggle('expanded');          // on/off
el.classList.toggle('pinned', isPinned);  // force
el.classList.replace('old-theme', 'new-theme');
console.log(el.classList.contains('active')); // true
```

### `element.className`

Gets or sets the entire class string as a single space-separated string.

```js
el.className = 'card active highlighted'; // replaces all classes
```

---

## 9. Working with Styles

### `element.style`

Access inline styles directly via the `CSSStyleDeclaration` object. Properties use camelCase.

```js
const box = document.querySelector('.box');
box.style.backgroundColor = '#ff6b6b';
box.style.width = '200px';
box.style.display = 'none';

// Remove an inline style
box.style.removeProperty('background-color');
```

### `window.getComputedStyle(element, pseudoElement?)`

Returns the **final computed styles** after applying all stylesheets and inline styles. Read-only.

```js
const el = document.querySelector('.card');
const styles = window.getComputedStyle(el);
console.log(styles.fontSize);       // "16px"
console.log(styles.marginTop);      // "24px"

// With pseudo-elements
const before = window.getComputedStyle(el, '::before');
console.log(before.content);
```

### CSS Custom Properties (Variables)

```js
// Get a CSS variable
const value = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// Set a CSS variable
document.documentElement.style.setProperty('--primary-color', '#3b82f6');
```

---

## 10. Event Handling

### `element.addEventListener(type, listener, options?)`

Attaches an event listener to the element. The preferred, modern way to handle events.

```js
const btn = document.querySelector('#submit');

btn.addEventListener('click', function (event) {
  console.log('Clicked!', event.target);
});

// With options
btn.addEventListener('click', handler, {
  once: true,    // auto-remove after first trigger
  capture: true, // use capture phase
  passive: true  // cannot call preventDefault (improves scroll perf)
});
```

### `element.removeEventListener(type, listener, options?)`

Removes an event listener. **Must use the same function reference** as when it was added.

```js
function handleClick(e) { console.log(e); }
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // removed
```

### `element.dispatchEvent(event)`

Dispatches a synthetic event on the element.

```js
const event = new Event('click', { bubbles: true, cancelable: true });
btn.dispatchEvent(event);

// Custom events with data
const custom = new CustomEvent('userLogin', { detail: { userId: 42 } });
document.dispatchEvent(custom);
document.addEventListener('userLogin', e => console.log(e.detail.userId));
```

### Common Event Types

|Category|Events|
|---|---|
|Mouse|`click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`, `mouseover`, `mouseout`, `contextmenu`|
|Keyboard|`keydown`, `keyup`, `keypress` (deprecated)|
|Form|`submit`, `change`, `input`, `focus`, `blur`, `reset`, `focusin`, `focusout`|
|Document/Window|`DOMContentLoaded`, `load`, `unload`, `beforeunload`, `resize`, `scroll`|
|Drag & Drop|`dragstart`, `drag`, `dragend`, `drop`, `dragover`, `dragenter`, `dragleave`|
|Touch|`touchstart`, `touchend`, `touchmove`, `touchcancel`|
|Pointer|`pointerdown`, `pointerup`, `pointermove`, `pointerenter`, `pointerleave`|

### Event Delegation

Attach a single listener on a parent to handle events from its children:

```js
document.querySelector('ul').addEventListener('click', function (e) {
  if (e.target.matches('li')) {
    console.log('List item clicked:', e.target.textContent);
  }
});
```

---

## 11. Form & Input Methods

### `element.focus()` / `element.blur()`

Sets or removes focus from a focusable element.

```js
document.querySelector('#email').focus();
document.querySelector('#email').blur();
```

### `element.click()`

Simulates a mouse click on the element.

```js
document.querySelector('#hidden-file-input').click();
```

### `element.select()`

Selects all text in a text `<input>` or `<textarea>`.

```js
document.querySelector('input[type="text"]').select();
```

### `element.checkValidity()` / `element.reportValidity()`

Checks whether the element satisfies its HTML5 validation constraints. `reportValidity()` also shows the browser's built-in validation UI.

```js
const form = document.querySelector('form');
if (!form.checkValidity()) {
  form.reportValidity(); // shows tooltips
}
```

### `element.setCustomValidity(message)`

Sets a custom validation message. Pass an empty string to mark the field as valid.

```js
const input = document.querySelector('#username');
input.setCustomValidity('Username is already taken');
input.reportValidity();
input.setCustomValidity(''); // clear the error
```

---

## 12. Dimensions, Scroll & Position

### Bounding Box

`element.getBoundingClientRect()` returns a `DOMRect` with the element's size and position relative to the **viewport**.

```js
const rect = document.querySelector('.card').getBoundingClientRect();
console.log(rect.top, rect.left, rect.width, rect.height);
console.log(rect.x, rect.y, rect.right, rect.bottom);
```

### Size Properties

|Property|Description|
|---|---|
|`element.offsetWidth` / `offsetHeight`|Width/height including padding and border|
|`element.clientWidth` / `clientHeight`|Width/height including padding, excluding border and scrollbar|
|`element.scrollWidth` / `scrollHeight`|Full scrollable width/height including overflow|

### Position Properties

|Property|Description|
|---|---|
|`element.offsetTop` / `offsetLeft`|Distance from the `offsetParent`|
|`element.scrollTop` / `scrollLeft`|Current scroll position (read/write)|

```js
// Scroll an element to the top
element.scrollTop = 0;
```

### Scroll Methods

`element.scrollTo(options)` / `element.scrollBy(options)` / `element.scrollIntoView(options)`

```js
// Smooth scroll to position
window.scrollTo({ top: 500, behavior: 'smooth' });

// Scroll relative to current position
window.scrollBy({ top: 100, behavior: 'smooth' });

// Scroll an element into the viewport
document.querySelector('#section-3').scrollIntoView({
  behavior: 'smooth',
  block: 'start'
});
```

---

## 13. Document & Window Methods

### `document.write(html)`

Writes HTML directly to the document stream. **Avoid in modern code** — it overwrites the entire document if called after the page loads.

```js
// Legacy use only — avoid
document.write('<h1>Hello</h1>');
```

### `document.createRange()`

Creates a `Range` object for selecting a portion of the document.

```js
const range = document.createRange();
const startNode = document.querySelector('p');
range.setStart(startNode, 0);
range.setEnd(startNode, 1);
range.deleteContents(); // removes selected content
```

### `document.execCommand(command)` _(Deprecated)_

Was used for rich-text editing. Now replaced by the modern `document.execCommand` alternatives or content-editable APIs.

### `window.getSelection()`

Returns the `Selection` object representing the user's current text selection.

```js
const selection = window.getSelection();
console.log(selection.toString()); // selected text
```

### `document.hasFocus()`

Returns `true` if the document (or any element inside it) has focus.

```js
if (document.hasFocus()) {
  console.log('Window is focused');
}
```

### `document.elementFromPoint(x, y)`

Returns the topmost element at the given viewport coordinates.

```js
const el = document.elementFromPoint(100, 200);
console.log(el.tagName);
```

---

## 14. Modern / Utility Methods

### `element.matches(selector)`

Returns `true` if the element matches the given CSS selector. Useful inside event listeners.

```js
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    console.log('Button clicked');
  }
});
```

### `element.querySelectorAll` + `NodeList.forEach`

```js
document.querySelectorAll('.item').forEach((el, index) => {
  el.dataset.index = index;
});
```

### `IntersectionObserver`

Observes whether elements enter or exit the viewport — great for lazy loading and scroll animations.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));
```

### `MutationObserver`

Watches for changes in the DOM tree — attribute changes, child additions/removals, text changes.

```js
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('Change:', mutation.type, mutation.target);
  });
});

observer.observe(document.body, {
  childList: true,    // child additions/removals
  subtree: true,      // observe entire subtree
  attributes: true,   // attribute changes
  characterData: true // text content changes
});

observer.disconnect(); // stop observing
```

### `ResizeObserver`

Monitors changes in element dimensions.

```js
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Resized to ${width} x ${height}`);
  }
});

observer.observe(document.querySelector('.resizable'));
```

---

## 15. Quick Reference Table

|Method / Property|Category|Description|
|---|---|---|
|`getElementById`|Selection|Find by ID|
|`querySelector`|Selection|First match by CSS selector|
|`querySelectorAll`|Selection|All matches by CSS selector|
|`getElementsByClassName`|Selection|Live collection by class|
|`getElementsByTagName`|Selection|Live collection by tag|
|`parentElement`|Traversal|Parent element|
|`closest(sel)`|Traversal|Nearest ancestor match|
|`children`|Traversal|Child elements|
|`nextElementSibling`|Traversal|Next sibling element|
|`createElement`|Creation|New element node|
|`createTextNode`|Creation|New text node|
|`createDocumentFragment`|Creation|In-memory container|
|`cloneNode(deep)`|Creation|Copy a node|
|`appendChild`|Insertion|Add as last child|
|`insertBefore`|Insertion|Insert before reference|
|`prepend` / `append`|Insertion|Insert at start / end|
|`before` / `after`|Insertion|Insert outside element|
|`insertAdjacentHTML`|Insertion|HTML string at position|
|`remove`|Removal|Remove element|
|`removeChild`|Removal|Remove child node|
|`replaceChild`|Removal|Replace child node|
|`textContent`|Content|Plain text (safe)|
|`innerHTML`|Content|HTML markup (XSS risk)|
|`innerText`|Content|Visible text (render-aware)|
|`getAttribute` / `setAttribute`|Attributes|Read / write attributes|
|`removeAttribute`|Attributes|Delete an attribute|
|`dataset`|Attributes|Access `data-*` attributes|
|`classList.add/remove/toggle`|Classes|Manage CSS classes|
|`style.*`|Styles|Inline styles|
|`getComputedStyle`|Styles|Final computed styles|
|`addEventListener`|Events|Attach event listener|
|`removeEventListener`|Events|Detach event listener|
|`dispatchEvent`|Events|Fire synthetic event|
|`getBoundingClientRect`|Dimensions|Element size & position|
|`scrollIntoView`|Scroll|Scroll element into view|
|`matches(selector)`|Utility|Test if element matches|
|`IntersectionObserver`|Utility|Viewport intersection|
|`MutationObserver`|Utility|Watch DOM changes|
|`ResizeObserver`|Utility|Watch element resize|

---

## Tips & Best Practices

- **Prefer `querySelector`/`querySelectorAll`** for flexibility and readability.
- **Use `textContent` over `innerHTML`** when inserting plain text to prevent XSS.
- **Batch DOM updates** with `DocumentFragment` or by modifying elements off-DOM for better performance.
- **Use event delegation** (listening on a parent) instead of attaching listeners to many children.
- **Prefer `classList`** over manually editing `className` to avoid class conflicts.
- **Use `data-*` attributes** (`dataset`) to store custom data on elements instead of inventing non-standard attributes.
- **`IntersectionObserver` > scroll events** for detecting element visibility — far more performant.
- **Cache DOM queries** in variables if you need to access an element multiple times.

```js
// BAD — queries DOM on every iteration
for (let i = 0; i < 100; i++) {
  document.querySelector('.counter').textContent = i;
}

// GOOD — query once, update in loop
const counter = document.querySelector('.counter');
for (let i = 0; i < 100; i++) {
  counter.textContent = i;
}
```

---

_This reference covers the core DOM API as implemented in all modern browsers. For browser compatibility details, consult [MDN Web Docs](https://developer.mozilla.org/)._