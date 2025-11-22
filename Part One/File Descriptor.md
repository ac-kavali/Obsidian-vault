## <span class="color-red">difinition</span>
- a file descriptor is non negative number used by the operating system kernel to identify an open file or other input or output streams

"take the libririan like example when you want to access to a book you should ask the librarian to give you a ticket to give you the right to access to the book that you want"

- when you want to read from the book you ask the librarian to read 100 letter from the book and put it in you notebook that is the buffer:
  ```c 
  size_t n = read (3, buffer, 100);
  ```
 |> `read` actually **reads data** from the file into a buffer in memory.
 |> actually **reads data** from the file into a buffer in memory.
 |> **Return value:** number of bytes actually read (can be less than     requested), `0` at EOF, `-1` on error.

- when you want to write: 
```c
write(3, "hello", 5);
```
- and when you finish you close the book and the librarian takes your ticket. 
```c
close(3);
```

---
## <span class="color-red">6. What if the Book Doesn’t Exist Yet?</span>

You can say:
```c
fd = open("newbook.txt", O_CREAT);
```
|> `open` **opens** a file and gives you a **file descriptor**, which is like a handle or ID for that file in your program.
|>It does not read or write any data by itself.

- the file descriptor table be like :

| fd  | file             |
| --- | ---------------- |
| 0   | keyboard (stdin) |
| 1   | screen (stdout)  |
| 2   | screen (errors)  |
| 3   | story.txt        |
| 4   | newbook.txt      |
| ... | ...              |
## system functions: 
when you call `open()`or `close()` system functions:
```c
int fd = open("notes.txt", O_RDONLY);
```
\- with the flag `O_RDONLY` is a **`flag`/`access mode`that means **"Open the file for reading only"**.
\- `fd` is a **small integer** representing that file. You can now **perform several operations on the file using this fd**.
\- like read from the file. 
\- write into it.
\- close the file.

---
### <span class="color-red">Flags</span> 
##### like `O_RDONLY`, `O_WRONLY`, `O_RDWR`.
- These flags are **designed for `open()` (and `openat()`)**.
- They tell the kernel **how you want to access the file** when it’s opened:
```c
int fd = open("file.txt", O_RDONLY);
// or 
int fd = open("file.txt", O_CREATE, 0644); //file mode is mondatory(06..)
/*The 0644 field is called the file mode or permission bits (or sometimes just "mode").*/
```
- Here `O_RDONLY` tells the kernel: _“I only want to read this file.”_
- Similarly, `O_WRONLY | O_CREAT | O_TRUNC` tells it: _“Write only, create if missing, erase existing content.”_
- ##### `read(fd, buf, n)` and `write(fd, buf, n)` **check the flags stored internally** in the File Table Entry when the file was opened:
- **Inode** = a metadata structure for the file (not the content).

| Flag       | Meaning                                |
| ---------- | -------------------------------------- |
| `O_RDONLY` | Open for reading only                  |
| `O_WRONLY` | Open for writing only                  |
| `O_RDWR`   | Open for both reading and writing      |
| `O_CREAT`  | Create the file if it doesn’t exist    |
| `O_TRUNC`  | Truncate (erase) the file if it exists |
| `O_APPEND` | Write new data at the end of the file  |
✅ Key points to remember:
- The **fd is just a number**; it’s your program’s handle.
- The **kernel keeps the real info** in tables and inodes.
- Once opened, **you never need the file path again** to read/write; the fd is enough.
### sumary : 
*When you call `open()`, the kernel first checks the file’s inode permissions to see whether you are allowed to read, write, or execute the file. If you do not have the required permission, `open()` immediately fails. If the permission check succeeds, the kernel creates an entry in the Open File Table. This entry stores the flags you passed to `open()` (such as `O_RDONLY`, `O_WRONLY`, `O_RDWR`, `O_APPEND`, etc.), which control how the file descriptor will behave after the file has been successfully opened. In short: the inode decides _if_ you can access the file, and the Open File Table flags decide _how_ you will use it once it is opened._

---
## <span class="color-red">EOF (end of file) </span> 

**<span class="color-yellow">No more data will ever come from this fd.</span>**
\-`read()` returning 0 is the only signal.
int Get_Next_Line this means:
 - if stash contains leftover -> return it.
 - if stash empty -> return `NULL`.

--- 
## <span class="color-red">Open file table </span> 

![[filedisc.png]]
## <span class="color-red">A) Process & File Descriptors </span>
### <span class="color-cyan">Process:</span>
Think of a process as a running program. In the diagram, you have **Process 1** and **Process 2**. Each process has its **own file descriptor table**.
### <span class="color-cyan">File Descriptor Table:</span>
▢ Every process maintains a table of file descriptors (FDs).
▢ These are just numbers (0, 1, 2, …) used by the process to refer to open files.
▢ Examples: `0` → stdin, `1` → stdout, `2` → stderr (standard for all processes)
▢ A process can open multiple files. Linux allows up to a **system-defined limit** per process (often **1024 by default**, can be increased).

## <span class="color-red">B) File Table (open file table) </span>

▢ This is **system-wide, meaning multiple processes can share it.
▢ Each entry countains: 
 |>Pointer to inode(to know file metadata and location).
 |>Current file offset(where the next reaad/write happens).
 |>Access mode(read, write, read-write, execute).
▢Example in the diagram:
 |>FD 3 of Process 1 -> File Table entry "Read-Write".
 |>FD 3 of process 2 -> same or different File Table entry depending on whether it's a duplicate(e.g, dup()).
 * If two FDs from different processes point to the same file table entry, they share the file offest.

## <span class="color-red">C) Inode Table </span>

The inode contains metadata about the actual file:
-> Each inode stores :
 ▢ File size.
 ▢ Permissions.
 ▢ Owner.
 ▢ Pointers to disk blocks.
 ▢ Timestamps.
-> Multiple entries in the file table can pointe same inode, meaning multiple open instance of the same file share the same meunderlying file metadata.

---
