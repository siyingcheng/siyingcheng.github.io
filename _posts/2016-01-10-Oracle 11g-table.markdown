---
title:  "Oracle 11g - 表"
date:   2016-01-10 15:04:23
categories: [ORACLE]
tags: [ORACLE]
---
# 2. 表

## 2.1 数据类型

<table>
<thead>
<tr>
<th>数据类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>CHAR(length [BYTE\</td>
<td>CHAR])</td>
<td>国定长度length。BYTE表示按字节长度，CHAR表示按字符长度</td>
</tr>
<tr>
<td>VARCHAR2（length [BYTE\</td>
<td>CHAR]）</td>
<td>可变长度的字符数据类型，最大长度4000字节</td>
</tr>
<tr>
<td>NCHAR(length)</td>
<td>固定长度的Unicode字符数据</td>
</tr>
<tr>
<td>NVARCHAR2(length)</td>
<td>可变长度的字符数据类型</td>
</tr>
<tr>
<td>NUMBER（precision ,scale）和 NUMERIC(precision, scale)</td>
<td>可变长度的数字。 precision最大位数，如果有小数点则是小数点前后之和，最大可为38.scale则表示小数点右边的最大位数。如果不指定precision和scale，则表示为小数点前后共38位的数字。</td>
</tr>
<tr>
<td>INT、INTEGER、SAMLLINT</td>
<td>NUMBER的子类型。38位精度的整数</td>
</tr>
<tr>
<td>BINARY_FLOAT</td>
<td>32位浮点数</td>
</tr>
<tr>
<td>BINARY_DOUBLE</td>
<td>64位浮点数</td>
</tr>
<tr>
<td>DATE</td>
<td>日期和时间</td>
</tr>
<tr>
<td>TIMESTAMP（seconds_precison）</td>
<td>时间戳</td>
</tr>
<tr>
<td>CLOB</td>
<td>可变长度的单字节字符数据</td>
</tr>
<tr>
<td>NCLOB</td>
<td>可变长度的Unicode字符数据</td>
</tr>
<tr>
<td>BLOB</td>
<td>可变长度的二进制数据</td>
</tr>
<tr>
<td>BFILE</td>
<td>指向外部文件的指针。外部文件本身不存储在数据库中</td>
</tr>
</tbody>
</table>

## 2.2 表的操作

### 2.2.1 创建表

语法：

    CREATE TABLE [<span class="hljs-link_label">schema. </span>] table<span class="hljs-emphasis">_name(column_</span>name data<span class="hljs-emphasis">_type [DEFAULT expression] [[CONSTRAINT constraint_</span>name] constraint<span class="hljs-emphasis">_def][, ...])[TABLESPACE tablespace_</span>name]
    `</pre>

    ### 2.2.2 修改表

*   重命名表空间

    第一种方式：

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">RENAME</span> <span class="hljs-keyword">TO</span> new_table_name;</span>
    `</pre>

    第二种方式：直接使用RENAME TO

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">RENAME</span> table_name <span class="hljs-keyword">TO</span> new_table_name;</span>
    `</pre>

    在创建表时可以为表指定存储空间，如果不指定，oracle会将表存储到默认表空间中。根据需要可以将表从一个表空间中移动到另一个表空间中。

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name MOVE <span class="hljs-keyword">TABLESPACE</span> tablespace_name;</span>
    `</pre>

    ### 2.2.3 删除表

    使用DROP TABLE可以删除表，删除表后，该表中的所有数据也将被删除。一般情况下，用户只能删除自己模式中的表；如过要删除其他模式中的表，则该用户必须具有DROP ANY TABLE的权限；

    <pre>`DROP TABLE table_name [<span class="hljs-link_label">CASCADE CONSTRAINTS</span>][<span class="hljs-link_reference">PURGE</span>];
    `</pre>> CASCADE CONSTRAINTS指定被删除表的同时，删除所有引用这个表的视图、约束、索引和触发器等
> 
>     PURGE 表示删除后，立即释放该表所占用的资源空间

    ## 2.3 管理表中的列

    ### 2.3.1 增加列

    增加一列

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">ADD</span> column_name data_type;</span>
    `</pre>

    或者一次增加多个列

    <pre>`ALTER TABLE table_name ADD COLUMN(column_name1 data_type, column_name2 data_type, <span class="hljs-keyword">...</span>);
    `</pre>

    ### 2.3.2 修改列

*   修改列的名称
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">RENAME</span> <span class="hljs-keyword">COLUMN</span> column_name <span class="hljs-keyword">TO</span> new_column_name;</span>
    `</pre>

*   修改列的数据类型
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name MODIFY column_name new_data_type;</span>
    `</pre>

    ### 2.3.3 删除列

    一次删除一列：

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">COLUMN</span> column_name;</span>
    `</pre>

    一次删除多列：

    <pre>`ALTER TABLE table_name DROP(column_name, <span class="hljs-keyword">...</span>);
    `</pre>

    对比两种语法可以看出，删除一列时需要使用COLUMN关键字，而删除多列时不需要。

    ## 2.4 约束 CONSTRAINT

    数据库完整性（Database Integrity）是指数据库中数据的正确性和相容性，用来防止用户项数据库中添加不含语义的数据。数据库完整性是由各种各样的完整性约束来保证的，可以说，数据库完整性设计就是数据库完整性约束的设计。

    按照不同的角度可以将表的完整性约束分成不同的类别。主要可以选取两个角度：约束的作用于和约束的用途。

    按照约束的作用于可以将表的完整性约束分为两个类：

1.  表级约束  应用于表，对表中的多个列起作用；
2.  列级约束 引用于表中的一列，只对该列起作用；

    ### 2.4.1 约束分类

    按照约束的用途可以将表的完整性约束分为5类
    约束 | 缩写 | 说明
    ---|---|---
    NOT NULL | C | 非空约束。这实际就是一种强制的CHECK约束。
    PRIMARY KEY | P | 主键约束。 指定表的主键，主键由一列或者多列组成，唯一标识表中的一行。
    UNIQUE | U | 唯一约束， 指定一列或者一组列只能存储唯一的值。
    CHECK | C | 检查约束，指定一列或者一组列的值必须满足的条件
    FOREIGN | R | 外键约束，指定表的外键。外键引用另一个表的一列，在自引用情况下，则引用本表的一列。

    ### 2.4.2 查看约束

    通过查询数据字典视图USER_CONSTRAINTS，可以了解当前用户模式中所有约束的基本信息。
    列 | 类型 | 说明
    ---|---|---
    owner | VARCHAR2（30） | 约束的所有者
    constraint_name | VARCHAR2(30) | 约束名
    constraint_type | VARCHAR2(1) | 约束类型，值为R,P,C,U,V或O
    table_name | VARCHAR2(30) | 约束定义所针对的表名
    status | VARCHAR2(8) | 约束的状态。值为ENABLE或者DISABLE
    deferable | VARCHAR2(14) | 该约束是否为可延迟的，值为DEFERRABLE或者NOTDEFERRABLE
    deferred | VARCHAR2(9) | 约束是立即执行还是延迟执行，值为IMMEDIATE或DEFERRED

    通过数据字典试图USER_CONS_COLUMNS,可以了解定义约束的列。
    列 | 类型 | 说明
    ---|---|---
    owner | VARCHAR2(30) | 约束的所有者
    constraint_name | VARCHAR2(30) | 约束名
    table_name | VARCHAR2(30) | 约束定义所针对的表名
    column_name | VARCHAR2(30) | 约束定义所针对的列名

    ### 2.4.3 约束的状态 DISABLE 和 ENABLE

    在Oracle数据库中，约束共有两种状态，即禁止和激活。DISABLE和ENABLE约束则是用来空值约束的约束，也就是通过这两个约束可以空值表约束是激活还是禁用。

1.  激活状态ENABLE，在激活状态下，约束具有一定的判断和约束能力。如果插入的数据违反了约束条件，那么该语句将不会执行。默认情况下新创建的约束都是激活状态。
2.  禁止状态DISABLE，将约束设置为禁止状态，就相当于该列没有设置约束的效果。就算插入的数据违反了约束条件，也会被成功插入。

    修改一个约束的状态，两种方法：

*   使用ALTER TABLE ... ENABLE|DISABLE语句
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">CONSTRAINT</span> restrain_name ENABLE|DISALBE;</span>
    `</pre>

*   使用ALTER TABLE ... MODIFY ... ENABLE|DISABLE语句；
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name MODIFY <span class="hljs-keyword">CONSTRAINT</span> restrain_name ENABLE|DISABLE;</span>
    `</pre>

    ### 2.4.4 常用的约束 NOT NULL

    在添加表时对某列添加NOT NULL约束：

    <pre>`CTEATE TABLE tale_name COLUMN(column_name data_type [CONSTRAINT constraint_name] NOT <span class="hljs-literal">NULL</span>, <span class="hljs-keyword">...</span>);
    `</pre>

    已存在的表，对某列添加NOT NULL约束：

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name MODIFY column_name [<span class="hljs-keyword">CONSTRAINT</span> constraint_name] <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>;</span>
    `</pre>> [CONSTRAINT constraint_name]为约束指定名称，这个是非必须的，但是如果没有指定名称，oracle会已默认的方式指定名称，为了便于管理（修改、删除等）约束，最好自定义约束的名称！

    ### 2.4.5 常用的约束 PRIMARY KEY

    PRIMARY KEY主键约束，用于标识唯一一行记录。在一个表中只能定义一个PRIMARY KEY，该约束可以定义在单独的列上，也可以定义在多个列上（组合唯一标识），定义了PRIMARY KEY的列或者列祖，不允许有重复值，也不能有NULL值。

    创建表时添加主键约束：

    <pre>`CREATE TABLE table_name COLUMN(column_name data_type [CONSTRAINT constraint_name] PRIMARY KEY, <span class="hljs-keyword">...</span>);
    `</pre>

    或者：

    <pre>`CREATE TABLE table_name COLUMN(column_name data_type,<span class="hljs-keyword">...</span> [CONSTRAINT constraint_name] PRIMARY KEY(column_name, <span class="hljs-keyword">...</span>));
    `</pre>

    为已存在的表添加主键约束：

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">ADD</span> [<span class="hljs-keyword">CONSTRAINT</span> constraint_name] <span class="hljs-keyword">PRIMARY</span> <span class="hljs-keyword">KEY</span>(column_name);</span>
    `</pre>

    移除主键约束：
    参见 2.4.10 移除约束！

    ### 2.4.6 常用的约束 UNIQUE

    UNIQUE是指唯一约束，要求列中不能有重复的值。可以为单独一列或者多个列组成的列祖添加UNIQUE约束。列祖添加UNIQUE约束后要求列的组合值是唯一的即可。

    添加、修改、删除约束的形式和NOT NULL、PRIMARY KEY相同，请参照上文。

    ### 2.4.7 常用的约束 CHECK

    CHECK约束是指检查性约束，使用CHECKY约束时，将对输入的每一个数据进行检查，只有符合条件的记录才会被保存到表中，从而保证数据的有效性和完整性。

    > CHECK约束有以下4个特点：
> 
>     在CHECK表达式中，必须引用一个列或者多个列，并且表达式的运算结果是一个BOOL值；
> 
>     在一个列中，可以定义多个CHECK约束；
> 
>     对于同一列，可以同时定义多个CHECK约束和NOT NULL约束；
> 
>     CHECK约束即可定义在列级别中，也可以定义在表级别中；
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> user_base(name VARCHAR2(<span class="hljs-number">30</span>) <span class="hljs-keyword">CONSTRAINT</span> cons_name <span class="hljs-keyword">NOT</span> <span class="hljs-literal">NULL</span>, age <span class="hljs-built_in">NUMBER</span>(<span class="hljs-number">3</span>) <span class="hljs-keyword">CONSTRAINT</span> cons_age <span class="hljs-keyword">CHECK</span>(age > <span class="hljs-number">0</span>));</span>
    `</pre><pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> user_base <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">CONSTRAINT</span> cons_age_2 <span class="hljs-keyword">CHECK</span>(age < <span class="hljs-number">120</span>);</span>
    `</pre>

    ### 2.4.8 常用的约束 FOREIGN KEY

    FOREIGN KEY约束是指外键约束，用于引用本表或另一个表中的一个列或者一组列。如果引用列和被引用列在同一表中，这种情况称为自引用。

    > 被引用的列或者列祖应该具有主键约束或者唯一性约束；
> 
>     引用列的取值只能为被引用列的值或者NULL值；
> 
>     可以为一个列或者一组列定义FOREIGN KEY；
> 
>     如果引用列中存储了被引用列的某个值，则不能直接删除被引用列中的这个值。如果一定要删除，需要先删除引用列的这个值，然后再删除被引用列的这个值；(引用列和被引用列可以指定级联操作类型，参见下节！2.4.9)
    <pre>`<span class="hljs-operator"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">table</span>(column_name data_type [CONSTRATIN constraint_name] <span class="hljs-keyword">REFERENCES</span> table_name2(column_name2));</span>
    `</pre><pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">ADD</span> [<span class="hljs-keyword">CONSTRAINT</span> constraint_name] <span class="hljs-keyword">FOREIGN</span> <span class="hljs-keyword">KEY</span>(column_name1) <span class="hljs-keyword">REFERENCES</span> table_name2(column_name2);</span>
    `</pre>

    ### 2.4.9 指定级联操作类型

    在添加FOREIGN KEY约束时，还可以指定级联操作的类型，主要用于确定当删除(ON DELETE)父表中的一条记录时，如果处理子表的外键字段。如下3种类型：

    <table>
    <thead>
    <tr>
    <th>类型</th>
    <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>CASCADE</td>
    <td>当删除主表中被引用的数据时，级联删除子表中相引用的数据行</td>
    </tr>
    <tr>
    <td>SET NULL</td>
    <td>当删除主表中被引用的数据时，将子表中相引用的数据设置为NULL，这就要求子表的对应列允许被设置为NULL；</td>
    </tr>
    <tr>
    <td>NO ACTION</td>
    <td>当删除主表中被引用的数据时，如果子表的引用列包含该值，则禁止该操作执行，默认为此选项。</td>
    </tr>
    </tbody>
    </table>
    <pre>`<span class="hljs-function">CTEATE TALBE <span class="hljs-title">stu</span><span class="hljs-params">(sid NUMBER(<span class="hljs-number">10</span>)</span>, sname <span class="hljs-title">VARCHAR2</span><span class="hljs-params">(<span class="hljs-number">30</span>)</span>, cid <span class="hljs-title">NUMBER</span><span class="hljs-params">(<span class="hljs-number">4</span>)</span> REFERENCES <span class="hljs-title">stu_class</span><span class="hljs-params">(cid)</span> ON DELETE SET NULL)</span>;
    `</pre>

    ### 2.4.10 移除约束

    移除列上的约束需要使用ALTER TABLE ... DROP语句，不过在形式上只能采取指定约束名称的方式，如下：

    <pre>`<span class="hljs-operator"><span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">TABLE</span> table_name <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> constraint_name;</span>

如果在添加约束时为约束指定了名称，这里直接使用约束名称。如果没有，则需要通过USER_CONS_COLUMNS和USER_CONSTRAINTS来查看oracle自动指定的约束名称。