# Keys 

## Class
A class is a blue-print or template for creating objects,It bundles related data (attributes) and functionality (methods) into a single, modular unit, a core concept in object-oriented programming (OOP)
```python
class Man:
	attribute
	attribute
	
	method()
	method() 
```

## Object
Is the fundamental abstraction for data, created as instance of a class, Everything in Python—including numbers, strings, lists, functions, and even classes themselves—is an object.
**Create an object(incetance) from a class**
```python
object = Class()  
```
## Attributes
In Python, an **attribute** is a value associated with an object that can be accessed using dot notation (`object.attribute`).

#### Class Attributes
They are created **when the class is defined**, not when objects are created.
```python
class Dog:
    legs = 4 
```
To use it:
```python
Dog.legs 
```

#### Instance Attributes:
in Python are variables that are **unique to each specific instance (object) of a class.**
```python
class Dog:
    def __init__(self, name, age):
        self.name = name  # instance attribute
        self.age = age    # instance attribute

```
To use them:
```python
bob = Dog("Bob", 3)
print(bob.name)
print(bob.age)

```
---
## **Strings**
### Store a string in a variable  and print it:
example
```python 
message = "Hello, world!"
print(message)
```

```python
text1 = 'Hello'
text2 = "Hello"
print(text1, text2)
```
# Print text + variable 

```python
name1 = "AlA"
name2 = "Sanaa"
age1 = 19
age2 = 21
print (f"{name1} age is {age1}, and {name2} age is {age2}")
```
`f` : the f stands for 'format' , it just telling :
>Looks inside `{name}`
> Replaces it with the value of `name`

---
# **Conditions**

The condition in python use the indentation and not the `{}`:
```python
x = 10
if x > 5:
    print("x is greater than 5")
```
with `else`
```python
x = 3

if x > 5:
    print("Greater than 5")
else:
    print("5 or less")

```
with `elif`
```python
x = 0

if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")

```

--- 
# **Loops**

#### **While loop**
```c
i = 0
while i < 10:
	print (i)
	i+=1
```
### **For loop**
```python
for i in range(5):
    print(i)
```

**Custom range and step**
```python
for i in range(1, 10, 1):  #(start, end, step)
    print (i)
```

**You can loop over a string **
```python
for c in "python":
    print(c)
```

#### *break* & *continue*
```python 
for i in range(10):
    if i == 5:
        break
    print(i)
```

```python 
for i in range(5):
    if i == 2:
        continue   #skip the iterations.
    print(i)
```

---
# **Functions**

## Function Declaration
```python
def my_function():
    print("Hello from function")
```
- just you use the `def` keyword and indent the function block with tab. 

## Function with parameters
```python
def greet(name, day):
    print(f"Hello {name} see you {day}")
    
great("ahmed")
```
- Parameters order is matter.

---
# Method overriding
The method overriding means when you have a parrent class and child class that share the same method name, python will give the priority to the child method like this example : 
```python
class Animal:        #the parrent class
    def eat(self):  
        print("The animal is eating")  
  
class Rabit(Animal):  
  
    def eat(self):  
        print("The rabbit is eating carrot")  
  
rabbit = Rabit()  
  
rabbit.eat()

"""
------------------ output ----------------------
 The rabbit is eating carrot

```

---
# Nested classes

A nested class (or inner class) in Python is a class defined entirely within the body of another class. This structure is primarily used for **logical grouping** and **encapsulation**, making code more organized when one class is exclusively used by another.

you should that most of the `OOP` components exist not for nececity but for structure and code designe
```python 
class Outer:  
  def __init__(self):  
    self.name = "Outer Class"  
  
  class Inner:  
    def __init__(self):  
      self.name = "Inner Class"  
  
    def display(self):  
      print("This is the inner class")  
  
outer = Outer()  
print(outer.name)

obj = Outer.Inner()  #Reachable using the outer 
object.display()
```
---
## hasattr

`hasattr()` is a **built-in Python function** that checks if an object has a specific attribute (variable or method) or not to avoid the error if you try to use it but it not exist
```python
class Dame:
	def annonce_mariage(self):  
	    if hasattr(self, "hasband"):  
	        print("is maried")  
	    else:  
	        print("attribute not exist")

madame_nancy = Dame()
madame_nancy.annonce_mariage()

"""
------------------ output ----------------------
the attribute not exist

```


---
# Python Default Arguments

A **default argument** is a value given to a function or method parameter that is automatically used **if the caller doesn’t provide one**.
**Example 1**:
```python
class Car:
	def __init__(self, speed=100)
	    self.speed = speed      #here the speed will be 100 by default
	    
mercedes = Car()                    #The speed not given
```
**Example 2**:
```python
class Car:
	def __init__(self, speed=100)
	    self.speed = speed      #here the speed will be 100 by default
	def increase_speed(self, amount = 20)
		speed += amount
mercedes = Car()                    #The speed not given
mercedes.increase_speed()           
# the speed will increase by 20 becuase you not specified the amount.
```

___
# List

List is a collection of similar or different types of data

**Creating a list**
- With initialing its values:
```python 
frutes = ["apple", "banana", "orange"]
vegetables = ["carrot", "potatos", "tomato", "taro"]
```

- Just declaring the list without values :
```python
frutes = []
```

## append()
Here you can use the append function that will append any new element to the existing list:
```python
frutes.append("apple")
frutes.append("banana")
```
the `append()` function in Python **can only add one element at a time** to a list. Whatever you pass to it becomes a **single item**, even if it’s another list or a tuple.
### Features of a list 
1. A list can have **duplicate** items.
2. Items in a list are **mutable**
3. List can store items of **various types**
## insert()
`insert()` A built-in method used to add an item at a **specific** position
**Syntax**
```python
list.insert(position, value)
```

## Multi-dimensional List
Its a list that contains at least another list inside, like 
```yaml 
list = [[a, b, c], 1, 2, 3]
```
**to access the list inside list element you should specify the index of the inside list in the parent list then the element index in the inside list:**
```python
list = [[a, b, c], 1, 2, 3]

print(list[1][1]) #--> 'a'
print(list[1][2]) #--> 'b'
```
## Get List Size
To get list len you need the `len` built in function.
```python
print(len(list))
```
___
# Dictionary

A dictionary is a collection of key-value pairs.
**Syntax**
```python
dict_name = {key1: value1, key2: value2, ...}
#or 
dict_name = {key1 = value1, key2 = value2, ...}
```
**Example**
```python
car = {'brand': 'audi', 'model': 'q7'}
```

The dictionary not accept duplicate data, it will get just one version, exactly what came later overide the first one:
```python
car = {'brand': 'Audi', 'model': 'q7', 'model': 'q8'}
```
in this example just the `model : q8` will be the `model` value.

## Modify a key-value
**Syntax** 
```python
dic_name[key] = new_value

car['model'] = 'q8'
```

## Length Of Dictionary
* length can be determined using the `len()` function.
**Syntax**
```python
len(dic_name)
```

## Accessing Dictionary Items 
You can access the value using its key 
```python 
dict_name[key] = value
```

Using `get()` method
```python
dict_name.get(key)
#example
car.get('brand')
```

## Adding or Editing an item in a dictionary
**Syntax** 
```python
dict = {}

dict["name"] = "Kayle"
dict["age"] = 19
...
# editing 
dict["name"] = "new_name"
```
**using a loop**
```python
data = {}
for i in range(3):
   name = input("Enter the name")
   age = int(input("Enter the age"))
   data[name] = age
 
```

---
# Try and Except: 
n Python,[module02]

`try` and `except` are ==statements used for **exception handling**==. They allow you to test a block of code for errors and handle those errors gracefully without the entire program crashing

you know that an error is stoping the program but here in python you can make the code expected and just if it happen you can do a
costom thing .


```python
try:
    check_name(name)
    print("name checked successfully")
except NameError:
    print("name cannot be empty")
```
**you should remember that the line after the function that check if there are an error will not be executed because of raise and will pass directly to the expect if an error detected.**



# Raise:
The raise keyword in Python is used to force a specified exception or error to occur manually.
You can define what kind of error to raise, and the text to print to the user.
`raise` creates an object that inherits from `Exception`
```python
raise WaterError("Not enough water in the tank!")
# The message is stored INSIDE this object
```

|> you can create you error without enheritance from the Exeption but python will not let you to raise it. 

# Costom error:
you just enherite from the `Execption` Class that is a builtin python class for catchin errors and use the raise keyword (is like you put the programe to produce you custom caues to stop
`raise` creates an object that inherits from `Exception` 
if you not enherite from the exeption the raise can't detecte that is an error and create an object of the error.


# Exeption:
is the python Defalut Error class that have a Error type heirarchie already defined. python use the enheritance tree to konws that


# Finally :
## What does `finally` mean?
 **`finally` means: “Do this NO MATTER WHAT.”**
- Error happens?  `finally` runs  
- No error?  `finally` runs 
- Program cries? `finally` still runs  
So it’s perfect for **cleaning up** (turning things off).


what means an error : is somthing went wrong 

and python already knows what is consedered as error but when you want to add yours you have this keyword that make you able to declare that is an error is maked here 

---
# sys.argv
[madule03]

**<span class="color-cyan">What is sys.argv</span>:** is a list exist in a built-in module in python you should import the module named `sys` to be able to use the `sys.argv` list.

<span class="color-cyan">What is contain</span>:
**command-line arguments** passed to a Python program when you run it.

# Tuple()
its an ordred immutable list of items
and the Tuple function is a built-in function that is used to create a new tuple data structure.
# Set() 

**set in python is a collection of unique elements. unordered and hashed**
```python
a = set([1, 2, 3, 3, 4])
print(a)
```
output:
```text
{1, 2, 3, 4}
```


# Union()

**Union = all elements from both sets, without duplicates**
```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a.union(b))
```
output:
```text
{1, 2, 3, 4, 5}
```


# intersection()

**intersection = element that exist in BOTH sets (only common ones)**
```python
a = {1, 2, 3}
b = {3, 4, 5}
print (a.intersection(b))
```
output:
```text
{3}
```


# difference 

Difference = elements in A that are NOT in B
```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a.difference(b))
```
output
```text
{1, 2}
```

get the rare ones that not commun at any players
```python
shared_any = (
    alice.intersection(bob)
    .union(alice.intersection(charlie))
    .union(bob.intersection(charlie))
)
```

here you get what is onwned by alice and bob and `.union` (rassemble) with what is owned with alice and charlie and `.union` with what is owned by bob and charlie

---

<span class="color-yellow">ITEM NAME (type, rarity): QUANTITY x @ PRICE EACH = TOTAL PRICE</span>
- **`x` → how many items**    
- **`@` → price per single item**

# Dict()

create a dictionary 
```python
d = dict()
print(d)
```
output:
```text
{}
```

# Len()

Return how many keys are inside the dictionary 
```python
student = {"name": "Ahmed", "age": 19, "level": "beginner"}
print(len(student))
```
output:
```text
3
```
it count keys not values




# keys()

Returns **all the keys** of the dictionary.
```python
student = {"name": "Ahmed", "age": 19}
print(student.keys())
```
output:
```css
dict_keys(['name', 'age'])
```


# Values()
Returns **all the values**.
```python
print(student.values())
```
output:
```css
dict_values(['Ahmed', 19])
```



# Item()
return **key+value together** as pairs
```python
print(student.items())
```
output
```css
dict_items([('name', 'Ahmed'), ('age', 19)])
```
**very useful in a loop :
```python
for key, value in student.items():
    print(key, value)
```

# Unpacking
In `unpacking_demonstration(latest_coords)`, the tuple is unpacked again to print each coordinate separately:


# get()

Gets a value **safely**
```python
print(student.get("name"))
```
output:
```css
Ahmed
```
**if the key those not exist:**
```python
print(student.get("city"))
```
output: 
```css 
None
```
the direct access is not safe it can crash if the item not exist!!!

**how i use it in this project : 
```python
for name, data in alice.items():  
    qty = data.get("quantity")  
    price = data.get("price")  
    type_ = data.get("type")  
    rarity = data.get("rarity")  
  
    total = qty * price  
    total_value += total  
    item_count += qty  
    categories.update({type_: categories.get(type_, 0) + qty})
```
`categories.update` : this will create the key, value if not exist or update it if already exist.
we have to arguments in this update function. The **type** like cunssumable, wepon,... and the number of this type in the inventory
to get the number you should each loop get the value of the type 

# update()

Adds or updates keys in a dictionary.
**Add new key:**
```python
student.update({"city": "Rabat"})
print(student)
```
**update existant key**
```python
student.update({"age": 20})
print(student)
```
output:
```css
{'name': 'Ahmed', 'age': 20, 'city': 'Rabat'}
```

---

# Yield 

what the first function do ?:

how generators works: Generators are functions that can pause and resume their execution, it return a generator object, 
**generator objecrt:** is a wrapped in the function like a part of it
and store information about function last state:

**yeild** not end the funtion it just generate the object that contain the function frame informations and return it

**next**: advances the generator's execution to the next `yield` statement, when you use a for loop to get data from the generator it been used behind the scenes If the generator runs out of values, it raises a `StopIteration`


```python
for i in range(total_events):
        player = players[i % 3]
        level = (i % 20) + 1
        action = actions[i % 3]
```

```python
for _ in range(n):
```
just iterate without changing any variable 
because here we don't have any i to change


**How for work with iter()**

---
