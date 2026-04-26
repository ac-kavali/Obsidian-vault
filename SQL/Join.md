
## Join (Inner join)
![[sql_joins.png|934]]![[SQL-innerjoinexample.png|775]]
### Syntax of INNER JOIN
The syntax of `INNER JOIN` is:
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;

---

## INNER JOIN With WHERE Clause

Here's an example of the `INNER JOIN` with the [WHERE clause](https://www.programiz.com/sql/select#sql-where):

SELECT Customers.customer_id, Customers.first_name, Orders.amount
FROM Customers
INNER JOIN Orders
ON Customers.customer_id = Orders.customer
WHERE Orders.amount >= 500;