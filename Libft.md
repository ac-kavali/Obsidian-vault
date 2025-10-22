- **`strcmp`** : *compare until first difference or \0, when it reach the first difference it return the substraction of strA\[i] - strB\[i]. if they are identic it return 0 , and if one of them ended it return the strA\['\0'] - strB\[i] , or the oposite.* 

- **`strncmp`** :  *it compare just n element in 2 string, used to compare prefixes , if one of string reached max it compar '\\0' and s2\[i].*


- **`strcat`** : *it coppy a string to the end of the destination string by finding the `\0` and replace it and what came after by the src string, strncat* 

- **`strncat`** : *it coppy a source string to a destination from the its end to a specifique lent entred in parametter.* 

##### strlcat: 
take the src and dest and return the size of the size of dest + src truncated 
#### <span class="color-red">strlcpy</span>: 
**Goal**: Copy up to `size - 1` characters from `src` into `dest`, always null-terminating (`\0`) if `size > 0`.
**Return value:** Always returns the **length of `src`** (the total number of characters in the source string, not the number copied).
- the case if `dest[]`'s size = 1, When `strlcpy(dest, src, size)` is called, it calculate the dest size, and it copy `size-1` to `dest` ~ 0, and let 1 element for the `\0` then it fill the only element wity `\0`, and will retun the size of `src`.
- `return value` = `strlen(src);`
- `strlcpy(dest, src, size)` copies a string **only if `size > 0`**.
If **either** of these is true, it _returns immediately_ without copying anything:
- - `dest == NULL` → undefined behavior (the function _should not_ be called with NULL).  
However, if you check manually and return before using `dest`, that avoids the crash.    
- `size == 0` → the function doesn’t copy anything, but it **still returns the length of `src`**.
- hello 

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








#### <span class="color-purple">Question Box</span>:
1. what is bsd library. 
2. what is casting. 
3. why we use `const char`.
4. what is exactly a `NULL`




#### <span class="color-green">Answers Box</span>:
1. to use it 