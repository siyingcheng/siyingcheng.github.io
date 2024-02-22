---
title: Appium Client Basic Usage
titleTemplate: Java Client
description: Appium Java Client Basic Usage
head:
  - - meta
    - name: description
      content: Appium Java Client Basic Usage
tags:
  - Appium
categories:
  - Automation Framework
---

# Appium Client Basic Usage <Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

## Java client

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=blue)](https://github.com/appium/java-client)
[Java client](https://mvnrepository.com/artifact/io.appium/java-client) for Appium Mobile WebDriver.
And there are much more code examples by checking client's [unit and integration tests](https://github.com/appium/java-client/blob/master/src/test/java/io/appium/java_client).

::: code-group

```xml [Maven]
<dependency>
    <groupId>io.appium</groupId>
    <artifactId>java-client</artifactId>
    <version>...</version>
</dependency>
```

```groovy [Gradle]
implementation group: 'io.appium', name: 'java-client', version: '...'
```

:::

### AndroidDriver and IOSDriver

Usage Example
::: code-group

```java [UiAutomator2]
UiAutomator2Options options = new UiAutomator2Options()
    .setUdid('123456')
    .setApp("/home/myapp.apk");
AndroidDriver driver = new AndroidDriver(
    // The default URL in Appium 1 is http://127.0.0.1:4723/wd/hub
    new URL("http://127.0.0.1:4723"), options
);
try {
    WebElement el = driver.findElement(AppiumBy.xpath, "//Button");
    el.click();
    driver.getPageSource();
} finally {
    driver.quit();
}
```

```java [XCUITest]
XCUITestOptions options = new XCUITestOptions()
    .setUdid('123456')
    .setApp("/home/myapp.ipa");
IOSDriver driver = new IOSDriver(
    // The default URL in Appium 1 is http://127.0.0.1:4723/wd/hub
    new URL("http://127.0.0.1:4723"), options
);
try {
    WebElement el = driver.findElement(AppiumBy.accessibilityId, "myId");
    el.click();
    driver.getPageSource();
} finally {
    driver.quit();
}
```

:::

### Appium Driver Local Service

There are two ways to start the Appium service:using the `appium` command in shell
or using the `AppiumDriverLocalService` class.

```java
public static AppiumDriverLocalService startAppiumServer() {
    service = new AppiumServiceBuilder()
            .withIPAddress("127.0.0.1")
            .usingPort(PORT)
            .withTimeout(SERVER_START_TIMEOUT)
            .build();
    service.start();
    return service;
}
```

So you can start the appium service in before class:

```java {3}
@BeforeAll
public static void beforeClass() throws Exception {
    startAppiumServer();
    ...
}
```

And do not forget to shutdown:

```java {7}
@AfterAll
public static void afterClass() {
    if (driver != null) {
        driver.quit();
    }
    if (service != null) {
        service.stop();
    }
}
```

### Locator

- [UiAutomator](https://developer.android.com/reference/androidx/test/uiautomator/package-summary.html)
- accessibility
- iOSNsPredicate
- iOSClassChain
- androidDataMatcher
- androidViewMatcher
- Other same as WebElement

### System Clipboard

System clipboard support set and get `PLAINTEXT`, `IMAGE` and `URL`.

::: code-group

```java [PLAINTEXT]
iosDriver.setClipboardText(text); // set
String result = iosDriver.getClipboardText(); // get
```

```java [IMAGE]
BufferedImage bufferedImage = ImageIO.read(fileNameOrUrl);
iosDriver.setClipboardImage(bufferedImage); // set
BufferedImage clipboardImage = iosDriver.getClipboardImage(); // get
```

```java [URL]
iosDriver.setClipboardUrl(url); // set
URL clipboardUrl = iosDriver.getClipboardUrl(); // get
```

:::

### Alert

```java
// accept
driver.switchTo().alert().accept();
// dismiss
driver.switchTo().alert().dismiss();
// get text
driver.switchTo().alert().getText();
```

### Screen Recording

```java
iosDriver.startRecordingScreen(
                new IOSStartScreenRecordingOptions()
                        .withTimeLimit(Duration.ofSeconds(10))
        );
        Thread.sleep(5000);
        String result = iosDriver.stopRecordingScreen();
        // save video
        // byte[] video = Base64.getDecoder().decode(result);
        // Files.write(Path.of("video.mp4"), video);
        assertFalse(result.isEmpty());
```

### Rotation

```java
// Landscape right
DeviceRotation landscapeRightRotation = new DeviceRotation(0, 0, 90);
driver.rotate(landscapeRightRotation);

// Landscape left
DeviceRotation landscapeLeftRotation = new DeviceRotation(0, 0, 270);
driver.rotate(landscapeLeftRotation);

// Reset
driver.rotate(new DeviceRotation(0, 0, 0));

// Get Rotation
driver.rotation();
```

### Gestures (by driver.perform)

#### SWIPE

```java
public void swipe(final Direction direction, int distance) {
    swipe(direction, null, distance);
}

public void swipe(final Direction direction, final WebElement element, int distance) {
    final var start = getSwipeStartPosition(element);
    final var end = getSwipeEndPosition(direction, element, distance);

    final var sequence = singleFingerSwipe(FINGER_1, 0, start, end);
    this.driver.perform(singleton(sequence));
}

private Sequence singleFingerSwipe(final String fingerName, final int index, final Point start, final Point end) {
    final var finger = new PointerInput(TOUCH, fingerName);
    final var sequence = new Sequence(finger, index);

    sequence.addAction(finger.createPointerMove(ZERO, viewport(), start.getX(), start.getY()));
    sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));

    if (Objects.nonNull(end)) {
        sequence.addAction(new Pause(finger, ofMillis(500)));
        sequence.addAction(finger.createPointerMove(ofMillis(500), viewport(), end.getX(), end.getY()));
    }

    sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

    return sequence;
}
```

#### TAP

```java
public void tap(final WebElement element) {
    final var start = getElementCenter(element);
    final var sequence = singleFingerSwipe(FINGER_1, 0, start, null);

    this.driver.perform(singleton(sequence));
}
```

#### DRAG TO

```java
public void dragTo(final WebElement source, final WebElement target) {
    final var start = getElementCenter(source);
    final var end = getElementCenter(target);

    final var sequence = singleFingerSwipe(FINGER_1, 0, start, end);
    this.driver.perform(singleton(sequence));
}
```

#### ZOOM IN

```java
public void zoomIn(final WebElement element, int distance) {
    final var start = getSwipeStartPosition(element);
    final var start1 = new Point(start.getX() - 50, start.getY());
    final var start2 = new Point(start.getX() + 50, start.getY());

    final var end1 = getSwipeEndPosition(LEFT, element, distance);
    final var end2 = getSwipeEndPosition(RIGHT, element, distance);


    final var sequence1 = singleFingerSwipe(FINGER_1, 0, start1, end1);
    final var sequence2 = singleFingerSwipe(FINGER_2, 0, start2, end2);
    this.driver.perform(List.of(sequence1, sequence2));
}
```

#### ZOOM OUT

```java
public void zoomOut(final WebElement element, int distance) {
    final var start = getSwipeStartPosition(element);
    final var start1 = new Point(start.getX() - 50, start.getY());
    final var start2 = new Point(start.getX() + 50, start.getY());

    final var end1 = getSwipeEndPosition(RIGHT, element, distance);
    final var end2 = getSwipeEndPosition(LEFT, element, distance);

    final var sequence1 = singleFingerSwipe(FINGER_1, 0, end1, start1);
    final var sequence2 = singleFingerSwipe(FINGER_2, 0, end2, start2);
    this.driver.perform(List.of(sequence1, sequence2));
}
```
