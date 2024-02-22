---
title: Type of SQL commands
titleTemplate: SQL
description: Type of SQL commands
head:
  - - meta
    - name: description
      content: Type of SQL commands
tags:
  - SQL
categories:
  - Notes
---

# Type of SQL Commands <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## DQL

Data Query Language: `SELECT`

- SELECT: Retrieve data from one or more tables

```sql [SELECT Example]
SELECT * FROM customers;
```

## DML

Data Manipulation Language: `UPDATE`, `DELETE`, `INSERT`, `TRUNCATE`

- INSERT: Adds new rows to a table.

```sql [INSERT Example]
INSERT INTO customers (name, email) VALUES ('Simon Si', 'simon.si@example.com')
```

- UPDATE: Modifies existing data in a table

```sql [UPDATE Example]
UPDATE customers SET email = 'owen@gmail.com' WHERE id = 1;
```

- DELETE: Removes rows from a table

```sql [DELETE Example]
DELETE FROM customers WHERE id = 1;
```

- TRUNCATE: Quickly removes all rows from a table, effectively emptying it.

```sql [TRUNCATE Example]
TRUNCATE TABLE customers;
```

::: tip 💡

- Faster than DELETE: TRUNCATE is generally faster than `DELETE` because it doesn't
  log individual row deletions.
- Non-recoverable: Data removed by TRUNCATE cannot be rolled back.
- Resets table attributes: TRUNCATE reset identity columns and auto-increment counters
  to their initial values.

:::

TRUNCATE is often used to efficiently clear large tables or prepare them for new
data. It's essential to use it cautiously as the data removal is irreversible.

## DDL

Data Definition Language: `CREATE`, `ALTER`, `DROP`,

- CREATE: Create database objects like tables, views, indexes, etc.

```sql [CREATE Example]
CREATE TABLE customers (id INT, name VARCHAR(200), email VARCHAR(255));
```

- ALTER: Modifies the structure of existing database objects.

```sql [ALTER Example]
ALTER TABLE customers ADD COLUMN phone_number VARCHAR(18);
```

- DROP: Deletes database objects

```sql [DELETE Example]
DROP TABLE customers;
```

## DCL

Data Control Language: `GRANT`, `REVOKE`

- GRANT: Assigns permissions to users to access or manipulate data.

```sql [GRANT Example]
GRANT SELECT ON customers TO user1;
```

- REVOKE: Revokes previously granted permissions.

```sql [REVOKE Example]
REVOKE UPDATE ON customers FROM user1;
```

## TCL

Transaction Control Language: `COMMIT`, `ROLLBACK`

- COMMIT: Saves changes made during a transaction, making them permanent.
- ROLLBACK: Undoes changes made during a transaction, reverting to the previous state.
