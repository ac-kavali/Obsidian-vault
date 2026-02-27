- config file.-> key-value
- random maze with hash for reproducibilty 
- 4 constants walls.
- 42 isolated cells
- The maze should be perfect or not following the flag 
- Output file with hexadecimal digit representing the opened and closed walls 
---
## Cells navigation

### Cells representations

a grid represent with the next 2 dimentionnal list.
**example 3x3 grid**:
```py
grid = [
[0xF, 0xF, 0xF],
[0xF, 0xF, 0xF],
[0xF, 0xF, 0xF],
]
```
the 0xF represent 1111 indicate that all the walls are closed.

to remove a wall you need a random cell shoosen by a random function and the direction of the wall to remove.
```py

```
use bitwize Not `~` to remove a wall 

- [ ] Understand list comprehension
- [ ] Underdtand random generator.


---
# Random generator

`random` is a built-in Python module that lets you generate **pseudo-random numbers**. to use random method you should import random module
## Randint
generate random integer in a range (a-b)
```py
random.randint(a, b)
```

## Random

`random.random` Generate Random Float (0 to 1)


****