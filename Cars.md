- [ ] cc : cubic capacity 
- [ ] FWD : Forwared-Wheel Drive
- [ ] RWD : Rear-Wheel Drive

if c < width - 1 and rng.random() < loop_chance:   # avoids RIGHT border
if r < height - 1 and rng.random() < loop_chance:  # avoids BOTTOM border
```

It protects **right and bottom** borders but what about **left and top**? Actually it's fine because:
```
East  wall of (r, c)   = West  wall of (r, c+1)   → same wall
South wall of (r, c)   = North wall of (r+1, c)   → same wall


By only iterating East and South, left and top borders are **never targeted** either.

---

**So do you need `_enforce_borders`?**

For the **mandatory part** (no `_add_loops`): **No**, Prim's alone never touches borders.

For the **imperfect maze** (with `_add_loops`): **Also no**, if `_add_loops` is written correctly with proper border guards.

---

**BUT** there is one edge case — the **entry and exit cells**.

The subject says entry/exit are on the border and need an **opening** in the outer wall:
```
+--+--+--+--+
   |     |     ← entry at (0,0): North wall must be OPEN
+  +--+  +--+
|        |
+--+--+--+
         |     ← exit at (2,3): South wall must be OPEN
+--+--+--+