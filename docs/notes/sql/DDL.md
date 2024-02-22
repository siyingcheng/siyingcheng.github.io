---
title: DDL (Data Definition Language)
titleTemplate: SQL
description: DDL (Data Definition Language)
head:
  - - meta
    - name: description
      content: DDL (Data Definition Language)
tags:
  - SQL
categories:
  - Notes
---

# DDL (Data Definition Language) <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## CREATE DATABASE

`CREATE DATABASE`: Creates a new database

::: details Click to view examples

```sql
CREATE DATABASE IF NOT EXISTS {db_name};

```

:::

## CREATE TABLE

`CREATE TABLE`: Creates a new table to store data

::: details Click to view examples

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE
);

CREATE TABLE person (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	gender VARCHAR(6),
	date_of_birth TIMESTAMP
);

CREATE TABLE t_emp (
	emp_id INTEGER NOT NULL,
	emp_name CHAR(150) NOT NULL,
	emp_address VARCHAR(500) DEFAULT NULL,
	PRIMARY KEY (emp_id)
);
```

Create table with references:

```sql
CREATE TABLE car (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price NUMERIC(19, 2) NOT NULL
);
CREATE TABLE person (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    email VARCHAR(100),
    date_of_birth DATE NOT NULL,
    country_of_birth VARCHAR(50) NOT NULL,
    car_id BIGINT REFERENCES car (id),
    UNIQUE(car_id)
);
```

:::

`Primary Key` is a set of one or more files/columns of a table that uniquely
identify a record in a database table. It can not accept null or duplicate values.

`Foreign Key` is a filed in a database table that is Primary Key in another table.

`Super Key` is a set of one or more than one key that can be used to identify a
record uniquely in a table. Super Key can have extra attributes that are redundant
for distinct identification.

`Candidate Key` is the minimal super key that can identify a record uniquely in
a table. Each Candidate Key can work as a Primary Key.

**Temporary Table** is abase table that is not stored in the database but instead
exists only while the database session in which it was created is active.

::: details Click to view examples

```sql
CREATE TEMPORARY TABLE temp_table (
    column1 INT,
    column2 VARCHAR(50)
);
```

:::

## CREATE VIEW

`CREATE VIEW`: Creates a virtual table based on a query, acting as a window into
existing data.

## CREATE INDEX

`CREATE INDEX`: Creates an index to speed up data retrieve.

## ALTER TABLE

`ALTER TABLE`: Modify the structure of an existing table, such as adding columns,
dropping columns, or changing data types.

::: details Click to view examples

```sql
-- Add column
ALTER TABLE person
ADD COLUMN phone_number VARCHAR(15) NOT NULL DEFAULT 'N/A';

-- Modify column
ALTER TABLE person
MODIFY pincode INTEGER;

-- Rename column
ALTER TABLE {table_name}
RENAME COLUMN {old_name} TO {new_name};

-- Rename table
ALTER TABLE {table_name}
RENAME TO {new_name};

-- Remove unique constraint
ALTER TABLE person DROP CONSTRAINT person_pkey;

-- Add primary key
ALTER TABLE person ADD PRIMARY KEY (id);

-- Add unique constraint
ALTER TABLE employee ADD CONSTRAINT unique_email_address UNIQUE (email);
-- Indexes:
--    "employee_pkey" PRIMARY KEY, btree (id)
--    "unique_email_address" UNIQUE CONSTRAINT, btree (email)

-- Add check constraint
ALTER TABLE employee
ADD CONSTRAINT gender_constraint
CHECK (gender = 'Female' OR gender = 'Male');
-- Check constraints:
--    "gender_constraint" CHECK (gender::text = 'Female'::text OR gender::text = 'Male'::text)
```

:::

## DROP TABLE

`DROP TABLE`: Deletes a table and its data.

## DROP VIEW

`DROP VIEW`: Deletes a view.

## DROP INDEX

`DROP INDEX`: Deletes an index
