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

::: tip 📎

Here is the [_Official Documentation_](https://www.selenium.dev/documentation/test_practices/design_strategies/)

:::

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

Bot Pattern: Although PageObjects are a useful way of reducing duplication in
your tests, it’s not always a pattern that teams feel comfortable following.
An alternative approach is to follow a more “command-like” style of testing.

A “bot” is an action-oriented abstraction over the raw Selenium APIs. This means
that if you find that commands aren’t doing the Right Thing for your app, it’s
easy to change them. As an example:

::: details Click to view example

```java
public class ActionBot {
  private final WebDriver driver;

  public ActionBot(WebDriver driver) {
    this.driver = driver;
  }

  public void click(By locator) {
    driver.findElement(locator).click();
  }

  public void submit(By locator) {
    driver.findElement(locator).submit();
  }

  /**
   * Type something into an input field. WebDriver doesn't normally clear these
   * before typing, so this method does that first. It also sends a return key
   * to move the focus out of the element.
   */
  public void type(By locator, String text) {
    WebElement element = driver.findElement(locator);
    element.clear();
    element.sendKeys(text + "\n");
  }
}
```

:::

## To automate or not to automate?

Is automation always advantageous? When should one decide to automate test cases?

It is not always advantageous to automate test cases. There are times when manual
testing may be more appropriate. For instance, if the application’s user interface
will change considerably in the near future, then any automation might need to be
rewritten anyway. Also, sometimes there simply is not enough time to build test
automation. For the short term, manual testing may be more effective. If an
application has a very tight deadline, there is currently no test automation
available, and it’s imperative that the testing gets done within that time frame,
then manual testing is the best solution.

## Page object models

### Overview

Within your web app’s UI, there are areas where your tests interact with. A Page
Object only models these as objects within the test code. This reduces the amount
of duplicated code and means that if the UI changes, the fix needs only to be
applied in one place.

Page Object is a Design Pattern that has become popular in test automation for
enhancing test maintenance and reducing code duplication. A page object is an
object-oriented class that serves as an interface to a page of your AUT. The
tests then use the methods of this page object class whenever they need to
interact with the UI of that page. The benefit is that if the UI changes for
the page, the tests themselves don’t need to change, only the code within the
page object needs to change. Subsequently, all changes to support that new UI
are located in one place.

### Advantages

- There is a clean separation between the test code and page-specific code, such
  as locators (or their use if you’re using a UI Map) and layout.
- There is a single repository for the services or operations the page offers
  rather than having these services scattered throughout the tests.

There is a lot of flexibility in how the page objects may be designed, but there
are a few basic rules for getting the desired maintainability of your test code.

### Assertions in Page Objects

Page objects themselves should never make verifications or assertions. This is
part of your test and should always be within the test’s code, never in an page
object. The page object will contain the representation of the page, and the
services the page provides via methods but no code related to what is being
tested should be within the page object.

There is one, single, verification which can, and should, be within the page
object and that is to verify that the page, and possibly critical elements on
the page, were loaded correctly. This verification should be done while
instantiating the page object.

### Page Component Objects

A page object does not necessarily need to represent all the parts of a page
itself. This was [noted by Martin Fowler](https://martinfowler.com/bliki/PageObject.html#footnote-panel-object)
in the early days, while first coining the term “panel objects”.

The same principles used for page objects can be used to create “Page Component
Objects”, as it was later called, that represent discrete chunks of the page and
**can be included in page objects**. These component objects can provide references
to the elements inside those discrete chunks, and methods to leverage the
functionality or behavior provided by them.

The page and component are represented by their own objects. Both objects only
have methods for the **services** they offer, which matches the real-world
application in object-oriented programming.

You can even nest component objects inside other component objects for more
complex pages. If a page in the AUT (Application under test) has multiple
components, or common components used throughout the site (e.g. a navigation bar),
then it may improve maintainability and reduce code duplication.

### Summary

- The public methods represent the services that the page offers
- Try not to expose the internals of the page
- Generally don’t make assertions
- Methods return other PageObjects
- Need not represent an entire page
- Different results for the same action are modelled as different methods

### Example

Here is an example of a page object for a login page:

```java
public class LoginPage {
    private final WebDriver driver;

    public LoginPage(WebDriver driver) {
        this.driver = driver;

        // Check that we're on the right page.
        if (!"Login".equals(driver.getTitle())) {
            // Alternatively, we could navigate to the login page, perhaps logging out first
            throw new IllegalStateException("This is not the login page");
        }
    }

    // The login page contains several HTML elements that will be represented as WebElements.
    // The locators for these elements should only be defined once.
    By usernameLocator = By.id("username");
    By passwordLocator = By.id("passwd");
    By loginButtonLocator = By.id("login");

    // The login page allows the user to type their username into the username field
    public LoginPage typeUsername(String username) {
        // This is the only place that "knows" how to enter a username
        driver.findElement(usernameLocator).sendKeys(username);

        // Return the current page object as this action doesn't navigate to a page represented by another PageObject
        return this;
    }

    // The login page allows the user to type their password into the password field
    public LoginPage typePassword(String password) {
        // This is the only place that "knows" how to enter a password
        driver.findElement(passwordLocator).sendKeys(password);

        // Return the current page object as this action doesn't navigate to a page represented by another PageObject
        return this;
    }

    // The login page allows the user to submit the login form
    public HomePage submitLogin() {
        // This is the only place that submits the login form and expects the destination to be the home page.
        // A seperate method should be created for the instance of clicking login whilst expecting a login failure.
        driver.findElement(loginButtonLocator).submit();

        // Return a new page object representing the destination. Should the login page ever
        // go somewhere else (for example, a legal disclaimer) then changing the method signature
        // for this method will mean that all tests that rely on this behaviour won't compile.
        return new HomePage(driver);
    }

    // The login page allows the user to submit the login form knowing that an invalid username and / or password were entered
    public LoginPage submitLoginExpectingFailure() {
        // This is the only place that submits the login form and expects the destination to be the login page due to login failure.
        driver.findElement(loginButtonLocator).submit();

        // Return a new page object representing the destination. Should the user ever be navigated to the home page after submiting a login with credentials
        // expected to fail login, the script will fail when it attempts to instantiate the LoginPage PageObject.
        return new LoginPage(driver);
    }

    // Conceptually, the login page offers the user the service of being able to "log into"
    // the application using a user name and password.
    public HomePage loginAs(String username, String password) {
        // The PageObject methods that enter username, password & submit login have already defined and should not be repeated here.
        typeUsername(username);
        typePassword(password);
        return submitLogin();
    }
}
```

## Avoid Sharing State

Although mentioned in several places, it is worth mentioning again. We must ensure
that the tests are isolated from one another.

- Do not share test data. Imagine several tests that each query the database for
  valid orders before picking one to perform an action on. Should two tests pick
  up the same order you are likely to get unexpected behavior.
- Clean up stale data in the application that might be picked up by another
  test e.g. invalid order records.
- Create a new WebDriver instance per test. This helps ensure test isolation
  and makes parallelization simpler.

## Locators

In general, if HTML IDs are available, unique, and consistently predictable,
they are the preferred method for locating an element on a page. They tend to
work very quickly, and forego much processing that comes with complicated DOM
traversals.

If unique IDs are unavailable, a well-written CSS selector is the preferred
method of locating an element. XPath works as well as CSS selectors, but the
syntax is complicated and frequently difficult to debug. Though XPath selectors
are very flexible, they are typically not performance tested by browser vendors
and tend to be quite slow.

Selection strategies based on linkText and partialLinkText have drawbacks in that
they only work on link elements. Additionally, they call down to [querySelectorAll](https://www.w3.org/TR/webdriver/#link-text)
selectors internally in WebDriver.

Tag name can be a dangerous way to locate elements. There are frequently multiple
elements of the same tag present on the page. This is mostly useful when calling
the _findElements(By)_ method which returns a collection of elements.

The recommendation is to keep your locators as compact and readable as possible.
Asking WebDriver to traverse the DOM structure is an expensive operation, and
the more you can narrow the scope of your search, the better.

## Consider using a fluent API

Martin Fowler coined the term [“Fluent API”](https://www.martinfowler.com/bliki/FluentInterface.html).
Selenium already implements something like this in their `FluentWait` class,
which is meant as an alternative to the standard `Wait` class.

::: details Click to view example

```java
public abstract class BasePage {
    protected WebDriver driver;

    public BasePage(WebDriver driver) {
        this.driver = driver;
    }
}

public class GoogleSearchPage extends BasePage {
    public GoogleSearchPage(WebDriver driver) {
        super(driver);
        // Generally do not assert within pages or components.
        // Effectively throws an exception if the lambda condition is not met.
        new WebDriverWait(driver, Duration.ofSeconds(3)).until(d -> d.findElement(By.id("logo")));
    }

    public GoogleSearchPage setSearchString(String sstr) {
        driver.findElement(By.id("gbqfq")).sendKeys(sstr);
        return this;
    }

    public void clickSearchButton() {
        driver.findElement(By.id("gbqfb")).click();
    }
}
```

:::
