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


#### sorted

`sorted`传入一个可迭代的项目集合，返回一个有序的List。

**`sorted(iterable[, key][, reverse])`**

`key` 用于比较传入的可迭代的集合中项目之间的比较的函数。例如`key = abs`,`key = str.lower`。 默认值是`None`， 当不传入关键字参数时，就直接比较。

`reverse` Boolean类型关键字参数，默认为`False`,如果设置为`Ture`则将比较的序列反转顺序后返回。

sorted([2,332,-123,34,3,3212,-34], key = abs)
[2, 3, 34, -34, -123, 332, 3212]
>>> sorted([2,332,-123,34,3,3212,-34], key = abs, reverse = True)
[3212, 332, -123, 34, -34, 3, 2]
>>> sorted([2,332,-123,34,3,3212,-34])
[-123, -34, 2, 3, 34, 332, 3212]

---

### 返回函数

---

#### 函数作为返回值

高阶函数可以将函数作为参数传递，还可以将函数作为返回值，返回。

    def closure_sum(*args):
        def sum():
            result = 0
            for x in args:
                result += x
            return result
        return sum

    f = closure_sum(1,3,5,7)
    print(f())

运行结果：

    F:\py>python functional.py
    16

这里`f`接收到函数`closure_sum`的返回结果`sum`依然是一个函数，不过这个函数保留了`clousure_sum`中的环境，比如`args`。尽管`clousure_sum`调用结束了，但`sum`保留了其局部变量`args`，当`f`调用其结果时即`f()`，依然可以通过`cloure_sum`的环境计算出结果。

#### 闭包 closure

简单来说，`closure`就是函数中引用了局部变量的内部函数。[See More](http://www.cnblogs.com/blueel/archive/2012/12/28/2837673.html)

通过一个例子深刻了解下`closure`保留函数环境的意思。

    def double_numbers():
        result = []
        for x in range(1, 4):
            def doub():
                return x * x
            result.append(doub)
        return result

    s1, s2, s3 = double_numbers()
    print(s1(), s2(), s3())

这里我们期待s1, s2, s3输出：`1, 4, 9`, 但实际上：

    F:\py>python functional.py
    9 9 9

是因为，`closure doub`保留了函数中的变量环境，所以并不是将`x=, x=2, x=3`时的`doub`添加到`result`中。 因为保留了环境的关系，所以`doub`中保留的`x`都是`3`。

如果想要达到预期的目的则可以这样修改代码：

    def double_numbers():
        def f(i):
            def g():
                return i * i
            return g
        result = []
        for x in range(1, 4):
           result.append(f(x)) # 函数f(x)立即执行，因此x的当前值立即传入f()
        return result

    s1, s2, s3 = double_numbers()
    print(s1(), s2(), s3())

运行结果：

    F:\py>python functional.py
    1 4 9

**所以，在使用闭包的时候要特别注意，返回一个函数时，这个函数并未执行。闭包中不要轻易使用任何可能会变化的变量，除非你知道如何正确处理他们。**

---

### 匿名函数 lambda

---

当我们传入函数时，有时并不想显示的定义函数，直接传入一个更为方便的匿名函数，在Python中也就是`lambda`。

>>> list(map(lambda x : x * x, [1,3,5,7]))
[1, 9, 25, 49]
>>> 

在这里发现，其实就是：

    def f(x):
        return x * x

`lambda`表示匿名函数，这里的`x`表示参数, 匿名函数只有一个表达式，不用写`return`，表达式就是返回结果。

匿名函数不用担心函数名冲突的问题，也可以和普通函数一样当参数传递，当返回值，以及赋值给一个变量等等。

---

### 装饰漆 Decorator

---



