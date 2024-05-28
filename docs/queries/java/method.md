---
title: Java Methods
titleTemplate: Queries
description: Notes for Java Methods Queries
head:
  - - meta
    - name: description
      content: Notes for Java Methods Queries
tags:
  - Java
categories:
  - Queries
---

# Java Methods Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## Which of this statement is incorrect?

- `main()` method must be made public
- If a function is defined public it can be accessed by object of other class by inherit
- All object of a class are allotted memory for the methods defined in the class
- All object of a class are allotted memory for the variables defined in the class

::: details Answer
`All object of a class are allotted memory for the methods defined in the class`

Explanation: All object of class share a single copy of methods defined in a class, Methods are allotted memory only once. All the objects of the class have access to methods of that class are allotted memory only for the variables not for the methods.
:::
