---
layout: post
title:  "Traps in Function"
date:   2017-05-08 03:46:05
categories: Python
excerpt: Python学习笔记————Python基础
---

* content
{:toc}

---

## 函数默认参数的陷阱
python中函数的默认参数，其内存中的作用域和ruby, Java, C等所有不同，例如：

```python
def add_end(l = []):
	print("Now l is :", l)
	l.append('END')
	return l

print(add_end())
print(add_end())
```

运行结果是：
```
Now l is : []
['END']
Now l is : ['END']
['END', 'END']
```

这个例子放到Ruby中：
```ruby
#!/usr/bin/env ruby
def add_end(l = [])
	p "Now l is " + l.inspect
	l.push "END"
	l
end

p add_end
p add_end
```
运行结果：
```
"Now l is []"
["END"]
"Now l is []"
["END"]
```
通过对比可以看出，在ruby中，每次调用函数，函数的形参会重新初始化（每调用一次，形参重新分配一次空间？）。但是python中，如果形参是默认参数的情况，且调用时没有传入参数，使用了默认参数，表现出python保留了形参的内存，从而在使用上容易造成陷阱的怪现象。


我现在还不理解这种奇怪的设计思维，姑且先记下。

