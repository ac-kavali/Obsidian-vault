 **Python standard library module** used to handle **command-line arguments**.

```
terminal command
        ↓
ArgumentParser() Create the arg parsing object that do all work with your arguments
        ↓
add_argument()   #add a new rule to parse an argument
        ↓
parse_args()   #Parse and validate argument and return a name space 
        ↓
args object
        ↓
Python variables
```

A **namespace** is a container that holds names (variables, functions, objects) so they can be organized and accessed without conflicts.
A namespace is an object/container that stores multiple named variables (attributes), which can be accessed using dot notation.

---
json module and the numpy

## Implementation
### 1. import python module `argparse`
```python 
import argparse
# or better
from argparse import ArgumentParser ...
```

### 2. Create the parser engine:
```python
parser = ArgumentParser()
```
- `ArgumentParser` is a class provided by the `argparse` module
- in this step you create or (initiat) an `argparse` object.
- Now you have the `parser` as argparse object with all the module methods!.
--- 
### 3. Add arguments 
```python 
parser.add_argument(dest="name")
```
- This method Takes `*args` and `**kwargs` : 
this means that you can send any number of argument names : 
```python
parser.add_argument("-n", "--name", "--username", "--uname", dest="name")
```

- the `dist` that controle with you what you can access the argument
- if you didn't specified the `dest` **only the order in which you wrote the names matters** where the first double dashed name will be used to access to the argument
- This step controle wiche style you'll use in argument catching from the cli
- Other useful parametters : 
```python
parser.add_argument("-n", "--name", type=str, help="you name please")
```
- `type=`  can be int to convert the argument automatically or a str or even a path.
- A `default` in case if the argument not provided 
- help used to show a help message when you use `-h`
- `required=True` is the default but you want to add a default you can make it false(the order of paramters matters ):
```python
parser.add_argument("-n", "--name", required=False, type=str, help="fuck you name" , default="helle")
```

---
### 