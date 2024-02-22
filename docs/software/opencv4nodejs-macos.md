---
title: Install OpenCV4NodeJs on MacOS
description: Install OpenCV4NodeJs on MacOS
head:
  - - meta
    - name: description
      content: Install OpenCV4NodeJs on MacOS
tags:
  - OpenCV
categories:
  - MacOS
---

# Install OpenCV4NodeJs on MacOS <Badge type="tip" text="OpenCV" /><Badge type="warning" text="MacOS" />

Required `HomeBrew`, step by step:

Step 1:

```shell
brew update & brew install opencv@4
```

Step 2:

```shell
brew link --force opencv@4
```

Step 3:
**!!!NOTE!!!** Please change the opencv version to fit your installation in step 2.

```shell
export OPENCV4NODEJS_DISABLE_AUTOBUILD=1
export OPENCV_LIB_DIR=/usr/local/Cellar/opencv/4.8.1_5/lib
export OPENCV_BIN_DIR=/usr/local/Cellar/opencv/4.8.1_5/bin
export OPENCV_INCLUDE_DIR=/usr/local/Cellar/opencv/4.8.1_5/include/opencv4
```

Step 4:

```shell
npm install -g opencv4nodejs
```
