---
title: Common SQL Data Types
titleTemplate: SQL
description: Common SQL Data Types
head:
  - - meta
    - name: description
      content: Common SQL Data Types
tags:
  - SQL
categories:
  - Notes
---

# Common SQL Data Types <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## Numeric Types

- INT: Integers (whole numbers) for storing counts, ages, etc. (e.g., 25, -10)
- DECIMAL: Decimal numbers for precise values like prices, measurements (e.g., 3.14159, 125.99)
- FLOAT: Floating-point numbers for very large or very small numbers (e.g., 1.234e-5, 3.14159265359)

## Text Types

- VARCHAR: Variable-length character strings for names, address.
- CHAR: Fixed-length character strings for codes, abbreviations (e.g., "CN", "US")
- TEXT: Large text blocks for descriptions, articles.

## Date and Time Types

- DATE: Dates (e.g., 2024-01-10)
- TIME: Times (e.g., 18:24:00)
- TIMESTAMP: Date and time combinations (e.g., 2024-01-10 18:24:00)

## Boolean Type

- BOOLEAN: True or false values for logical conditions (e.g., TRUE, FALSE)

## Special Types

- NULL:Represents the absence of a value or unknown data.

## Other Types

- BLOB:Binary data
- GEOGRAPHY
- GEOMETRY
- IMAGE
- JSON
- ...

## Official Documentation

- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
