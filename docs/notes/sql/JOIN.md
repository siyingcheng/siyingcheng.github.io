---
title: JOIN
titleTemplate: SQL
description: SQL JOIN
head:
  - - meta
    - name: description
      content: SQL JOIN
tags:
  - SQL
categories:
  - Notes
---

# JOIN <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

A `JOIN` clause is used to combine rows from two or more tables, based on a related
column between them.

Different type of SQL JOINs:

Here are the different types of the JOINs in SQL:

- `(INNER) JOIN`: Returns records that have matching values in both tables.
- `LEFT (OUTER) JOIN`: Returns all records from the left table, the the matched
  records from the right table.
- `RIGHT (OUTER) JOIN`: Returns all records from the right table, and the matched
  records from the left table.
- `FULL (OUTER) JOIN`: Returns all records when there is a match in either left
  or right table.

## INNER JOIN

`(INNER) JOIN`: Selects all rows from both the tables as long as the condition
is satisfied. Creates the result-set by combining all rows from both the tables
where the condition satisfied i.e value of the common filed will be the same.

<img src="https://www.w3schools.com/sql/img_inner_join.png" class='center'
caption='FULL JOIN' title='FULL JOIN' />

::: details Click to view examples

```sql
SELECT * FROM person
JOIN car
ON person.car_id = car.id;

SELECT p.first_name, c.make, c.model, c.price FROM person p
INNER JOIN car c
ON p.car_id = c.id;

-- If both table have the same column `car_id` can use USING
SELECT * FROM person
JOIN car USING (car_id);
```

:::

## LEFT JOIN

`LEFT JOIN`: Returns all the rows of the table on the left side of the join and
matched rows for the table on the right side of the join. For the rows for which
there is no matching row on the right side, the result-set will contain _`NULL`_.
LEFT JOIN is also known as `LEFT OUTER JOIN`.

<img src='https://www.w3schools.com/sql/img_left_join.png' class='center'
caption='LEFT JOIN' title='LEFT JOIN' />

::: details Click to view examples

```sql
SELECT * FROM person p
LEFT JOIN car c
ON c.id = p.car_id;

SELECT * FROM person p
LEFT JOIN car c
ON c.id = p.car_id
WHERE c.* IS NULL;
```

:::

## RIGHT JOIN

`RIGHT JOIN`: RIGHT JOIN is similar to LEFT JOIN. Returns all the rows of the table
on the right side of the join and matching rows for the table on the left side of
the join. For the rows for which there is no matching row ont he left side, the
result-set will contain _`NULL`_. RIGHT JOIN is also known as `RIGHT OUTER JOIN`.

<img src='https://www.w3schools.com/sql/img_right_join.png' class='center'
caption='RIGHT JOIN' title='RIGHT JOIN' />

::: details Click to view examples

```sql
SELECT Student.NAME,StudentCourse.COURSE_ID
FROM Student
RIGHT JOIN StudentCourse
ON StudentCourse.ROLL_NO = Student.ROLL_NO;
```

:::

## FULL OUTER JOIN

`FULL JOIN`: Creates the result-set by combining results of both LEFT JOIN and
RIGHT JOIN. The result-set will contain all the rows from both tables. For the
rows for which there is no matching, the result-set will contain _`NULL`_ values.

<img src='https://www.w3schools.com/sql/img_full_outer_join.png' class='center' 
caption='FULL JOIN' title='FULL JOIN'/>

::: details Click to view examples

```sql
SELECT Student.NAME,StudentCourse.COURSE_ID
FROM Student
FULL JOIN StudentCourse
ON StudentCourse.ROLL_NO = Student.ROLL_NO;
```

:::
