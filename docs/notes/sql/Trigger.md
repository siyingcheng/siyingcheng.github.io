---
title: Trigger
titleTemplate: SQL
description: SQL Trigger
head:
  - - meta
    - name: description
      content: SQL Trigger
tags:
  - SQL
categories:
  - Notes
---

# SQL Trigger <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

A SQL Trigger tutorial: https://www.sqltutorial.org/sql-triggers/

Triggers are special database procedures that automatically execute in response
to specific events within a database. They act like hidden guardians, monitoring
data changes and taking action when certain conditions are met.

Key Features:

- Automatic execution: Triggers fire without explicit user invocation, ensuring
  consistency and data integrity.
- Event-driven: They respond to events like `INSERT`, `UPDATE`, and `DELETE`
  actions on tables.
- Customizable logic: You can define specific actions for triggers to perform,
  such as:
  - Validating data before changes.
  - Auditing changes for tracking purposes.
  - Enforcing business rules and constrains.
  - Maintaining referential integrity between tables.
  - Cascading updates or deletes across related tables.
  - Generating alerts and notifications.

Types of Triggers:

- DML Triggers: Executed on data manipulation events (INSERT, UPDATE, DELETE)
- DDL Triggers: Executed on data definition events (CREATE, ALTER, DROP)
- LOGON Triggers: Executed when a user logs in to the database.

Syntax:

```sql
CREATE TRIGGER trigger_name
{BEFORE|AFTER} {INSERT|UPDATE|DELETE}
ON table_name
FOR EACH ROW
BEGIN
    -- Trigger body (actions to be performed)
END;
```

On the other hand, a statement may delete rows in a table but does not invoke
the associated triggers. For example, [TRUNCATE TABLE](https://www.sqltutorial.org/sql-truncate-table/) 
statement removes all rows in the table but does not invoke the `BEFORE DELETE` 
and `AFTER DELETE` triggers.

Besides using the code in the `BEGIN END` block, you can execute a stored procedure
as follows:

```sql
CREATE TRIGGER trigger_name
[BEFORE|AFTER] event
ON table_name trigger_type
EXECUTE stored_procedure_name;
```

Specially, trigger function must be defined before the trigger itself can ben created.

Examples:

::: code-group

```sql [Example 1]
-- Preventing Invalid Data Entry
CREATE TRIGGER check_product_price
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Product price cannot be negative'
    ENF IF;
END;
```

```sql [Example 2]
-- Auditing Table Changes
CREATE TRIGGER log_customer_updates
AFTER UPDATE ON customers
FOR EACH ROW
BEGIN
    INSERT INTO customer_audit_log (customer_id, old_name, new_name, update_time)
    VALUES (OLD.customer_id, OLD.name, NEW.name, NOW())
END;
```

```sql [Example 3]
-- Maintaining Referential Integrity
CREATE TRIGGER cascade_order_delete
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    DELETE FROM orders WHERE customer_id = OLD.customer_id;
END;
```

```sql [Example 4]
-- PostgreSQL Example
CREATE TABLE customers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL
);
CREATE TABLE audit (
    customer_id BIGINT NOT NULL,
    entry_date TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION audit_customers() RETURNS TRIGGER AS $example_table$
BEGIN
    INSERT INTO audit (customer_id, entry_date) VALUES (NEW.id, NOW());
    RETURN NEW;
END;
$example_table$ LANGUAGE plpgsql;

CREATE TRIGGER customers_audit
AFTER INSERT ON customers
FOR EACH ROW
EXECUTE PROCEDURE audit_customers();

INSERT INTO customers (name, age) VALUES ('John Doe', 30);
```

```sql [Example 5]
-- MySQL Example
CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

DELIMITER //
CREATE TRIGGER age_fix
BEFORE INSERT ON customer
FOR EACH ROW
IF new.age < 0 THEN SET new.age = 0;
END IF; //

INSERT INTO customer (name, age) VALUES ('John', -1);
```

:::
