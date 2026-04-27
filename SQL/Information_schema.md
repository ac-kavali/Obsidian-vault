
Think of **`information_schema`** as a _database about your database_ — it stores metadata (data about data). Instead of holding users or orders, it holds info like:
- what tables exist
- what columns they have
- what databases (schemas) exist

---
## informaton.schema.tables
 its a table that list all the tables on your database system.
 **What it contains:**
- Table names
- Which database (schema) they belong to
- Table type (BASE TABLE, VIEW, etc.)
**Example**
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'my_database';
```
