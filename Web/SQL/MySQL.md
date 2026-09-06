
## Table of contents:
- [[#1. Installing MySQL|1. Installing MySQL]]
- [[#2. Starting & Accessing MySQL|2. Starting & Accessing MySQL]]
- [[#3. Securing the Installation|3. Securing the Installation]]
- [[#4. Creating a Database|4. Creating a Database]]
- [[#5. Data Types Overview|5. Data Types Overview]]
- [[#6. Creating Your First Table|6. Creating Your First Table]]
- [[#7. Viewing & Describing Tables|7. Viewing & Describing Tables]]
- [[#8. Constraints Reference|8. Constraints Reference]]
- [[#Full Setup Checklist|Full Setup Checklist]]

---

## 1. Installing MySQL

### Ubuntu / Debian Linux

```bash
sudo apt update
sudo apt install mysql-server -y
```


---

## 2. Starting & Accessing MySQL

### Starting the MySQL Service

**Linux:**

```bash
sudo systemctl start mysql
sudo systemctl enable mysql   # Auto-start on boot
```

**Check if MySQL is running:**

```bash
sudo systemctl status mysql
```

---

### Connecting to MySQL

**From the terminal / command prompt:**

```bash
mysql -u root -p
```

You will be prompted to enter your root password. On success, you'll see the MySQL prompt:

```
Welcome to the MySQL monitor. Commands end with ; or \g.
mysql>
```

> **Tip:** Every SQL command inside the MySQL shell must end with a semicolon `;`.

---

## 3. Securing the Installation

After installing MySQL, run the built-in security script to remove defaults and set a strong root password.

```bash
sudo mysql_secure_installation
```

This interactive script will walk you through:

| Prompt                              | Recommended Action                |
| ----------------------------------- | --------------------------------- |
| Set up VALIDATE PASSWORD component? | `Yes` — enforces strong passwords |
| Change root password?               | `Yes` — set a strong password     |
| Remove anonymous users?             | `Yes`                             |
| Disallow root login remotely?       | `Yes` — for local development     |
| Remove test database?               | `Yes`                             |
| Reload privilege tables?            | `Yes`                             |

---

## 4. Creating a Database

Before creating any tables, you need a **database** (also called a schema) to hold them.

### Create a New Database

```sql
CREATE DATABASE my_first_db;
```

With explicit character encoding (recommended for international characters):

```sql
CREATE DATABASE my_first_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### Select the Database to Use

```sql
USE my_first_db;
```

> All subsequent commands will now apply to `my_first_db` until you switch databases or end the session.

### View All Databases

```sql
SHOW DATABASES;
```

---

## 5. Data Types Overview

Before creating a table, you need to know which data type to assign to each column.

### Numeric Types

|Type|Description|Example Values|
|---|---|---|
|`INT`|Whole number (−2B to 2B)|`1`, `500`, `-99`|
|`BIGINT`|Large whole number|`9000000000`|
|`DECIMAL(p, s)`|Exact decimal (p = total digits, s = decimal places)|`DECIMAL(10, 2)` → `12345678.90`|
|`FLOAT`|Approximate decimal (small)|`3.14`|
|`DOUBLE`|Approximate decimal (large)|`3.14159265358979`|
|`TINYINT(1)`|Often used as Boolean (0 = false, 1 = true)|`0`, `1`|

### String Types

|Type|Description|Example|
|---|---|---|
|`VARCHAR(n)`|Variable-length string, up to n characters|`VARCHAR(100)`|
|`CHAR(n)`|Fixed-length string, always n characters|`CHAR(2)` for country codes|
|`TEXT`|Long text (up to 65,535 characters)|Blog posts, descriptions|
|`ENUM('a','b')`|One value from a predefined list|`ENUM('male','female','other')`|

### Date & Time Types

|Type|Format|Example|
|---|---|---|
|`DATE`|`YYYY-MM-DD`|`2024-07-15`|
|`TIME`|`HH:MM:SS`|`09:30:00`|
|`DATETIME`|`YYYY-MM-DD HH:MM:SS`|`2024-07-15 09:30:00`|
|`TIMESTAMP`|Like DATETIME, auto-updates|Useful for `created_at` columns|
|`YEAR`|`YYYY`|`2024`|

---

## 6. Creating Your First Table

Now let's create a real table. We'll build an `employees` table as a practical example.

### Syntax

```sql
CREATE TABLE table_name (
    column_name  DATA_TYPE  [CONSTRAINTS],
    column_name  DATA_TYPE  [CONSTRAINTS],
    ...
);
```

### Your First Table — `employees`

```sql
CREATE TABLE employees (
    employee_id   INT             NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(50)     NOT NULL,
    last_name     VARCHAR(50)     NOT NULL,
    email         VARCHAR(100)    NOT NULL UNIQUE,
    phone_number  VARCHAR(20)     DEFAULT NULL,
    department    VARCHAR(50)     NOT NULL,
    job_title     VARCHAR(100)    NOT NULL,
    salary        DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
    hire_date     DATE            NOT NULL,
    is_active     TINYINT(1)      NOT NULL DEFAULT 1,
    created_at    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (employee_id)
);
```

### What Each Part Means

|Part|Explanation|
|---|---|
|`employee_id INT NOT NULL AUTO_INCREMENT`|A unique integer ID that the database generates automatically for each new row|
|`first_name VARCHAR(50) NOT NULL`|A required text field up to 50 characters|
|`email VARCHAR(100) NOT NULL UNIQUE`|Required email — no two rows can have the same value|
|`phone_number VARCHAR(20) DEFAULT NULL`|Optional field; NULL if not provided|
|`salary DECIMAL(10,2) DEFAULT 0.00`|A precise monetary value; defaults to 0 if not specified|
|`hire_date DATE NOT NULL`|A required date in `YYYY-MM-DD` format|
|`is_active TINYINT(1) DEFAULT 1`|Acts as a boolean; `1` = active, `0` = inactive|
|`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`|Automatically records when the row was inserted|
|`PRIMARY KEY (employee_id)`|Designates `employee_id` as the unique identifier for each row|

### Inserting a Row Into Your New Table

```sql
INSERT INTO employees (first_name, last_name, email, department, job_title, salary, hire_date)
VALUES ('Alice', 'Smith', 'alice.smith@company.com', 'Engineering', 'Software Developer', 75000.00, '2023-03-15');
```

> Note: `employee_id`, `is_active`, and `created_at` are omitted because they have defaults or auto-generate.

---

## 7. Viewing & Describing Tables

### List All Tables in the Current Database

```sql
SHOW TABLES;
```

### View a Table's Structure

```sql
DESCRIBE employees;
-- or shorthand:
DESC employees;
```

**Sample output:**

```
+-------------+---------------+------+-----+-------------------+-------------------+
| Field       | Type          | Null | Key | Default           | Extra             |
+-------------+---------------+------+-----+-------------------+-------------------+
| employee_id | int           | NO   | PRI | NULL              | auto_increment    |
| first_name  | varchar(50)   | NO   |     | NULL              |                   |
| last_name   | varchar(50)   | NO   |     | NULL              |                   |
| email       | varchar(100)  | NO   | UNI | NULL              |                   |
| salary      | decimal(10,2) | NO   |     | 0.00              |                   |
| created_at  | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+---------------+------+-----+-------------------+-------------------+
```

### View the Full CREATE TABLE Statement

```sql
SHOW CREATE TABLE employees;
```

---

## 8. Constraints Reference

Constraints enforce rules on the data in your table.

|Constraint|Description|Example|
|---|---|---|
|`PRIMARY KEY`|Uniquely identifies each row; cannot be NULL|`PRIMARY KEY (employee_id)`|
|`NOT NULL`|The column must always have a value|`first_name VARCHAR(50) NOT NULL`|
|`UNIQUE`|All values in the column must be different|`email VARCHAR(100) UNIQUE`|
|`DEFAULT`|Sets a fallback value if none is provided|`is_active TINYINT(1) DEFAULT 1`|
|`AUTO_INCREMENT`|Automatically generates an incrementing integer|Used with `INT PRIMARY KEY`|
|`FOREIGN KEY`|Links a column to a primary key in another table|See example below|
|`CHECK`|Validates that values meet a condition|`CHECK (salary >= 0)`|

### Foreign Key Example

A foreign key creates a relationship between two tables.

```sql
-- First, a departments table
CREATE TABLE departments (
    department_id   INT          NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (department_id)
);

-- employees table references departments
CREATE TABLE employees (
    employee_id   INT         NOT NULL AUTO_INCREMENT,
    first_name    VARCHAR(50) NOT NULL,
    department_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```


---

## Full Setup Checklist

```
✅ 1. Install MySQL
✅ 2. Start the MySQL service
✅ 3. Log in: mysql -u root -p
✅ 4. Run mysql_secure_installation
✅ 5. CREATE DATABASE my_first_db;
✅ 6. USE my_first_db;
✅ 7. CREATE TABLE employees (...);
✅ 8. DESC employees; — verify your structure
✅ 9. INSERT your first row
✅ 10. SELECT * FROM employees; — confirm it worked!
```

---

_Guide covers MySQL 8.0+. Some syntax may vary slightly on older MySQL versions or other relational databases like MariaDB._