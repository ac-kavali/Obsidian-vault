
static functions 
file discriptor details
why the make file default mode run the cc compiler
#### <span class="color-red">strlcat</span>: 
take the src and dest and return the size of dest + src if size > dest size if size < dest it return size of size + size of src. 
#### <span class="color-red">strlcpy</span>: 
**Goal**: Copy up to `size - 1` characters from `src` into `dest`, always null-terminating (`\0`) if `size > 0`.
**Return value:** Always returns the **length of `src`** (the total number of characters in the source string, not the number copied).
- the case if `dest[]`'s size = 1, When `strlcpy(dest, src, size)` is called, it calculate the dest size, and it copy `size-1` to `dest` ~ 0, and let 1 element for the `\0` then it fill the only element wity `\0`, and will return the size of `src`.
- `return value` = `strlen(src);`
- `strlcpy(dest, src, size)` copies a string **only if `size > 0`**.
If **either** of these is true, it _returns immediately_ without copying anything:
- - `dest == NULL` → undefined behavior (the function _should not_ be called with NULL).  
However, if you check manually and return before using `dest`, that avoids the crash.    
- `size == 0` → the function doesn’t copy anything, but it **still returns the length of `src`**. 
##### case 1:
```c
	char dest[3];
	char src[] = "hello world\n";
	strlcpy(dest, src, 5);  // size argument = 5
```
*here the `strlcpy` will not know magicaly what is the real size of dest it know this just from the arrgument entred by the function call, it will try to copy 5 element and this occure a buffer overflow.

##### case 2:
```c
	char dest[10];
	char src[] = "abc"; // src_len = 3
	strlcpy(dest, src, sizeof(dest)); // size = 10
```
`strlcpy` will **never copy more than the actual length of `src`**, even if the `size` argument allows more space.


#### <span class="color-red">strlcat</span>:
The function **`strlcat`** is used to **concatenate (append)** one string to another, but **safely**, by preventing buffer overflows.
prototype:
```c
size_t strlcat(char *dst, const char *src, size_t size);
```
- The loop of `strlcat` continues **until one of these two condition is met:
```c
while (src[i] && (dst_len + i) < (size - 1))
```  
- It completely depends on the size given in the arguments — if the user sets a size larger than the destination buffer, an overflow will occur.

```c
char dest[5] = "abc";
ft_strlcat(dest, "defghijkl", 20);  // ❌ dangerous
```

- Remember to use : 
```c 
dst[dst_len + i] = '\0'; // ❌ dst[size-1] = '\0'
```
because this will causes undifined behaviors if the src + dest < size.
- Your return the `src_len`+`dst_len` to compare the it with the final `dest` to know if the append currupted.

- Optimize the code with the case if the `size < dst_len` you it should return `size+src_len`
```c
if (size <= dst_len)
    return size + src_len;
```
this avoid writting outside the buffer and the return value to used to tell the total size needed to apped next time. 



#### <span class="color-red">Calloc</span>:
basicaly the libft use just the `malloc` and `memeset` functions in her source code, but you should optimize the calloc to avoid problem with memory like overflows :
- the function use the type `size_t` that can hold on a `32-bit system`, `size_t` is typically 32 bits, and `SIZE_MAX` is `2^32 - 1` (approximately 4 billions).....on `64bit systems` can up to 1.8 x 10^19 .
- then in the case of `(nmemb * size)` > `SIZE_MAX` this will cause a buffer overflow.
- then, optimize your code :
```c
if (nmemb != 0 && size > SIZE_MAX / nmemb) //first thing in the code.
 return NULL;
```

- **calloc(00)**: 
The return of `malloc(0)` varies by system — it may return `NULL` or a unique pointer.  
To ensure consistent behavior on all systems, 42 requires handling it manually:  
if the total size is `0`, return `malloc(1)`.  
`free(NULL)` is safe, but 42 wants **consistency**, not just correctness

| so always return a **unique pointer (malloc(1))** for the zero case.


#### <span class="color-red">substr</span>:
- the prototype :
```c
char *ft_substr(char const *s, unsigned int start, size_t len);
```
- why `unsigned int` and not `size_t` type for the start index ?:
`unsigned int` is used because the 42 project subject defines it that way. and some part of reason why mostly we use this type is to stay loyel to other language that use this to like java 
py... 
#### special cases :
- passing a null pointer -> sigfault :
```c
if (!s)      //optimize your code with this test.
	return (NULL);
```

- **No protection when `start` is bigger than `strlen(s)`**
```c
if (start >= s_len)
	return (ft_strdup(""));
```
in this case you should return a empty string not `NULL`.
using `ft_dup` that will return a pointer to an empty string. 

- If `len`>`s_len - start` 
```c
if (len > s_len - start)
	len = s_len - start);
```
this case if not optimized will cause an buffer overflow, we limit the `len` inside the interval of `s_len - start` to not copy something after `\0`.
### summary

| problem               | Description            | Fix                               |
| --------------------- | ---------------------- | --------------------------------- |
| if (len = 0)          | (want an empty str)    | auto allocate 1 for \0            |
| start >= strlen(s)    | causes segfault        | return an empty string by strdup. |
| len > s_len-start     | causes buffer overflow | adjsut the len to be in the       |
| taking `NULL` string. | segfault               | if(!s) return NULL                |



#### <span class="color-purple">Question Box</span>:

1. what is bsd library.
2. what is casting.
3. how null occure sigfault and how to optimize your code from sigfault.
4. free(str)
5. why we use `const char`.
6. what is exactly a `NULL`
7. what the difference between glibc and bsd. 
8. learn the norm of .h files
9. overflows 

#### <span class="color-green">Answers Box</span>:
1. to use it 
2.  The `const` keyword indicates that the function will not modify the string you pass to it.