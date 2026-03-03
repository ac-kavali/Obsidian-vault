Illustrations:[[prim]]
# Rules
- config file.-> key-value
- random maze with hash for reproducibilty
	
- 4 constants walls.
- 42 isolated cells
- The maze should be perfect or not following the flag 
- Output file with hexadecimal digit representing the opened and closed walls 
---
## Cells representations

a grid represent with the next 2 dimentionnal list.
**example 3x3 grid**:
```py
grid = [
[0xF, 0xF, 0xF],
[0xF, 0xF, 0xF],
[0xF, 0xF, 0xF],
]
```
The 0xF Represent 1111 indicate that all the walls are closed.

---
## Remove a Wall
you need:
- Cell like `grid[r][c]`.
- A wall `North` 
- Map the wall into binary form:
  `wall_bit[NORTH]`
- Use `& ~` bitwize opperations to eleminate the wall
```py
grid[r][c] &= ~wall_bit[NORTH]
```
**Remove Opposite**
A cell is not separated with the neighbor cell just by its wall, but also the neighbor opposite wall this means to carve a wall you should carve current cell wall and the opposite wall of the neighbor.
```python
neighbor_r, neighbor_c = current_r + Mov[EAST[1]]
```

---
```py
if (a, b) not in points:
print("Not inside!")
```

if (x, y) in 42_maze_patern:
	raise ConfigError("")
exept ConfigError as e:
