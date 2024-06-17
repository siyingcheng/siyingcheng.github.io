---
title: Java String
titleTemplate: Queries
description: Notes for Java String Queries
head:
  - - meta
    - name: description
      content: Notes for Java String Queries
tags:
  - Java
categories:
  - Queries
---

# Java String Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## What will be the output of the following Java program?

```java
class StringDemo {
    public static void main(String[] args) {
        char[] chars = {'a', 'b', 'c'};
        String s = new String(chars);
        System.out.println(s);
    }
}
```

::: details Answer
`abc`
:::

## What will be the output of the following Java program?

```java
class StringDemo {
    public static void main(String[] args) {
        int[] ascii = {65, 66, 67, 68};
        String s = new String(ascii, 1, 3);
        System.out.println(s);
    }
}
```

::: details Answer
`BCD`
:::

## Which of these constructors is used to create an empty String object?

- String(void)
- String()
- String(0)
- None of the mentioned

::: details Answer
`String()`
:::

## What will be the output of the following Java code?

```java
class Example {
    public static void main(String[] args) {
        String c = "Hello i love java";
        int start = 2;
        int end = 9;
        char[] s = new char[end - start];
        c.getChars(start, end, s, 0);
        System.out.println(s);
    }
}
```

::: details Answer
`llo i l`: Explanation: `getChars(start,end,s,0)` returns an array from the string c, starting index of array is pointed by start and ending index is pointed by end. s is the target character array where the new string of letters is going to be stored and the new string will be stored from 0th position in s.
:::

## What will be the output of the following Java code?

```java
String s = "Hello".replace('l', 'w');
System.out.println(s);
```

::: details Answer
`hewwo`: Explanation: replace() method replaces all occurrences of one character in invoking string with another character. s1.replace('l','w') replaces every occurrence of 'l' in hello by 'w', giving hewwo.
:::
