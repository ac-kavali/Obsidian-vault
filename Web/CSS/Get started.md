## 1. What Does CSS Stand For?

**CSS** stands for **Cascading Style Sheets**.  
It is the language used to style and design HTML pages — controlling colors, fonts, spacing, layout, and more.

---

## 2. How to Add CSS

### In-Page CSS (inside `<style>` tag)

Place CSS inside a `<style>` tag in the `<head>` of your HTML file:

```html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
```

### Inline CSS (directly on an element)

Add CSS directly to an HTML element using the `style` attribute:

```html
<p style="color: blue; font-size: 16px;">Hello World</p>
```

---

## 3. How to Link an External `style.css` File

Create a `style.css` file, then link it in the `<head>` of your HTML:

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

Your `style.css` file sits next to your HTML file and contains all your CSS rules.

---

## 4. `<div>` vs `<section>`

||`<div>`|`<section>`|
|---|---|---|
|**Meaning**|Generic container, no meaning|A thematic group of content|
|**Use when**|You just need to group elements for styling|The content forms a meaningful section (like "About", "Contact")|
|**SEO**|No impact|Slightly better for search engines|

```html
<!-- div: just a box for styling -->
<div class="card">Some content</div>

<!-- section: a meaningful part of the page -->
<section>
  <h2>About Us</h2>
  <p>We are a great team.</p>
</section>
```

> **Rule of thumb:** Use `<section>` when your content would logically appear in a table of contents. Otherwise, use `<div>`.

---

## 5. Styling an Element — Color & Height

You can target any HTML element directly in CSS and set properties like `color`, `background-color`, and `height`:

```css
/* Target the <p> element */
p {
  color: white;              /* text color */
  background-color: navy;   /* background color */
  height: 100px;            /* fixed height */
}
```

```css
/* Target the <h1> element */
h1 {
  color: #ff5733;           /* hex color */
  height: 60px;
}
```

---

## 6. How to Create and Use a CSS Class

### Step 1 — Define the class in `style.css`

Class names start with a `.` (dot):

```css
/* style.css */
.highlight {
  color: white;
  background-color: orange;
  font-size: 20px;
}
```

### Step 2 — Apply the class in HTML

Use `class="highlight"` on any element:

```html
<p class="highlight">This text is styled!</p>
<h2 class="highlight">This heading too!</h2>
```

> You can reuse the same class on as many elements as you want.

---

## 7. How to Add a Comment in CSS

Use `/* ... */` to write comments. They are ignored by the browser:

```css
/* This is a comment — it won't affect the page */
p {
  color: red; /* This makes text red */
}
```

---

## 8. CSS Priority (Specificity)

CSS applies rules in a priority order when multiple styles target the same element:

1. **Inline styles** (on the element itself) have the highest priority.
2. **IDs** (`#id`) are more specific than classes.
3. **Classes** (`.class`), attributes, and pseudo-classes come next.
4. **Element selectors** (`p`, `h1`, `div`) have the lowest specificity.
5. The `!important` rule overrides everything — use it sparingly.
6. When specificity is equal, the **last rule in the file** wins (the "cascade").

---

## 9. Modifying Default Border, Margin & Padding

Every HTML element has default browser styles. You can override them:

```css
/* Reset all defaults (common trick) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Customize a specific element */
div {
  margin: 20px;              /* space outside the element */
  padding: 15px;             /* space inside the element */
  border: 2px solid black;   /* border: thickness style color */
}
```

### Quick Visual Reference

```
┌──────────────────────────────┐
│           MARGIN             │
│  ┌────────────────────────┐  │
│  │        BORDER          │  │
│  │  ┌──────────────────┐  │  │
│  │  │     PADDING      │  │  │
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  CONTENT   │  │  │  │
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

- **Margin** — space _outside_ the border (pushes elements apart)
- **Border** — the visible line around the element
- **Padding** — space _inside_ the border (between content and border)