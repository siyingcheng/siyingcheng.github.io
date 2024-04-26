---
title: Annotations
titleTemplate: Playwright
description: Notes for Playwright Annotations
head:
  - - meta
    - name: description
      content: Notes for Playwright Annotations
tags:
  - Playwright
categories:
  - Notes
---

# Annotations <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />

You can add your own tags and annotations at any moment, but Playwright comes with a few built-in ones:

- `test.skip()` marks the test as irrelevant. Playwright does not run such a test. Use this annotation when the test is not applicable in some configuration.
- `test.fail()` marks the test as failing. Playwright will run this test and ensure it does indeed fail. If the test does not fail, Playwright will complain.
- `test.fixme()` marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.
- `test.slow()` marks the test as slow and triples the test timeout.

## Focus a test

You can focus some tests. When there are focused tests, only these tests run.

```javascript
test.only("focus this test", async ({ page }) => {
  // Run only focused tests in the entire project.
});
```

## Skip a test

```javascript
test.skip("skip this test", async ({ page }) => {
  // This test is not run
});
```

You can skip certain test based on the condition.

```javascript
test("skip this test", async ({ page, browserName }) => {
  test.skip(browserName === "firefox", "Still working on it");
});
```

## Group tests

You can group tests to give them a logical name or to scope before/after hooks to the group.

```javascript
import { test, expect } from "@playwright/test";

test.describe("two tests", () => {
  test("one", async ({ page }) => {
    // ...
  });

  test("two", async ({ page }) => {
    // ...
  });
});
```

## Tag tests

To tag a test, either provide an additional details object when declaring a test, or add `@`-token to the test title. Note that tags must start with `@` symbol.

```javascript
import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    tag: "@fast",
  },
  async ({ page }) => {
    // ...
  }
);

test("test full report @slow", async ({ page }) => {
  // ...
});
```

Multiple tags:

```javascript
import { test, expect } from "@playwright/test";

test.describe(
  "group",
  {
    tag: "@report",
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        tag: ["@slow", "@vrt"],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);
```

You can now run tests that have a particular tag with` --grep` command line option.

```shell
npx playwright test --grep @fast
npx playwright test --grep-invert @fast
npx playwright test --grep "@fast|@slow"
npx playwright test --grep "(?=.*@fast)(?=.*@slow)"
```

## Annotate tests

If you would like to annotate your tests with something more substantial than a tag, you can do that when declaring a test. Annotations have a `type` and a `description` for more context, and will be visible in the test report.

```javascript
import { test, expect } from "@playwright/test";

test(
  "test login page",
  {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
  },
  async ({ page }) => {
    // ...
  }
);
```

Multiple annotations:

```javascript
import { test, expect } from "@playwright/test";

test.describe(
  "report tests",
  {
    annotation: { type: "category", description: "report" },
  },
  () => {
    test("test report header", async ({ page }) => {
      // ...
    });

    test(
      "test full report",
      {
        annotation: [
          {
            type: "issue",
            description: "https://github.com/microsoft/playwright/issues/23180",
          },
          { type: "performance", description: "very slow test!" },
        ],
      },
      async ({ page }) => {
        // ...
      }
    );
  }
);
```
