---
layout: post
title:  "Python 基础"
date:   2016-03-01 20:06:05
categories: Python
excerpt: Python学习笔记————Python基础
---

* content
{:toc}

---

### 输入与输出

#### 输出

用`print()`在括号加上字符串，可以向屏幕上输出指定的文字，如`"Hello Owen!"`

    print('Hello Owen!')


`print()`也可以接收多个字符，用逗号隔开，就可以连成一串输出。


    print('Hello','Owen!')


`print()`会依次打印每个字符串，遇到**逗号**的时候，会输出一个**空格**，所以上面的结果显示为:`"Hello Owen！"`


    F:\py>python hello.py
    Hello Owen!


#### 输入

`input()`可以通过键盘输入接收一些信息，将这些信息以`字符串`的形式赋值给一个变量，like this:

    name = input("Please enter your name:")
    age = input("Please enter your age:")
    print('''
        your name is %s
        your age is %s
        ''' % (name, age))

console上显示内容如下：

    F:\py>python hello.py
    Please enter your name:owen
    Please enter your age:28

            your name is owen
            your age is 28

这里，给name赋值"owen"和给age赋值"28"，虽然看起来给age赋值了一个整数，但`input()`貌似只会按照字符串接收并赋值给变量。关于这点，我们可以通过`print(type(age))`打印age的类型，显示为`<class 'str'>`进一步证明了猜测的正确性。

在`print()`中使用`'''`来包裹字符串内容，该内容的格式会被原样的保留下来。其中`%s`和C语言中的占位符一样，表示这里是一个字符串，不同的是，C语言中，格式字符串和变量之间用逗号隔开，而Python中使用`%`号隔开，并且后面的变量如果是多个，需要放在一个元组容器中，就是用括号包裹起来，变量之间用逗号隔开。

---

### 注释
Python中用`#`号实现单行注释，从`#`号开始，一直到行结束，这期间的内容都是注释。

Pyothon中用成对的`'''`或者`"""`作为多行注释，被包裹的内容，都是注释内容。

### 关于缩进
Python有自己独特的风格，Python不用｛｝来作为代码块的划分。而用不同的缩进量作为代码块的划分。如果你使用TAB键，则要始终使用TAB；如果使用两个空格，则始终使用两个空格；如果使用4个空格，则始终使用4个空格。因为TAB在不同的编辑器中所占的长度不同，所以官方建议是使用4个空格的缩进方式，作为代码块的划分。

### 基本数据类型

### 整数
十进制，如`21432, -1322323, 0 `等等；
十六进制，如`0xff12, 0x1223a32fb`等等，以`0x`开头。

### 浮点数
普通形式，如`3.14, -23.234`等等；
科学计数形式，如`3.0e8, -3.15e-5`等等

### 复数
Python是支持复数的，使用`j`代表复数单位，需要注意的是`j`前面一定要加数字，否则Python认为其只是个变量，如:

    flex1 = 1 + 1j;
    flex2 = 1 - 1j;
    print(flex2 * flex1)

console:


    F:\py>python hello.py
    (2+0j)

### 字符串

Python中用成对的单引号`''`，成对的双引号`""`，成对的三引号`''' '''`包裹起来的内容都是字符串。其中三引号包裹的内容，会保留原来的字符串样式。 字符串中的内容如果要包含一些特殊的字符，则需要用`\`来转义。

    print("双引号开始 \n \\双引号结束")
    print('单引号开始 \n \\单引号结束')
    print('''三引号开始 \n \\


        三引号结束''' )

console:

    双引号开始
    \双引号结束 
    单引号开始
    \单引号结束
    三引号开始
    \


        三引号结束

### 布尔型

    # 布尔型
    zhen = True
    jia = False
    print(zhen, jia)

console：

    F:\py>python hello.py
    True False