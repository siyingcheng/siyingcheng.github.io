---
title: Locators
titleTemplate: Playwright
description: Notes for Playwright Locators
head:
  - - meta
    - name: description
      content: Notes for Playwright Locators
tags:
  - Playwright
categories:
  - Notes
---

# Locators <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />

`Locators` are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment.

## Quick Guide

These are the recommended built in locators.

- `page.getByRole()` to locate by explicit and implicit accessibility attributes.
- `page.getByText()` to locate by text content.
- `page.getByLabel()` to locate a form control by associated label's text.
- `page.getByPlaceholder()` to locate an input by placeholder.
- `page.getByAltText()` to locate an element, usually image, by its text alternative.
- `page.getByTitle()` to locate an element by its title attribute.
- `page.getByTestId()` to locate an element based on its `data-testid` attribute. (_other attributes can be configured_).

Examples:

```javascript
await page.getByLabel("User Name").fill("John");
await page.getByLabel("Password").fill("secret-password");
await page.getByRole("button", { name: "Sign in" }).click();
await expect(page.getByText("Welcome, John!")).toBeVisible();
```

### Locate by Role

Role locators include buttons, checkboxes, headings, links, lists, tables, and many more and follow W3C specifications for [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles), [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes) and [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). Note that many html elements like `<button>` have an [implicitly defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role locator.

## Locate by CSS or XPath

If you absolutely must use CSS or XPath locators, you can use `page.locator()` to create a locator that takes a selector describing how to find an element in the page. Playwright supports CSS and XPath selectors, and auto-detects them if you omit css= or xpath= prefix.

```javascript
await page.locator("css=button").click();
await page.locator("xpath=//button").click();

await page.locator("button").click();
await page.locator("//button").click();
```

::: tip
CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. Instead, try to come up with a locator that is close to how the user perceives the page such as role locators or define an explicit testing contract using test ids.
:::

## Locate in Shadow DOM

All locators in Playwright **by default** work with elements in Shadow DOM. The exceptions are:

- Locating by XPath does not pierce shadow roots.
- [Closed-mode shadow roots](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#parameters) are not supported.

Example:

```javascript
await page.locator("x-details", { hasText: "Details" }).click();
```

## Filtering Locators

### Filter by text

```javascript
await page
  .getByRole("listitem")
  .filter({ hasText: "Product 2" })
  .getByRole("button", { name: "Add to cart" })
  .click();

await page
  .getByRole("listitem")
  .filter({ hasText: /Product 2/ })
  .getByRole("button", { name: "Add to cart" })
  .click();
```

### Filter by not having text

```javascript
// 5 in-stock items
await expect(
  page.getByRole("listitem").filter({ hasNotText: "Out of stock" })
).toHaveCount(5);
```

### Filter by child/descendant

```javascript
await page
  .getByRole("listitem")
  .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
  .getByRole("button", { name: "Add to cart" })
  .click();

await expect(
  page
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
).toHaveCount(1);
```

### Filter by not having child/descendant

```javascript
await expect(
  page.getByRole("listitem").filter({ hasNot: page.getByText("Product 2") })
).toHaveCount(1);
```

## Locator operators

### Matching inside a locator

You can chain methods that create a locator, like `page.getByText()` or `locator.getByRole()`, to narrow down the search to a particular part of the page.

```javascript
const product = page.getByRole("listitem").filter({ hasText: "Product 2" });
await product.getByRole("button", { name: "Add to cart" }).click();
await expect(product).toHaveCount(1);
```

```javascript
const saveButton = page.getByRole("button", { name: "Save" });
// ...
const dialog = page.getByTestId("settings-dialog");
await dialog.locator(saveButton).click();
```

### Matching two locators simultaneously

```javascript
const button = page.getByRole("button").and(page.getByTitle("Subscribe"));
```

### Matching one of the two alternative locators

If you'd like to target one of the two or more elements, and you don't know which one it will be, use `locator.or()` to create a locator that matches all of the alternatives.

```javascript
const newEmail = page.getByRole("button", { name: "New" });
const dialog = page.getByText("Confirm security settings");
await expect(newEmail.or(dialog).first()).toBeVisible();
if (await dialog.isVisible())
  await page.getByRole("button", { name: "Dismiss" }).click();
await newEmail.click();
```

### Matching only visible elements

> It's usually better to find a [more reliable way](https://playwright.dev/docs/locators#quick-guide) to uniquely identify the element instead of checking the visibility.

```javascript
await page.locator("button").locator("visible=true").click();
```

## List

### Count items in a list

```javascript
await expect(page.getByRole("listitem")).toHaveCount(3);
```

### Assert all text in a list

```javascript
await expect(page.getByRole("listitem")).toHaveText([
  "apple",
  "banana",
  "orange",
]);
```

### Get by nth item

If you have a list of identical elements, and the only way to distinguish between them is the order, you can choose a specific element from a list with `locator.first()`, `locator.last()` or `locator.nth()`.

```javascript
const banana = await page.getByRole("listitem").nth(1);
```

However, use this method with caution. Often times, the page might change, and the locator will point to a completely different element from the one you expected. Instead, try to come up with a unique locator that will pass the strictness criteria.

## Chaining filters

To take a screenshot of the row with "Mary" and "Say goodbye":

```javascript
const rowLocator = page.getByRole("listitem");

await rowLocator
  .filter({ hasText: "Mary" })
  .filter({ has: page.getByRole("button", { name: "Say goodbye" }) })
  .screenshot({ path: "screenshot.png" });
```

## Rare use cases

Do something with each element in the list:

```javascript
for (const row of await page.getByRole("listitem").all())
  console.log(await row.textContent());
```

```javascript
const rows = page.getByRole("listitem");
const count = await rows.count();
for (let i = 0; i < count; ++i) {
  console.log(await rows.nth(i).textContent());
}
```

Evaluate in the page: The code inside [locator.evaluateAll()](https://playwright.dev/docs/api/class-locator#locator-evaluate-all) runs in the page, you can call any DOM apis there.

```javascript
const rows = page.getByRole("listitem");
const texts = await rows.evaluateAll((list) =>
  list.map((element) => element.textContent)
);
```

## Other Locators

### CSS locator

> We recommend prioritizing user-visible locators like text or accessible role instead of using CSS that is tied to the implementation and could break when the page changes.

```javascript
await page.locator("css=button").click();
```

Playwright augments standard CSS selectors in two ways:

- CSS selectors pierce open shadow DOM.
- Playwright adds custom pseudo-classes like `:visible`, `:has-text()`, `:has()`, `:is()`, `:nth-match()` and more.

#### CSS: matching by text

Playwright include a number of CSS pseudo-classes to match elements by their text content.

- `article:has-text("Playwright")` - the `:has-text()` matches any element containing specified text somewhere inside, possibly in a child or a descendant element. Matching is case-insensitive, trims whitespace and searches for a substring.

```javascript
// Wrong, will match many elements including <body>
await page.locator(':has-text("Playwright")').click();
// Correct, only matches the <article> element
await page.locator('article:has-text("Playwright")').click();
```

- `#nav-bar :text("Home")` - the `:text()` pseudo-class matches the smallest element containing specified text. Matching is case-insensitive, trims whitespace and searches for a substring.

```javascript
await page.locator('#nav-bar :text("Home")').click();
```

- `#nav-bar :text-is("Home")` - the `:text-is()` pseudo-class matches the smallest element with exact text. Exact matching is case-sensitive, trims whitespace and searches for the full string.
- `#nav-bar :text-matches("reg?ex", "i")` - the `:text-matches()` pseudo-class matches the smallest element with text content matching the [JavaScript-like regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

> [!NOTE]
> Text matching always normalizes whitespace. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

> [!NOTE]
> Input elements of the type button and submit are matched by their value instead of text content. For example, :text("Log in") matches \<input type=button value="Log in"\>.

#### CSS: matching only visible elements

```javascript
await page.locator("button:visible").click();
```

#### CSS: elements that contain other elements

```javascript
await page.locator("article:has(div.promo)").textContent();
```

#### CSS: elements matching one of the conditions

```javascript
// Clicks a <button> that has either a "Log in" or "Sign in" text.
await page
  .locator('button:has-text("Log in"), button:has-text("Sign in")')
  .click();
```

#### CSS: matching elements based on layout

> [!WARNING]
> Matching based on layout may produce unexpected results. For example, a different element could be matched when layout changes by one pixel.

```javascript
// Fill an input to the right of "Username".
await page.locator('input:right-of(:text("Username"))').fill("value");
// Click a button near the promo card.
await page.locator("button:near(.promo-card)").click();
// Click the radio input in the list closest to the "Label 3".
await page.locator('[type=radio]:left-of(:text("Label 3"))').first().click();
```

#### CSS: pick n-th match from the query result

> [!TIP]
> It is usually possible to distinguish elements by some attribute or text content, which is more resilient to page changes.

```javascript
// Click the third "Buy" button
await page.locator(':nth-match(:text("Buy"), 3)').click();

// Wait until all three buttons are visible
await page.locator(':nth-match(:text("Buy"), 3)').waitFor();
```

In this case, `:nth-match(:text("Buy"), 3)` will select the third button from the snippet above. Note that index is `one-based`.

#### N-th element locator

```javascript
// Click first button
await page.locator("button").locator("nth=0").click();

// Click last button
await page.locator("button").locator("nth=-1").click();
```

#### Parent element locator

When you need to target a parent element of some other element, most of the time you should `locator.filter()` by the child locator.

```javascript
const child = page.getByText("Hello");
const parent = page.getByRole("listitem").filter({ has: child });
```

Alternatively, if you cannot find a suitable locator for the parent element, use `xpath=..`. Note that this method is not as reliable, because any changes to the DOM structure will break your tests. Prefer locator.filter() when possible.

```javascript
const parent = page.getByText("Hello").locator("xpath=..");
```

### XPath locator

> [!WARNING]
> We recommend prioritizing user-visible locators like text or accessible role instead of using XPath that is tied to the implementation and easily break when the page changes.

```javascript
await page.locator("xpath=//button").click();
```

> [!NOTE]
> Any selector string starting with `//` or `..` are assumed to be an xpath selector. For example, Playwright converts '//html/body' to 'xpath=//html/body'.
> !!!XPath does not pierce shadow roots.

#### XPath union

Pipe operator (`|`) can be used to specify multiple selectors in XPath. It will match all elements that can be selected by one of the selectors in that list.

```javascript
// Waits for either confirmation dialog or load spinner.
await page
  .locator(
    `//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']`
  )
  .waitFor();
```

### Legacy text locator

```javascript
await page.locator("text=Log in").click();
```

> [!WARNING]
> We recommend the modern [text locator](https://playwright.dev/docs/locators#get-by-text) instead.

### id, data-testid, data-test-id, data-test selectors

Playwright supports shorthand for selecting elements using certain attributes. Currently, only the following attributes are supported:

- id
- data-testid
- data-test-id
- data-test

```javascript
// Fill an input with the id "username"
await page.locator("id=username").fill("value");

// Click an element with data-test-id "submit"
await page.locator("data-test-id=submit").click();
```

### Chaining selectors

Selectors defined as `engine=body` or in short-form can be combined with the `>>` token, e.g. `selector1 >> selector2 >> selectors3.` When selectors are chained, the next one is queried relative to the previous one's result.

```javascript
css=article >> css=.bar > .baz >> css=span[attr=value]
```

is equivalent t:

```javascript
document
  .querySelector("article")
  .querySelector(".bar > .baz")
  .querySelector("span[attr=value]");
```
