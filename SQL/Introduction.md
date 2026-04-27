<span style="color:rgb(0, 176, 80)">Structured Query Language</span>



<span style="color:rgb(0, 176, 240)">SQL </span>= language used to talk to databases.
<span style="color:rgb(255, 0, 0)">Database Management Systems (DBMS)</span> like mySQL, postgreSQL

```
Browser → HTTP Request → Backend (PHP/Python/Node) → SQL Query → Database
```

SQL is a standard language for storing, manipulating and retrieving data in databases.

---
## Why Databases 
We store data in database to used later, and give us the ability to take the right discisions.
It makes the access to data easy and so fast 
it secure data and ofers hight integrity
makes data updating easier and ensure (prevent data inconsistency )

### **What is a record**
A record, also called a row, is each individual entry that exists in a table. For example, there are 91 records in the above Customers table. A record is a horizontal entity in a table.

---
## Most important keys 
- `SELECT` - extracts data from a database
- `UPDATE` - updates data in a database
- `DELETE` - deletes data from a database
- `INSERT INTO` - inserts new data into a database
- `CREATE DATABASE` - creates a new database
- `ALTER DATABASE` - modifies a database
- `CREATE TABLE` - creates a new table
- `ALTER TABLE` - modifies a table
- `DROP TABLE` - deletes a table
- `CREATE INDEX` - creates an index (search key)
- `DROP INDEX` - deletes an index

---
## Comments
### 1. Single-line comment
```sql 
select * from my_table; --this is a command
```

### 2.Multi-lines comment
```sql
/*this 
is 
multi-line 
comment*/

select * from my_table;
```

---
## SQL vs NoSQL

### 1. SQL 
SQL databases store data in **tables (like Excel sheets)** with **strict structure**.(Ex: Exelsheet)
**<span style="color:rgb(200, 148, 100)">Key carracteristics:</span>**
- Fixed structure (Schema)
- Data is organized in tables
- Relationships between tables (foreign keys)
- Uses **SQL language** to query data

### NoSQL 2. 
 NoSQL databases are **flexible and not limited to tables**. (Ex:Graph)
**<span style="color:rgb(200, 148, 110)">Key carracteristics:</span>
can store different data formats
- JSON documents
- Key-value pairs
- Graphs
- Wide-column stores

### Relational databases
Relational databases organize data into tables, these tables are linked together based on relationships between the data

---
### **What is a Shema**
A **schema in SQL** is the **blueprint or structure of a database**.
It defines how the database is built, including:
- tables
- columns
- data types
- relationships between tables
- constraints (like PRIMARY KEY, FOREIGN KEY, UNIQUE)

---
![[rdbms.png]]