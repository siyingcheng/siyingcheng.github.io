---
title: Procedures
titleTemplate: SQL
description: SQL Procedures
head:
  - - meta
    - name: description
      content: SQL Procedures
tags:
  - SQL
categories:
  - Notes
---

# SQL Procedures <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## What's Procedures

Procedures in SQL, also known as stored procedures, are reuseable blocks of code
that are stored within the database itself. They offer serval advantages:

- **Encapsulation**: Enclose complex logic and data manipulation tasks within a single
  unit, promoting code organization and maintainability.
- **Reusability**: Can be executed multiple times from different parts of your application,
  saving development time and ensuring consistency.
- **Security**: Can control user access to specific database operations, enhancing
  data security and integrity.
- **Performance**: Can improve query execution speed by reducing network traffic and
  pre-compiling code.

## How to Define and Use A Procedure

Define syntax:

```sql
CREATE PROCEDURE procedure_name
(parameters) -- parameters is optional
BEGIN
    -- Procedure body (SQL statements)
END;
```

Use Syntax:

```sql
CALL procedure_name(parameter_values);
```

Examples:

::: code-group

```sql [Example 1]
CREATE PROCEDURE insert_product(
    IN product_name VARCHAR(50),
    IN product_price DECIMAL(10,2)
)
BEGIN
    INSERT INTO products (name, price) VALUES (product_name, product_price);
END;

CALL insert_product('New Product', 19.99);
```

```sql [Example with IN]
-- IN
CREATE PROCEDURE update_salary
(IN emp_name VARCHAR(20), IN new_salary FLOAT)
BEGIN
    UPDATE employees
    SET salary = new_salary
    WHERE name = emp_name;
END;

call update_salary('Simon', 50000.00);
```

```sql [Example with OUT]
-- OUT
CREATE OR REPLACE PROCEDURE count_employees(OUT total_emp INT)
BEGIN
		SELECT COUNT(name) INTO total_emp FROM employees
		WHERE active = 'T';
END;

call count_employees(@active_count);
SELECT @active_count AS active_number;
```

:::
