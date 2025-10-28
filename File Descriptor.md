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
	+-----+----------------------+
	|  0  | keyboard (stdin)     |
	|  1  | screen (stdout)      |
	|  2  | screen (errors)      |
	|  3  | story.txt            |
	|  4  | newbook.txt          |
	+-----+----------------------+


## system functions: 
when you call `open()`or 
###### ⚙️ Other common flags:

| Flag       | Meaning                                |
| ---------- | -------------------------------------- |
| `O_RDONLY` | Open for reading only                  |
| `O_WRONLY` | Open for writing only                  |
| `O_RDWR`   | Open for both reading and writing      |
| `O_CREAT`  | Create the file if it doesn’t exist    |
| `O_TRUNC`  | Truncate (erase) the file if it exists |
| `O_APPEND` | Write new data at the end of the file  |