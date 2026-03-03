## Polymorphisme

>is the ability of make a function or method to behave differently based object or context 

## AbstractMethod

**<span class="color-purple">@abstractmethod</span>** is a **decorator** you use on methods to say:
>“Every child class must implement this method. You **cannot** use this method directly from the parent class.”

**From ABC import abc**
>stands for <span class="color-purple">A</span>bstraction <span class="color-purple">B</span>ase <span class="color-purple">C</span>lass It’s a module in Python used to create **abstract classes**

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass  # This method has no body yet

class Dog(Animal):
    def make_sound(self):
        print("Woof!")

class doberman(Dog)
	def make_sound(self):
		print("rereree")
			
my_dog = Dog()
your_dog = doberman()
my_dog.make_sound()  # Works: prints "Woof!"
your_dog.make_sound
```
##### **<span class="color-yellow">Abstract Base Class</span>**: 
is a parrent class that is not meant to be used directly, its job is to:
- Define what methods must exist.
- but not how they work.
Once the class has at least one abstract method you cannot creat an instance from it 


## Isinstance()

`isinstance(object, class_or_tuple)` **checks if an object is an instance of a class (or a subclass of it)**
```python
x = 10

print(isinstance(x, int))     # True
print(isinstance(x, float))   # False
```


## All 

`all()` = **“Are ALL items True?”**



## Enumerate

“Give me the **index (number)** AND the **value** at the same time.”
```python
data = ["a", "b", "c"]

for index, value in enumerate(data):
    print(index, value)
```
used to avoid the ugly method of 
```python 
data = ["a", "b", "c"]

for i in range(len(data)):
    print(i, data[i])
```



## Defaultdict

`defaultdict` is like a normal dictionary **but** with one superpower:
**If a key doesn’t exist, it creates it automatically with a default value.**
```python
from collections import defaultdict

d = defaultdict(int)

d["a"] += 1   # ✅ works
d["a"] += 1

print(d["a"])  # 2
```



## Protocol 

A **Protocol** is like a **contract or rulebook** for a class, it says:
“If you want to follow this protocol, your class **must have these methods** with these parameters.”
```python
from typing import Protocol, Any

class StageProtocol(Protocol):
    def process(self, data: Any) -> Any:
        ...
```
1. Any class that **wants to be a stage** must have a `process()` method.
2. process() must accept data: Any and return Any.
just the list will never contain a class that not respect the protocol?



## Union data type

A **Union type** means that a variable or function return value **can be more than one type**.
```python
from typing import Union

def process(data) -> Union[str, int]:
    if isinstance(data, int):
        return data * 2
    else:
        return str(data)
```
Here, `process` can return **either a string (`str`) or an integer (`int`)**.



## data stages 

**<span style="color:rgb(255, 192, 0)">input stage fuck</span>** --|> just check if data not empty.

## type annotation not enforce anything.

**<span class="color-yellow">UNderstand what those modules :
from collections import defaultdict
</span>



[[Python]]