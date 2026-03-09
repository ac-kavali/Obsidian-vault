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
