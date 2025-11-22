 ![[GNL.png]]
# <span class="color-yellow">Get_Next_line core use</span>
▷ Read **exaclty** one line each call.
▷ Return a fresh `char *` allocated on the heap.
▷ Line includes `\n` if present.
▷ store leftover data for the next call(static stash).
▷ work with ANY BUF_SIZE.
▷ work with ANY valid fd.
▷ work with MULTIPLE fds at the same time. 
▷ avoid leaks, avoid segementation faults.

---
## <span class="color-yellow">Create the project structure</span>
```css
get_next_line/
 ├── get_next_line.c
 ├── get_next_line_utils.c
 ├── get_next_line.h
 ├── main.c   <-- for testing ONLY
 └── Makefile
```

## <span class="color-yellow">Start by writing the REQUIRED utils</span>
*(You cannot use libft, you must rewrite these small functions.)* 

Implement these first:
⛶ **`ft_strlen`**
 |>return length (`\0` not include),
 |>handle `NULL` (return 0)
⛶ **`ft_strchr`**
 |>find character `c` in string.
 |>return pointer to first occur.
 |>used to chedck if stach contains `\n`
⛶ `ft_strjoin`
 |>join stash + buffer.
 |>always free stash before returning a new pointer. 
 |>this is whre most leaks happen.
 
 ---
## <span class="color-yellow">What is a line (core concept)</span>

**A line ends with:
 - A `\n` is found.
 - I represent the EOF with : "read define the end of file when no data remain to read it". 
 - this is simple but what realy happen :                          The file offset advances with each `read()` call. The OS signals end-of-file (EOF) when the current offset reaches the file size—that is, when `file size - offset = 0`.
 ---
## <span class="color-yellow">Memory allocataion Concepts</span>

### malloc:
 **Creatin dynamic memory for:**
  |>buffer to store read data.
  |>the line you return 
  |>updated stash.

### free:
You must avoid:
 |>memory leaks.
 |>double free.
 |> freeing memory too early.
Every allocation must be freed **at the correct moment**.

---
## <span class="color-yellow">Static Variable in memory</span>
A **static variable** is a variable that retains its value between function calls.
####  <span class="color-cyan">Static Variable Inside a Function</span>
```c
void counter() {
    static int count = 0;  // initialized only once
    count++;
    printf("%d\n", count);
}
```

**Characteristics:**
- **Initialized only once** - the first time the function is called
- **Retains its value** between function calls (persists across invocations)
- **Scope is local** to the function (can't be accessed outside)
- **Lifetime is the entire program** duration
- Stored in the data segment, not on the stack
If you call `counter()` three times, it prints: 1, 2, 3 (not 1, 1, 1)

#### <span class="color-cyan">Static Variable Outside a Function (Global Static)</span>
```c
static int globalCount = 0;  // file scope

void increment() {
    globalCount++;
}
```
**Characteristics:**
- **File scope only** - visible only within the same source file (internal linkage)
- **Not accessible** from other source files, even with `extern`
- Acts as a "private" global variable for that file
- Lifetime is still the entire program duration
## <span class="color-blue">Key Difference</span>
The main difference is **scope**:
- **Inside function**: Local scope, retains value between calls
- **Outside function**: File scope, restricts visibility to that file only (prevents naming conflicts across files)
Both live for the program's entire duration and are initialized once, but they control _who_ can access them differently.
## <span class="color-yellow"> memory layout</span>
![[Pasted image 20251117010451.png]]
**code**:is a part where the function code stored at run time, or compiled machine code. 
<span class="color-red">The initialized-zero variable also go to non initialized sigement (.bss)</span>


---
# <span class="color-green">Checking FD validity</span> 
### **Why check `fd < 0` ?**
Because:
- A file descriptor must be **non-negative**.
- `open()`, `pipe()`, etc., return `-1` when something fails.  
    So if `fd < 0`, it's an **invalid file descriptor** → reading from it makes no sense.
### **Why check `fd > OPEN_MAX` ?**

Because the kernel imposes a **maximum number of file descriptors** allowed per process.

42’s version usually uses:
```c
if (fd < 0 || fd > OPEN_MAX)
    return (NULL);
/*If you don't check this and someone passes a value like `1000000000`, you're going to do undefined behavior.*/
```
- **if not defined in your system like me you should define it with the value 1024 in the header
```css
# ifndef OPEN_MAX
#  define OPEN_MAX 1024 
# endif
```

## <span class="color-green">Why also check BUFFER_SIZE ?</span>

Your program must have a valid buffer size.
- If `BUFFER_SIZE` is 0 → you will malloc(0) or read 0 bytes → infinite loop.
- If `BUFFER_SIZE` is negative → undefined behavior.
so normally check this (but this not enought): 
```c
if (fd < 0 || BUFFER_SIZE <= 0)
    return (NULL);
```
If `BUFFER_SIZE` is negative (e.g., `-5`), the compiler sees:
```c
char buffer[-5 + 1];  // illegal at compile time
```
This gives a compile-time error such as:
```css
error: size of array is negative
```
**<span class="color-yellow">the real protection is : </span>**
use manualy allocated array in heap 
```c 
if(BUFFER_SIZE <= 0 || fd < 0)
	return NULL;
char *buffer= malloc (BUFFER_SIZE + 1)

#This method only protects against **negative BUFFER_SIZE**.  
#But if the user sets: -D BUFFER_SIZE=0
```
**or use the undefine and redefine to avoid compile-time crash when `BUFFER_SIZE`
```css
# if BUFFER_SIZE < 0
#  undef BUFFER_SIZE
#  define BUFFER_SIZE 0
# endif
```


## <span class="color-green">Dangling Pointer Prevention</span>

When you `free(stash)`, the memory is released, but the pointer `stash` still contains the old memory address. This is called a **dangling pointer**. If you try to use it later, you'll access freed memory, which causes undefined behavior.
```c
if (!stash[fd] || !*stash[fd])
{
	free(stash[fd]);
	stash[fd] = NULL;
	return (NULL);
}
```



## <span class="color-green">Static variables are already initialized to NULL</span>
```c
static char *stash;   // stash == NULL at program start
```

## <span class="color-green">buffer heap allocation</span>
Besides preventing compilation errors caused by negative `BUFFER_SIZE` values, avoiding stack allocation also protects you from issues with extremely large buffer sizes.
```C
char *buffer[BUFFER_SIZSE]
```
and the user sets `BUFFER_SIZE` to something huge (like one million), the program can fail because the stack is limited (typically around 8–9 MB per program). A large static or stack-allocated buffer may cause a **stack overflow** or compilation error.
However, if you use **dynamic memory allocation** instead:
```c
char *buffer = malloc(BUFFER_SIZE + 1);
```
no stack overflow occurs, because the memory is allocated on the **heap**, which is much larger. This makes the program safer and more flexible for large buffer sizes.

---
## <span class="color-green">Ownership freeze responsablity</span>
- **`extract_line` returns memory → do NOT free it there**
- **Caller of `get_next_line` owns the line → must free it** 
- Leak is usually **in your test `main()`**, not in the GNL implementation.
- TL;DR
**you are not responsible of the line returned in cases of leaks, program owner should free it when it finished.

---
# <span class="color-green">Malloc Behaviors</span>
```java
#include <stdlib.h>   //library
void *malloc(size_t size);
//in use
void *ptr = malloc(size_t size);
```
Malloc take size_t line arrgument, taking this example : 
```c 
int i;
...
char *ptr = malloc (i + 1);
//this have no problem but assuming that i = INT_MAX
char *ptr = malloc (i + 1); 
```
the `INT_MAX + 1` it wrap over `INT_MIN` ~= -2,147,483,648 and with the implicite casting to size_t be ~= 18,446,744,715,620,679,68
this is a huge number - `size_t` can hold the number ✅
Allocating that much memory in practice ❌ — usually impossible

---
# Valgrind Memory Debugging Guide

## Check if Valgrind is Installed

```bash
user@host~> valgrind --version
```

If not found, install it using:

```bash
sudo apt install valgrind     # Debian/Ubuntu
sudo pacman -S valgrind       # Arch
sudo dnf install valgrind     # Fedora
```

If yes, proceed to the next step.

---

## A) Compile Your Program with Debugging Symbols

```bash
gcc -g -Wall -Wextra -Werror your_program.c -o program
```


## B) Run Your Program with Valgrind

### Basic usage:

```bash
valgrind ./program
```

### For memory debugging, always use:

```bash
valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./program
```

### What These Flags Mean:

- **`--leak-check=full`** → detailed leak info
- **`--show-leak-kinds=all`** → shows all leak types (definite, indirect, possible)
- **`--track-origins=yes`** → tells you where uninitialized values come from

---
## C) Understand Valgrind Output

### Example: Invalid Memory Access

```bash
==1234== Invalid write of size 4
==1234==    at  main (test.c:10)
==1234==  Address 0x1ffefff10 is not stack'd, malloc'd or free'd
```

This means you wrote to memory you shouldn't.

### Example: Memory Leak

```bash
==1234== 20 bytes in 1 blocks are definitely lost in loss record 1
==1234==    at  malloc (vg_replace_malloc.c:xxx)
==1234==    by main (test.c:12)
```

This means you **allocated memory and never freed it**.
**<span class="color-purple">Other example </span>**
```python
==875120== HEAP SUMMARY: 
==875120== in use at exit: 33 bytes in 11 blocks 
==875120== total heap usage: 67 allocs, 56 frees, 1,167 bytes allocated ==875120== 
==875120== 33 bytes in 11 blocks are definitely lost in loss record 1 of 1 ==875120== at 0x4848899: malloc (in/usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==875120== by 0x109256: extract_line (get_next_line.c:29) 
==875120== by 0x10959E: get_next_line (get_next_line.c:112) 
==875120== by 0x10988F: main (main.c:10) ==875120==
```
`==875120==` : this is the process id of valgrind itself. 
`33 bytes in 11 blocks` :  `33 bytes` is The total amount of memory still allocated and not freed.
So your program leaked **33 bytes** in total.
`in 11 blocks` : A “block” = **one allocation**. So there are **11 separate `malloc` (or similar) calls** whose memory was never freed.
On average, each block is ~3 bytes here (33 ÷ 11 = 3), probably small allocations like very short strings.
## D) Check Summary at the End

The most important part:

```bash
HEAP SUMMARY:
    definitely lost: 20 bytes in 1 blocks
    indirectly lost: 0 bytes in 0 blocks
    possibly lost: 0 bytes in 0 blocks
    still reachable: 0 bytes
```

### Understanding the Summary:

- **definitely lost** → REAL memory leak (you must fix this)
- **indirectly lost** → leak caused by another leak
- **still reachable** → memory not freed before exit, but accessible
- **possibly lost** → suspicious pointer issues

---

## Other Uses of Valgrind

### For Segmentation Faults

When you suspect a segmentation fault, use:

```bash
valgrind --track-origins=yes --verbose ./a.out
```

This will give you detailed information about where and why the segfault occurred.

## <span class="color-red">the return arguments </span>
