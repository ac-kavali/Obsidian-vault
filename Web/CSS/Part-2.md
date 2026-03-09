## Pseudo Elements
they let you style a specific “part” of an element that doesn’t exist as a real HTML element.
 **Syntax**
 ```css
 selector::pseudo-element-name { 
	  _CSS properties_
  }
 ```

```css
::-webkit-scrollbar {
width: 4px;
}

::-webkit-scrollbar-track {
background: transparent;
}

::-webkit-scrollbar-thumb {
background: rgba(160, 80, 255, 0.3);
border-radius: 4px;
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
