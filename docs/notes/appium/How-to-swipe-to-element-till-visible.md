---
title: Appium
titleTemplate: How to swipe to element till visible
description: How to swipe to element till visible
head:
  - - meta
    - name: description
      content: How to swipe to element till visible
tags:
  - Appium
categories:
  - Automation Framework
---

# How to swipe to element till visible <Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

## Approach 1: using `driver.perform Sequence`

```java
@Test(groups = {"NativeApp", "Gestures"}, description = "Swipe till an element visible by driver.perform")
public void testSwipeTillElementVisible() {
    var navigator = new NativeAppNavigator(iosDriver);
    var swipePage = navigator.navigateToSwipePage();
    var fingerGestureUtils = new FingerGestureUtils(iosDriver);

    int maxSwipeCount = 5;
    while (maxSwipeCount > 0 && !swipePage.getRobotImage().isDisplayed()) {
        fingerGestureUtils.swipe(UP, 200);
        maxSwipeCount--;
    }

    assertTrue(swipePage.getRobotImage().isDisplayed());
}
```

::: info
The `FingerGestureUtils` is defined [_here_](https://github.com/siyingcheng/appium-demo/blob/main/src/main/java/com/simon/core/utils/FingerGestureUtils.java#L84)
:::

## Approach 2: using `driver.executeScript` (W3C script)

```java
@Test(groups = {"NativeApp", "Gestures"}, description = "Swipe till an element visible by execute W3C script")
public void testSwipeTillElementVisibleUsingScript() {
    var navigator = new NativeAppNavigator(iosDriver);
    var swipePage = navigator.navigateToSwipePage();

    // way 1:
//        MobileGestures.of(iosDriver)
//                .scroll(Direction.DOWN);

    // way 2:
    while (!swipePage.getRobotImage().isDisplayed()) {
        MobileGestures.of(iosDriver)
                .swipe(Direction.UP);

        assertTrue(swipePage.getRobotImage().isDisplayed());
    }
}
```

::: info
The `MobileGestures` is defined [_here_](https://github.com/siyingcheng/appium-demo/blob/main/src/main/java/com/simon/core/utils/MobileGestures.java#L67)
:::

## Approach 3: using `UIAutomator` (_Only for Android_)

```java
// Only Android
@Test(groups = {"NativeApp", "Gestures", "OnlyAndroid"}, description = "Swipe till an element visible by UIAutomator")
public void testSwipeTillElementVisibleUsingUIAutomator() {
    var navigator = new NativeAppNavigator(iosDriver);
    var swipePage = navigator.navigateToSwipePage();

    final var scrolledLogo = AppiumBy.androidUIAutomator(
            """
                new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("WebdriverIO logo"));
                """);

    iosDriver.findElement(scrolledLogo);

    assertTrue(swipePage.getRobotImage().isDisplayed());
}

```

::: tip
More about `UiAutomator` locator please view [_here_](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/uiautomator-uiselector.md)
:::
