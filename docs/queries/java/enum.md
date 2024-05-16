---
title: Java Enum
titleTemplate: Queries
description: Notes for Java Enum Queries
head:
  - - meta
    - name: description
      content: Notes for Java Enum Queries
tags:
  - Java
categories:
  - Queries
---

# Java Enum Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## Are enums type-safe?

::: details Answer
`YES`, Enums are type-safe in Java. Enums are a way to define a set of named constants. Their values are of a specific type, and they are checked at compile time. This means that if you try to assign a value of the wrong type to an enum, the compiler will give you an error.
:::

## What is the order of variables in Enum?

```txt
Ascending order
Descending order
Random order
Depends on the order() method
```

::: details Answer
`Ascending order`: The `compareTo()` method is implemented to order the variables in `ascending` order.
:::

## What will be the the output of the following code?

```java
enum Season {
    WINTER, SPRING, SUMMER, AUTUMN;
}
System.out.println(Season.WINTER.ordinal());
```

::: details Answer
`0`: `ordinal()` method provides number to the variables defined in Enum. And the first variable in Enum is assigned with `0`.
:::

## Which class does all the Enums extend?

::: details Answer
`Enum`: All enums implicitly extend `java.lang.Enum`. Since Java does not have multiple inheritance, an enum cannot extend any other class.
:::

### What will be the output of the following code?

```java
enum Levels {
    private TOP,
    public MEDIUM,
    protected LOW;
}
```

- Compilation Error
- It runs successfully
- EnumNotDefinedException
- Runtime Error

::: details Answer
`Compilation Error`: Enum cannot have any modifiers. They are `public`, `static` and `final` by default.
:::

## Which method returns the elements of Enum class?

- getEnumList()
- getEnums()
- getEnum()
- getEnumConstants()

::: details Answer
`getEnumConstants()`: This method returns an array of all the constants defined in the Enum class. Or `null` if this class object does not represent an enum type.
:::
