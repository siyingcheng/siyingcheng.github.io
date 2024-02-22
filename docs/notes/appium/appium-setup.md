---
title: Appium Setup
titleTemplate: Setup for Appium
description: Appium install and setup
head:
  - - meta
    - name: description
      content: Appium install and setup
tags:
  - Appium
categories:
  - Automation Framework
---

# Appium Setup <Badge type="tip" text="Appium" /><Badge type="warning" text="Automation Framework" />

> [Official Documentation](https://appium.io/)

## Appium Requirements

Follow the official documentation, the basic requirements for the Appium server are:

- A macOS, Linux, or Windows operating system
- Node.js version in the SemVer range `^14.17.0 || ^16.13.0 || >=18.0.0`
- NPM version >= 8 (NPM is usually bundled with Node.js, but can be upgraded independently)

## Install Appium

Installing Appium is as easy as running a single NPM command:

```shell
npm i --location=global appium
```

This command installs Appium globally on your system so that you can access it
from the command line simply by running the `appium` command. Go ahead and run
it now:

```shell
appium
```

## Install the UiAutomator2 Driver (for Android)

### Set up Android automation requirements

According to the driver, in addition to a working Appium server, we also need to
do the following:

- Download [Android SDK platform tools](https://developer.android.com/studio/releases/platform-tools).
  You will probably want to download [Android Studio](https://developer.android.com/studio)
  and manage the SDK tools from within it for the easiest experience.
- Set an environment variable pointing to the directory on disk where the Android
  tools installed. You can usually find the path to this directory in the Android
  Studio SDK manager. It will contains the `platform-tools` and other directories.
  We need to define and persist the environment variable as `ANDROID_HOME`.
- Use the Java JDK (for the most recent Android API levels, JDK 9 is required,
  otherwise JDK 8 is required). It's easiest to use the [OpenJDK packages](https://openjdk.java.net/install/).
- When the JDK is installed, you'll need to find the path to the JDK home directory
  as it was installed on your system. This will be the directory that contains the
  `bin`, `include`, and other directories. The path must be persisted as an environment
  variable named `JAVA_HOME`, so that Appium can find the appropriate Java tooling
  that is required to work with the Android platform.
- Use Android Studio to create and launch an Android Virtual Device (an AVD, otherwise
  known as an emulator). You may need to download the system images for the API level
  of the emulator you want to create. Using the AVD creation wizard in Android Studio
  is generally the easiest way to do all of this.
  ::: tip Note
  You can also use a physical Android device, so long as it is configured for debugging
  and development.
  :::
- With the emulator or device connected, you can run `adb services` (via the binary
  located at `$ANDROID_HOME/platform-tools/adb`) to verify that your device shows
  up as connected.

**Run emulator in shell**, for example in MacOS:

```shell
cd Library/Android/sdk/emulator
# list devices
./emulator -list-avds
# start a device
./emulator -avd {ADV_NAME}
```

### Install the driver itself

You can install it easily via the [Appium Extension CLI](https://appium.io/docs/en/2.2/cli/extensions/):

```shell
appium driver install uiautomator2
```

## Install the XCUITest Driver (for iOS)

First you should install Xcode in apple store, and install simulator in xcode.
Then you can install XCUITest driver with CLI:

```shell
appium driver install xcuitest
```

## Install Appium Inspector

[Appium Inspector](https://github.com/appium/appium-inspector) is a GUI inspector
for mobile apps and more, powered by a (separately installed) Appium server. Appium
Inspector is basically just an Appium client (like WebdriverIO, Appium's Java client,
Appium's Python client, etc...) with a user interface. There's an interface for
specifying which Appium server to use, which capabilities to set, and then interacting
with elements and other Appium commands once you've started a session.

## Install Appium Doctor (Optional)

::: tip
Official Repository: [_here_](https://github.com/appium/appium-doctor)
:::

Attempts to diagnose and fix common Node, iOS and Android configuration issues
before starting Appium.

Install:

```shell
npm install appium-doctor -g
```

Usage:

```shell
➜  appium-doctor -h

Usage: appium-doctor.js [options, defaults: --ios --android]

Options:
  --ios       Check iOS setup                             [boolean]
  --android   Check Android setup                         [boolean]
  --dev       Check dev setup                             [boolean]
  --debug     Show debug messages                         [boolean]
  --yes       Always respond yes                          [boolean]
  --no        Always respond no                           [boolean]
  --demo      Run appium-doctor demo (for dev).           [boolean]
  -h, --help  Show help                                   [boolean]
```

## Others

**Demo Apps**:

1. From [saucelabs repository](https://github.com/saucelabs/my-demo-app-rn/)
2. From [WebDriverIO](https://github.com/webdriverio/native-demo-app)
