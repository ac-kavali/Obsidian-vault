# Python Operators

## 1. Introduction

**Operators** are special symbols or keywords used to perform operations on variables and values (operands).

```
x = 10
y = 5

result = x + y

print(result)  # 15
```

- `+` → Operator
- `x` and `y` → Operands
- `15` → Result

Python provides several categories of operators.

---
## 2. Arithmetic Operators

Used to perform mathematical operations.

| Operator | Name           | Example   | Result |
| -------- | -------------- | --------- | ------ |
| `+`      | Addition       | `10 + 5`  | `15`   |
| `-`      | Subtraction    | `10 - 5`  | `5`    |
| `*`      | Multiplication | `10 * 5`  | `50`   |
| `/`      | Division       | `10 / 5`  | `2.0`  |
| `//`     | Floor Division | `10 // 3` | `3`    |
| `%`      | Modulus        | `10 % 3`  | `1`    |
| `**`     | Exponentiation | `2 ** 3`  | `8`    |
### Important differences

**Division (**`**/**`**)**
Always returns a float, even if the result is a whole number.
```
print(10 / 2)  # 5.0
```
**Floor Division (**`**//**`**)**

Divides two numbers and rounds the result down to the nearest integer (mathematically, towards negative infinity).

```
print(10 // 3)   # 3
print(-10 // 3)  # -4
```

**Modulus (**`**%**`**)**

Returns the remainder of a division.

```
print(10 % 3)  # 1
```

Useful for checking whether a number is even or odd.

```
number = 10

if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

**Exponentiation (**`******`**)**

Raises a number to a power.

```
print(2 ** 3)  # 8
print(5 ** 2)  # 25
```

---
## 3. Assignment Operators

Used to assign values to variables or update their existing values.

| Operator | Example   | Equivalent     |
| -------- | --------- | -------------- |
| `=`      | `x = 10`  | Assign 10 to x |
| `+=`     | `x += 5`  | `x = x + 5`    |
| `-=`     | `x -= 5`  | `x = x - 5`    |
| `*=`     | `x *= 5`  | `x = x * 5`    |
| `/=`     | `x /= 5`  | `x = x / 5`    |
| `//=`    | `x //= 5` | `x = x // 5`   |
| `%=`     | `x %= 5`  | `x = x % 5`    |
| `**=`    | `x **= 2` | `x = x ** 2`   |
### Examples

```
x = 10

x += 5
print(x)  # 15

x *= 2
print(x)  # 30

x %= 7
print(x)  # 2
```

**Important:** `=` and `==` are different.
- `=` assigns a value.
- `==` compares two values.
    
```
x = 10

print(x == 10)  # True
```

---
## 4. Comparison Operators

Used to compare two values. They always return a Boolean (`True` or `False`).

|Operator|Meaning|Example|Result|
|---|---|---|---|
|`==`|Equal|`5 == 5`|`True`|
|`!=`|Not equal|`5 != 3`|`True`|
|`>`|Greater than|`5 > 3`|`True`|
|`<`|Less than|`5 < 3`|`False`|
|`>=`|Greater or equal|`5 >= 5`|`True`|
|`<=`|Less or equal|`5 <= 3`|`False`|

### Examples

```
age = 19

print(age >= 18)  # True
print(age < 18)   # False
print(age == 19)  # True
```
### Chained Comparisons

Python allows multiple comparisons in a single expression.

```
age = 19

print(18 <= age <= 30)  # True
```

Equivalent to:

```
print(18 <= age and age <= 30)
```

Useful for checking ranges.

---
## 5. Logical Operators

Used to combine or reverse Boolean expressions.

Python provides three logical operators:

| Operator | Description                            |
| -------- | -------------------------------------- |
| `and`    | True if both conditions are true       |
| `or`     | True if at least one condition is true |
| `not`    | Reverses the truth value               |

### AND

Both conditions must be true.

```
age = 19
has_id = True

print(age >= 18 and has_id)  # True
```

|A|B|A and B|
|---|---|---|
|True|True|True|
|True|False|False|
|False|True|False|
|False|False|False|

### OR

At least one condition must be true.

```
is_admin = False
is_owner = True

print(is_admin or is_owner)  # True
```

|A|B|A or B|
|---|---|---|
|True|True|True|
|True|False|True|
|False|True|True|
|False|False|False|

### NOT

Reverses the Boolean value.

```
is_active = True

print(not is_active)  # False
```

### Short-Circuit Evaluation

Python does not always evaluate every condition.

- `and`: stops when it finds a falsy operand.
    
- `or`: stops when it finds a truthy operand.
    

```
x = 0

result = x and 10 / x

print(result)  # 0
```

Python never evaluates `10 / x` because `x` is falsy.

**Important:** `and` and `or` return operands, not necessarily Boolean values.

```
print(5 and 10)       # 10
print(0 and 10)       # 0
print(5 or 10)        # 5
print(0 or 10)        # 10
```

---

## 6. Identity Operators

Used to check whether two variables refer to the **same object in memory**.

|Operator|Description|
|---|---|
|`is`|True if both references point to the same object|
|`is not`|True if they point to different objects|

### Example

```
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a == b)  # True
print(a is b)  # True

print(a == c)  # True
print(a is c)  # False
```

### Difference between `==` and `is`

- `==` compares values (equality).
    
- `is` compares object identity.
    

Visual representation:

```
a ─────┐
       ├────> [1, 2, 3]
b ─────┘

c ──────────> [1, 2, 3]
```

`a` and `b` reference the same list object, while `c` references another object with the same contents.

### Common usage: None

Use `is` when checking whether a variable is `None`.

```
result = None

if result is None:
    print("No result")
```

---

## 7. Membership Operators

Used to check whether an element exists inside a sequence or collection.

|Operator|Description|
|---|---|
|`in`|Checks if an element exists|
|`not in`|Checks if an element does not exist|

### Examples

**Strings**

```
text = "Python Programming"

print("Python" in text)      # True
print("Java" not in text)    # True
```

**Lists**

```
numbers = [10, 20, 30]

print(20 in numbers)      # True
print(50 not in numbers)  # True
```

**Dictionaries**

Membership checks dictionary keys by default, not values.

```
user = {
    "name": "Ahmed",
    "age": 19
}

print("name" in user)         # True
print("Ahmed" in user)        # False
print("Ahmed" in user.values())  # True
```

---

## 8. Bitwise Operators

Bitwise operators perform operations on the individual bits of integers.

First, remember that integers can be represented in binary.

```
5  = 0101
3  = 0011
```

|Operator|Name|Description|
|---|---|---|
|`&`|AND|1 if both bits are 1|
|`\|`|OR|1 if at least one bit is 1|
|`^`|XOR|1 if bits are different|
|`~`|NOT|Inverts the bits|
|`<<`|Left Shift|Shifts bits to the left|
|`>>`|Right Shift|Shifts bits to the right|

### Bitwise AND (`&`)

```
  0101  (5)
& 0011  (3)
-------
  0001  (1)
```

```
print(5 & 3)  # 1
```

### Bitwise OR (`|`)

```
  0101  (5)
| 0011  (3)
-------
  0111  (7)
```

```
print(5 | 3)  # 7
```

### Bitwise XOR (`^`)

Returns 1 when the two bits are different.

```
  0101  (5)
^ 0011  (3)
-------
  0110  (6)
```

```
print(5 ^ 3)  # 6
```

### Bitwise NOT (`~`)

Inverts the bits of an integer.

```
print(~5)  # -6
```

For Python integers:

```
~x = -(x + 1)
```

### Left Shift (`<<`)

Moves bits to the left and fills the right side with zeros.

```
5 = 00000101

5 << 1 = 00001010 = 10
```

```
print(5 << 1)  # 10
print(5 << 2)  # 20
```

### Right Shift (`>>`)

Moves bits to the right.

```
5 = 00000101

5 >> 1 = 00000010 = 2
```

```
print(5 >> 1)  # 2
print(5 >> 2)  # 1
```

**Key point:** Bitwise operators are particularly useful in low-level programming, networking, permissions, and cybersecurity.

---

## 9. Operator Precedence

When an expression contains multiple operators, Python follows an order of precedence to determine which operation happens first.

|Priority|Operators|Description|
|---|---|---|
|1|`()`|Parentheses|
|2|`**`|Exponentiation|
|3|`+x`, `-x`, `~x`|Unary operators|
|4|`*`, `/`, `//`, `%`|Multiplication, division|
|5|`+`, `-`|Addition, subtraction|
|6|`<<`, `>>`|Bitwise shifts|
|7|`&`|Bitwise AND|
|8|`^`|Bitwise XOR|
|9|`\|`|Bitwise OR|
|10|Comparisons, `in`, `is`|Comparison operators|
|11|`not`|Logical NOT|
|12|`and`|Logical AND|
|13|`or`|Logical OR|

### Examples

```
result = 10 + 5 * 2

print(result)  # 20
```

Multiplication happens before addition.

Using parentheses:

```
result = (10 + 5) * 2

print(result)  # 30
```

**Important:**

- Parentheses can change the evaluation order.
    
- Most operators at the same precedence level are evaluated from left to right.
    
- Exponentiation (`**`) is evaluated from right to left.
    

```
print(2 ** 3 ** 2)  # 512

# Equivalent to:
print(2 ** (3 ** 2))
```

---

## 10. Operator Overloading

Python operators can behave differently depending on the data types of their operands.

This is called **operator overloading**.

```
print(10 + 5)            # 15
print("Hello " + "World") # Hello World
print([1, 2] + [3, 4])    # [1, 2, 3, 4]
```

The `+` operator:

- Adds numbers.
    
- Concatenates strings.
    
- Combines lists.
    

The behavior depends on the objects involved.

---

## 11. Key Points to Remember

- Arithmetic operators perform mathematical operations.
    
- Assignment operators assign or update values.
    
- Comparison operators return `True` or `False`.
    
- Logical operators combine conditions.
    
- `==` compares values, while `is` compares object identity.
    
- `in` and `not in` check membership.
    
- Bitwise operators work on the binary representation of integers.
    
- `//` rounds down, while `/` returns a float.
    
- `%` returns the remainder.
    
- `**` performs exponentiation.
    
- Python follows operator precedence when evaluating expressions.
    
- Parentheses can be used to control evaluation order.
    

---

## 12. Questions for Revision

1. What is the difference between `/` and `//`?
    
2. What does the modulus operator (`%`) return?
    
3. What is the difference between `=` and `==`?
    
4. What is the difference between `and` and `or`?
    
5. What does short-circuit evaluation mean?
    
6. What is the difference between `==` and `is`?
    
7. What does `in` check when used with a dictionary?
    
8. What is the difference between bitwise AND (`&`) and logical AND (`and`)?
    
9. What is the result of `5 & 3`?
    
10. What is the result of `5 << 2`?
    
11. What is operator precedence?
    
12. Which direction does Python evaluate exponentiation?
    
13. What is operator overloading?
    
14. Why should you use `is None` instead of `== None`?