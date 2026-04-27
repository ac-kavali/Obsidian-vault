
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

### INNER JOIN With WHERE Clause
Here's an example of the `INNER JOIN` with the `WHERE` clause:
```sql
SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
INNER JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Orders.amount >= 500;
```
