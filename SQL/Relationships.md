## Primary key contraint
When we add the primary key constraint to a column, it means that when records are entered, this column must respect those rules (Uniqueness, not null, one per table...)
```sql
CREATE TABLE users (
   user_id INT PRIMARY KEY,
   username VARCHAR(255));
```
