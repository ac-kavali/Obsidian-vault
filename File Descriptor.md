## difinition : 
- a file descriptor is non negative number used by the operating system kernel to identify an open file c or other input or output streams

take the libririan like example when you want to access to a book you should ask the librarian to give you a ticket to give you the right to access to the book that you want 

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

## 🏗️ 6. What if the Book Doesn’t Exist Yet?

You can say:
```c
open("newbook.txt", O_CREAT);
```

- the file descriptor table be like : 

| fd  | file             |
| --- | ---------------- |
| 0   | keyboard (stdin) |
| 1   | screen (stdout)  |
| 2   | screen (errors)  |
| 3   | story.txt        |
| 4   | newbook.txt      |
## system functions: 
when you call `open()`or `close()` system functions:
```c
int fd = open("notes.txt", O_RDONLY);
```
\- with the flag `O_RDONLY` is a **flag** that means **"Open the file for reading only"**.
\- `fd` is a **small integer** representing that file. You can now **perform several operations on the file using this fd**.
\- like read from the file. 
\- write into it.
\- close the file.


⚙️ Other common flags:
#### 1️⃣ Flags like `O_RDONLY`, `O_WRONLY`, `O_RDWR`.
- These flags are **designed for `open()` (and `openat()`)**.
- They tell the kernel **how you want to access the file** when it’s opened:
```c
int fd = open("file.txt", O_RDONLY);
```
- Here `O_RDONLY` tells the kernel: _“I only want to read this file.”_
- Similarly, `O_WRONLY | O_CREAT | O_TRUNC` tells it: _“Write only, create if missing, erase existing content.”_
- ##### `read(fd, buf, n)` and `write(fd, buf, n)` **check the flags stored internally** in the File Table Entry when the file was opened:
	
- **Inode** = a metadata structure for the file (not the content).
- It stores things like:
  - File type (regular file, directory, link, …)
  - File size        
  - **Permissions** 
  - Owner (user ID) and group (group ID)
  - Timestamps (creation, modification, access)
  - Pointers to disk blocks (where the actual content lives)

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

