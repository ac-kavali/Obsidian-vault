The **`re` module** in Python provides a powerful set of built-in tools for working with **regular expressions (RegEx)**
you have to learn regex methods and how to use to validate the input for flyin

### For this project you'll need 4 functions from re

- **re.compile(pattern)**
	Turns a pattern string into a reusable _pattern object_. You do this once per pattern (outside your loop), so Python doesn't re-parse the regex text on every single line.
	
```python 
ZONE_RE = re.compile(r"hub:\s*(?P<name>[^\s\-]+)")
```


- **re_pathern.match()**


--- 
#### Named capturing group 
```python
re_pathern = re.compile(r"")
```
---
## Regex
`\s` : It matches **one** of these:
- space `" "`
- tab `\t`
- newline `\n`
- carriage return `\r`
- form feed `\f`
- vertical tab `\v`

Most of the time you'll use it to mean a normal space.
