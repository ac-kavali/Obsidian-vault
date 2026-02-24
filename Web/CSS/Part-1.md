## Table of Contents

1. [Border Radius](#1-border-radius)
2. [Inline vs Block Elements](#2-inline-vs-block-elements)
3. [Text Align](#3-text-align)
4. [Direction](#4-direction)
5. [Text Transform](#5-text-transform)
6. [Text Spacing](#6-text-spacing)

---

## 1. Border Radius

`border-radius` rounds the corners of an element's border.

```css
div {
  border: 2px solid black;
  border-radius: 10px;       /* all 4 corners rounded equally */
}
```

### Variations

```css
/* Each corner individually: top-left, top-right, bottom-right, bottom-left */
border-radius: 10px 20px 30px 40px;

/* A perfect circle (element must be square) */
border-radius: 50%;

/* A pill / capsule shape */
border-radius: 999px;

/* Only round specific corners */
border-top-left-radius: 15px;
border-top-right-radius: 0px;
border-bottom-right-radius: 15px;
border-bottom-left-radius: 0px;
```

---

## 2. Inline vs Block Elements

This is one of the most important concepts in CSS layout.

### Block Elements

- Take up the **full width** of their parent
- Always start on a **new line**
- You **can** set `width` and `height`

**Default block elements:** `<div>`, `<p>`, `<h1>`–`<h6>`, `<section>`, `<header>`, `<footer>`

```css
div {
  display: block;
  width: 300px;
  height: 100px;
  background-color: lightblue;
}
```

```
┌──────────────────────────────────────┐
│  Block element (full width)          │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  Next block starts on a new line     │
└──────────────────────────────────────┘
```

### Inline Elements

- Only take up **as much width as their content**
- Stay **on the same line** as other elements
- You **cannot** set `width` or `height`

**Default inline elements:** `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`

```css
span {
  display: inline;
  color: red;
  /* width and height have NO effect here */
}
```

```
Hello [inline] World [inline] they sit side by side
```

### `inline-block` — Best of Both Worlds

Stays inline but **allows** width and height:

```css
span {
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: orange;
}
```

### Summary Table

|Property|`block`|`inline`|`inline-block`|
|---|---|---|---|
|New line?|✅ Yes|❌ No|❌ No|
|Full width?|✅ Yes|❌ No|❌ No|
|Set width/height?|✅ Yes|❌ No|✅ Yes|

---

## 3. Text Align

`text-align` controls the **horizontal alignment** of text inside an element.

```css
p {
  text-align: left;    /* default — text starts from the left */
}

p {
  text-align: right;   /* text pushed to the right */
}

p {
  text-align: center;  /* text centered */
}

p {
  text-align: justify; /* text spreads to fill the full width (like a newspaper) */
}
```

### Visual

```
left:     Hello World
          I am aligned left

center:       Hello World
              I am centered

right:              Hello World
                I am aligned right

justify:  Hello  World   text   is
          spread  across  the  line
```

> ⚠️ `text-align` only aligns **text and inline content** inside the element. It does not move the element itself.

---

## 4. Direction

`direction` controls the **direction text flows** — left-to-right or right-to-left. This is mostly used for languages like Arabic or Hebrew.

```css
p {
  direction: ltr; /* left to right — default for English */
}

p {
  direction: rtl; /* right to left — for Arabic, Hebrew, etc. */
}
```

### Example

```css
.arabic-text {
  direction: rtl;
  text-align: right;
}
```

```html
<p class="arabic-text">مرحبا بالعالم</p>
```

```
ltr:   Hello World →
rtl:           ← مرحبا بالعالم
```

> 💡 When using `direction: rtl`, it's good practice to also set `text-align: right` so the text starts from the correct side.

---

## 5. Text Transform

`text-transform` changes the **capitalization** of text automatically — without changing the HTML.

```css
p { text-transform: uppercase; }   /* HELLO WORLD */
p { text-transform: lowercase; }   /* hello world */
p { text-transform: capitalize; }  /* Hello World */
p { text-transform: none; }        /* Hello World — no change (default) */
```

### Visual

```
Original HTML:  "hello world, my name is Claude"

uppercase:      HELLO WORLD, MY NAME IS CLAUDE
lowercase:      hello world, my name is claude
capitalize:     Hello World, My Name Is Claude
none:           hello world, my name is Claude
```

> 💡 `capitalize` capitalizes the **first letter of every word**, not just the first word of the sentence.

---

## 6. Text Spacing

CSS gives you fine control over space between **letters**, **words**, and **lines**.

### Letter Spacing

Controls space between individual **characters**:

```css
p {
  letter-spacing: 2px;   /* more space between letters */
  letter-spacing: -1px;  /* tighter, less space */
  letter-spacing: normal; /* default */
}
```

```
normal:   Hello World
2px:      H e l l o   W o r l d
-1px:    HelloWorld
```

### Word Spacing

Controls space between **words**:

```css
p {
  word-spacing: 10px;   /* more space between words */
  word-spacing: -2px;   /* words closer together */
  word-spacing: normal; /* default */
}
```

```
normal:  Hello World how are you
10px:    Hello        World        how        are        you
```

### Line Height

Controls the **vertical space between lines** of text:

```css
p {
  line-height: 1;     /* tight — lines almost touching */
  line-height: 1.5;   /* comfortable — recommended for readability */
  line-height: 2;     /* double spacing */
  line-height: 30px;  /* fixed pixel value */
}
```

```
line-height: 1         line-height: 2
──────────────         ──────────────
First line             First line

Second line
                       Second line
Third line

                       Third line
```

### All Together — Example

```css
h1 {
  letter-spacing: 4px;
  word-spacing: 8px;
  line-height: 1.6;
}
```

> 💡 A `line-height` of **1.5 to 1.6** is generally considered the sweet spot for readable body text.

---

_End of Part 2 — CSS Documentation_