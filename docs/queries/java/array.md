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

# Java Array Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## What is the default value of an array element if it is not initialized?

::: code-group

```java{2} [int Array]
int[] arr = new int[5];
System.out.println(arr[3]); // -> 0 (default value)
arr[0] = 1;
arr[1] = 2;
arr[5] = 5; // java.lang.ArrayIndexOutOfBoundsException // [!code error]
```

```java{2} [String Array]
String[] arr = new String[5];
System.out.println(arr[3]); // -> null (default value)
System.out.println(Arrays.toString(arr)); // -> [null, null, null, null, null]
```

```java{2} [boolean Array]
boolean[] booleanArray = new boolean[5];
System.out.println(booleanArray[3]); // -> false (default value)
```

:::

## What is the type of variable 'b' and 'd' in the following code snippet?

```java
int a[], b;
int[] c, d;
```

- 'b' and 'd' are int
- 'b' is int variable and 'd' is int array
- 'd' is int variable and 'b' is int array
- 'b' and 'd' are both int array

::: details Answer
`'b' is int variable and 'd' is int array`
:::

## What will be the output of the following code snippet?

```java
Object[] names = new String[3];
names[0] = new Integer(0);
```

- ArrayINdexOutOfBoundsException
- Compilation Error
- Code run successfully
- ArrayStoreException

::: details Answer
`ArrayStoreException`
:::

## Where is an array stored in memory?

- first generation memory
- heap space
- heap space and stack space
- stack space

::: details Answer
`heap space`: Explanation: Array is stored in heap space. Whenever an object is created, it's always stored in the Heap space and stack memory contains the reference to it.
:::
