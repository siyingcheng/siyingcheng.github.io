---
title: Dynamic Variables
titleTemplate: Postman
description: Postman Dynamic Variables
head:
  - - meta
    - name: description
      content: Postman Dynamic Variables
tags:
  - SQL
categories:
  - Notes
---

# Dynamic Variables <Badge type="tip" text="Postman" /><Badge type="warning" text="Notes" />

Postman uses the [_faker_](https://www.npmjs.com/package/@faker-js/faker) library
to generate sample data, including random names, addresses, email addresses, and
much more. You can use these pre-defined variables multiple times to return
different values per request.

And [_here_](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/creating-dynamic-responses/)
is the official documentation. [_Dynamic variables list_](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/)

:::tip 💡 Use Dynamic Variables in scripts or pre-request
To use dynamic variables in pre-request or test scripts, you need to use 
`pm.variables.replaceIn()`, for example 
`pm.variables.replaceIn('{{$randomFirstName}}')`.
:::
