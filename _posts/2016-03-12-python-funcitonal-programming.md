---
layout: post
title:  "Python Funcitonal Programming"
date:   2016-03-04 16:06:05
categories: Python
excerpt: Python学习笔记————Funcitonal Programming
---

* content
{:toc}

---

> 函数式编程（英语：functional programming）或称函数程序设计，又称泛函编程，是一种编程范型，它将电脑运算视为数学上的函数计算，并且避免使用程序状态以及易变对象。函数编程语言最重要的基础是λ演算（lambda calculus）。而且λ演算的函数可以接受函数当作输入（引数）和输出（传出值）。比起命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

[函数式编程](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B8%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80) 引用来源自`维基百科`

最早使用函数式编程的语言是[Lisp](https://zh.wikipedia.org/wiki/LISP)。Python允许使用变量，并不是纯函数式编程，Python对函数式编程提供部分支持。

函数式编程的一个特点是允许将函数本身作为参数传入另一个函数，还允许返回一个函数！(这让我想到了swift)

---

### 高阶函数

---

Higher-order funciton

**变量可以指向函数**

    >>> f = abs
    >>> f
    <built-in function abs>
    >>> f(-10)
    10
    >>> 

**函数名也是变量**

    >>> abs = 10
    >>> abs(-2)
    Traceback (most recent call last):
      File "<pyshell#5>", line 1, in <module>
        abs(-2)
    TypeError: 'int' object is not callable
    >>> 

通过这里可以看出可以将函数名作为变量，并重新指向其他地方，从而改变了原来的实现方式。当`abs`指向一个数字时，在通过原来的调用方式，就会提示错误。如果还想使用原来的`abs`函数功能，则需要重启python交互环境。

**函数作为参数传入函数**

既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

一个最简单的高阶函数：

    >>> def hf(x, y, f):
        return f(x) + f(y)

    >>> print(hf(1, 2, abs))
    3
    >>> 

把函数作为参数传入另一个函数，这样的函数称为高阶函数。函数式编程就是值这种高度抽象的编程范式。

#### mad & reduce

[Google MapReduce 相关论文](http://research.google.com/archive/mapreduce.html)

Python内建了`map()`和`reduce()`函数。

`map()`函数接收两个参数，一个是函数，一个是`Iterable`对象, `map`将传入的函数依次作用到序列的每一个元素，并把结果作为新的`Iterator`返回。

一个实例：

    >>> def fc(x):
        return x * x

    >>> itor = map(fc, [1,2,3,4,5,6,7,8,9])
    >>> itor
    <map object at 0x032F1CD0>
    >>> list(itor)
    [1, 4, 9, 16, 25, 36, 49, 64, 81]
    >>> 

`reduce`是python中的一个内建二元操作函数，第一个参数是一个二元操作函数`func()`，第二个参数个一个数据集合。将数据集合中的前两个元素取出，传入`func()中，`func()的返回值和数据集合中第三个元素再作为`func()`的参数传入，依次进行直到将数据集合中最后一个元素也传入`func()`, `func()`最后一次的返回值，即`reduce`的结果。

使用`reduce`需要导入`functools`中的`reduce`

    from functools import reduce
    def comb(m, n):
        return m * 10 + n

    result = reduce(comb, [1,3,5,7])
    print(result)

结果： 

    F:\py>python functional.py
    1357


#### filter

内建函数`filter`用于过滤序列。`filter`接收函数和一个`可迭代对象`, 将函数作用于每一个可迭代对象中的元素，根据返回值`Ture`还是`False`决定是否保留该元素。

    >>> def is_odd(n):
        return n % 2 == 0

    >>> list(filter(is_odd, [1,2,3,4,5,6,7,8,9]))
    [2, 4, 6, 8]
    >>>

 