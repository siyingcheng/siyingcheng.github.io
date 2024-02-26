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

#### Relative Locators

Selenium 4 introduces Relative Locators (previously called _Friendly Locators_).
These locators are helpful when it is not easy to construct a locator for the
desired element, but easy to describe spatially where the element is in relation
to an element that does have an easily constructed locator.

Selenium uses the JavaScript function [getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
to determine the size and position of elements on the page, and can use this
information to locate neighboring elements.

**Available relative locators:**

- `above`
- `below`
- `near`
- `toLeftOf`
- `toRightOf`

_Chaining relative locators:_ You can also chain locators if needed. Sometimes the
element is most easily identified as being both above/below one element and
right/left of another.

## Interactions

### Browser Interactions

Get browser information:

- Get title: `driver.getTitle()`
- Get current URL: `driver.getCurrentUrl()`

### Navigation

Browser navigation:

- Navigate to: `driver.get(url)` or `driver.navigate().to(url)`
- Back: `driver.navigate().back()`
- Forward: `driver.navigate().forward()`
- Refresh: `driver.navigate().refresh()`

### JavaScript Alerts, Prompts and Confirmations

#### Alerts

WebDriver can get the text from the popup and accept or dismiss these alerts.

```java
//Click the link to activate the alert
driver.findElement(By.linkText("See an example alert")).click();

//Wait for the alert to be displayed and store it in a variable
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

//Store the alert text in a variable
String text = alert.getText();

//Press the OK button
alert.accept();
```

#### Confirm

A confirm box is similar to an alert, except the user can also choose to cancel the message.

```java
//Click the link to activate the alert
driver.findElement(By.linkText("See a sample confirm")).click();

//Wait for the alert to be displayed
wait.until(ExpectedConditions.alertIsPresent());

//Store the alert in a variable
Alert alert = driver.switchTo().alert();

//Store the alert in a variable for reuse
String text = alert.getText();

//Press the Cancel button
alert.dismiss();
```

#### Prompt

Prompts are similar to confirm boxes, except they also include a text input.
Similar to working with form elements, you can use WebDriver’s send keys to fill
in a response. This will completely replace the placeholder text. Pressing the
cancel button will not submit any text.

```java
//Click the link to activate the alert
driver.findElement(By.linkText("See a sample prompt")).click();

//Wait for the alert to be displayed and store it in a variable
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

//Type your message
alert.sendKeys("Selenium");

//Press the OK button
alert.accept();

```

### Cookies

#### Add Cookies

It is used to add a cookie to the current browsing context. Add Cookie only
accepts a set of defined serializable JSON object. [Here](https://www.w3.org/TR/webdriver1/#cookies)
is the link to the list of accepted JSON key values

```java
// Adds the cookie into current browser context
driver.manage().addCookie(new Cookie("key", "value"));
```

### Get Named Cookie

```java
// Get cookie details with named cookie 'foo'
Cookie cookieFoo = driver.manage().getCookieNamed("foo");
```

#### Get All Cookies

```java
// Get All available cookies
Set<Cookie> cookies = driver.manage().getCookies();
```

#### Delete Cookies

```java
driver.manage().addCookie(new Cookie("test1", "cookie1"));
Cookie cookie1 = new Cookie("test2", "cookie2");
driver.manage().addCookie(cookie1);

// delete a cookie with name 'test1'
driver.manage().deleteCookieNamed("test1");

/*
  Selenium Java bindings also provides a way to delete
  cookie by passing cookie object of current browsing context
  */
driver.manage().deleteCookie(cookie1);
```

#### Delete All Cookies

```java
// deletes all cookies
driver.manage().deleteAllCookies();
```

#### Same-Site Cookie Attribute

It allows a user to instruct browsers to control whether cookies are sent along
with the request initiated by third party sites. It is introduced to prevent
CSRF (Cross-Site Request Forgery) attacks.

Same-Site cookie attribute accepts two parameters as instructions.

- _Strict_: When the sameSite attribute is set as `Strict`, the cookie will not be
  sent along with requests initiated by third party websites.
- _Lax_: When you set a cookie sameSite attribute to `Lax`, the cookie will be sent
  along with the GET request initiated by third party website.

```java
Cookie cookie = new Cookie.Builder("key", "value").sameSite("Strict").build();
Cookie cookie1 = new Cookie.Builder("key", "value").sameSite("Lax").build();
driver.manage().addCookie(cookie);
driver.manage().addCookie(cookie1);
```

### Working with IFrames and frames

Frames are a now deprecated means of building a site layout from multiple documents
on the same domain. You are unlikely to work with them unless you are working
with an pre HTML5 webapp. Iframes allow the insertion of a document from an
entirely different domain, and are still commonly used.

Switching using a WebElement is the most flexible option. You can find the frame
using your preferred selector and switch to it.

```java
//Store the web element
WebElement iframe = driver.findElement(By.cssSelector("#modal>iframe"));

//Switch to the frame
driver.switchTo().frame(iframe);

//Now we can click the button
driver.findElement(By.tagName("button")).click();
```

**Using a name or ID:** If your frame or iframe has an id or name attribute, this
can be used instead. If the name or ID is not unique on the page, then the first
one found will be switched to.

````java
//Using the ID
driver.switchTo().frame("buttonframe");

//Or using the name instead
driver.switchTo().frame("myframe");

//Now we can click the button
driver.findElement(By.tagName("button")).click();```
````

**Using an index:** It is also possible to use the index of the frame, such as
can be queried using _window.frames_ in JavaScript.

```java
// Switches to the second frame
driver.switchTo().frame(1);
```

**Leaving a frame:** To leave an iframe or frameset, switch back to the default
content like so:

```java
// Return to the top level
driver.switchTo().defaultContent();
```

### Working with Windows and Tabs

**Get window handle:** WebDriver does not make the distinction between windows and
tabs. If your site opens a new tab or window, Selenium will let you work with it
using a window handle. Each window has a unique identifier which remains persistent
in a single session. You can get the window handle of the current window by using:

```java
driver.getWindowHandle();
```

**Switching windows or tabs:** Clicking a link which opens in a new window will
focus the new window or tab on screen, but WebDriver will not know which window
the Operating System considers active. To work with the new window you will need
to switch to it. If you have only two tabs or windows open, and you know which
window you start with, by the process of elimination you can loop over both windows
or tabs that WebDriver can see, and switch to the one which is not the original.

However, Selenium 4 provides a new api [NewWindow](https://www.selenium.dev/documentation/webdriver/interactions/windows/#create-new-window-or-new-tab-and-switch)
which creates a new tab (or) new window and automatically switches to it.

::: details Click to view example

```java
//Store the ID of the original window
String originalWindow = driver.getWindowHandle();

//Check we don't have other windows open already
assert driver.getWindowHandles().size() == 1;

//Click the link which opens in a new window
driver.findElement(By.linkText("new window")).click();

//Wait for the new window or tab
wait.until(numberOfWindowsToBe(2));

//Loop through until we find a new window handle
for (String windowHandle : driver.getWindowHandles()) {
    if(!originalWindow.contentEquals(windowHandle)) {
        driver.switchTo().window(windowHandle);
        break;
    }
}

//Wait for the new tab to finish loading content
wait.until(titleIs("Selenium documentation"));
```

:::

**Create new window (or) new tab and switch:** Creates a new window (or) tab and
will focus the new window or tab on screen. You don’t need to switch to work
with the new window (or) tab. If you have more than two windows (or) tabs opened
other than the new window, you can loop over both windows or tabs that WebDriver
can see, and switch to the one which is not the original.

_Note: This feature works with Selenium 4 and later versions._

```java
// Opens a new tab and switches to new tab
driver.switchTo().newWindow(WindowType.TAB);

// Opens a new window and switches to new window
driver.switchTo().newWindow(WindowType.WINDOW);

```

**Closing a window or tab:**

```java
//Close the tab or window
driver.close();

//Switch back to the old tab or window
driver.switchTo().window(originalWindow);
```

**Quitting the browser at the end of a session:** When you are finished with the
browser session you should call quit, instead of close:

```java
driver.quit();
```

Quit will:

- Close all the windows and tabs associated with that WebDriver session
- Close the browser process
- Close the background driver process
- Notify Selenium Grid that the browser is no longer in use so it can be used by
  another session (if you are using Selenium Grid)

Failure to call quit will leave extra background processes and ports running on
your machine which could cause you problems later.

Some test frameworks offer methods and annotations which you can hook into to
tear down at the end of a test.

```java
/**
 * Example using JUnit
 * https://junit.org/junit5/docs/current/api/org/junit/jupiter/api/AfterAll.html
 */
@AfterAll
public static void tearDown() {
    driver.quit();
}

```

#### Window Management

Screen resolution can impact how your web application renders, so WebDriver
provides mechanisms for moving and resizing the browser window.

**Get window size:** Fetches the size of the browser window in pixels.

```java
//Access each dimension individually
int width = driver.manage().window().getSize().getWidth();
int height = driver.manage().window().getSize().getHeight();

//Or store the dimensions and query them later
Dimension size = driver.manage().window().getSize();
int width1 = size.getWidth();
int height1 = size.getHeight();

```

**Set window size:** Restores the window and sets the window size.

```java
driver.manage().window().setSize(new Dimension(1024, 768));
```

**Get window position:** Fetches the coordinates of the top left coordinate of
the browser window.

```java
// Access each dimension individually
int x = driver.manage().window().getPosition().getX();
int y = driver.manage().window().getPosition().getY();

// Or store the dimensions and query them later
Point position = driver.manage().window().getPosition();
int x1 = position.getX();
int y1 = position.getY();
```

**Set window position:** Moves the window to the chosen position.

```java
// Move the window to the top left of the primary monitor
driver.manage().window().setPosition(new Point(0, 0));
```

**Maximize window:** Enlarges the window. For most operating systems, the window
will fill the screen, without blocking the operating system’s own menus and toolbars.

```java
driver.manage().window().maximize();
```

**Minimize window:** Minimizes the window of current browsing context. The exact
behavior of this command is specific to individual window managers.

Minimize Window typically hides the window in the system tray.

_Note: This feature works with Selenium 4 and later versions._

```java
driver.manage().window().minimize();
```

**Fullscreen window:** Fills the entire screen, similar to pressing F11 in most browsers.

```java
driver.manage().window().fullscreen();
```

#### TakeScreenshot

Used to capture screenshot for current browsing context. The WebDriver endpoint
[screenshot](https://www.w3.org/TR/webdriver/#dfn-take-screenshot) returns
screenshot which is encoded in Base64 format.

```java
File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(scrFile, new File("./image.png"));
```

#### TakeElementScreenshot

Used to capture screenshot of an element for current browsing context. The WebDriver
endpoint [screenshot](https://www.w3.org/TR/webdriver/#take-element-screenshot)
returns screenshot which is encoded in Base64 format.

```java
WebElement element = driver.findElement(By.cssSelector("h1"));
File scrFile = element.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(scrFile, new File("./image.png"));
```

#### Execute Script

Executes JavaScript code snippet in the current context of a selected frame or window.

```java
//Creating the JavascriptExecutor interface object by Type casting
JavascriptExecutor js = (JavascriptExecutor) driver;
//Button Element
WebElement button = driver.findElement(By.name("btnLogin"));
//Executing JavaScript to click on element
js.executeScript("arguments[0].click();", button);
//Get return value from script
String text = (String) js.executeScript("return arguments[0].innerText", button);
//Executing JavaScript directly
js.executeScript("console.log('hello world')");
```

#### Print Page

Prints the current page within the browser.

_Note: This requires Chromium Browsers to be in headless mode_

```java
printer = (PrintsPage) driver;

PrintOptions printOptions = new PrintOptions();
printOptions.setPageRanges("1-2");

Pdf pdf = printer.print(printOptions);
String content = pdf.getContent();
```

### Virtual Authenticator

A representation of the Web Authenticator model. [_Here_](https://www.selenium.dev/documentation/webdriver/interactions/virtual_authenticator/)
is the link to the official documentation.

## Actions API

A low-level interface for providing virtualized device input actions to the web browser.

In addition to the high-level element interactions, the _Actions API_ provides
granular control over exactly what designated input devices can do. Selenium
provides an interface for 3 kinds of input sources: a key input for keyboard
devices, a pointer input for a mouse, pen or touch devices, and wheel inputs
for scroll wheel devices (introduced in Selenium 4.2). Selenium allows you to
construct individual action commands assigned to specific inputs and chain them
together and call the associated perform method to execute them all at once.

### Action Builder

In the move from the legacy JSON Wire Protocol to the new W3C WebDriver Protocol,
the low level building blocks of actions became especially detailed. It is
extremely powerful, but each input device has a number of ways to use it and if
you need to manage more than one device, you are responsible for ensuring proper
synchronization between them.

Thankfully, you likely do not need to learn how to use the low level commands
directly, since almost everything you might want to do has been given a convenience
method that combines the lower level commands for you. These are all documented in
[keyboard](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/),
[mouse](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/),
[pen](https://www.selenium.dev/documentation/webdriver/actions_api/pen/),
and [wheel](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/) pages.

#### Pause

Pointer movements and Wheel scrolling allow the user to set a duration for the
action, but sometimes you just need to wait a beat between actions for things to
work correctly.

```java
WebElement clickable = driver.findElement(By.id("clickable"));
new Actions(driver)
        .moveToElement(clickable)
        .pause(Duration.ofSeconds(1))
        .clickAndHold()
        .pause(Duration.ofSeconds(1))
        .sendKeys("abc")
        .perform();
```

#### Release All Actions

An important thing to note is that the driver remembers the state of all the input
items throughout a session. Even if you create a new instance of an actions class,
the depressed keys and the location of the pointer will be in whatever state a
previously performed action left them.

There is a special method to release all currently depressed keys and pointer
buttons. This method is implemented differently in each of the languages because
it does not get executed with the perform method.

```java
((RemoteWebDriver) driver).resetInputState();
```

### Keyboard Actions

A representation of any key input device for interacting with a web page.

There are only 2 actions that can be accomplished with a keyboard: pressing down
on a key, and releasing a pressed key. In addition to supporting ASCII characters,
each keyboard key has a representation that can be pressed or released in designated
sequences.

#### Keys

In addition to the keys represented by regular unicode, unicode values have been
assigned to other keyboard keys for use with Selenium. Each language has its own
way to reference these keys; the full list can be found [here](https://www.w3.org/TR/webdriver/#keyboard-actions).

Java Keys enum: [_org.openqa.selenium.Keys_](https://github.com/SeleniumHQ/selenium/blob/selenium-4.2.0/java/src/org/openqa/selenium/Keys.java#L28)

::: code-group

```java [Key Down]
new Actions(driver)
        .keyDown(Keys.SHIFT)
        .sendKeys("a")
        .perform();
```

```java [Key Up]
new Actions(driver)
        .keyDown(Keys.SHIFT)
        .sendKeys("a")
        .keyUp(Keys.SHIFT)
        .sendKeys("b")
        .perform();
```

```java [Send Keys]
// Active Element
new Actions(driver)
        .sendKeys("abc")
        .perform();
// Designated Element
new Actions(driver)
        .sendKeys(textField, "Selenium!")
        .perform();
```

:::

#### Copy and Paste

Here’s an example of using all of the above methods to conduct a copy / paste action.
Note that the key to use for this operation will be different depending on if it
is a Mac OS or not. This code will end up with the text: `SeleniumSelenium`!

```java
Keys cmdCtrl = Platform.getCurrent().is(Platform.MAC) ? Keys.COMMAND : Keys.CONTROL;

WebElement textField = driver.findElement(By.id("textInput"));
new Actions(driver)
        .sendKeys(textField, "Selenium!")
        .sendKeys(Keys.ARROW_LEFT)
        .keyDown(Keys.SHIFT)
        .sendKeys(Keys.ARROW_UP)
        .keyUp(Keys.SHIFT)
        .keyDown(cmdCtrl)
        .sendKeys("xvv")
        .keyUp(cmdCtrl)
        .perform();

Assertions.assertEquals("SeleniumSelenium!", textField.getAttribute("value"));
```

### Mouse Actions

A representation of any pointer device for interacting with a web page.

There are only 3 actions that can be accomplished with a mouse:

- pressing down on a button
- releasing a pressed button
- moving the mouse.

Selenium provides convenience methods that combine these actions in the most common ways.

::: code-group

```java [Click and hold]
WebElement clickable = driver.findElement(By.id("clickable"));
new Actions(driver)
        .clickAndHold(clickable)
        .perform();
```

```java [Click and release]
WebElement clickable = driver.findElement(By.id("click"));
new Actions(driver)
        .click(clickable)
        .perform();
```

:::

**Alternate Button Clicks:** There are a total of 5 defined buttons for a Mouse

- 0 — Left Button (the default)
- 1 — Middle Button (currently unsupported)
- 2 — Right Button
- 3 — X1 (Back) Button
- 4 — X2 (Forward) Button

::: code-group

```java [Context Click]
// Context Click: This method combines moving to the center of an element with
// pressing and releasing the right mouse button (button 2). This is otherwise
// known as “right-clicking”:
WebElement clickable = driver.findElement(By.id("clickable"));
new Actions(driver)
        .contextClick(clickable)
        .perform();
```

```java [Back Click]
// Back Click: There is no convenience method for this, it is just pressing and
// releasing mouse button 3
PointerInput mouse = new PointerInput(PointerInput.Kind.MOUSE, "default mouse");

Sequence actions = new Sequence(mouse, 0)
        .addAction(mouse.createPointerDown(PointerInput.MouseButton.BACK.asArg()))
        .addAction(mouse.createPointerUp(PointerInput.MouseButton.BACK.asArg()));

((RemoteWebDriver) driver).perform(Collections.singletonList(actions));
```

```java [Back Click]
// Forward Click: There is no convenience method for this, it is just pressing
// and releasing mouse button 4
PointerInput mouse = new PointerInput(PointerInput.Kind.MOUSE, "default mouse");

Sequence actions = new Sequence(mouse, 0)
        .addAction(mouse.createPointerDown(PointerInput.MouseButton.FORWARD.asArg()))
        .addAction(mouse.createPointerUp(PointerInput.MouseButton.FORWARD.asArg()));

((RemoteWebDriver) driver).perform(Collections.singletonList(actions));
```

```java [Double Click]
// This method combines moving to the center of an element with pressing and
// releasing the left mouse button twice.
WebElement clickable = driver.findElement(By.id("clickable"));
new Actions(driver)
        .doubleClick(clickable)
        .perform();
```

:::

#### Move

::: code-group

```java [Move to element]
// This method moves the mouse to the in-view center point of the element.
// This is otherwise known as “hovering.” Note that the element must be in the
// viewport or else the command will error.
WebElement hoverable = driver.findElement(By.id("hover"));
new Actions(driver)
        .moveToElement(hoverable)
        .perform();
```

```java [Move by offset]
// These methods first move the mouse to the designated origin and then by the
// number of pixels in the provided offset. Note that the position of the mouse
// must be in the viewport or else the command will error.

// 1. Offset from Element: This method moves the mouse to the in-view center point
// of the element, then moves by the provided offset.
WebElement tracker = driver.findElement(By.id("mouse-tracker"));
new Actions(driver)
        .moveToElement(tracker, 8, 0)
        .perform();

// 2. Offset from Viewport: This method moves the mouse from the upper left
// corner of the current viewport by the provided offset.
PointerInput mouse = new PointerInput(PointerInput.Kind.MOUSE, "default mouse");

Sequence actions = new Sequence(mouse, 0)
        .addAction(mouse.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 8, 12));

((RemoteWebDriver) driver).perform(Collections.singletonList(actions));
```

```java [Offset from Current Pointer Location]
// This method moves the mouse from its current position by the offset provided
// by the user. If the mouse has not previously been moved, the position will be
// in the upper left corner of the viewport. Note that the pointer position does
// not change when the page is scrolled.
new Actions(driver)
        .moveByOffset(13, 15)
        .perform();
```

:::

#### Drag and Drop

::: code-group

```java [Drag and Drop on Element]
// This method firstly performs a click-and-hold on the source element, moves to
// the location of the target element and then releases the mouse.
WebElement draggable = driver.findElement(By.id("draggable"));
WebElement droppable = driver.findElement(By.id("droppable"));
new Actions(driver)
        .dragAndDrop(draggable, droppable)
        .perform();
```

```java [Drag and Drop by Offset]
// This method firstly performs a click-and-hold on the source element, moves to
// the given offset and then releases the mouse.

WebElement draggable = driver.findElement(By.id("draggable"));
Rectangle start = draggable.getRect();
Rectangle finish = driver.findElement(By.id("droppable")).getRect();
new Actions(driver)
        .dragAndDropBy(draggable, finish.getX() - start.getX(), finish.getY() - start.getY())
        .perform();
```

:::

### Pen

A representation of a pen stylus kind of pointer input for interacting with a web page.
[_Here_](https://www.selenium.dev/documentation/webdriver/actions_api/pen/) is the link to the official documentation.

### Wheel

A representation of a scroll wheel input device for interacting with a web page.
[_Here_](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/) is the link to the official documentation.
