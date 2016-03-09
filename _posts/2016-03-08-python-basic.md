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

### 空值
空值`None`是Python中特殊的值。

### 逻辑运算
Python中提供了`and`、`or`、`not`等逻辑运算，其运算结果为布尔型。

    >>> False and True
    False
    >>> False or True
    True
    >>> not True
    False
    >>> 1 > 2
    False

---

### 变量
Python为动态语言，给变量赋值时，变量会自动匹配变量的类型。

同时，给变量赋值，是引用关系，现在看起来比较像指针。


    >>> str1 = 'abc' #在内存中创建一个'abc'的字符串, 并引用给str1(str1指向'abc')
    >>> str2 = str1  #把str1的引用赋值给str2, 也就是str2也指向'abc'
    >>> str1, str2
    ('abc', 'abc')
    >>> str1 = 'xyz' #改变str1的指向，让其指向字符串'xyz'
    >>> str1, str2
    ('xyz', 'abc')   #这里我们发现，str1的指向改变，并不str2，所以判断python中赋值，是引用关系，相当于C语言中的指针
    >>> 

### 两种除法运算
Python提供两种不同的除法运算,一种是普通除法`/`,和C语言中不同的是，python中的除法，即便两个数都是整数，结果依然是浮点型。

    >>> 10 /3
    3.3333333333333335

Python还提供了一种叫*地板除法*`//`,其结果是舍去小数部分的整数：

    >>> 10 // 3
    3
    >>> 11 // 3
    3
    >>> 


---

### 字符串和编码
python 3中，字符串是以Unicode编码的，存储文件时为了节省空间，可以使用可变长度的编码格式`UTF-8`。

    >>> ord('中') #ord()可以让字符以整数的形式显示
    20013
    chr(20013) #chr()可以让整数转换成对应的字符串
    '中'
    >>> '\u4e2d\u6587' #还可以直接用unicode编码
    '中文'

由于Python的字符串类型是`str`，在内存中以`Unicode`表示，一个字符对应若干个字节。如果要在网络上传输，或者保存到磁盘上，就需要把`str`变为以字节为单位的`bytes`。

Python对bytes类型的数据用带b前缀的单引号或双引号表示：

    x = b'ABC'

要注意区分`'ABC'`和`b'ABC'`，前者是`str`，后者虽然内容显示得和前者一样，但`bytes`的每个字符都只占用一个字节。

以Unicode表示的str通过encode()方法可以编码为指定的bytes，例如：

    >>> 'ABC'.encode('ascii')
    b'ABC'
    >>> '中文'.encode('utf-8')
    b'\xe4\xb8\xad\xe6\x96\x87'
    >>> '中文'.encode('ascii')
    Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
    UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range(128)

纯英文的`str`可以用`ASCII`编码为`bytes`，内容是一样的，含有中文的`str`可以用`UTF-8`编码为`bytes`。含有中文的`str`无法用`ASCII`编码，因为中文编码的范围超过了`ASCII`编码的范围，Python会报错。

在`bytes`中，无法显示为ASCII字符的字节，用`\x##`显示。

反过来，如果我们从网络或磁盘上读取了字节流，那么读到的数据就是`bytes`。要把`byte`s变为`str`，就需要用`decode()`方法：

    >>> b'ABC'.decode('ascii')
    'ABC'
    >>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
    '中文'

要计算`str`包含多少个字符，可以用`len()`函数：

    >>> len('ABC')
    3
    >>> len('中文')
    2

`len()`函数计算的是`str`的字符数，如果换成`bytes`，`len()`函数就计算字节数：

    >>> len(b'ABC')
    3
    >>> len(b'\xe4\xb8\xad\xe6\x96\x87')
    6
    >>> len('中文'.encode('utf-8'))
    6

可见，1个中文字符经过`UTF-8`编码后通常会占用3个字节，而1个英文字符只占用1个字节。

在操作字符串时，我们经常遇到`str`和`bytes`的互相转换。为了避免乱码问题，应当始终坚持使用`UTF-8`编码对`str`和`bytes`进行转换。

由于Python源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，在保存源代码时，就需要务必指定保存为`UTF-8`编码。当`Python`解释器读取源代码时，为了让它按`UTF-8`编码读取，我们通常在文件开头写上这两行：

    #!/usr/bin/env python3
    # -*- coding: utf-8 -*-


---

### 使用List和Tuple

#### List

List是python中可变长度的数组，其索引不仅支持0~n-1的形式，还支持* -N ~ -1 *的索引形式。

    >>> names = ['owen', 'amy', 'lyna', 'simon']
    >>> len(names)
    4
    >>> names[1]
    'amy'
    >>> names[-2]
    'lyna'

还可以使用`append()`在末尾追加元素；在指定位置插入元素`insert()`；

使用`pop()`删除末尾的元素；删除索引为i的元素`pop(i)`;

通过赋值的形式替换指定索引的元素；

List中的元素可以是类型不同的，也可以是另一个List；

    >>> names.append('angel')
    >>> names.insert(0, 'coco')
    >>> names
    ['coco', 'owen', 'amy', 'lyna', 'simon', 'angel']
    >>> names.pop()
    'angel'
    >>> names.pop(1)
    'owen'
    >>> names
    ['coco', 'amy', 'lyna', 'simon']
    >>> names[0] = 'owen'
    >>> types = ['str', 123, False, None]
    >>> names.insert(1, types)
    >>> names
    ['owen', ['str', 123, False, None], 'amy', 'lyna', 'simon']
    >>> 

#### Tuple

python中另一个有序容器就是`Tuple`, 该类型一旦定义就不可改变其大小和内容。不过我们还是可以通过索引访问其内容。

    >>> yuanzu = ('owen', 28, 'Male', ['math', 'en', 'ch'])
    >>> yuanzu[0]
    'owen'
    >>> yuanzu[1] = 29
    Traceback (most recent call last):
    File "<pyshell#50>", line 1, in <module>
        yuanzu[1] = 29
    TypeError: 'tuple' object does not support item assignment
    >>> yuanzu[3][0] = 'music'
    >>> yuanzu
    ('owen', 28, 'Male', ['music', 'en', 'ch'])
    >>> 


不过，像变量一样，元组内对应位置存放的其实是引用关系，指向'owen'、28、'Male'和一个数组。当更改数组的内容，看起来像更改了元组，其实并没有更改元组中对应位置yuanzu[3]中的引用关系，数组还是那个数组，只不过数组中的内容被改变了，因为数组是可以被改变的。

---

### 条件判断

    if 条件1：
        语句1
    elif 条件2：
       语句2
    else:
        语句3

### 循环

第一种循环：`for ... in ...`

    # 计算1到100的和
    sum = 0
    for x in range(1,101):
        sum = sum + x
    print(sum)

运算结果：

    F:\py>python hello.py
    5050

第二种循环：`while`

    num, sum = 100, 0
    while num > 0:
        sum = sum + num
        num = num - 1
    print(sum)


---

### dict 和 set
python也是支持字典的：

    >>> dict1 = {"name" : "owen", "age" : 28}
    >>> dict1["name"]
    'owen'
    >>>

字典中要删除内容，可以使用`pop(key)`，对应的value也会被删除；

同时也支持Set(只存key，没有value):


    >>> set1 = set(['name', 'age', 'sex'])
    >>> set1.add('class')
    >>> set1
    {'sex', 'class', 'name', 'age'}
    >>> set1.remove('sex')
    >>> set1
    {'class', 'name', 'age'}


