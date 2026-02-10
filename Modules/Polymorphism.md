## What polymorphism is in Python

**Polymorphism** means “many forms” — the same **interface** (like a method name) can behave differently depending on the object **type** that uses it.

There are **two main kinds** in Python:
1. **Subclass overriding (inheritance polymorphism)**
    - A child class overrides a method from its parent.
    - Example:
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        print("Woof!")

class Cat(Animal):
    def speak(self):
        print("Meow!")

animals = [Dog(), Cat()]
for a in animals:
    a.speak()  # same method name, different behavior

```

**Duck typing / Protocol (structural polymorphism)**

- Any class that **implements the required methods** can be used interchangeably, regardless of inheritance.
    
- Example:
```python
from typing import Protocol

class Speakable(Protocol):
    def speak(self):
        ...

class Parrot:
    def speak(self):
        print("Squawk!")

def let_speak(entity: Speakable):
    entity.speak()

let_speak(Parrot())  # works even without inheritance

```

## How your example fits

### Your setup:

- `ProcessingPipeline` (ABC) → parent class with `process()` method
- `CSVProcessing`, `JSONProcessing`, `STREAMProcessing` → subclasses overriding `process()`
- `Stages` (`InputStage`, `Transform`, `OutputStage`) → implement `StageProtocol` with `process()`
- `run_stages()` → in parent, runs stages for all pipelines
    

### Why it’s polymorphism:

1. **Method overriding (subclass polymorphism)**
    
    - Each subclass (`CSVProcessing`, `JSONProcessing`) **overrides** `process()` → same method name, different behavior.
2. **Protocol / duck typing for stages (interface polymorphism)**
    - `InputStage`, `Transform`, `OutputStage` all have **process()**, so `run_stages()` can call `.process(data)` on any stage without caring about the type.
3. **Dynamic behavior based on data type**
    - When `process([data])` is called, the same code path (`run_stages`) behaves differently depending on:
        - which pipeline is used
        - which stage it is
        - the content/type of `data`

All of these are **polymorphic behavior**: **same method names, different results depending on object type**.

```css
ProcessingPipeline (ABC)
 ├─ CSVProcessing.process(data)
 ├─ JSONProcessing.process(data)
 └─ STREAMProcessing.process(data)
      |
      └─ run_stages() → calls stages
           ├─ InputStage.process(data)
           ├─ TransformStage.process(data)
           └─ OutputStage.process(data)
```
- `process()` behaves differently depending on the **pipeline subclass** → polymorphism
- Stages are interchangeable because they **follow the StageProtocol** → polymorphism via interface
💡 **TL;DR:**
Yes. Your design **is polymorphic on two levels**:
1. **Subclass overriding** (`CSVProcessing`, `JSONProcessing`, `STREAMProcessing`)
2. **Protocol / duck typing** (`Stages` implementing `process()`)

# Duck_typing
- **You don’t care what the object’s class is.**
- You only care **if it has the methods/attributes you need**.
- As long as it behaves correctly, Python will let it work.

##  Where duck typing is used

The key point is **any code that calls a method without caring about the object’s concrete type**.

Look at `run_stages()`:

`def run_stages(self, data):     for stage in self.stages:         data = stage.process(data)     return data`

### What’s happening here:

1. `stage` could be `InputStage`, `Transform`, or `OutputStage`.
    
2. `run_stages()` **doesn’t care which one it is** — it just calls `stage.process(data)`.
    
3. Python checks **at runtime** if `stage` has a `process()` method.
    

✅ This is **duck typing**:

Anywhere in your pipeline project where you **call `process()` on an object without checking its class**, that’s duck typing.  
`run_stages()` + all stages = perfect example.


---





```python
@dataclass(frozen=True)  
class Config:  
    """Parsed configuration values."""  
  
    width: int  
    height: int    entry: Tuple[int, int]  
    exit: Tuple[int, int]  
    output_file: str    perfect: bool    seed: Optional[int] = None
	
```


 