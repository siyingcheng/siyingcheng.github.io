---
layout: post
title:  "Python 特性"
date:   2016-03-03 16:06:05
categories: Python
excerpt: Python学习笔记————Python特性。切片、迭代、列表生成式、生成器、迭代器。
---

* content
{:toc}

---

### 切片 slice

---

对于Python中凡是可以通过索引访问的，例如，List、Tuple、字符串等都是可以通过`切片`来获取其中的一部分的。

形式一：`[start : end]`,从索引为`start`开始，以索引为`end`结束，包括`start`不包括`end`

形式二：`[start : end : step]`, 从索引为`start`开始，以索引为`end`结束，包括`start`不包括`end`，并且步进为`step`

形式三：`[:end]`，从头到`end`，不包括`end`

形式四：`[start:]`, 从`start`到最后，**包括最后**

形式五：`[:]`, 其实就是复制了一个本体

    # 切片
    message = "Chase the excellence, success will follow you!"
    print('[start : stop] ===> ' + message[2 : 10])
    print('[start : stop : step] ===> ' + message[2 : 15 : 2])
    print('[ : stop] ===> ' + message[ : 10])
    print('[start : ] ===> ' + message[2 : ])
    print('[ : ] ===> ' + message[ : ])
    print('[ : : 3] ===> ' +    message[ : : 3])

console 显示：

    F:\py>python features.py
    [start : stop] ===> ase the
    [start : stop : step] ===> aeteecl
    [ : stop] ===> Chase the
    [start : ] ===> ase the excellence, success will follow you!
    [ : ] ===> Chase the excellence, success will follow you!
    [ : : 3] ===> Cst clc cswlooy!

---

### 迭代 Iterable

---

迭代，其实就是遍历一个可以通过索引访问的有序序列，例如List、Tuple、Strings等等。

由于`dict`类型存储的是`key-value`，所以通过`for ... in`迭代的默认是`key`，如果需要迭代出`values`则需要`for v in dict.values()`进行迭代；如果想把`key`和`value`同时迭代出来，则可以这样：`for k, v in dict.items()`

其实，只要是可以迭代对象，就可以通过`for`循环将其迭代出来，而不关心它是什么类型。那么什么是可迭代对象呢？我们可以通过`collections`模块的`Iterable`判断，实例是否为可迭代对象。

    >>> from collections import Iterable
    >>> isinstance('I\'m owen!', Iterable) #str是否可迭代
    True
    >>> isinstance([1,2,3,4,5], Iterable) #List是否可迭代
    True
    >>> isinstance(12345, Iterable) # int 是否可迭代
    False
    >>> 
    
对于一个可迭代对象，如果我们想迭代出其内容，和默认的索引该怎么做？

    >>> for i, k in enumerate(dict1):
        print(i, k)

        
    0 age
    1 name
    2 city

我们可以通过`enumerate`函数，将可迭代对象，变成索引-元素的形式，枚举出来。

---

### 列表解析（or 构造表） List comprehension

---

Python有个强大的建立List的方式，即List Comprehensions。
大概的意思就是通过迭代一个可迭代对象，找到满足条件的元素后，按照事先定义好的表达式，将新值存入新的List，如：

    >>> [x * x for x in list(range(0, 9))]
    [0, 1, 4, 9, 16, 25, 36, 49, 64]

还可以在迭代的时候加入约束条件：

    >>> [x * x for x in list(range(0, 9)) if x % 2 != 0]
    [1, 9, 25, 49]
    >>> 

还可以使用两层或者多层循环，实现排列：

    >>> [m + n for m in 'XYZ' for n in 'ABC']
    ['XA', 'XB', 'XC', 'YA', 'YB', 'YC', 'ZA', 'ZB', 'ZC']
    >>> 

练习：提取List中的字符串元素，并将所有元素全部转换成大写：

    >>> sub_string = ['Owen', 'amy', 28, 'lyNa', True]
    >>> [s.upper() for s in sub_string if isinstance(s, str)]
    ['OWEN', 'AMY', 'LYNA']
    >>>

---

### 生成器 Generator

---

当一个容器中元素特别多时，就会占用大量的内存，再者如果我们只使用其中一部分元素，那么就浪费了大量的空间。

生成器是一次生成一个值的特殊类型函数。可以将其视为可恢复函数。调用该函数将返回一个可用于生成连续 x 值的生成器【Generator】，简单的说就是在函数的执行过程中，`yield`语句会把你需要的值返回给调用生成器的地方，然后退出函数，下一次调用生成器函数的时候又从上次中断的地方开始执行，而生成器内的所有变量参数都会被保存下来供下一次使用。

    >>> def gen(n):
        a = 0
        while a < n:
            yield a
            a += 1

    >>> gen = gen(5)
    >>> next(gen)
    0
    >>> next(gen)
    1
    >>> next(gen)
    2
    >>> next(gen)
    3
    >>> next(gen)
    4
    >>> next(gen)
    Traceback (most recent call last):
      File "<pyshell#67>", line 1, in <module>
        next(gen)
    StopIteration
    >>> 

执行`next`的时候，`Gennerator`会遇到`yield`时，返回一个值给调用者，并记录这个数，下次再调用`next`时，从这个值开始，获取到下一个`yield`。如果获取不到`yield`了则会提示`StopIteration`的错误。

斐波那契数列：

    def fib(n):
        a, b, an = 0, 1, 0
        while an < n:
            yield a
            a, b = b, a + b
            an += 1
        return "Done"

    for x in fib(7):
        print(x)

运行结果：

    F:\py>python features.py
    0
    1
    1
    2
    3
    5
    8

虽然我们可以遍历所有的`yield`的返回值，但是如果想拿到`fib()`的`return`，该怎么做呢？可以通过捕获`StopIteration`的异常，`return`的值存放在异常的`value`中：

    #通过捕获异常拿到retur的返回值

    f = fib(7)
    while True:
        try:
            x = next(f)
            print(x)
        except StopIteration as exp:
            print("Gennerator return value is : ", exp.value)
            break

结果：

    F:\py>python features.py
    0
    1
    1
    2
    3
    5
    8
    Gennerator return value is :  Done


---

### 迭代器 Iterator
---

可以直接作用于`for`循环的数据类型有以下几种：

一类是集合数据类型，如`list`、`tuple`、`dict`、`set`、`str`等；

一类是`generator`，包括`生成器`和带`yield`的`generator function`。

这些可以直接作用于`for`循环的对象统称为`可迭代对象`：`Iterable`。

可以使用`isinstance()`判断一个对象是否是`Iterable`对象：

    >>> from collections import Iterable
    >>> isinstance([], Iterable)
    True
    >>> isinstance({}, Iterable)
    True
    >>> isinstance('abc', Iterable)
    True
    >>> isinstance((x for x in range(10)), Iterable)
    True
    >>> isinstance(100, Iterable)
    False

而生成器不但可以作用于`for`循环，还可以被`next()`函数不断调用并返回下一个值，直到最后抛出`StopIteration`错误表示无法继续返回下一个值了。

可以被`next()`函数调用并不断返回下一个值的对象称为`迭代器`：`Iterator`。

可以使用`isinstance()`判断一个对象是否是`Iterator`对象：

    >>> from collections import Iterator
    >>> isinstance((x for x in range(10)), Iterator)
    True
    >>> isinstance([], Iterator)
    False
    >>> isinstance({}, Iterator)
    False
    >>> isinstance('abc', Iterator)
    False

生成器都是`Iterator`对象，但`list`、`dict`、`str`虽然是`Iterable`，却不是`Iterator`。

把`list`、`dict`、`str`等`Iterable`变成`Iterator`可以使用`iter()`函数：

    >>> isinstance(iter([]), Iterator)
    True
    >>> isinstance(iter('abc'), Iterator)
    True

**总结**

* 凡是可作用于`for`循环的对象都是`Iterable`类型；

* 凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；

* 集合数据类型如`list`、`dict`、`str`等是`Iterable`但不是`Iterator`，不过可以通过`iter()`函数获得一个`Iterator`对象。


