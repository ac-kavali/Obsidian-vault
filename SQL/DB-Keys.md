Keys are fundamental elements of the relational database model that ensure uniqueness, data integrity, and efficient data access.

## Importance of Keys in DBMS

- **Uniqueness:** Keys ensure that each record in a table is unique and can be identified distinctly.
- **Data Integrity:** Keys prevent data duplication and maintain the consistency of the data.
- **Efficient Data Retrieval:** Keys help in creating relationships between tables, allowing faster queries and better data organization.
- Without keys, managing large databases would become difficult, and data retrieval would be slow and error-prone.
---
## Super key
The set of one or a combination of columns that identify a record (row), and should make each record unique.

---
## Candidate key
The minimal set of columns combination to make uniquness.

---
## Primary key
All candidate keys are candidate to be the primary key, under those rules:
- Must be uniqu.
- Cannot be NULL.
- Only one primary key per table.
- Should be simple and stable.
- Non sensitive.

---
## Composit Primary key
Is a primary key that is made up of two or more collumns to uniqully identify a record(row), used instead of normal primary key just because we failed to get uniquness using one collumn (primary key).

---
## Surrogate key
Is a system-generated key used to uniqully identify a record in a table 

---
## Foreing key 
Is a primary key but *for another* table to be link a record by another one on or multiple ones in another table.

---
