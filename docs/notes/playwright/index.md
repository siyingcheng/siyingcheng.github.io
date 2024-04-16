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


## Playwright Installation

To install Playwright, you need to have Node.js installed on your system. Once Node.js is installed, you can install Playwright using the following command:

```bash
npm install playwright
```

[_Here_](https://playwright.dev/docs/intro) is the official documentation for Playwright.


## Locators

// Select an element by its id
await page.waitForSelector('#myId');
const elementById = await page.querySelector('#myId');

// Select an element by its class name
await page.waitForSelector('.myClass');
const elementByClassName = await page.querySelector('.myClass');

// Select an element by a CSS selector
await page.waitForSelector('div.myClass');
const elementBySelector = await page.querySelector('div.myClass');

// Select an element by its text content
await page.waitForSelector('div:contains("My Text")');
const elementByText = await page.querySelector('div:contains("My Text")');

// Select an element by its XPath expression
await page.waitForXPath('//div[@class="myClass"]');
const elementByXPath = await page.querySelectorXPath('//div[@class="myClass"]');

// Select an element by its tag name
await page.waitForSelector('div');
const elementByTagName = await page.querySelector('div');

// Select an element by its name attribute
await page.waitForSelector('[name="myName"]');
const elementByName = await page.querySelector('[name="myName"]');