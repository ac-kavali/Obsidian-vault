# Functionnal Programing 




# Lambda 
is a keyword that create a function without name, written in one single expression, usually used for short, simple logic
```python
# Normal Case
def add(x, y):
	return x + y
```
With Lambda:
```python
add = lambda a, b: a + b
```
**Syntax**:
```python
func_name = lambda arg1, arg2: arg1 + arg2
```

---
# Map

takes a function and a collection, apllies the function to each element, and gives you the results, **It return an iterator**,like:
\- "do this to every item"
**Basic Syntax**
```python
map(function, iterable)
```
**Example**
```python
numbers = [1, 2, 3, 4]

result = map(lambda x: x*2, numbers)
```
Output:
```yaml
[2, 4, 6, 8]
```

---
# Filter

Its a keyword that filter just the element that pass the lambda 
expression test:
**Basic Syntax**
```python
filter(function, iterable)
```
- The function should return true or false.
**Simple Example**
```python
numbers = [1, 2, 3, 4, 5, 6]

evens = filter(lambda x: x%2 == 0, numbers)
print(list(evens))
```
Output:
```text
[2, 4, 6]
```

---
# Sorted

Takes an iterable, returns a new list with elements ordered.
**Basic Syntax:**
```python
sort(iterable)
```
Example: 
```python
numbers = [3, 1, 4, 2]
print(sorted(numbers))
```
Output:
```python
[1, 2, 3, 4]
```

---
# Reduce
It **stores the result** of the function call (called the accumulator)  
then, it **reuses that result** as input for the next step with the next value.
 
