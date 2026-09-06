A **constraint** = a rule applied to a table column that the database enforces automatically.

> “You are NOT allowed to break this rule, even if you try in SQL.”

---
# 2.  Types of constraints (core set)

You MUST master these 6:

|Constraint|Purpose|
|---|---|
|NOT NULL|value cannot be empty|
|UNIQUE|no duplicates|
|PRIMARY KEY|unique + not null identifier|
|FOREIGN KEY|links tables|
|CHECK|custom rule (condition)|
|DEFAULT|automatic value if none provided|

---
# 3. NOT NULL constraint

##  Meaning

A column MUST always have a value.
##  Example

```sql
CREATE TABLE users (  
    id INT,  
    name VARCHAR(50) NOT NULL  
);
```

---
# 4.  UNIQUE constraint

## Meaning

No duplicate values allowed.
## Example
```sql 
CREATE TABLE users (  
    id INT,  
    email VARCHAR(100) UNIQUE  
);
```

---
# 5.  PRIMARY KEY (VERY IMPORTANT)

## Meaning
Combination of:
- UNIQUE + NOT NULL
- identifies each row
## Example
```sql
CREATE TABLE users (  
    id INT PRIMARY KEY,  
    name VARCHAR(50)  
);
```
## Rules

- only ONE primary key per table
- can be single or composite

---
## Composite primary key example

```
CREATE TABLE enrollments (  
    student_id INT,  
    course_id INT,  
    PRIMARY KEY (student_id, course_id)  
);
```

>means: a student can enroll in a course only once

---
# 6. FOREIGN KEY (RELATIONS CORE)

## Meaning
Links one table to another.
## Example
```sql
CREATE TABLE orders (  
    id INT PRIMARY KEY,  
    user_id INT,  
    FOREIGN KEY (user_id) REFERENCES users(id)  
);
```

---
## What it enforces

- you cannot create an order for a non-existent user
- protects data integrity

---
## Bonus options (important)

FOREIGN KEY (user_id)  
REFERENCES users(id)  
ON DELETE CASCADE

### What it does:

|Action|Effect|
|---|---|
|CASCADE|delete child rows automatically|
|SET NULL|set value to NULL|
|RESTRICT|block deletion|

---
# 7. CHECK constraint (logic rules)

##  Meaning

You define a condition that must be true.
## Example

```sql
CREATE TABLE products (  
    id INT,  
    price INT CHECK (price > 0)  
);
```

## More examples
```sql
age INT CHECK (age >= 18)  
salary INT CHECK (salary BETWEEN 1000 AND 10000)
```

---
# Like 

### Basic Syntax
```sql
SELECT column_name  
FROM table_name  
WHERE column_name LIKE pattern;
```

### Wildcards (this is the important part)
- `%` → Wildcard, means **any number of characters (including 0)**
- `_` → means **exactly one character** add more of "\_" for more caracters 
### Examples 
```sql
SELECT * FROM users
WHERE username LIKE 'ahm%';
```
This match `ahmed`, `ahmxx`, `ahmdxxx...`
```sql
SELECT * FROM users
WHERE username LIKE 'kaval_'
```
This match `kavali`, `kavalx`, exactly one carracter 

---
# 8. ⚙️ DEFAULT constraint

## Meaning

Automatically assigns a value if none is provided.

## Example
```sql
CREATE TABLE users (  
    id INT,  
    status VARCHAR(20) DEFAULT 'active'  
);
```

---
## Behavior

INSERT INTO users (id) VALUES (1);

👉 status becomes `'active'`

---
### 9. Combining constraints (REAL WORLD)

```sql
CREATE TABLE users (  
    id INT PRIMARY KEY,  
    email VARCHAR(100) UNIQUE NOT NULL,  
    age INT CHECK (age >= 18),  
    status VARCHAR(20) DEFAULT 'active'  
);
```

> This is already a **real production-style table**

---
