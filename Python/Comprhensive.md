# list/dict comprihensive

this concept is about to use the `map`, `lamda` , or use a loop to create a list or dictionary where is a incomprehesive syntax to be understood by unexpericed people, instead the comprihensive way is simple:

## List
**Syntax**:
```python
[expression for item in iterable]
```
**example:**
```python
numbers = range(5)  # 0, 1, 2, 3, 4
squared_list = [x * x for x in numbers]
print(squared_list)
# Output: [0, 1, 4, 9, 16] 
```

## Dict
**Syntax**:
```python
{key_expression: value_expression for item in iterable}
```
**Example**
```python
numbers = range(5)
squared_dict = {x: x * x for x in numbers}
print(squared_dict)
# Output: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```
## Set

**Syntax**:
```python
{expression for item in iterable}
```
**Example**
```python
numbers = [1, 2, 2, 3, 3, 4]
unique_squared = {x * x for x in numbers}
print(unique_squared)
# Output: {1, 4, 9, 16}
```

 
**2️⃣ Iterate over a list of dicts, skip some elements (like age), get just the name**
```python
people = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 22},
]

names = [person["name"] for person in people]
print(names)
# Output: ['Alice', 'Bob', 'Charlie']
```

3️⃣ Iterate and use an `if` condition (copy numbers divisible by 2)
```python
numbers = range(10)
even_numbers = [x for x in numbers if x % 2 == 0]
print(even_numbers)
# Output: [0, 2, 4, 6, 8]
```

**Dict comprehension with condition**
```python
numbers = range(10)
even_set = {x for x in numbers if x % 2 == 0}
print(even_set)
# Output: {0, 2, 4, 6, 8}
```

## use underscore to skip element
```python
players = [
    ("alice", 2300, 5, "north"),
    ("bob", 1800, 3, "east"),
    ("charlie", 2150, 7, "central"),
    ("diana", 2050, 4, "north"),
]

# We only care about the names, ignore score, achievements, region
unique_players = {name for name, _, _, _ in players}
print("Unique players:", unique_players)
# Output: {'alice', 'bob', 'charlie', 'diana'}

```

**Scenario 3: Get regions of players with more than 2000 score**
```python
high_score_regions = {region for _, score, _, region in players if score > 2000}
print("Regions of high scorers:", high_score_regions)
# Output: {'north', 'central'}
```
- `_` is used to ignore name and achievements
- We use score in the condition
-  region is collected into the set

