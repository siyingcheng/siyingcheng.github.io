---
title: Functions
titleTemplate: SQL
description: SQL Functions
head:
  - - meta
    - name: description
      content: SQL Functions
tags:
  - SQL
categories:
  - Notes
---

# SQL Functions <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

Collect the frequently used functions in SQL.

## Aggregate Functions

`COUNT`: Counts the number of rows in a table or a specific column

```sql
SELECT COUNT(*) FROM customers; // Counts all customers
SELECT COUNT(city) FROM customers; // Counts unique cities
```

`SUM`: Calculates the total sum of values in a specific column.

```sql
SELECT SUM(price) FROM orders; // Calculates total order value

```

`AVG`: Computes the average of a column.

```sql
SELECT AVG(rating) FROM products; // Calculates average product rating

```

::: details Click to view more examples

```sql
SELECT MAX(price) FROM car;
SELECT MIN(price) FROM car;
SELECT AVG(price) FROM car;
SELECT ROUND(AVG(price)) FROM car;

SELECT make, model, MAX(price) as Max_Price
FROM car
GROUP BY make, model
ORDER BY Max_Price DESC;

SELECT make, model, ROUND(AVG(price)) as avg_price
FROM car
GROUP BY make, model
ORDER BY avg_price;

SELECT c.make, c.model, SUM(c.price) as sum_price
FROM car c
GROUP BY c.make, c.model
ORDER BY sum_price;

SELECT COALESCE(e.email, 'Email Not Provided')
FROM employee e;
```

:::

## String Functions

`CONCAT`: Concatenates (joins) multiple string into one.

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;

```

`SBUSTRING`: Extracts specific part of a string based on staring and ending positions.

```sql
SELECT SUBSTRING(address, 1, 5) AS zip_code FROM customers;

```

`UPPER`/`LOWER`: Converts text to uppercase or lowercase.

```sql
SELECT UPPER(city) FROM customers;

```

::: details Click to view more examples

```sql
-- Strings functions
SELECT UPPER('Simon') as upper_case; -- SIMON
SELECT LOWER('Simon') as lower_case; -- simon

SELECT UCASE('Simon') as upper_case; -- SIMON :mysql✅ :postgresql🚫
SELECT LCASE('Simon') as lower_case; -- simon :mysql✅ :postgresql🚫

SELECT LENGTH('  I am Simon  '); -- 14

SELECT CHARACTER_LENGTH('Simon'); -- 5

SELECT CONCAT('Simon', ' is', ' hero'); -- Simon is hero

SELECT REVERSE('Simon'); -- nomiS

SELECT REPLACE('Greed is good', 'Greed', 'Knowledge'); -- Knowledge is good

SELECT LTRIM('  I am Simon  '); -- I am Simon

SELECT RTRIM('  I am Simon  '); --   I am Simon

SELECT TRIM('  I am Simon  '); -- I am Simon

SELECT POSITION('Simon' in '  I am Simon  '); -- 8

SELECT ASCII('a'); -- 97
SELECT ASCII('A'); -- 65
SELECT ASCII('0'); -- 48
```

:::

## Date and Time Functions

`EXTRACT`: Extracts specific components (year, month, day) from a date/time value.

```sql
SELECT EXTRACT(YEAR FROM order_date) AS order_year FROM orders;

```

`DATE_ADD`/`DATE_SUB`: Adds or subtracts a specific number of days/months/years
from a date/time value.

```sql
SELECT DATE_ADD(due_date, INTERVAL 7 DAY) AS new_due_date FROM tasks;

```

`DATEDIFF`: Calculates the difference between tow date/time values in days, months,
or years.

```sql
SELECT DATEDIFF(YEAR, hire_date, CURRENT_DATE) AS years_employed FROM employees;

```

::: details Click to view more examples

```sql
-- Date Functions
select NOW(); -- 2024-01-08 15:30:15.997836+08
select NOW()::DATE; -- 2024-01-08
select NOW()::TIME; -- 15:30:44.496325
SELECT NOW() - INTERVAL '1 YEAR'; -- 2023-01-08 15:33:32.946236+08
SELECT NOW()::DATE - INTERVAL '6 MONTHS'; -- 2023-07-08 00:00:00
SELECT NOW() + INTERVAL '15 DAYS'; -- 2024-01-23 15:35:44.280966+08
SELECT (NOW() + INTERVAL '15 DAYS')::DATE; -- 2024-01-23
SELECT EXTRACT(YEAR FROM NOW()); -- 2024
SELECT EXTRACT(MONTH FROM NOW()); -- 1
SELECT EXTRACT(DAY FROM NOW()); -- 8
SELECT EXTRACT(DOW FROM NOW()); -- 1 (Monday, sunday is 0)
SELECT EXTRACT(CENTURY FROM NOW()); -- 21

-- AGE function
SELECT first_name, last_name, AGE(NOW(), date_of_birth) AS age
FROM employee;
```

:::

## Mathematical Functions

`ROUND`: Rounds a number to a specified number of decimal places.

```sql
SELECT ROUND(average_rating, 2) FROM products;

```

`ABS`: Calculates the absolute value (distance from zero) of a number.

```sql
SELECT ABS(profit - loss) AS total_difference FROM transactions;

```

`POWER`: Raises a number to a specified power.

```sql
SELECT POWER(revenue, 2) AS revenue_squared FROM sales;

```

## Window Functions

### ROW_NUMBER

`ROW_NUMBER` is a window function that assigns a unique sequential number to each
row within a result set, starting from 1. It's like giving each row a temporary
ID for ordering, filtering, or selecting specific rows based on their position.

Syntax:

```sql
ROW_NUMBER() OVER ([PARTITION BY <expression>] ORDER BY <expression>)
```

::: details Click to view examples

```sql
-- Assigning row numbers to all rows in a table
SELECT ROW_NUMBER() OVER (ORDER BY customer_id) AS row_num, *
FROM customers;

-- Numbering rows within groups (partitions)
SELECT ROW_NUMBER() OVER (PARTITION BY city ORDER BY customer_name) AS row_num, *
FROM customers;

-- Selecting the top 5 customers with the highest orders
SELECT TOP 5 *
FROM (
  SELECT customer_id, COUNT(*) AS order_count,
    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS row_num
  FROM orders
  GROUP BY customer_id
) AS ranked_customers
WHERE row_num <= 5;

-- More other examples
SELECT stu_id, stu_name, stu_score, ROW_NUMBER()
OVER (PARTITION BY stu_id, stu_score, ORDER BY stu_score DESC) AS score_order
FROM students;
```

:::

Common Applications:

- Paging results for displaying data in chunks.
- Identifying the first, last, or top N rows within groups.
- Creating unique temporary IDs for further processing.
- Implementing ranking and leader boards.

### RANK

`RANK` is a window function that assigns a rank to each row within a result set
based on a specified ordering. It's similar to ROW_NUMBER, but it handles ties
differently, allowing multiple rows to share to share the same rank if their values
are equal.

Syntax:

```sql
RANK() OVER ([PARTITION BY <expression>] ORDER BY <expression>)
```

::: details Click to view examples

```sql
-- Ranking employees by salary
SELECT employee_id, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- Ranking top 3 students in each class
SELECT student_id, class_id, score,
  RANK() OVER (PARTITION BY class_id ORDER BY score DESC) AS rank_in_class
FROM student_scores;

-- Identifying the most expensive product in each category
SELECT product_id, category_id, price,
  RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS rank_in_category
FROM products
WHERE RANK() OVER (PARTITION BY category_id ORDER BY price DESC) = 1;
```

:::

Remember:

- Use RANK when you need to preserve the order of ties and allow gaps in the rank
  sequence.
- For dense rankings without gaps, use `DENSE_RANK`.
- ROW_NUMBER assigns a unique number to each row regardless ot ties.
- Choose the appropriate window function based on your specific ranking requirements.

### FIRST_VALUE

`FIRST_VALUE` retrieve the first value in a specified window (partition) of rows,
based on a defined ordering. It's like peeking through a window and grabbing the
first item you see within a particular group or segment or data.

Syntax:

```sql
FIRST_VALUE(expression) OVER ([PARTITION BY <expression>] ORDER BY <expression>)
```

::: details Click to view examples

```sql
-- Finding the first order date for each customer
SELECT custom_id,
  FIRST_VALUE(order_date) OVER (PARTITION BY custom_id ORDER BY order_date) AS first_order_date
FROM orders;

-- Identifying the first product in each category
SELECT category_id,
  FIRST_VALUE(product_name) OVER (PARTITION BY category_id ORDER BY product_name) AS first_product
FROM products;

-- Retrieving the first non-null value in a column;
SELECT id, FIRST_VALUE(value) OVER (ORDER BY id) AS first_non_null_value
FROM my_table;

-- Other example
SELECT stu_id, stu_name, stu_score,
FIRST_VALUE(stu_score) OVER (ORDER BY stu_score DESC) AS highest_score
FROM students;

```

:::
