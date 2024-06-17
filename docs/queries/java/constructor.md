---
title: Java Constructor
titleTemplate: Queries
description: Notes for Java Constructor Queries
head:
  - - meta
    - name: description
      content: Notes for Java Constructor Queries
tags:
  - Java
categories:
  - Queries
---

# Java Constructor Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## What is true about protected constructor?

- Protected constructor can be called directly
- Protected constructor can be instantiated even if child is in a different package
- Protected constructor can be used outside package
- Protected constructor can only be called using super()

::: details Answer
`Protected constructor can only be called using super()`: Explanation: Protected access modifier means that constructor can be accessed by child classes of the parent class and classes in the same package.
:::
