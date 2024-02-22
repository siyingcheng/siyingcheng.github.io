---
title: Appium
titleTemplate: IOS Gestures
description: Appium IOS Gestures
head:
  - - meta
    - name: description
      content: Appium IOS Gestures
tags:
  - Appium
categories:
  - Automation Framework
---

# IOS Gestures <Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

::: tip
Refer from [_here_](https://github.com/clarabez/appium-1/blob/master/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures.md)

---

:star: Also see [_W3C actions_](https://www.w3.org/TR/webdriver/#actions)
:::

Unfortunately Apple's XCTest framework does not natively support W3C standards for
TouchAction interface implementation. Although, it provides rich set of gestures,
including these, that are unique for iOS platform. It is possible to directly
invoke these gestures in Appium starting from version 1.6.4-beta.

It is important to remember that XCTest and WDA are being constantly changed.
This means all "mobile: \*" commands can be also subject of change in Appium
without any preliminary notice.

## mobile: swipe

This gesture performs a simple "swipe" gesture on the particular screen element
or on the application element, which is usually the whole screen. This method
does not accept coordinates and simply emulates single swipe with one finger. It
might be useful for such cases like album pagination, switching views, etc. More
advanced cases may require to call `mobile: dragFromToForDuration`, where one can
supply coordinates and duration.

Supported arguments:

- _direction_: `up`, `down`, `left`, or `right`. The argument is mandatory
- _velocity_: This argument is optional and is only supported since Appium server
  version 1.19 and Xcode SDK version 11.4+. The value is measured in pixels per
  second and same values could behave differently on different devices depending
  on their display density. Higher values make swipe gesture faster (which usually
  scrolls larger areas if we apply it to a list) and lower values slow it down.
  Only values greater than zero have effect.
- _element_: The internal element identifier (as hexadecimal hash string) to
  swipe on. Application element will be used instead if this argument is not provided

Usage examples:

```java
JavascriptExecutor js = (JavascriptExecutor) driver;
Map<String, Object> params = new HashMap<>();
params.put("direction", "down");
params.put("velocity", 2500);
params.put("element", ((RemoteWebElement) element).getId());
js.executeScript("mobile: swipe", params);
```

## mobile: scroll

Scrolls the element or the whole screen. Different scrolling strategies are
supported. Arguments define the chosen strategy: either `name`, `direction`,
`predicateString` or `toVisible` in that order. All strategies are exclusive and
only one strategy can be applied at a single moment of time. Use `mobile: scroll`
to emulate precise scrolling in tables or collection views, where it is already
known to which element the scrolling should be performed. Although, there is one
known limitation there: in case it is necessary to perform too many scroll gestures
on parent container to reach the necessary child element (tens of them) then the
method call may fail.

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to
  scroll on. Application element will be used if this argument is not set
- _name_: the accessibility id of the child element, to which scrolling is
  performed. The same result can be achieved by setting predicateString argument
  to `name == accessibilityId`. Has no effect if element is not a container
- _direction_: Either `up`, `down`, `left` or `right`. The main difference from
  swipe call with the same argument is that scroll will try to move the current
  viewport exactly to the next/previous page (the term "page" means the content,
  which fits into a single device screen)
- _predicateString_: the NSPredicate locator of the child element, to which the
  scrolling should be performed. Has no effect if element is not a container
- _toVisible_: Boolean parameter. If set to true then asks to scroll to the
  first visible element in the parent container. Has no effect if element is
  not set

Usage examples:

```python
driver.execute_script('mobile: scroll', {'direction': 'down'});
```

## mobile: pinch

Performs pinch gesture on the given element or on the application element.

Supported arguments：

- _element_: The internal element identifier (as hexadecimal hash string) to pinch
  on. Application element will be used instead if this parameter is not provided
- _scale_: Pinch scale of type float. Use a scale between 0 and 1 to "pinch close"
  or zoom out and a scale greater than 1 to "pinch open" or zoom in. Mandatory
  parameter
- _velocity_: The velocity of the pinch in scale factor per second (float value).
  Mandatory parameter

Usage examples:

```ruby
execute_script 'mobile: pinch', scale: 0.5, velocity: 1.1, element: element.ref
```

## mobile: doubleTap

Performs double tap gesture on the given element or on the screen.

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to
  double tap on
- _x_: Screen x tap coordinate of type float. Mandatory parameter only if element
  is not set
- _y_: Screen y tap coordinate of type float. Mandatory parameter only if element
  is not set

Usage examples:

```javascript
driver.execute("mobile: doubleTap", { element: element.value.ELEMENT });
```

## mobile: touchAndHold

Performs long press gesture on the given element or on the screen.

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to
  long tap on
- _duration_: The float duration of press action in seconds. Mandatory parameter
- _x_: Screen x long tap coordinate of type float. Mandatory parameter only if
  element is not set
- _y_: Screen y long tap coordinate of type float. Mandatory parameter only if
  element is not set

Usage examples:

```c#
// c#
Dictionary<string, object> tfLongTap = new Dictionary<string, object>();
tfLongTap.Add("element", element.Id);
tfLongTap.Add("duration", 2.0);
((IJavaScriptExecutor)driver).ExecuteScript("mobile: touchAndHold", tfLongTap);
```

## mobile: twoFingerTap

Performs two finger tap gesture on the given element or on the application element.

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to
  double tap on. Application element will be used instead if this parameter is not
  provided.

Usage examples:

```c#
// c#
Dictionary<string, object> tfTap = new Dictionary<string, object>();
tfTap.Add("element", element.Id);
((IJavaScriptExecutor)driver).ExecuteScript("mobile: twoFingerTap", tfTap);
```

## mobile: tap

Performs tap gesture by coordinates on the given element or on the screen.

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to long
  tap on. x and y tap coordinates will be calculated relatively to the current
  element position on the screen if this argument is provided. Otherwise they
  should be calculated relatively to screen borders.
- _x_: x tap coordinate of type float. Mandatory parameter
- _y_: y tap coordinate of type float. Mandatory parameter

Usage examples:

```php
// PHP
$params = array(array('x' => 100.0, 'y' => 50.0, 'element' => element.GetAttribute("id")));
$driver->executeScript("mobile: tap", $params);
```

## mobile: dragFromToForDuration

Performs drag and drop gesture by coordinates. This can be done either on an
element or on the screen

Supported arguments:

- _element_: The internal element identifier (as hexadecimal hash string) to
  perform drag on. All the coordinates will be calculated relatively this this
  element position on the screen. Absolute screen coordinates are expected if this
  argument is not set
- _duration_: Float number of seconds in range [0.5, 60]. How long the tap gesture
  at starting drag point should be before to start dragging. Mandatory parameter
- _fromX_: The x coordinate of starting drag point (type float). Mandatory parameter
- _fromY_: The y coordinate of starting drag point (type float). Mandatory parameter
- _toX_: The x coordinate of ending drag point (type float). Mandatory parameter
- _toY_: The y coordinate of ending drag point (type float). Mandatory parameter

Usage examples:

```java
// Java
JavascriptExecutor js = (JavascriptExecutor) driver;
Map<String, Object> params = new HashMap<>();
params.put("duration", 1.0);
params.put("fromX", 100);
params.put("fromY", 100);
params.put("toX", 200);
params.put("toY", 200);
params.put("element", ((RemoteWebElement) element).getId());
js.executeScript("mobile: dragFromToForDuration", params);
```

## mobile: alert

Performs operations on NSAlert instance.

Supported arguments:

- _action_: The following actions are supported: `accept`, `dismiss` and `getButtons`.
  Mandatory parameter
- _buttonLabel_: The label text of an existing alert button to click on.
  This is an optional parameter and is only valid in combination with accept and
  dismiss actions.

Usage examples:

```python
# Python
driver.execute_script('mobile: alert', {'action': 'accept', 'buttonLabel': 'My Cool Alert Button'});
```
