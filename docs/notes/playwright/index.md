---
title: Playwright
titleTemplate: Notes
description: Notes for Playwright
head:
  - - meta
    - name: description
      content: Notes for Playwright
tags:
  - Playwright
categories:
  - Notes
---

# Playwright <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />

::: tip
[_Here_](https://playwright.dev/docs/intro) is the official documentation for Playwright.
:::

## What is Playwright?

Playwright is an open-source automation testing tool which is used to test end to end modern web and mobile
applications in both headed and headless modes.

## Why Playwright?

**Any browser • Any platform • One API:**

- **Cross-platform**: Test on Windows, Linux, and macOS, locally or on CI, headless or headed.
- **Multiple languages**: Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java.
- **Multiple browsers**: Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.
- **Headless and headed modes**: Playwright supports both headless and headed modes.
- **Test Mobile Web**： Native mobile emulation of Google Chrome for Android and Mobile Safari. The same rendering engine works on your Desktop and in the Cloud.

**Resilient • No flaky tests:**

- **Auto-wait.** Playwright waits for elements to be actionable prior to performing actions. It also has a rich set of introspection events. The combination of the two eliminates the need for artificial timeouts - the primary cause of flaky tests.
- **Web-first assertions.** Playwright assertions are created specifically for the dynamic web. Checks are automatically retried until the necessary conditions are met.
- **Tracing.** Configure test retry strategy, capture execution trace, videos, screenshots to eliminate flakes.

**No trade-offs • No limits:**

- Multiple everything.
- Trusted events.
- Test frames, pierce Shadow DOM

**Full isolation • Fast execution:**

- Browser contexts.
- Log in once.

**Powerful Tooling:**

- [Codegen](https://playwright.dev/docs/codegen)
- [Playwright Inspector](https://playwright.dev/docs/inspector)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

**Advantages:**

- Cross platform testing
- Multiple browsers testing
- Multiple languages support
- Headless and headed modes
- Auto wait
- Tracing
- Reporting
- Dynamic wait assertions
- Faster & Reliable
- Screenshots, video recoder
- Powerful tooling - Codegen, Playwright Inspector, Trace viewer

**Disadvantages:**

- Limited support for mobile testing
- Limited support for testing of native applications
- Limited support for testing of server-side applications
- Limited support for testing of single-page applications

## Basic

### Generating tests

```shell
npx playwright codegen
# Or specify a URL to generate tests for a website
npx playwright codegen demo.playwright.dev/todomvc
```

### Run and Debug

Details in [_here_](run-and-debug.md);

### Hooks

You can use various test hooks such as `test.describe` to declare a group of tests
and `test.beforeEach` and `test.afterEach` which are executed before/after each test.
Other hooks include the `test.beforeAll` and `test.afterAll` which are executed once
per worker before/after all tests.

> [_Here_](https://github.com/siyingcheng/playwright-demo/blob/ts/001_writing_test/tests/saucedemo/login.spec.ts)
> is an example of my demo test suite using the `test.describe` and `test.beforeEach`.
