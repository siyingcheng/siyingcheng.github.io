---
title: Appium IOS Touch
description: Appium IOS Touch
head:
  - - meta
    - name: description
      content: Appium IOS Touch
tags:
  - Appium
categories:
  - Automation Framework
---

# IOS Touch <Badge type='danger' text='@Deprecated' /><Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

::: tip
[Official Document](https://appium.github.io/appium.io/docs/en/writing-running-appium/touch-actions/) :star2:
:::

Touch basic usage:

::: code-group

```java [Touch]
new IOSTouchAction(iosDriver)
        .tap(tapOptions()
                .withElement(element(e)))
        .perform();
```

```java [Touch With Pressure]
new IOSTouchAction(iosDriver)
        .press(iosPressOptions()
                .withElement(element(e))
                .withPressure(1))
        .waitAction(waitOptions(ofMillis(100)))
        .release()
        .perform();
```

```java [Multi Touch]
IOSTouchAction tap1 = new IOSTouchAction(iosDriver)
        .tap(tapOptions().withElement(element(e)));
IOSTouchAction tap2 = new IOSTouchAction(iosDriver)
        .tap(tapOptions().withElement(element(e2)));

new MultiTouchAction(iosDriver).add(tap1).add(tap2).perform();
```

```java [Double Tap]
IOSTouchAction iosTouchAction = new IOSTouchAction(driver);
iosTouchAction.doubleTap(element(firstField));

```

:::

::: tip
Touch actions are deprecated. Please use W3C Actions instead or the corresponding
extension methods for the driver (if available). Check:

- [youtube](https://www.youtube.com/watch?v=oAJ7jwMNFVU)
- [30-ios-specific-touch-action-methods](https://appiumpro.com/editions/30-ios-specific-touch-action-methods)
- [29-automating-complex-gestures-with-the-w3c-actions-api](https://appiumpro.com/editions/29-automating-complex-gestures-with-the-w3c-actions-api)
  for more details.

:::
