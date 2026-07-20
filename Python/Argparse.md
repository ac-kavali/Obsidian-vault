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
1. import python module `argparse`
```python 
import argparse
# or better
from argparse import ArgumentParser ...
```

2. Create the parser engine:
```python
parser = ArgumentParser()
```
- `ArgumentParser` is a class provided by the `argparse` module
- in this step you create or (initiat) an `argparse` object.
- Now you have the `parser` as argparse object with all the module methods 