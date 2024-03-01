---
title: Test Practices

titleTemplate: Selenium
description: Selenium Test Practices
head:
  - - meta
    - name: description
      content: Selenium Test Practices
tags:
  - Selenium
categories:
  - Notes
---

# Test Practices <Badge type="tip" text="Selenium" /><Badge type="warning" text="Notes" />

## Design Strategies

Here is the [_Official Documentation_](https://www.selenium.dev/documentation/test_practices/design_strategies/)

- [DomainDrivenDesign](https://www.selenium.dev/documentation/test_practices/encouraged/domain_specific_language/):
  Express your tests in the language of the end-user of the app.

- [PageObjects](https://www.selenium.dev/documentation/test_practices/design_strategies/#:~:text=of%20the%20app.-,PageObjects,-%3A%20A%20simple%20abstraction):
  A simple abstraction of the UI of your web app.

- LoadableComponent: Modeling PageObjects as components.

- BotStyleTests: Using a command-based approach to automating tests, rather than the object-based approach that PageObjects encourage

In short, make your page class extends `LoadableComponent`, by extending this base
class, needs to implement the `load()` and the `isLoaded()` methods. The `load()`
method should load the page, and the `isLoaded()` method should check if the page
is loaded.
