---
title: DQL (Data Query Language)
titleTemplate: SQL
description: DQL (Data Query Language)
head:
  - - meta
    - name: description
      content: DQL (Data Query Language)
tags:
  - SQL
categories:
  - Notes
---

# DQL (Data Query Language) <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

`DQL` (Data Query Language) is the SQl dialect specifically used for retrieving
and manipulating data from database. Think of it as your tool for asking questions
and exploring the information stored within. Unlike DML (Data Manipulation Language)
which adds, updates, or deletes data, DQL focuses on finding and presenting existing
information.

Statement template:

```sql
SELECT col1, col2...
FROM table_name
WHERE condition1, condition2...
GROUP BY col1, col2...
HAVING condition1, condition2...
ORDER BY col1, col2...
```

An example:

```sql
  SELECT customer_id, COUNT(order_id) AS total_orders,
         SUM(order_amount) AS total_spent
    FROM customers
    JOIN orders
      ON customers.id = orders.customer_id
   WHERE order_date >= '2024-01-01'
GROUP BY customer_id
  HAVING total_spent >= 1000
ORDER BY total_spent DESC
   LIMIT 10;
```

::: details Click to view examples

```sql
select * from person p order by p.date_of_birth ASC limit 10;
select * from person p order by p.date_of_birth DESC limit 10;

-- pagination
SELECT * FROM person OFFSET 10 LIMIT 10;
SELECT * FROM person OFFSET 5 FETCH FIRST 5 ROW ONLY;
SELECT * FROM person OFFSET 5 FETCH FIRST ROW ONLY;
-- equals: SELECT * FROM person OFFSET 5 FETCH FIRST 1 ROW ONLY;

-- condition
SELECT * FROM employee WHERE country_of_birth = 'China';

SELECT * FROM employee WHERE
country_of_birth = 'China'
OR
country_of_birth = 'France'
OR
country_of_birth = 'Brazil';

-- IN
SELECT * FROM employee
WHERE country_of_birth
IN
('China', 'France', 'Brazil')
ORDER BY date_of_birth;

-- BETWEEN AND
SELECT * FROM employee
WHERE date_of_birth
BETWEEN DATE '1990-01-01' AND '2000-01-01';

-- LIKE
SELECT * FROM employee
WHERE email
LIKE '%@163.com'; -- email suffix is @163.com

SELECT * FROM employee
WHERE email
LIKE '_______@%'; -- email prefix length is 7

-- IS
SELECT * FROM employee
WHERE email
IS NULL;

-- group by
SELECT country_of_birth, COUNT(*)
FROM employee
GROUP BY country_of_birth;

SELECT country_of_birth, COUNT(*) as num
FROM employee
GROUP BY country_of_birth
ORDER BY num DESC;

SELECT country_of_birth, COUNT(*)
FROM employee
GROUP BY country_of_birth
HAVING COUNT(*) > 10
ORDER BY country_of_birth;
```

:::

## Optimizing SQL Queries

SARGABLE: **S**earch **ARG**ument **ABLE**

To write SARGABLE queries:

- Avoid using functions or calculations on indexed columns in the WHERE clause.
- Use direct comparisons when possible, instead of wrapping the column in a function.
- If we need to use a function on a column, consider creating a computed column
  or a function-based index, if the database system support it.

::: detail Click to view some examples

```sql
SELECT ... WHERE Year(myDate) = 2008; -- Bad
SELECT ... WHERE myDate >= '2008-01-01' AND myDate < '2009-01-01'; -- Fixed

SELECT ... WHERE Substring(dealerName, 4) = 'Ford'; -- Bad
SELECT ... WHERE dealerName LIKE 'Ford%'; -- Fixed

SELECT ... WHERE DateDiff(mm, orderDate, GetDate()) >= 30; -- Bad
SELECT ... WHERE orderDate < DateAdd(mm, -30); -- Fixed
```

:::
