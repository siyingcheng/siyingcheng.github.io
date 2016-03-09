---
layout: post
title:  "Python 函数"
date:   2016-03-02 20:06:05
categories: Python
excerpt: Python学习笔记————Python函数
---

* content
{:toc}

---

定义函数时，需要确定函数名和参数个数；

如果有必要，可以先对参数的数据类型做检查；

函数体内部可以用`return`随时返回函数结果；

函数执行完毕也没有`return`语句时，自动`return None`。

函数可以同时返回多个值，但其实就是一个`tuple`。

关键字`pass`意味着什么也不做。


    def func(x, y):
        if x > y:
            return x, y
        else:
            return y, x

    m, n = func(3, 4)
    # 通过打印可以看出函数返回值其实就是一个元组，只不过可以把元组中对应的值赋值给变量
    print(m, n)
    print(func(3, 4)) 

console显示：

    F:\py>python functions.py
    4 3
    (4, 3)


### 函数的参数

python中函数的参数有：位置参数、默认参数、可变参数、关键字参数和命名关键字参数。

    def info(name, age, city = 'ChengDu'):
    # name, age为位置参数，city 为默认参数，如果函数调用时不传递city参数值，那么默认city就是"ChengDu"
        print('''
            your name is %s
            your age is %d
            you come from %s
            ''' % (name, age, city))

    info("owen", 28)
    # 如果city传入了参数，则接收新参数的值
    info("Amy", 29, "ShangHai")


console结果：

    F:\py>python functions.py

                    your name is owen
                    your age is 28
                    you come from ChengDu


                    your name is Amy
                    your age is 29
                    you come from ShangHai



可变参数：

当函数的参数个数不确定时，可以使用`*args`和`**kwargs`表示可变参数.其中`*args`是没有value的，而`**kwargs`是key-value形式的。

    gro = (1, 3, 5, 7)
    def my_sum(*numbers):
        total = 0
        for x in numbers:
            total += x
        return total
    # 将元组gro中所有的元组都作为参数传进函数my_sum
    print(my_sum(*gro))

其中形如`**kwargs`类型的参数，又叫`关键字参数`，因为其传入的是`key-value`类型：

    dic = {"name" : "owen", "age" : 28, "city" : "ChengDu"}
    def my_info(**kw):
        for x in kw:
            print(x , ":", kw[x], "\n")

    my_info(**dic)

console:

    F:\py>python functions.py
    name : owen

    age : 28

    city : ChengDu

命名关键字参数：

有时我们需要传入指定`key`的参数，在函数申明参数中，这些关键字参数通常放在位置参数后面，并且和位置参数用一个`*`号隔开。

    def employee_info(name, age, *, city, salary):
        print('''
            name : %s
            age : %d
            city : %s
            salry : %.2f ''' % (name, age, city, salary))

    employee_info("owen", 28, city = "ChengDu", salary = 12000.88)

console:

    F:\py>python functions.py

                    name : owen
                    age : 28
                    city : ChengDu
                   salry : 12000.88


当我们调用函数`employee_info()`时，命名关键字参数必须带上关键词一并传入，否则python当传入的参数为位置参数一并处理。 比如`employee_info("owen", 28, "ChengDu", 12000.88)`去掉关键字后，就不对了，python会提示位置参数个数不对。

当然命名关键字参数也是可以指定默认值的，例如定义函数时:`def employee_info(name, age, *, city = 'BeiJing', salary):`,这样，调用函数时，可以省略`city`关键字参数。函数内部会将`city`参数的值设置为`BeiJing`.