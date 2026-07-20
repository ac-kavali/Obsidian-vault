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
parser.add_argument("-n", "--name", help="your name")
```
- This method Takes `*args` and `**kwargs` : 
This means that you can send any number of argument names : 
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
-  [-]  'required' is an invalid argument for positionals like "name" it works just with "--name" !!!

---
### Parse and store the arguments

```python
args = parser.parse_args()
```
The method is like a click to execute the parsing and validation of the argument and store them in a name space object (args) object:
you can access them using `args.argument`
```python
print(args.name)
# Kavali
```
---
## Full picture:
```python
from argparse import ArgumentParser

# Creating The argument parser object
parser = ArgumentParser( )  
  
# Add the required arguments
parser.add_argument("-n", "--name", required=False, type=str, help="fuck you name" , default="kavali")

# Execute the parsing, validation, storage of arguments in a namespace
args = parser.parse_args() 

print(args.name)
```

### Real example :
**You want to use argument parser in a main and separtet the code of argument parsing from the main.py**

1. in `cli.py`
```python
from argparse import ArgumentParser


def create_parser():
    parser = ArgumentParser(
        description="My program"
    )

    parser.add_argument(
        "--name",
        type=str,
        required=True,
        help="User name"
    )

    parser.add_argument(
        "--age",
        type=int,
        default=18,
        help="User age"
    )

    return parser


def parse_arguments():
    parser = create_parser()
    return parser.parse_args()
```

2. in `main.py`
```python
from cli import parse_arguments
from app import run


def main():
    args = parse_arguments()
	print(args.name, args.age)


if __name__ == "__main__":
    main()
```
