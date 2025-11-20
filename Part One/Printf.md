### <span class="color-red">Variadic Functions</span>
##### **<span class="color-cyan">A variadic function is a function which accepts a variable number of arguments</span>.
1. The library to include is : <span class="color-orange">stdarg.h</span>
2. format : 
```c 
int	ft_printf(const char *format, ...);
// const char *format is the mandatory argument of printf
```
### <span class="color-purple">va_list</span>
`va_list` is an **object type** suitable for holding the information needed by the macros `va_start`, `va_copy,` `va_arg`, and `va_end` (that you will understand in a few minutes). In other words, it is a list that will contain all the dynamic arguments.

Think of it like a bag where all the extra arguments (the`...`) are stored 
You declare it like:
```c
va_list args;
```
it doesn't hold the values itself--its more like a pointer that knows where the first "extra" arguments start in memory.
\-The compiler puts the extra arguments (`10`, `'A'`, `2.5`) into memory (usually on the stack).

### `va_start` : function macros

`**va_start**` **- function macro**
```c
va_list args;
va_start(args, n);
```

### **Register Layout (x86-64):**

| Argument  | Value | Register  | Size in Register |
| --------- | ----- | --------- | ---------------- |
| fixed     |       | **RDI**   | 8 bytes (64-bit) |
| 1st extra | 1     | **RSI**   | 8 bytes          |
| 2nd extra | 2     | **RDX**   | 8 bytes          |
| 3rd extra | 3     | **RCX**   | 8 bytes          |
| 4th extra | 4     | **R8**    | 8 bytes          |
| 5th extra | 5     | **R9**    | 8 bytes          |
| 6th extra | 6     | **Stack** | 16 bytes         |
| 7th extra | 7     | **Stack** | 16 bytes         |
| 8th extra | 8     | **Stack** | 16 bytes         |
**<span class="color-cyan">Why 8 bytes for an int?</span>**
- Registers are 64-bit wide
- Even though `int` is **logically 4 bytes**, it occupies a full register
- The upper 4 bytes are typically **zero-extended** or **garbage**

---
### <span class="color-red">va_list Internal Structure (Typical x86-64)</span>

On x86-64 Linux, `va_list` is typically a **struct**:
```c
typedef struct {
    unsigned int gp_offset;   // Offset into general-purpose reg save area
    unsigned int fp_offset;    // Offset into floating-point reg save area
    void *overflow_arg_area;   // Pointer to stack arguments
    void *reg_save_area;       // Pointer to saved registers
} va_list[1];
```
### **What Each Member Does:**
1. **gp_offset**: Tracks position in **general-purpose registers**, it's an offset in bytes into the `reg_save_area`.**Increases by 8** each time you call `va_arg()` for an integer type

2. **fp_offset**: Tracks position in **floating-point registers**, It's an offset in bytes into a separate area of `reg_save_area`, increase 
3. by 16 each time you call `va_arg()` fror a float/double.

4. **overflow_arg_area**: Points to **stack arguments** (7th+ arguments) 
5. **reg_save_area**: Points to memory where **register values were saved**
#### <span class="color-pink">An Offset is basically</span>
How far (in memory bytes) from the start of the arguments you are currently pointing.

---
### <span class="color-red">How va_arg Works Internally</span>

When you call `va_arg(args, int)`:
```c
int value = va_arg(args, int);
```
**The macro does roughly this:**
1. Check if argument is in **registers** or **stack**
2. If in registers:
    - Read from `reg_save_area + gp_offset`
    - Increment `gp_offset` by 8
3. If on stack:
    - Read from `overflow_arg_area`
    - Increment `fp_offset` by 16
4. Return the value

---
#### <span class="color-yellow">9. Important Warnings ⚠️</span>

1. **Type Safety**: `va_arg` doesn't check types - **you** must know!
2. **No Count**: The function must know **how many** arguments (via count or sentinel)
3. **Alignment**: Arguments are **aligned** in memory (usually 8-byte boundaries)
4. **Platform-Specific**: Implementation varies between architectures

---
#### <span class="color-red">10. Why 8 Bytes for Everything?</span>
On 64-bit systems:
- **Registers are 64-bit** → natural to use full width
- **Alignment** → easier memory access on 8-byte boundaries
- **Efficiency** → CPU doesn't have to handle partial register operations
Even a `char` passed through `...` gets promoted to `int`, then stored in 8 bytes!

Summary: `va_list` is a clever mechanism that tracks where arguments are (registers vs stack) and provides macros to retrieve them safely, but **you must use the correct types** since there's no type checking at runtime!

---
##### <span class="color-cyan">On x86-64 (System V ABI)</span>

| Type of argument          | Where it’s passed first                                            | After registers are full |
| ------------------------- | ------------------------------------------------------------------ | ------------------------ |
| Integers, pointers, chars | General-Purpose Registers (`RDI`, `RSI`, `RDX`, `RCX`, `R8`, `R9`) | Stack                    |
| Floats, doubles           | Floating-Point Registers (`XMM0`–`XMM7`)                           | Stack                    |
| Structs / arrays          | Usually on stack (or in registers if small enough)                 | Stack                    |
### <span class="color-red">Now, what happens with each printf specifier</span>

| Format Specifier | C Type                       | Where It’s Passed                    | Explanation                                                           |
| ---------------- | ---------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `%c`             | `int` (promoted from `char`) | 🧱 **GPR**                           | `char` is promoted to `int`, so stored in general register.           |
| `%d` / `%i`      | `int`                        | 🧱 **GPR**                           | Integer → general register.                                           |
| `%u`             | `unsigned int`               | 🧱 **GPR**                           | Same as above.                                                        |
| `%x` / `%X`      | `unsigned int`               | 🧱 **GPR**                           | Hex output, but value still an `unsigned int`.                        |
| `%p`             | `void *` (pointer)           | 🧱 **GPR**                           | Pointers are addresses = integers → general register.                 |
| `%s`             | `char *` (pointer to string) | 🧱 **GPR**                           | It passes only the **address** of the string (not its content).       |
| `%f`             | `double`                     | 🌊 **Floating-point register (XMM)** | Float arguments are _promoted to double_ and passed in XMM registers. |
| `%lf`            | `double`                     | 🌊 **Floating-point register (XMM)** | Same as `%f` actually.                                                |
| `%e`, `%g`, etc. | `double`                     | 🌊 **Floating-point register (XMM)** | All floating-point → same path.                                       |
| `%ld`, `%lld`    | `long`, `long long`          | 🧱 **GPR**                           | Integers still → general register.                                    |
| `%zu`            | `size_t`                     | 🧱 **GPR**                           | Unsigned integer → GPR.                                               |

When you call `va_start`, the compiler:
- Saves the register arguments into `reg_save_area`
- Initializes:
    - `gp_offset` = number of bytes used in GP registers    
    - `fp_offset` = number of bytes used in FP registers    
    - `overflow_arg_area` = address on stack right **after the last named argument**    

So, when all the register slots are used up, `va_arg` reads from **the stack**, via `overflow_arg_area`.
```c
result = *(type *)overflow_arg_area;
overflow_arg_area += 8;  // Always 8-byte aligned (even if smaller type)
```
So even if your argument is `char` or `short`, the ABI requires it to be **passed as 8 bytes** (extended to 64-bit) on the stack.  
Hence: **stack arguments for integers are also in 8-byte slots.

---
When the **registers are full**, all remaining arguments — whether **integers**, **pointers**, or **floating-point values** — are passed **on the stack**, and **each argument occupies a multiple of 8 bytes** (8-byte aligned).

---

#### <span class="color-red">Why COPY registers to memory?</span>
#### - **<span class="color-blue">Step 1: Function is Called</span>**

<span class="color-cyan">When you call a variadic function, arguments are initially passed in registers:</span>
```c
func(100, 10, 20, 30);


//**At the moment of call:**
RDI = 100  (fixed argument)
RSI = 10   (1st extra argument)
RDX = 20   (2nd extra argument)
RCX = 30   (3rd extra argument)
```
Arguments ARE in registers! <span class=color-green>✓</span>


#### - <span class="color-blue">Step 2: Function Prologue (Beginning)</span>

<span class="color-cyan">But here's the problem: registers are temporary!** The function needs to use these registers for its own work.
So the compiler automatically generates code at the start of the function to save register contents to the stack</span>
```assembly
; Function prologue (generated by compiler)
mov  [rbp-8],  rsi    ; Save RSI to stack
mov  [rbp-16], rdx    ; Save RDX to stack
mov  [rbp-24], rcx    ; Save RCX to stack
mov  [rbp-32], r8     ; Save R8 to stack
mov  [rbp-40], r9     ; Save R9 to stack
; ... save XMM registers too ...
```
1. # Arguments **START** in registers (RSI, RDX, RCX, etc.)
2. # Immediately **COPIED** to stack memory at function start
3. # `reg_save_area` **points to** that stack memory (not registers!)
4. # Registers are now **free** to be used for other work
5. # `va_arg()` reads from **memory** (via reg_save_area), not registers

---

