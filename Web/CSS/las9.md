# CSS Documentation — Part 3

---

## 1. The Box Model & `box-sizing`

By default, when you set `width: 200px`, that is **only the content**. Padding and border are added **on top**, making the element larger than expected.

```css
/* Default behavior — width does NOT include padding or border */
div {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width = 200 + 20*2 + 5*2 = 250px */
}

/* Better behavior — width INCLUDES padding and border */
div {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width = 200px exactly */
}
```

> **Best practice:** Apply `box-sizing: border-box` globally at the top of every project:
> 
> ```css
> * { box-sizing: border-box; }
> ```

---

## 2. Display Property

The `display` property controls how an element is rendered in the layout flow.

```css
element { display: block; }
element { display: inline; }
element { display: inline-block; }
element { display: none; }        /* hides element completely (removes from layout) */
element { display: flex; }
element { display: grid; }
```

|Value|Behavior|
|---|---|
|`block`|Takes full width, starts on a new line|
|`inline`|Sits in line with text, ignores width/height|
|`inline-block`|Sits in line, but respects width/height|
|`none`|Element is completely hidden and takes no space|
|`flex`|Enables Flexbox on the element|
|`grid`|Enables Grid on the element|

---

## 3. Flexbox

Flexbox is a layout system for arranging items in a **row or column** with powerful alignment control.

### Setting Up Flexbox

Apply `display: flex` to the **parent container**, not the children:

```css
.container {
  display: flex;
}
```

### Key Parent Properties

```css
.container {
  display: flex;

  /* Direction of items */
  flex-direction: row;           /* left to right (default) */
  flex-direction: column;        /* top to bottom */
  flex-direction: row-reverse;   /* right to left */
  flex-direction: column-reverse;

  /* Alignment along the main axis (horizontal if row) */
  justify-content: flex-start;   /* default — items at the start */
  justify-content: flex-end;     /* items at the end */
  justify-content: center;       /* items in the center */
  justify-content: space-between;/* equal space between items */
  justify-content: space-around; /* equal space around items */
  justify-content: space-evenly; /* equal space everywhere */

  /* Alignment along the cross axis (vertical if row) */
  align-items: stretch;          /* default — items stretch to fill */
  align-items: flex-start;       /* items at the top */
  align-items: flex-end;         /* items at the bottom */
  align-items: center;           /* items vertically centered */

  /* Wrapping */
  flex-wrap: nowrap;             /* default — all items on one line */
  flex-wrap: wrap;               /* items wrap onto next line */

  /* Gap between items */
  gap: 16px;                     /* space between all items */
  gap: 10px 20px;                /* row-gap column-gap */
}
```

### Key Child Properties

```css
.item {
  flex: 1;          /* item grows to fill available space */
  flex: 0 0 200px;  /* item is fixed at 200px (no grow, no shrink) */
  align-self: center; /* overrides align-items for this item only */
  order: 2;           /* controls item order (default is 0) */
}
```

### Common Pattern — Center Anything

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

## 4. CSS Grid

Grid is a two-dimensional layout system for building **rows AND columns** at the same time.

```css
.container {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 200px 200px;  /* 3 fixed columns */
  grid-template-columns: 1fr 1fr 1fr;         /* 3 equal columns */
  grid-template-columns: repeat(3, 1fr);      /* same as above, shorter */
  grid-template-columns: 200px 1fr;           /* sidebar + flexible content */

  /* Define rows */
  grid-template-rows: 100px auto 60px;

  /* Gap between cells */
  gap: 20px;
  column-gap: 20px;
  row-gap: 10px;
}
```

### Placing Items in the Grid

```css
.item {
  grid-column: 1 / 3;   /* span from column line 1 to line 3 (2 columns wide) */
  grid-row: 1 / 2;      /* span from row line 1 to line 2 */

  grid-column: span 2;  /* span 2 columns from wherever it starts */
}
```

### Flexbox vs Grid — When to Use Which

|Use Flexbox when...|Use Grid when...|
|---|---|
|Layout is **one-dimensional** (row OR column)|Layout is **two-dimensional** (rows AND columns)|
|You want items to naturally flow and wrap|You want precise placement in a defined grid|
|Building navbars, card rows, button groups|Building page layouts, dashboards, image galleries|

---

## 5. Position Property

The `position` property controls how an element is placed in the page.

```css
element { position: static; }    /* default — follows normal document flow */
element { position: relative; }  /* offset from its normal position */
element { position: absolute; }  /* removed from flow, placed relative to nearest positioned parent */
element { position: fixed; }     /* removed from flow, placed relative to the viewport */
element { position: sticky; }    /* scrolls normally, then sticks at a threshold */
```

Use `top`, `right`, `bottom`, `left` to offset positioned elements:

```css
/* Sticky header */
header {
  position: sticky;
  top: 0;
}

/* Overlay badge on a card */
.card {
  position: relative;   /* establishes positioning context */
}
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Fixed bottom button */
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

> **Important:** `absolute` positioning looks for the nearest parent with `position: relative` (or absolute/fixed/sticky). If none is found, it positions relative to the `<body>`.

---

## 6. Z-Index

`z-index` controls the **stacking order** of overlapping elements. Higher values appear on top.

```css
.modal {
  position: fixed;
  z-index: 1000;   /* on top of everything */
}

.overlay {
  position: fixed;
  z-index: 999;    /* just below the modal */
}

.card {
  position: relative;
  z-index: 1;
}
```

> **Note:** `z-index` only works on elements that have a `position` value other than `static`.

---

## 7. Width & Height Units

CSS offers multiple unit types for sizing:

```css
div {
  /* Absolute units */
  width: 200px;          /* pixels — fixed size */

  /* Relative to parent */
  width: 50%;            /* 50% of parent's width */

  /* Relative to viewport */
  width: 100vw;          /* 100% of the viewport width */
  height: 100vh;         /* 100% of the viewport height */

  /* Relative to font size */
  font-size: 1rem;       /* relative to root element font size (usually 16px) */
  padding: 1em;          /* relative to the element's own font size */

  /* Fit content */
  width: min-content;    /* shrinks to the smallest possible size */
  width: max-content;    /* expands to fit all content on one line */
  width: fit-content;    /* like max-content but capped at the parent */
}
```

### `min-width`, `max-width`, `min-height`, `max-height`

```css
.container {
  width: 100%;
  max-width: 1200px;   /* never wider than 1200px */
  min-width: 320px;    /* never narrower than 320px */
}
```

---

## 8. Overflow

`overflow` controls what happens when content is larger than its container.

```css
div {
  overflow: visible;  /* default — content spills out */
  overflow: hidden;   /* content is clipped */
  overflow: scroll;   /* always shows scrollbars */
  overflow: auto;     /* scrollbars appear only when needed */
}

/* Control horizontal and vertical separately */
div {
  overflow-x: hidden;
  overflow-y: auto;
}
```

> **Common use case:** Clip an image or add scroll to a container:
> 
> ```css
> .card-image {
>   overflow: hidden;
>   border-radius: 8px;
> }
> .card-image img {
>   width: 100%;
> }
> ```

---

## 9. CSS Variables (Custom Properties)

CSS variables let you store values once and reuse them everywhere. They start with `--`.

```css
/* Define variables on the root element (globally available) */
:root {
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --font-size-base: 16px;
  --spacing-md: 16px;
  --border-radius: 8px;
}

/* Use them with var() */
button {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

h1 {
  color: var(--text-color);
  font-size: var(--font-size-base);
}
```

> **Why use variables?** Change a color in one place and it updates everywhere on the page.

---

## 10. Transitions

`transition` smoothly animates a property change over time (e.g., on hover).

```css
button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darkblue;
}
```

### Transition Syntax

```css
element {
  transition: property duration timing-function delay;

  transition: color 0.3s ease;
  transition: all 0.2s ease-in-out;         /* animate ALL changing properties */
  transition: opacity 0.5s ease, transform 0.3s ease; /* multiple transitions */
}
```

### Timing Functions

|Value|Effect|
|---|---|
|`ease`|Starts fast, slows down (default)|
|`linear`|Constant speed|
|`ease-in`|Starts slow, ends fast|
|`ease-out`|Starts fast, ends slow|
|`ease-in-out`|Slow at both ends|

---

## 11. Transforms

`transform` moves, scales, rotates, or skews an element **without affecting layout**.

```css
.card:hover {
  transform: translateY(-4px);      /* move up 4px */
}

.icon {
  transform: rotate(45deg);         /* rotate 45 degrees */
}

.badge {
  transform: scale(1.2);            /* 20% larger */
}

/* Combine multiple transforms */
.element {
  transform: translateX(50px) rotate(30deg) scale(0.9);
}
```

|Function|What it does|
|---|---|
|`translate(x, y)`|Moves the element|
|`translateX(x)` / `translateY(y)`|Moves on one axis|
|`rotate(deg)`|Rotates the element|
|`scale(x)`|Scales uniformly|
|`scaleX(x)` / `scaleY(y)`|Scales on one axis|
|`skew(x, y)`|Skews the element|

> **Combine with transition for smooth hover effects:**
> 
> ```css
> .card {
>   transition: transform 0.3s ease;
> }
> .card:hover {
>   transform: translateY(-6px) scale(1.02);
> }
> ```

---

## 12. Opacity & Visibility

```css
/* Makes element semi-transparent (0 = invisible, 1 = fully visible) */
.overlay {
  opacity: 0.5;
}

/* visibility: hidden hides the element but it still takes up space */
.hidden {
  visibility: hidden;
}

/* display: none removes the element entirely from layout */
.removed {
  display: none;
}
```

|Property|Visible?|Takes up space?|
|---|---|---|
|`opacity: 0`|No|Yes|
|`visibility: hidden`|No|Yes|
|`display: none`|No|No|

---

## 13. Background Properties

```css
div {
  background-color: #f0f0f0;

  /* Background image */
  background-image: url('image.jpg');
  background-size: cover;        /* scales to cover entire element */
  background-size: contain;      /* scales to fit inside element */
  background-position: center;   /* positions the image */
  background-repeat: no-repeat;  /* no tiling */

  /* Shorthand */
  background: url('image.jpg') center/cover no-repeat;

  /* Gradient */
  background: linear-gradient(to right, #ff6b6b, #4ecdc4);
  background: linear-gradient(135deg, #667eea, #764ba2);
  background: radial-gradient(circle, #ffffff, #000000);
}
```

---

## 14. Shadows

### `box-shadow` — Shadow on an Element

```css
div {
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

  /* Add spread-radius for a larger shadow */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* Inset shadow (inside the element) */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Multiple shadows */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.2);
}
```

### `text-shadow` — Shadow on Text

```css
h1 {
  /* offset-x | offset-y | blur | color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

---

## 15. `@media` Queries (Responsive Design)

Media queries apply different styles based on screen size. This is how you make a site **responsive**.

```css
/* Default styles (mobile-first approach) */
.container {
  padding: 16px;
  font-size: 14px;
}

/* Tablets and up (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    font-size: 16px;
  }
}

/* Desktops and up (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Large screens (1280px+) */
@media (min-width: 1280px) {
  .sidebar {
    display: block;
  }
}
```

### Common Breakpoints

|Name|Width|
|---|---|
|Mobile|0px – 767px|
|Tablet|768px – 1023px|
|Desktop|1024px – 1279px|
|Large desktop|1280px+|

> **Mobile-first:** Write default styles for mobile, then use `min-width` queries to add styles as screens get larger. This is the modern standard.

---

## 16. CSS Selectors — Beyond the Basics

```css
/* All elements */
* { box-sizing: border-box; }

/* Direct child only */
ul > li { color: red; }

/* Any descendant */
div p { color: blue; }

/* Adjacent sibling (immediately after) */
h2 + p { margin-top: 0; }

/* General sibling (any after) */
h2 ~ p { color: gray; }

/* Attribute selector */
input[type="email"] { border-color: blue; }
a[href^="https"] { color: green; }  /* href starts with https */
a[href$=".pdf"] { color: red; }     /* href ends with .pdf */

/* Not selector */
button:not(.disabled) { cursor: pointer; }

/* nth-child */
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(3) { font-weight: bold; }
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }
```

---

## 17. CSS `calc()`

`calc()` lets you do math with mixed units directly in CSS.

```css
.sidebar {
  width: calc(100% - 240px);  /* full width minus sidebar */
}

.element {
  padding: calc(16px * 2);
  height: calc(100vh - 60px); /* full viewport height minus header */
}
```

---

## 18. `cursor` Property

Change the mouse cursor when hovering over an element:

```css
button { cursor: pointer; }   /* hand/pointer — for clickable things */
div    { cursor: default; }   /* arrow (default) */
input  { cursor: text; }      /* text cursor */
.drag  { cursor: grab; }      /* grab hand */
.no    { cursor: not-allowed; }
.loading { cursor: wait; }
```

---

## 19. `object-fit` — Controlling Image Scaling

`object-fit` controls how an `<img>` or `<video>` fills its container.

```css
img {
  width: 300px;
  height: 200px;

  object-fit: fill;      /* default — stretches to fill (may distort) */
  object-fit: cover;     /* fills box, crops if needed (no distortion) */
  object-fit: contain;   /* fits inside box, adds empty space if needed */
  object-fit: none;      /* original size, no scaling */

  object-position: center; /* where to crop from (default: center) */
  object-position: top;
}
```

> **Most common use:** `object-fit: cover` for thumbnails and card images so they never stretch.

---

## 20. CSS `@keyframes` & Animations

While `transition` animates between two states, `@keyframes` lets you define a **full animation sequence**.

```css
/* Define the animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply it to an element */
.card {
  animation: fadeIn 0.5s ease forwards;
}
```

### Multi-Step Animations

```css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.badge {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Animation Properties

```css
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0.2s;
  animation-iteration-count: 1;        /* or infinite */
  animation-direction: normal;         /* or reverse, alternate */
  animation-fill-mode: forwards;       /* keeps final state after animation ends */

  /* Shorthand: name | duration | timing | delay | iterations | fill-mode */
  animation: fadeIn 0.5s ease 0.2s 1 forwards;
}
```