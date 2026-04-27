
![[sql_joins.png|934]]

## Join (Inner join)
You have two tables, and you want to find rows where **something matches** between them — only the matches show up, nothing else.
![[SQLinnerjoinexample.png|627]]
### Syntax of INNER JOIN
The syntax of `INNER JOIN` is:
```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```
The `=` match rows from **column1** in the first table with rows from **Orders** where these two values are equal.

### INNER JOIN With WHERE Clause
Here's an example of the `INNER JOIN` with the `WHERE` clause:
```sql
SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
INNER JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Orders.amount >= 500;
```


### Join multiple tables

**Syntax**:
```sql
SELECT columns 
FROM table1 JOIN table2 ON table1.key = table2.key 
JOIN table3 ON table2.key = table3.key 
JOIN table4 ON table3.key = table4.key; 
-- ... and so on
```
**Example**
```sh
SELECT users.username, orders.amount, payments.card_number
FROM users
JOIN orders   ON users.id      = orders.user_id
JOIN payments ON orders.id     = payments.order_id
WHERE users.role = 'admin';
```

---
## Left join

**Keep ALL rows from the left table, even if no match exists on the right."** Unmatched right side = `NULL`

```sql
-- Syntax
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

```sql
-- Example: Find customers who NEVER placed an order (NULL = no match = interesting target)
SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
LEFT JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Orders.amount IS NULL;
```

---
## Right join

**Keep ALL rows from the right table, even if no match exists on the left."** Unmatched left side = `NULL`
**Syntax**
```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

**Example**
```sql
-- Find orders that have no linked customer (orphan records = data integrity issues)
SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
RIGHT JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Customers.customer_id IS NULL;
```
---
## Full join
**Keep ALL rows from BOTH tables, matched or not.** Missing sides = `NULL`
 **Tip:** `FULL OUTER JOIN` and `FULL JOIN` are the same.
**Syntax**
```sql
SELECT columns 
FROM table1 FULL 
JOIN table2 ON table1.column_name = table2.column_name;
```

**Example**
```sql
--  Full picture — every customer AND every order, matched or not
SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
FULL JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Customers.customer_id IS NULL OR Orders.amount IS NULL;
```
**This will return:**

|customer_id|first_name|amount|
|---|---|---|
|2|Sara|NULL|
|3|Youssef|NULL|
|NULL|NULL|300|
