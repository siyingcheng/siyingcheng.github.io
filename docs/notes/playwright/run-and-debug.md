---
title: Running and Debugging Tests
titleTemplate: Playwright
description: Notes for Playwright Running and Debugging Tests
head:
  - - meta
    - name: description
      content: Notes for Playwright Running and Debugging Tests
tags:
  - Playwright
categories:
  - Notes
---

# Running and Debugging Tests <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />

## Command Line

You can run your tests with the `playwright test` command. This will run your
tests on all browsers as configured in the `playwright.config` file. Tests run
in headless mode by default meaning no browser window will be opened while
running the tests and results will be seen in the terminal.

```shell
npx playwright test
```

## Run tests in UI mode

The `UI Mode` for a better developer experience where you can easily walk
through each step of the test and visually see what was happening before, during
and after each step. UI mode also comes with many other features such as the
locator picker, watch mode and more.

```shell
npx playwright test --ui
```

## Run tests in headed mode

```shell
# Playwright default is headless mode
npx playwright test --headed
```

## Run tests on different browsers

To specify which browser you would like to run your tests on, use the `--project`
flag followed by the name of the browser.

```shell
npx playwright test --project webkit
# Multiple browsers can be specified
npx playwright test --project webkit --project firefox
```

## Run specific tests

```shell
# To run a single test file
npx playwright test landing-page.spec.ts
# To run a set of test files from different directories
npx playwright test tests/todo-page/ tests/landing-page/
# To run files that have `landing` or `login` in their name
npx playwright test landing login
# To run a test with a specific title, use the -g flag followed by the title of the test.
npx playwright test -g "add a todo item"
```

## Debug tests in UI mode

```shell
npx playwright test --ui
```

## Debug tests with the Playwright Inspector

```shell
npx playwright test --debug
```

To debug one test file:

```shell
npx playwright test example.spec.ts --debug
```

To debug a specific test from the line number where the `test(..` is defined,
add a colon followed by the line number at the end of the test file name,
followed by the `--debug` flag.

```shell
npx playwright test example.spec.ts:10 --debug
```

## Test reports

The HTML Reporter shows you a full report of your tests allowing you to filter
the report by browsers, passed tests, failed tests, skipped tests and flaky
tests. By default, the HTML report is opened automatically if some of the tests
failed, otherwise you can open it with the following command.

```shell
npx playwright show-report
```
