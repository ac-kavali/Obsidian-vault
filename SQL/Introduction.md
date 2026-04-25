Web → Database Exploitation

## to know:
- SELECT
- WHERE
- AND / OR
- UNION
- ORDER BY
- Comments (--)


Structured Query Language
SQL = language used to talk to databases.


Database Management Systems (DBMS) like mySQL, postgreSQL


Browser → HTTP Request → Backend (PHP/Python/Node) → SQL Query → Database

SQL is a standard language for storing, manipulating and retrieving data in databases.
## Why Databases 
We store data in database to used later, and give us the ability to take the right discisions.
It makes the access to data easy and so fast 
it secure data and ofers hight integrity
makes data updating easier and ensure (prevent data inconsistency )


the `*` symbol called _astros_  

A record, also called a row, is each individual entry that exists in a table. For example, there are 91 records in the above Customers table. A record is a horizontal entity in a table.
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
SQL databases store data in **tables (like Excel sheets)** with **strict structure**.
**<span style="color:rgb(112, 48, 160)">Key carracteristics:</span>**
- Fixed structure (schema)
- Data is organized in tables
- Relationships between tables (foreign keys)
- Uses **SQL language** to query data

### NoSQL 2. 
 NoSQL databases are **flexible and not limited to tables**.
**<span style="color:rgb(112, 48, 160)">Key carracteristics:</span>
can store different data formats
- JSON documents
- Key-value pairs
- Graphs
- Wide-column stores
---
