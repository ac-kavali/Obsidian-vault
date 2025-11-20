
--- 
### - <span class="color-red">Casting:</span> 
 **Casting** in C is explicitly converting a value from one data type to another.
 \- <span class="color-yellow">implicit caste</span> → done _automatically_ by the compiler 
 (e.g., `int x = 5; float y = x;`)
 \- <span class="color-yellow">explicite caste</span>→ done _manually_ by the programmer using parentheses (e.g., `float y = (float)x;`)
 <span class="color-red">Note</span>: casting is not changing the memory binary stored values.
 

---

### - <span class="color-red">Reading memory:</span>
How exactly the compiler read memory blocks :
based on your our systems let's carrefully know what is "*big and little endiann*es".
<span class="color-cyan">These terms describe how a computer stores multi-byte values in memory:</span>

| Term              | Meaning                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Big-endian**    | Most Significant Byte (MSB) is stored **at the lowest memory address**. The number is read left to right in memory.                                                        |
| **Little-endian** | Least Significant Byte (LSB) is stored **at the lowest memory address**. The number is read right to left in memory.<span class="color-blue">used by modern systems</span> |
<span class="color-cyan">How char is readed </span>
- Index 0 is **always the first character**.  
- **Casting does not change the binary values in memory**
- the 2 compliment if fro both operation read and store if the type is signed.

---

### \- <span class="color-red">Why while loop:</span>
because thy make sure your learn the inicializing and incrementing manualy and make you master the condition too.

---

### <span class="color-red">Why unsigned char </span>
because when we treath memory bytes we know that a byte have 8 bits with the range 0 -> 255 and to work proberly with you should'nt use signed that have range from -128 -> 127.

---
### <span class="color-red">const char * and char const *</span> 
those type are the same thing where they means that you can't change the what pointer pointe to but you can change the pointer it self. 
(make it point somewhere else).
```c
const char *p = "hello";// same as: char const *p = "hello";
p = "world";   // ✅ allowed (p now points to another string)
*p = 'H';      // ❌ error: you can’t modify the content
```
but the `char * const p` is a little differente 
it means that the const is applied to the pointer it self and you cant chage it .

---
### <span class="color-red">Memory leak</span>
That means the allocated space still exists in RAM, but the program can no longer access or reuse it — it’s **lost** until the process ends.
is simply when use malloc calloc or realloc without freesing them. 
```c 
char **str = malloc(words * sizeof(char*));
... 
...
char *ptr = malloc(len * sizeof (char));
...
...
malloc ..
```


---
### <span class="color-red">Make file default mode</span>
If you don’t pass any arguments, **`make`** will:
|> Run the _first rule_ it finds in the Makefile.
#### What if you don’t specify the **compiler** or **rules**?
Even if you don’t write any rules at all, `make` still has **built-in default rules** (called _implicit rules_).  
These rules define how to build `.o` files from `.c` files, and even how to link executables.
For example, `make` knows by default:

| Variable  | Default value | Meaning                              |
| --------- | ------------- | ------------------------------------ |
| `CC`      | `cc`          | The default C compiler               |
| `CFLAGS`  | _(empty)_     | Compiler flags                       |
| `LDFLAGS` | _(empty)_     | Linker flags                         |
| `RM`      | `rm -f`       | Used for removing files              |
| `AR`      | `ar`          | For creating static libraries (`.a`) |
minimum to tha makefile work :
`make` automatically looks for files named:
```yaml
Makefile
makefile
GNUmakefile
```
2. it need a target even witout make a Makefile.hhhh
```css
host23@user$ ls 
	main.c 
host23@user$ make main
	cc     main.c   -o main
```

---
### <span class="color-red">Make Commands</span>
##### That technique in a **Makefile** — <span class="color-cyan">$(SRC.c:.o)</span>
— is called a **substitution reference** (or **pattern substitution**).
that tell the make file to take each .c file and remove the suffix .c to and set the .o, this from match object files.

---

### <span class="color-red">File Descriptor</span> 
## difinition : 
- a file descriptor is non negative number used by the operating system kernel to identify an open file or other input or output streams

take the libririan like example when you want to access to a book you should ask the librarian to give you a ticket to give you the right to access to the book when ever you want 

- when you want to read from the book you ask the librarian to read 100 letter from the book and put it in you notebook that is the buffer:
  ```c 
  read (3, buffer, 100);
  ```
- when you want to write: 
```c
write(3, "hello", 5);
```
- and when you finish you close the book and the librarian takes your ticket. 
```c
close(3);
```


---
### <span class="color-red">Static and dynamic library </span>

|Stage|Input|Output|Command Example|
|---|---|---|---|
|**1. Preprocessing**|`main.c`|`main.i`|`gcc -E main.c -o main.i`|
|**2. Compilation**|`main.i`|`main.s`|`gcc -S main.c -o main.s`|
|**3. Assembly**|`main.s`|`main.o`|`gcc -c main.c -o main.o`|
|**4. Linking**|`.o` files + libraries|`a.out` (or your exe)|`gcc main.o -o main`|
#### - <span class="color-cyan">The difference</span>

| Feature                     | 🧱 **Static Library (.a)**                                                      | ⚡ **Dynamic Library (.so / .dll)**                                                                           |     |
| --------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --- |
| **Used at**                 | **Link time**                                                                   | **Run time (execution)**                                                                                     |     |
| **What happens at linking** | The linker **copies the function’s machine code** directly into your executable | The linker **adds a reference** (symbol) telling the OS: “Load this function from an external library later” |     |
| **Executable size**         | ✅ **Bigger**, because it **includes** all used functions’ code                  | ⚙️ **Smaller**, because it **only references** functions                                                     |     |
| **Dependency after build**  | 🧍 **Self-contained** — doesn’t need the library to exist anymore               | 🔗 **Depends on the library** at runtime; if it’s missing, you get an error (`libXYZ.so not found`)          |     |
| **Performance**             | Slightly faster at runtime (no need to load anything externally)                | Slightly slower at startup (library must be loaded dynamically)                                              |     |
| **Updating code**           | Must recompile/relink app if library changes                                    | Can update `.so` / `.dll` file without recompiling the app                                                   |     |
| **Example names**           | `libft.a`, `libm.a`                                                             | `libm.so`, `libc.so.6`                                                                                       |     |

---
### <span class="color-red">Libraries Include</span>
##### <span class="color-yellow">#include </span><file.h> :
Those are System or standard library headers, tell compiler to searches only in system include directories(like `/usr/include/` or `/usr/local/include/`).

##### <span class="color-yellow">#include </span><span class="color-green">"file.h"</span> : 
User-defined (local) headers, the compiler searches **first in the current directory**, then in system include directories .


___
### <span class="color-red">Library Define Guard</span>
##### <span class="color-yellow">What #ifndef, #define, and #endif</span>
They are **preprocessor directives** that protect your program from including the **same header file multiple times** — a problem called a **“multiple inclusion” error**.
\- If you accidentally included the same header twice (directly or indirectly through other headers).
```c
#include "libft.h"
#include "libft.h"

int main(void)
{
    ft_putstr("Hello\n");
    return 0;
}
```
In the Preprocessing when the preprocessor expands `#include`, you’ll get **duplicate declarations:
```c
void ft_putstr(char *s);
void ft_putstr(char *s); // duplicate!
```
the processor can consider it like an error 
```c
error: redefinition of ‘ft_putstr’
```

---

00000000 00000001 10000100 01110011