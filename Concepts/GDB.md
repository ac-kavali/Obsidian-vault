### 1) Visualize the stack in GDB

### 2) Inspect pointer values and memory (`x/64x ptr`)

### 3) Make a safe pointer-walking example

### 4) How segmentation faults work at the OS level

### 5) How GDB detects invalid writes
--- 

 # <span class="color-orange">before gdb, compile your program with debuging simbols</span>
 
```bash
gcc -g -Wall -Wextra -Werror main.c -o main
```

to run your program with gdb :
```c 
gdb ./main
```
output :
```bash
(gdb) start 
```
run with `start` 
and use `n` or `next` to go next line.
