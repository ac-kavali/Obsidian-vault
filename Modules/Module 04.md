# open()

is a **built-in function** used to **open a file** so you can **read from it or write to it**.
```python
open(filename, mode)
```
Open it return a file object:
```python
file_object = open(file_name, mode)
```
a file object is like a connection between your program and the file use indirectly the file c file handling (file discriptor and file access mode)



# Read()

`read()` is a method used to **read data from a file**.


# Close()

`close()` is a method that **closes an open file** and frees system resources.

```python
f = open("test.txt", "r")
content = f.read()
print(content)
f.close()
```

Used all of them as a combinne to open and read from a file and close it safely.


# Write()

`write()` is a **method of a file object**.It is used to **write text into a file**.
```python
f = open("test.txt", "w")
f.write("Hello")
f.close()
```



# Sys.stdin

It represents the source of input to the program (usually the keyboard).
```python
import sys

print("Type something:")
text = sys.stdin.readline()  # reads one line from keyboard
print("You typed:", text)
```



# Sys.stdout

It represents where the program sends its output (usually the screen).
```python
import sys

sys.stdout.write("Hello world!\n")  # note: need \n manually
```


# Sys.stderr

It represents where error messages go (usually the screen too, but separate from normal output).
```python
import sys

sys.stderr.write("This is an error message!\n")
```


**You will remark that the ordre of the stdint and stdout not always stable this is because they are a two separate stream and ths is because of buffring**




# With

`with` is a **context manager** that help you with opened resources and ensure you don't let a file open accedently.
- Python **opens the file**
- You can **read or write** safely
- Python **automatically closes the file** when you’re done — even if an error occurs
- No need to call `file.close()` manually.
```python
with open("example.txt", "r") as file:
    content = file.read()
# file is automatically closed here
```

we know that the mistake of not closing a file it harm the data 
this is the power of with it always close the file.


**RAII = Resource Acquisition Is Initialization**
They are describing **RAII** in story form.

- Vault opens → resource acquired
- Work happens → resource used
- Vault seals → resource released
