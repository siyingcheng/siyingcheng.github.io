---
title: Appium Image Comparison
description: Appium Image Comparison Basic Usage
head:
  - - meta
    - name: description
      content: Image Comparison
tags:
  - Appium
categories:
  - Automation Framework
---

# Image Comparison <Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

## Image Comparison Feature

::: tip
[Official document](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/) :star2:
:::

This feature require OpenCV 3+ native libraries and `opencv4nodejs` npm module,
see [_here_](../../software/opencv4nodejs-macos.md) to install those requirements
on MacOS.

Additionally, the `image` plugin is also required and do not forget active the
plugin when starting Appium server.

```shell
# install image plugin
appium plugin install images
# starting appium with image plugin
appium --use-plugins images
```

### Feature-based Comparison

Performs images matching by template to find possible occurrence of the partial image in the full image.
Such comparison is useful in case the resulting image is rotated/scaled in
comparison to the original one.

```java
byte[] screenshot = Base64.getEncoder()
        .encode(iosDriver.getScreenshotAs(OutputType.BYTES));
FeaturesMatchingResult result = iosDriver
        .matchImagesFeatures(screenshot, screenshot,
                new FeaturesMatchingOptions()
                        .withDetectorName(FeatureDetector.ORB)
                        .withGoodMatchesFactor(40)
                        .withMatchFunc(MatchingFunction.BRUTE_FORCE_HAMMING)
                        .withEnabledVisualization());
Assert.assertTrue(result.getVisualization().length > 0);
Assert.assertTrue(result.getCount() > 0);
Assert.assertTrue(result.getTotalCount() > 0);
Assert.assertFalse(result.getPoints1().isEmpty());
Assert.assertFalse(result.getPoints2().isEmpty());
Assert.assertNotNull(result.getRect1());
Assert.assertNotNull(result.getRect2());
```

### Occurrences Lookup

Performs images matching by template to find possible occurrence of the partial
image in the full image. Such comparison is useful in case the full image is a
superset of the partial image.

There is a subtle difference between occurrence comparison and feature comparison.
The former is to be used when the image to be found is a subset of the target/screenshot.
The latter is to be used when the image to be found is basically the same as the
target but rotated and/or scaled.

```java
byte[] screenshot = ScreenshotUtils.takeScreenshot(iosDriver);
OccurrenceMatchingResult result = iosDriver
        .findImageOccurrence(screenshot, screenshot, new OccurrenceMatchingOptions()
                .withEnabledVisualization());
Assert.assertTrue(result.getVisualization().length > 0);
Assert.assertNotNull(result.getRect());
```

### Similarity Calculation

Performs images matching to calculate the similarity score between them. The flow
there is similar to the one used in `findImageOccurrence`, but it is mandatory that
both images are of equal size. Such comparison is useful in case the original
image is a copy of the original one, but with changed content.

```java
byte[] screenshot = ScreenshotUtils.takeScreenshot(iosDriver);
SimilarityMatchingResult result = iosDriver
        .getImagesSimilarity(screenshot, screenshot, new SimilarityMatchingOptions()
                .withEnabledVisualization());
Assert.assertTrue(result.getVisualization().length > 0);
Assert.assertTrue(result.getScore() > 0.0d);
```
