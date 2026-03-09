## Pseudo Elements
they let you style a specific “part” of an element that doesn’t exist as a real HTML element.
 **Syntax**
 ```css
 selector::pseudo-element-name { 
	  _CSS properties_
  }
 ```

### Use Pseudo element without selector:
**Example**
```css
::-webkit-scrollbar {
width: 4px;
}

::-webkit-scrollbar-track {
background: transparent;
}
```


---
## The `<link>` tag
```css 
<link
  href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
  rel="stylesheet"
/>
```
This line is usually placed inside the **`<head>`** of your HTML:
What it does:
1. The browser requests a **CSS file from Google**.
2. That CSS file contains **font definitions**.
3. The browser then downloads the **font files**.
After that, you can use the fonts in your own CSS.