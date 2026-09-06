## Primary key contraint
When we add the primary key constraint to a column, it means that when records are entered, this column must respect those rules (Uniqueness, not null, one per table...)
```sql
CREATE TABLE users (
   user_id INT PRIMARY KEY,
   username VARCHAR(255));
```

---
## The Golden Rule

A **FOREIGN KEY** is always placed on the table that _belongs to_ the other. It points to a **PRIMARY KEY** (or UNIQUE column) in the referenced table.

```sql
FOREIGN KEY (local_column) REFERENCES other_table(primary-key)
```

---
## 1. One-to-One (1:1)

> One row in table A corresponds to **exactly one** row in table B.

**When to use:** Splitting a table for optional, sensitive, or rarely-accessed data (e.g. a user and their profile, a person and their passport).

**Key rule:** The foreign key column must have a `UNIQUE` constraint — this is what enforces the "one" on that side.

```sql
CREATE TABLE users (
    user_id  INT PRIMARY KEY,
    username VARCHAR(50)
);

CREATE TABLE user_profiles (
    profile_id   INT PRIMARY KEY,
    user_id      INT UNIQUE,                          -- UNIQUE enforces 1:1
    profile_data VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)  -- belongs to users
);
```

**Diagram:**

```
users                user_profiles
─────────────        ─────────────────────
user_id (PK) ───1──► user_id (FK, UNIQUE)
username             profile_id (PK)
                     profile_data
```

---
## 2. One-to-Many (1:N)

> One row in table A corresponds to **many** rows in table B.

**When to use:** The most common relationship. A department has many employees. A customer has many orders. A post has many comments.

**Key rule:** The foreign key goes on the "many" side (the child table), with **no** UNIQUE constraint.

```sql
CREATE TABLE users (
	user_id   INT PRIMARY KEY,
	userName VARCHAR(50)
);

CREATE TABLE posts (
    post_id   INT PRIMARY KEY,
    content VARCHAR(50),
    user_id INT,                                              -- no UNIQUE = many employees per dept
    FOREIGN KEY (user_id) REFERENCES departments(user_id)
);
```

**Diagram:**

```
departments               employees
──────────────────        ──────────────────────────
  user_id (PK)     ──1──► user_id (FK)
  post_id        ───N───   user_id (PK)
                          employee_name
```

![[onetomanysql.png|1120]]

---
## 3. Many-to-Many (M:N)

> Many rows in table A correspond to **many** rows in table B.

**When to use:** Students enroll in many courses; courses have many students. Products belong to many orders; orders contain many products.

**Key rule:** You cannot link two tables directly in M:N. You need a **junction table** (also called a bridge or pivot table) that holds both foreign keys. The junction's primary key is the _combination_ of both FK columns.

```sql
CREATE TABLE students (
    student_id   INT PRIMARY KEY,
    student_name VARCHAR(50)
);

CREATE TABLE courses (
    course_id   INT PRIMARY KEY,
    course_name VARCHAR(50)
);

-- Junction table
CREATE TABLE student_courses (
    student_id INT,
    course_id  INT,
    PRIMARY KEY (student_id, course_id),                      -- composite PK prevents duplicates
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);
```

**Diagram:**

```
students               student_courses          courses
────────────           ──────────────────       ────────────
student_id (PK) ──1──► student_id (FK, PK) ◄── course_id (PK)
student_name    ──N──  course_id  (FK, PK) ──N── course_name
```

> **Tip:** You can add extra columns to the junction table to store data about the relationship itself — e.g. `enrolled_at DATE`, `grade DECIMAL(4,2)`.

---

## 4. Self-Referencing Relationship

> A table that references **itself**. One row is the parent of another row in the same table.

**When to use:** Hierarchies — employees and their managers, categories and subcategories, comment threads (replies to replies).

**Key rule:** The foreign key points back to the same table's primary key. The top-level row (e.g. CEO, root category) has `NULL` in the FK column.

```sql
CREATE TABLE employees (
    employee_id   INT PRIMARY KEY,
    employee_name VARCHAR(50),
    manager_id    INT,                                          -- NULL means no manager (top of hierarchy)
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) -- points to itself
);
```

**Diagram:**

```
employees
──────────────────────────────
employee_id (PK) ◄──────────┐
employee_name               │
manager_id (FK) ────────────┘  (same table)
```

**Sample data:**

```
employee_id │ employee_name │ manager_id
────────────┼───────────────┼───────────
1           │ Alice (CEO)   │ NULL
2           │ Bob           │ 1
3           │ Carol         │ 1
4           │ Dave          │ 2
```

---

## Quick Comparison Table

| Relationship | Where is the FK?         | UNIQUE on FK?               | Junction table? |
| ------------ | ------------------------ | --------------------------- | --------------- |
| One-to-One   | Child table              | ✅ Yes                       | ❌ No            |
| One-to-Many  | Child table (many side)  | ❌ No                        | ❌ No            |
| Many-to-Many | Junction table (both FK) | ❌ No (composite PK instead) | ✅ Yes           |
| Self-Ref     | Same table               | ❌ No                        | ❌ No            |

---

## Useful Constraints to Pair with FK

```sql
-- Prevent orphan rows: delete profile when user is deleted
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

-- Block deletion if child rows exist
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT

-- Set FK to NULL when parent is deleted
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL

-- Same options exist for ON UPDATE
FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE
```

---

## Naming Conventions (Best Practices)

|Thing|Convention|Example|
|---|---|---|
|Primary key|`tablename_id`|`user_id`|
|Foreign key|Same name as the PK it references|`user_id`|
|Junction table|Both table names combined|`student_courses`|
|Self-ref FK|Describes the role|`manager_id`, `parent_id`|

