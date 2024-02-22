---
title: DML (Data Manipulation Language)
titleTemplate: SQL
description: DML (Data Manipulation Language)
head:
  - - meta
    - name: description
      content: DML (Data Manipulation Language)
tags:
  - SQL
categories:
  - Notes
---

# DML (Data Manipulation Language) <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## INSERT

`INSERT`: Adds new rows (records) to a table.

::: details Click to view examples

```sql
INSERT INTO person (
	first_name,
	last_name,
	gender,
	date_of_birth)
VALUES ('Simon', 'Si', 'MALE', DATE '1988-01-08');

-- Use `ON CONFLICT`
INSERT INTO employee (
        id,
        first_name,
        last_name,
        gender,
        date_of_birth,
        country_of_birth
) VALUES (
        1000,
        'Owen',
        'Zhang',
        'Male',
        '2000-08-05',
        'China'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO employee (
        id,
        first_name,
        last_name,
        gender,
        date_of_birth,
        country_of_birth
) VALUES (
        1000,
        'Owen',
        'Zhang',
        'Male',
        '2000-08-05',
        'China'
) ON CONFLICT (id)
DO UPDATE SET country_of_birth = EXCLUDED.country_of_birth;
```

:::

## UPDATE

`UPDATE`: Modifies existing data in one or more rows of a table.

::: details Click to view examples

```sql
UPDATE customers
SET email = 'bob@gmail.com'
WHERE name = 'Bob Johnson';
```

:::

## DELETE

`DELETE`: Removes rows from a table

::: details Click to view examples

```sql
DELETE FROM customers
WHERE id = 123;
```

:::

## TRUNCATE

`TRUNCATE TABLE`: Quickly removes all rows from a table, effectively emptying it.

```sql
TRUNCATE TABLE customers;
```
