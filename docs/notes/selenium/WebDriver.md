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

```maven
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.18.1</version>
</dependency>
```

```gradle
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
