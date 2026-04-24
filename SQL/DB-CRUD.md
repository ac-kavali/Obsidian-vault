## Table Of Contents
- [[#1 INSERT INTO|1 INSERT INTO]]
- [[#Select Statement|Select Statement]]
- [[#Select Distinct|Select Distinct]]
- [[#COUNT|COUNT]]
- [[#WHERE|WHERE]]
- [[#2. WHERE Clause & Operators|2. WHERE Clause & Operators]]
- [[#3. IS NULL and IS NOT NULL|3. IS NULL and IS NOT NULL]]
- [[#4. UPDATE Statement|4. UPDATE Statement]]
- [[#5. DELETE Statement|5. DELETE Statement]]
- [[#Quick Reference Summary|Quick Reference Summary]]


---
## Create Table 

**Data Types**
Before know how to create a table you should know the datatypes in SQL:
A _data type defines what kind of value a column can store_
like rules:
> “This column can only store numbers”  
> “This one stores text”  
> “This one stores dates”

### Top used data-types
- `INT`: Data type for numeric data (positive / negative) stored in 4 bytes.

- `VARCHAR`(<span style="color:rgb(255, 255, 0)">n</span>): Variable-length string up to `n` characters. Only stores as many bytes as the actual value — efficient for names, emails, URLs.

- `TEXT`: Unlimited (or very large) string. Use for long-form content like blog posts, comments, or JSON blobs. Cannot be indexed in full in most databases.

- `DECIMAL`: Exact fixed-point number. `p` = total digits, `s` = digits after the decimal. No rounding errors — essential for money.

- `DATE` / `DATETIME` Calendar date only — year, month, day. No time component. Format: `YYYY-MM-DD`.

- `BOOLEAN` : a data that can be true or false example:
	`INSERT INTO users (is_active, is_verified) VALUES (TRUE, FALSE);`

## Creation syntax:

```sql
CREATE TABLE table_name (  
  column_name  datatype [constraint],  
  column_name  datatype [constraint],  
  …  
); -- semicolon ends the statement
```


## Alter
A combination of statements modify a table after it has been created.
### 1. ADD
**`ADD` is used with `ALTER` to add a new column to an existing table**.
```sql
ALTER TABLE table_name
ADD column_name data_type;
```
**Example**:
```sql
 ALTER TABLE users
ADD (
    city VARCHAR(50),
    phone VARCHAR(20)
);
```

### 2. Modify
`MODIFY` is used to **change data type or contraint, of an existing column** (not create a new one).
```sql
ALTER TABLE table_name  
MODIFY column_name new_data_type;
```
**Example:**
```sql 
ALTER TABLE users
MODIFY age INT NOT NULL;  -- From BIGINT  
```
`MODIFY` does NOT change the column name.

### 3. Drop
`DROP` used to remove a somthing completly from the table
```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```
`DROP COLUMN`remove a column.


**Remove entire table**
```sql
DROP TABLE table_name;
```
you should add `IF EXIST` for more safely deletion.
```sql
DROP TABLE IF EXISTS table_name;
```

---
## Rename table
```sql
RENAME TABLE old_table_name TO new_table_name;
```

---
## 1 INSERT INTO 

The `INSERT INTO` statement is used to add new rows of data into a table.
### Syntax

**Insert with specified columns (recommended):**

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

**Insert into all columns (column order must match table definition):**

```sql
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

### Examples

**Insert a single row:**
```sql
INSERT INTO employees (first_name, last_name, department, salary)
VALUES ('Alice', 'Smith', 'Engineering', 75000);
```

**Insert multiple rows at once:**
```sql
INSERT INTO employees (first_name, last_name, department, salary)
VALUES 
    ('Bob', 'Jones', 'Marketing', 62000),
    ('Carol', 'White', 'Engineering', 80000),
    ('David', 'Brown', 'HR', 55000);
```

**Insert data from another table (INSERT INTO ... SELECT):**
```sql
INSERT INTO archived_employees (first_name, last_name, department)
SELECT first_name, last_name, department
FROM employees
WHERE hire_date < '2020-01-01';
```

### Notes

- If a column has a `NOT NULL` constraint and no default value, you **must** provide a value for it.
- `AUTO_INCREMENT` (MySQL) or `SERIAL` (PostgreSQL) columns can be omitted — the database generates the value automatically.
- String values must be enclosed in **single quotes** `'...'`.
- Date values are typically formatted as `'YYYY-MM-DD'`.

---
## Select Statement

The `SELECT` statement is used to select data from a database.
```sql
SELECT _column1_, _column2, ..._   FROM _table_name_;
```
Return all the data no uniquness filtering:
`Ahmed  
`Sara` 
`Ahmed`

---
## Select Distinct
The `SELECT DESTINCT` 
```sql 
SELECT DISTINCT _column1_ FROM _TABLE_NAME_
```
Return Uniqu Representation of data
`Sara` 
`Ahmed`

---
## COUNT 
used to count the number of the aparence of a data in a table culumn 
```sql
SELECT COUNT(Country) FROM Customers;
```
Display the number of data in the Country column.

**COUNT with DISTINCT**
```sql
SELECT COUNT(DISTINCT Country) FROM CUSTOMERS;
```
 Count a data apearence in a column just one time (unique counting).

---
## WHERE
Where is not a standalone statement, always used with another statment like select, delete, update.
Its used with a condition to add more filters:
```sql 
SELECT * FROM users WHERE age > 18;
```
Example
```sql
SELECT * FROM Customers
WHERE country = 'Mexico' and PostalCode=05033;
```

Display:

| CustomerID | CustomerName              | ContactName          | Address                  | City        | PostalCode | Country |
| :--------- | :------------------------ | :------------------- | :----------------------- | :---------- | :--------- | :------ |
| 58         | Pericles Comidas clásicas | Guillermo Fernández  | Calle Dr. Jorge Cash 321 | México D.F. | 05033      | Mexico  |
| 80         | Tortuga Restaurante       | Miguel Angel Paolino | Avda. Azteca 123         | México D.F. | 05033      | Mexico  |


---
## 2. WHERE Clause & Operators

The `WHERE` clause filters records based on a condition. It is used with `SELECT`, `UPDATE`, and `DELETE` statements.

### Basic Syntax

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

### 2.1 Comparison Operators

|Operator|Meaning|Example|
|---|---|---|
|`=`|Equal to|`salary = 50000`|
|`<>` or `!=`|Not equal to|`department <> 'HR'`|
|`>`|Greater than|`salary > 60000`|
|`<`|Less than|`age < 30`|
|`>=`|Greater than or equal|`salary >= 75000`|
|`<=`|Less than or equal|`age <= 65`|

```sql
-- Employees earning more than 70,000
SELECT * FROM employees WHERE salary > 70000;

-- Employees not in the HR department
SELECT * FROM employees WHERE department <> 'HR';
```

---

### 2.2 Logical Operators

#### AND

All conditions must be true.

```sql
SELECT * FROM employees
WHERE department = 'Engineering' AND salary > 70000;
```

#### OR

At least one condition must be true.

```sql
SELECT * FROM employees
WHERE department = 'Engineering' OR department = 'Marketing';
```

#### NOT

Negates the condition.

```sql
SELECT * FROM employees
WHERE NOT department = 'HR';
```

#### Combining AND, OR, NOT

Use parentheses to control evaluation order.

```sql
SELECT * FROM employees
WHERE (department = 'Engineering' OR department = 'Marketing')
  AND salary > 60000;
```

---

### 2.3 BETWEEN Operator

Selects values within an inclusive range.

```sql
-- Syntax
WHERE column BETWEEN value1 AND value2;

-- Example: Employees with salary between 50,000 and 80,000
SELECT * FROM employees
WHERE salary BETWEEN 50000 AND 80000;

-- Works with dates too
SELECT * FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

> **Note:** `BETWEEN` is **inclusive** — both boundary values are included in the result.

---

### 2.4 IN Operator

Matches any value in a specified list. A shorthand for multiple `OR` conditions.

```sql
-- Syntax
WHERE column IN (value1, value2, value3, ...);

-- Example: Employees in specific departments
SELECT * FROM employees
WHERE department IN ('Engineering', 'Marketing', 'Finance');

-- NOT IN: Excludes the listed values
SELECT * FROM employees
WHERE department NOT IN ('HR', 'Legal');
```

---

### 2.5 LIKE Operator

Used for pattern matching with strings. Works with two wildcards:

|Wildcard|Meaning|
|---|---|
|`%`|Zero or more characters|
|`_`|Exactly one character|

```sql
-- Names starting with 'A'
SELECT * FROM employees WHERE first_name LIKE 'A%';

-- Names ending with 'son'
SELECT * FROM employees WHERE last_name LIKE '%son';

-- Names containing 'an' anywhere
SELECT * FROM employees WHERE first_name LIKE '%an%';

-- Names with exactly 5 characters
SELECT * FROM employees WHERE first_name LIKE '_____';

-- NOT LIKE: Excludes the pattern
SELECT * FROM employees WHERE last_name NOT LIKE 'S%';
```

> **Note:** `LIKE` is case-insensitive in MySQL but case-sensitive in PostgreSQL by default. Use `ILIKE` in PostgreSQL for case-insensitive matching.

---

## 3. IS NULL and IS NOT NULL

`NULL` represents the **absence of a value** — it is not zero, not an empty string, and cannot be compared with `=` or `<>`. You must use the special `IS NULL` and `IS NOT NULL` operators.

### IS NULL

Returns rows where the column has no value (is NULL).

```sql
-- Syntax
WHERE column IS NULL;

-- Example: Employees with no assigned manager
SELECT * FROM employees WHERE manager_id IS NULL;

-- Example: Orders with no shipping date yet
SELECT * FROM orders WHERE shipped_date IS NULL;
```

### IS NOT NULL

Returns rows where the column has a value (is not NULL).

```sql
-- Syntax
WHERE column IS NOT NULL;

-- Example: Employees who have a phone number on file
SELECT * FROM employees WHERE phone_number IS NOT NULL;

-- Example: Products with a listed price
SELECT * FROM products WHERE price IS NOT NULL;
```

### Combining with Other Conditions

```sql
-- Unshipped orders placed in 2024
SELECT order_id, customer_id, order_date
FROM orders
WHERE shipped_date IS NULL
  AND order_date >= '2024-01-01';
```

### ⚠️ Common Mistake

```sql
-- WRONG: This will never return results
SELECT * FROM employees WHERE manager_id = NULL;

-- CORRECT: Always use IS NULL
SELECT * FROM employees WHERE manager_id IS NULL;
```

---
## 4. UPDATE Statement

The `UPDATE` statement modifies existing records in a table. **Always use a `WHERE` clause** unless you intentionally want to update every row.

### Syntax

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### Examples

**Update a single column:**

```sql
UPDATE employees
SET salary = 80000
WHERE employee_id = 101;
```

**Update multiple columns at once:**

```sql
UPDATE employees
SET salary = 85000, department = 'Senior Engineering'
WHERE employee_id = 101;
```

**Update using a calculated value:**

```sql
-- Give all Marketing employees a 10% raise
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Marketing';
```

**Update with a subquery:**

```sql
-- Set salary to the department average
UPDATE employees
SET salary = (
    SELECT AVG(salary)
    FROM employees
    WHERE department = 'Engineering'
)
WHERE department = 'Engineering' AND salary < 60000;
```

**Update with IN:**

```sql
UPDATE products
SET stock_status = 'Discontinued'
WHERE product_id IN (101, 105, 110);
```

### ⚠️ Warning: UPDATE Without WHERE

```sql
-- DANGER: This updates EVERY row in the table!
UPDATE employees SET salary = 0;
```

Always double-check your `WHERE` condition before running an `UPDATE`. Consider running a `SELECT` with the same `WHERE` clause first to preview which rows will be affected.

---

## 5. DELETE Statement

The `DELETE` statement removes rows from a table. Like `UPDATE`, **always use a `WHERE` clause** unless you want to delete all rows.

### Syntax

```sql
DELETE FROM table_name
WHERE condition;
```

### Examples

**Delete a specific row:**

```sql
DELETE FROM employees
WHERE employee_id = 205;
```

**Delete rows matching a condition:**

```sql
-- Remove all inactive accounts
DELETE FROM accounts
WHERE status = 'inactive';
```

**Delete with IN:**

```sql
DELETE FROM orders
WHERE order_id IN (1001, 1002, 1003);
```

**Delete with a subquery:**

```sql
-- Delete employees from departments that are being closed
DELETE FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments WHERE status = 'closed'
);
```

**Delete NULL records:**

```sql
-- Remove rows where email is missing
DELETE FROM customers
WHERE email IS NULL;
```

### Deleting All Rows

```sql
-- DELETE (logged, slower, can be rolled back)
DELETE FROM employees;

-- TRUNCATE (faster, minimal logging, resets auto-increment)
TRUNCATE TABLE employees;
```

> **Tip:** `TRUNCATE` is faster for clearing an entire table, but it cannot be used with a `WHERE` clause.

### ⚠️ Warning: DELETE Without WHERE

```sql
-- DANGER: This deletes EVERY row in the table!
DELETE FROM employees;
```

As with `UPDATE`, always run a `SELECT` with the same `WHERE` condition first to verify what will be deleted.

---

## Quick Reference Summary

|Statement|Purpose|Key Reminder|
|---|---|---|
|`INSERT INTO`|Add new rows|Match column count and data types|
|`WHERE`|Filter rows|Combine with `AND`, `OR`, `NOT`|
|`BETWEEN`|Range filter|Inclusive on both ends|
|`IN`|Match list of values|Use `NOT IN` to exclude|
|`LIKE`|Pattern match strings|`%` = many chars, `_` = one char|
|`IS NULL`|Check for missing value|Never use `= NULL`|
|`IS NOT NULL`|Check for existing value|Never use `<> NULL`|
|`UPDATE`|Modify existing rows|Always use `WHERE`|
|`DELETE`|Remove rows|Always use `WHERE`|

---

_Reference covers standard SQL (ANSI SQL). Minor syntax differences may apply depending on your database system (MySQL, PostgreSQL, SQL Server, SQLite, etc.)._
