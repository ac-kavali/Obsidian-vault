# Python Variables & Data Types

## 1. Variables in Python

A **variable** is a name used to reference a value stored in memory.

Python is dynamically typed, meaning you don't need to declare the variable's type. Python determines it automatically based on the assigned value.

```
name = "kavali"
age = 25
height = 1.75
is_student = True
```

### Variable naming rules

- Must start with a letter or underscore `_`.
- Cannot start with a number.
- Can contain letters, numbers and underscores.
- Case-sensitive (`name` ≠ `Name`).
- Cannot use Python reserved keywords (`if`, `for`, `class`, etc.).

```
user_name = "Ahmed"  # Valid
_age = 19            # Valid
user2 = "Ali"        # Valid

# 2user = "Ali"      # Invalid
# user-name = "Ali"  # Invalid
```
### Checking the type of a variable

Use `type()` to inspect the type of an object.
```
x = 42

print(type(x))  # <class 'int'>
```

---
## 2. Python Data Types

Python provides several built-in data types.
### 2.1 Numeric Types

| Type      | Description     | Example           |
| --------- | --------------- | ----------------- |
| `int`     | Integer numbers | `10`, `-5`, `100` |
| `float`   | Decimal numbers | `3.14`, `-2.5`    |
| `complex` | Complex numbers | `2 + 3j`          |

```
age = 19           # int
price = 19.99      # float
number = 2 + 3j    # complex
```

### 2.2 String (`str`)

A string represents a sequence of characters.

```
name = "Ahmed"
message = 'Hello World'
```

Strings are:

- Ordered.
    
- Immutable (cannot modify individual characters).
    
- Indexable.
    

```
word = "Python"

print(word[0])   # P
print(word[-1])  # n
```

### 2.3 Boolean (`bool`)

Represents one of two logical values:

```
is_active = True
is_admin = False
```

Useful for conditions and comparisons.

```
age = 19
print(age >= 18)  # True
```

### 2.4 Sequence Types

|Type|Description|Mutable?|
|---|---|---|
|`list`|Ordered collection|Yes|
|`tuple`|Ordered collection|No|
|`range`|Sequence of integers|No|

**List**

```
numbers = [10, 20, 30]
numbers.append(40)
```

**Tuple**

```
coordinates = (10, 20)
```

**Range**

```
numbers = range(5)

print(list(numbers))  # [0, 1, 2, 3, 4]
```

### 2.5 Set (`set`)

A collection of unique elements.

- Does not allow duplicates.
    
- Unordered.
    
- Mutable.
    

```
numbers = {1, 2, 3, 3}

print(numbers)  # {1, 2, 3}
```

### 2.6 Dictionary (`dict`)

Stores data as key-value pairs.

```
user = {
    "name": "Ahmed",
    "age": 19,
    "active": True
}

print(user["name"])  # Ahmed
```

- Access values using their keys.
    
- Mutable.
    
- Keys must be unique.
    

### 2.7 None (`NoneType`)

Represents the absence of a value.

```
result = None

print(type(result))  # <class 'NoneType'>
```

Useful when a variable has not received a value yet.

---

## 3. Variable Scope in Python

**Scope** determines where a variable can be accessed in the code.

Python follows the **LEGB rule** when searching for a variable:

|Scope|Meaning|Description|
|---|---|---|
|L|Local|Inside the current function|
|E|Enclosing|Inside an outer function|
|G|Global|Defined at the module level|
|B|Built-in|Python built-in names (`print`, `len`, etc.)|

### 3.1 Local Scope

A variable defined inside a function is local to that function.

```
def my_function():
    x = 10
    print(x)

my_function()  # 10

# print(x)     # NameError
```

`x` cannot be accessed outside the function.

### 3.2 Global Scope

A variable defined outside functions is global.

```
name = "Ahmed"

def display():
    print(name)

display()  # Ahmed
```

Functions can read global variables without declaring them.

**Modifying a global variable**

Use the `global` keyword to assign to a global variable from inside a function.

```
counter = 0

def increment():
    global counter
    counter += 1

increment()

print(counter)  # 1
```

Without `global`, an assignment inside the function creates a local variable.

### 3.3 Enclosing Scope

Occurs when a function is defined inside another function.

```
def outer():
    x = 10

    def inner():
        print(x)

    inner()

outer()  # 10
```

The inner function can access variables from its enclosing function.

**Modifying an enclosing variable**

Use `nonlocal` to modify a variable belonging to an enclosing function.

```
def outer():
    x = 10

    def inner():
        nonlocal x
        x = 20

    inner()
    print(x)

outer()  # 20
```

### 3.4 Built-in Scope

Python provides built-in names that can be used without importing anything.

```
numbers = [1, 2, 3]

print(len(numbers))  # 3
print(type(numbers)) # <class 'list'>
```

`len()` and `type()` are built-in functions.

**Key points:**

- Local variables exist inside their function.
    
- Global variables are defined at the module level.
    
- `global` allows assignment to a global variable.
    
- `nonlocal` allows assignment to an enclosing function's variable.
    
- Python searches for names using LEGB order.
    

---

## 4. Type Casting (Type Conversion)

**Type casting** means converting a value from one data type to another.

Python provides built-in functions for type conversion.

|Function|Converts to|Example|
|---|---|---|
|`int()`|Integer|`int("10")`|
|`float()`|Float|`float("3.14")`|
|`str()`|String|`str(100)`|
|`bool()`|Boolean|`bool(1)`|
|`list()`|List|`list((1, 2))`|
|`tuple()`|Tuple|`tuple([1, 2])`|
|`set()`|Set|`set([1, 2, 2])`|
|`dict()`|Dictionary|`dict([("a", 1)])`|

### Examples

```
age = "19"

age = int(age)

print(age + 1)  # 20
```

```
price = 19

price = float(price)

print(price)  # 19.0
```

```
number = 100

message = str(number)

print("Number: " + message)
```

### Important: Conversion errors

Not every value can be converted.

```
x = "hello"

# int(x)  # ValueError
```

Some conversions also lose information:

```
x = 3.99

print(int(x))  # 3
```

`int()` removes the decimal part; it does not round the number.

### Truthy and Falsy values

When converting values using `bool()`, Python evaluates whether they are truthy or falsy.

**Falsy values:**

```
bool(0)       # False
bool("")      # False
bool(None)    # False
bool([])      # False
bool({})      # False
```

Most other values are truthy:

```
bool(1)         # True
bool("hello")   # True
bool([1, 2])    # True
```

---

## 5. Printing Variables and Formatting

Python uses the `print()` function to display information.

### 5.1 Basic Printing

```
name = "Ahmed"
age = 19

print(name)
print(age)
```

Printing multiple values:

```
print("Name:", name, "Age:", age)
```

By default, `print()` separates multiple arguments with a space and ends with a newline.

### 5.2 String Concatenation

Use `+` to combine strings.

```
name = "Ahmed"
message = "Hello " + name

print(message)
```

**Remember:** You cannot concatenate a string directly with an integer.

```
age = 19

# print("Age: " + age)  # TypeError

print("Age: " + str(age))
```

### 5.3 f-Strings (Recommended)

An f-string allows you to insert variables and expressions directly inside a string.

```
name = "Ahmed"
age = 19

print(f"My name is {name} and I am {age} years old.")
```

You can also perform expressions:

```
x = 10
y = 20

print(f"Result: {x + y}")
```

**Formatting numbers:**

```
price = 19.5678

print(f"Price: {price:.2f}")  # Price: 19.57
```

|Format|Meaning|
|---|---|
|`{x}`|Default representation|
|`{x:.2f}`|2 decimal places|
|`{x:04d}`|Integer padded to 4 digits|
|`{x:,}`|Thousands separator|
|`{x:.1%}`|Percentage with 1 decimal place|

Example:

```
number = 15000
percentage = 0.856

print(f"Number: {number:,}")       # 15,000
print(f"Progress: {percentage:.1%}") # 85.6%
```

### 5.4 format() Method

Another way to format strings is using `.format()`.

```
name = "Ahmed"
age = 19

print("My name is {} and I am {} years old.".format(name, age))
```

You can specify positions:

```
print("{1} is {0} years old.".format(19, "Ahmed"))
```

You can also use named placeholders:

```
print("Name: {name}, Age: {age}".format(name="Ahmed", age=19))
```

### 5.5 Old Formatting (%)

Python also supports the older `%` formatting style.

```
name = "Ahmed"
age = 19

print("Name: %s, Age: %d" % (name, age))
```

|Specifier|Meaning|
|---|---|
|`%s`|String|
|`%d`|Integer|
|`%f`|Float|
|`%.2f`|Float with 2 decimals|

### 5.6 print() Parameters

The `print()` function accepts additional parameters.

**sep:** Defines the separator between multiple arguments.

```
print("Python", "is", "awesome", sep="-")

# Python-is-awesome
```

**end:** Defines what is printed at the end.

```
print("Hello", end=" ")
print("World")

# Hello World
```

By default:

- `sep=" "`
    
- `end="\n"`
    

---

## 6. Multiple Assignment and Unpacking

Python allows assigning values to multiple variables in a single statement.

### 6.1 Multiple Assignment

Assign different values to multiple variables:

```
x, y, z = 10, 20, 30

print(x)  # 10
print(y)  # 20
print(z)  # 30
```

Assign the same value to multiple variables:

```
x = y = z = 0

print(x, y, z)  # 0 0 0
```

### 6.2 Unpacking

**Unpacking** means extracting elements from an iterable and assigning them to individual variables.

```
numbers = [10, 20, 30]

x, y, z = numbers

print(x)  # 10
print(y)  # 20
print(z)  # 30
```

The number of variables must match the number of elements.

```
x, y = [10, 20]  # Valid

# x, y = [10, 20, 30]  # ValueError
```

### 6.3 Extended Unpacking (*)

Use `*` to collect multiple remaining elements into a list.

```
numbers = [10, 20, 30, 40, 50]

first, *middle, last = numbers

print(first)   # 10
print(middle)  # [20, 30, 40]
print(last)    # 50
```

Another example:

```
first, *rest = [1, 2, 3, 4]

print(first)  # 1
print(rest)   # [2, 3, 4]
```

### 6.4 Swapping Variables

Python allows swapping two variables without using a temporary variable.

```
a = 10
b = 20

a, b = b, a

print(a)  # 20
print(b)  # 10
```

### 6.5 Unpacking Tuples and Dictionaries

**Tuple:**

```
coordinates = (10, 20)

x, y = coordinates
```

**Dictionary:**

```
user = {
    "name": "Ahmed",
    "age": 19
}

name, age = user

print(name)  # name
print(age)   # age
```

**Important:** Unpacking a dictionary directly gives you its keys, not its values.

To unpack values:

```
name, age = user.values()

print(name)  # Ahmed
print(age)   # 19
```

---

## 7. Key Points to Remember

- Python is dynamically typed: no need to declare variable types.
    
- Use `type()` to inspect an object's type.
    
- Lists and dictionaries are mutable; strings and tuples are immutable.
    
- Python uses LEGB to resolve variable names.
    
- Use `global` to assign to a global variable inside a function.
    
- Use `nonlocal` to assign to an enclosing function's variable.
    
- Use `int()`, `float()`, `str()`, etc. for type conversion.
    
- Prefer f-strings for formatting strings.
    
- `sep` controls the separator in `print()`.
    
- `end` controls what is printed after the output.
    
- Unpacking assigns iterable elements to multiple variables.
    
- `*` collects remaining unpacked elements into a list.
    

---

## 8. Questions for Revision

1. What does dynamically typed mean in Python?
    
2. What is the difference between `int` and `float`?
    
3. What is the difference between a list and a tuple?
    
4. What does mutable and immutable mean?
    
5. What is the LEGB rule?
    
6. What is the difference between `global` and `nonlocal`?
    
7. What happens when you convert `"hello"` to an integer?
    
8. What is the difference between `str()` and `repr()`?
    
9. What is the difference between f-strings and `.format()`?
    
10. What are the default values of `sep` and `end` in `print()`?
    
11. What is the difference between multiple assignment and unpacking?
    
12. What does `*` do during unpacking?
    
13. How can you swap two variables without a temporary variable?
    
14. What happens when you unpack a dictionary directly?