
## <span class="color-blue"> Check if Valgrind installed</span>

```bash
user@host~> valgrind --version
```

if not found then install it using : 
```bash
sudo apt install valgrind     # Debian/Ubuntu
sudo pacman -S valgrind       # Arch
sudo dnf install valgrind     # Fedora
```
if yes go next.

---
### <span class="color-red">A) Compile your program with debugging symbols</span>

```zsh
gcc -g -Wall -Wextra -Werror your_program.c -o program
```

### <span class="color-red">B) Run your program with Valgrind</span>

*<span class="color-cyan">Basic usage:</span>
```zsh
valgrind ./program
```
<span class="color-cyan">But for memory debugging, always use:</span>
```zsh
valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./program
```
<span class="color-green">Meaning:</span>
**`--leak-check=full`** → detailed leak info   
**`--show-leak-kinds=all`** → shows all leak types (definite, indirect, possible)
**`--track-origins=yes`** → tells you where uninitialized values come from

---
### <span class="color-red">C) Understand Valgrind output </span>
Example output:
```zsh
==1234== Invalid write of size 4
==1234==    at  main (test.c:10)
==1234==  Address 0x1ffefff10 is not stack'd, malloc'd or free'd
```
This means you wrote to memory you shouldn't.

Example leak 
```java
==1234== 20 bytes in 1 blocks are definitely lost in loss record 1
==1234==    at  malloc (vg_replace_malloc.c:xxx)
==1234==    by main (test.c:12)
```
This means you **allocated memory and never freed it**.

---
### <span class="color-red">D) Check summary at the end</span>
The most important part:
```python
HEAP SUMMARY:
    definitely lost: 20 bytes in 1 blocks
    indirectly lost: 0 bytes in 0 blocks
    possibly lost: 0 bytes in 0 blocks
    still reachable: 0 bytes
```
**definitely lost** → REAL memory leak
**indirectly lost** → leak caused by another leak 
**still reachable** → memory not freed before exit, but accessible
**possibly lost** → suspicious pointer issues

---

Other use of vilgrind : 
So also use this when you suspect a segmentation fault:
`valgrind --track-origins=yes --verbose ./a.out`
