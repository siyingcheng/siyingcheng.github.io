---
title: Java Array
titleTemplate: Queries
description: Notes for Java Array Queries
head:
  - - meta
    - name: description
      content: Notes for Java Array Queries
tags:
  - Java
categories:
  - Queries
---

# Java Data Types Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

| Data Type | Description                                        | Size (bits) | Range                                                   |
| --------- | -------------------------------------------------- | ----------- | ------------------------------------------------------- |
| byte      | Represents whole numbers                           | 8           | -128 to 127                                             |
| short     | Represents whole numbers                           | 16          | -32,768 to 32,767                                       |
| int       | Represents whole numbers (default integer type)    | 32          | -2,147,483,648 to 2,147,483,647                         |
| long      | Represents whole numbers                           | 64          | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| float     | Represents single-precision floating-point numbers | 32          | ~ ±1.4 x 10^-45 to ~ ±3.4 x 10^38 (approximate)         |
| double    | Represents double-precision floating-point numbers | 64          | ~ ±4.9 x 10^-324 to ~ ±1.8 x 10^308 (approximate)       |

## Which data type value is returned by all transcendental math functions?

```java
int
double
float
long
```

::: details Answer
`double`
:::

## What will be the output of the following java statement?

```java
double a = 3.0 / 0;
double b = 0 / 4.0;
double c = 0 / 0.0;
System.out.println(a);
System.out.println(b);
System.out.println(c);
```

::: details Answer

```java
Infinity
0.0
NaN
```

:::

## An expression involving byte, int and literal numbers is promoted to which of these?

```java
byte
long
float
int
```

::: details Answer
`int` (Explanation: An expression involving bytes, ints, shorts, literal numbers, the entire expression is promoted to `int` before any calculation is done.)
:::

## What is the numerical range of a char data type in Java?

```txt
0 to 65535
-128 to 127
0 to 32767
0 to 256
```

::: details Answer
`0 to 65535` (Explanation: The `char` data type in Java is a 16-bit Unicode character. So it supports $2^{16}$. The range of a `char` data type is 0 to 65535.)
:::

## Can 8 byte long data type be automatically type case to 4 byte float data type?

::: details Answer
`Yes`: Both data types have different memory representation that's why 8-byte integral data type can be stored to 4-byte floating point data type.
:::
