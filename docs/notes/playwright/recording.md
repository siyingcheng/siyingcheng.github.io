---
title: Recording a Trace, Screenshot, and Video
titleTemplate: Playwright
description: Notes for Playwright Recording a Trace, Screenshot, and Video
head:
  - - meta
    - name: description
      content: Notes for Playwright Recording a Trace, Screenshot, and Video
tags:
  - Playwright
categories:
  - Notes
---

# Recording a Trace, Screenshot, and Video <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />

## Recording a Trace

By default the `playwright.config` file will contain the configuration needed to create a `trace.zip` file for each test. Traces are setup to run `on-first-retry` meaning they will be run on the first retry of a failed test. Also `retries` are set to 2 when running on CI and 0 locally. This means the traces will be recorded on the first retry of a failed test but not on the first run and not on the second retry.

```javascript
// playwright.config.js
import { defineConfig } from "@playwright/test";
export default defineConfig({
  retries: process.env.CI ? 2 : 0, // set to 2 when running on CI
  // ...
  use: {
    trace: "on-first-retry", // record traces on first retry of each test
  },
});
```

Or, you can force tracing to be on:

```shell
npx playwright test --trace on
```

Available options to record a trace:

- `'on-first-retry'` - Record a trace only when retrying a test for the first time.
- `'on-all-retries'` - Record traces for all test retries.
- `'off`' - Do not record a trace.
- `'on'` - Record a trace for each test. (not recommended as it's performance heavy)
- `'retain-on-failure'` - Record a trace for each test, but remove it from successful test runs.

You can also use trace: `'retain-on-failure'` if you do not enable retries but still want traces for failed tests.

## Opening the trace

You can open the saved trace using the Playwright CLI or in your browser on `trace.playwright.dev`. Make sure to add the full path to where your `trace.zip` file is located. This should include the full path to your `trace.zip` file.

```shell
npx playwright show-trace path/to/trace.zip
```

> [trace.playwright.dev](https://trace.playwright.dev/) is a statically hosted variant of the Trace Viewer. You can upload trace files using drag and drop.

Viewing remote traces:

You can open remote traces using it's URL. They could be generated on a CI run which makes it easy to view the remote trace without having to manually download the file.

```shell
npx playwright show-trace https://example.com/trace.zip
```

You can also pass the URL of your uploaded trace (e.g. inside your CI) from some accessible storage as a parameter. CORS (Cross-Origin Resource Sharing) rules might apply.

```shell
https://trace.playwright.dev/?trace=https://demo.playwright.dev/reports/todomvc/data/cb0fa77ebd9487a5c899f3ae65a7ffdbac681182.zip
```

## Screenshot and Video

```javascript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",

    // Record trace only when retrying a test for the first time.
    trace: "on-first-retry",

    // Record video only when retrying a test for the first time.
    video: "on-first-retry",
  },
});
```
