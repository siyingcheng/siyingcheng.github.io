---
title: WebDriver
titleTemplate: Selenium
description: Notes for Selenium WebDriver
head:
  - - meta
    - name: description
      content: Notes for Selenium WebDriver
tags:
  - Selenium
categories:
  - Notes
---

# WebDriver <Badge type="tip" text="Selenium" /><Badge type="warning" text="Notes" />

## Install Library

::: code-group

```xml [maven]
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.18.1</version>
</dependency>
```

```kotlin [gradle]
testImplementation 'org.seleniumhq.selenium:selenium-java:4.18.1'
testImplementation 'org.junit.jupiter:junit-jupiter-engine:5.10.0'
```

:::

Remember to change the version to the latest stable release.

## Start the session

```java
// Optional. If not specified, WebDriver searches the PATH for chromedriver.
System.setProperty("webdriver.edge.driver", "/path/to/driver/msedgedriver");

var driver = new EdgeDriver();
// Other WebDrivers
// ChromeDriver
// ChromiumDriver
// EdgeDriver
// FirefoxDriver
// InternetExplorerDriver
// SafariDriver
driver.quit();
```

With driver options:

```java
var options = new EdgeOptions();
// start with maximized window
options.addArguments("start-maximized");
// options.setBinary("/path/to/other/edge/binary");
options.setExperimentalOption("excludeSwitches",
        List.of(
                // hide notification bar "... is being controlled by automated test software"
                "enable-automation",
                // block pop-ups
                "disable-popup-blocking"
        ));
// set default download path
var prefs = Map.of("download.default_directory", "/Volumes/Data/download");
options.setExperimentalOption("prefs", prefs);
// set headless
options.addArguments("--headless");
var driver = new EdgeDriver(options);
```

## Page Load Strategy

- normal(default): WebDriver waits until the [load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)
  event fire is returned.
- eager: WebDriver waits until [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
  event fire is returned.
- none: WebDriver only waits until the initial page is downloaded.

::: code-group

```java [normal(default)]
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setPageLoadStrategy(PageLoadStrategy.NORMAL);
WebDriver driver = new ChromeDriver(chromeOptions);
```

```java [eager]
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setPageLoadStrategy(PageLoadStrategy.EAGER);
WebDriver driver = new ChromeDriver(chromeOptions);
```

```java [none]
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setPageLoadStrategy(PageLoadStrategy.NONE);
WebDriver driver = new ChromeDriver(chromeOptions);
```

:::

## Logging

```java
EdgeDriverService service = new EdgeDriverService.Builder()
    .withLogFile(logFile.toFile())
    .withLoglevel(ChromiumDriverLogLevel.INFO)
    .withBuildCheckDisabled(true)
    .withAppendLog(true)
    .withReadableTimestamp(true)
    .build();

driver = new EdgeDriver(service, options);
```

## Waits

### Implicit Wait

Selenium has a built-in way to automatically wait for elements called an _implicit wait_.
An implicit wait value can be set either with the [timeouts](https://www.selenium.dev/documentation/webdriver/drivers/options/#timeouts)
capability in the browser options, or with a driver method (as shown below).

This is a global setting that applies to every element location call for the
entire session. The default value is `0`, which means that if the element is not
found, it will immediately return an error. If an implicit wait is set, the driver
will wait for the duration of the provided value before returning the error.
Note that as soon as the element is located, the driver will return the element
reference and the code will continue executing, so a larger implicit wait value
won’t necessarily increase the duration of the session.

_Warning_: Do not mix implicit and explicit waits. Doing so can cause unpredictable
wait times. For example, setting an implicit wait of 10 seconds and an explicit
wait of 15 seconds could cause a timeout to occur after 20 seconds.

Solving our example with an implicit wait looks like this:

```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
```

### Explicit Waits

_Explicit waits_ are loops added to the code that poll the application for a
specific condition to evaluate as true before it exits the loop and continues to
the next command in the code. If the condition is not met before a designated
timeout value, the code will give a timeout error. Since there are many ways for
the application not to be in the desired state, so explicit waits are a great
choice to specify the exact condition to wait for in each place it is needed.
Another nice feature is that, by default, the Selenium Wait class automatically
waits for the designated element to exist.

```java
Wait<WebDriver> wait = new WebDriverWait(driver, Duration.ofSeconds(2));
wait.until(d -> revealed.isDisplayed());
```

**Expected Conditions:**

These methods can include conditions such as:

- element exists
- element is stale
- element is visible
- text is visible
- title contains specified value

[Expected conditions documentation](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/ExpectedConditions.html)

::: details Click to view examples

```java
waiter.until(ExpectedConditions.presenceOfElementLocated(locator));

waiter.until(ExpectedConditions.stalenessOf(element));

waiter.until(ExpectedConditions.visibilityOf(element));
waiter.until(ExpectedConditions.visibilityOfElementLocated(locator));
waiter.until(ExpectedConditions.visibilityOfNestedElementsLocatedBy(element, locator));

waiter.until(ExpectedConditions.invisibilityOf(element));
waiter.until(ExpectedConditions.invisibilityOfElementLocated(locator));

waiter.until(ExpectedConditions.textToBePresentInElement(element, "text content"));
waiter.until(ExpectedConditions.textToBe(locator, "text content"));
waiter.until(ExpectedConditions.textMatches(locator, Pattern.compile("(NORMAL)|(HARD)")));

waiter.until(ExpectedConditions.titleIs("Title content"));
waiter.until(ExpectedConditions.titleContains("Title content"));
```

:::

**Customization:**

```java
Wait<WebDriver> wait =
    new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(2))
        .pollingEvery(Duration.ofMillis(300))
        .ignoring(ElementNotInteractableException.class);

wait.until(
    d -> {
      revealed.sendKeys("Displayed");
      return true;
    });
```

## Elements

### File Upload

Because Selenium cannot interact with the file upload dialog, it provides a way
to upload files without opening the dialog. If the element is an `input` element
with type `file`, you can use the send keys method to send the full path to the
file that will be uploaded.

```java
WebElement fileInput = driver.findElement(By.cssSelector("input[type=file]"));
fileInput.sendKeys(uploadFile.getAbsolutePath());
driver.findElement(By.id("file-submit")).click();
```

### Locators

#### Traditional Locators

Selenium provides support for these 8 traditional location strategies in WebDriver:

| Locator           | Description                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| class name        | Locates elements whose class name contains the search value (compound class names are not permitted)                                          |
| css selector      | Locates elements matching a CSS selector                                                                                                      |
| id                | Locates elements whose ID attribute matches the search value                                                                                  |
| name              | Locates elements whose NAME attribute matches the search value                                                                                |
| link text         | Locates anchor elements whose visible text matches the search value                                                                           |
| partial link text | Locates anchor elements whose visible text contains the search value. If multiple elements are matching, only the first one will be selected. |
| tag name          | Locates elements whose tag name matches the search value                                                                                      |
| xpath             | Locates elements matching an XPath expression                                                                                                 |
