---
title: Java IO
titleTemplate: Queries
description: Notes for Java IO Queries
head:
  - - meta
    - name: description
      content: Notes for Java IO Queries
tags:
  - Java
categories:
  - Queries
---

# Java IO Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />

## Which of these classes is used for input and output operation when working with bytes?

- InputStream
- Reader
- Writer
- All of the mentioned

::: details Answer
`InputStream`: `InputStream` & `OutputStream` are designed for _byte_ stream. `Reader` and `Writer` are designed for _character_ stream.
:::

## What will be the output of the following Java program? (Note: InputOutput.java is stored in the disk.)

```java
try (FileInputStream fis = new FileInputStream("InputOutput.java")) {
    System.out.println(fis.available());
} catch (IOException e) {
    // ...
}
```

- false
- true
- Prints number of characters in the file
- Prints number of bytes in file

::: details Answer
`Prints number of bytes in file`: Explanation: `available()` returns the number of bytes.
:::

## Which of these data type is returned by every method of OutputStream?

- float
- byte
- int
- None of the mentioned

::: details Answer
`None of the mentioned`: Every method of OutputStream returns void and throws an IOException in case of errors.
:::

