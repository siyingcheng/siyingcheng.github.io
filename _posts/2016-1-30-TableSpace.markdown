---
title:  "表空间 日志文件"
date:   2016-01-30 15:04:23
categories: [Oracle 11g]
tags: [Oracle 11g]
---

## 1. 表空间

### 1.1 表空间状态 ONLINE OFFLINE READ ONLY READ WRITE
表空间状态为ONLINE时才可以对表空间正常访问，表空间状态为OFFLINE则不允许访问，这时可以对表空间进行备份、维护和升级。

* 修改表空间状态为离线

```
ALTER TABLESPACE tablespace_name OFFLINE parameter
```

```
其中parameter有四个值：（不写就默认是NORMAL)

* NORMAL：正常方式切换到离线状态，执行检查点时检查数据文件，将内容写入到数据文件保存，关闭数据连接; 
* TEMPORARY：临时方式切换，执行检查点时不检查数据文件是否可以使用;
* IMMEDIATE：立即切换，不执行检查点 
* FORRECOVER：已恢复方式切换到离线状态，常用来对表空间基于时间的方式恢复表空间

```
* 修改表空间状态为联机

```
ALTER TABLESPACE tablespace_name ONLINE
```
* 修改表空间为只读

```
ALTER TABLESPACE tablespace_name READ ONLY
```
* 修改表空间为读写

```
ALTER TABLESPACE tablespace_name READ WRITE
```

### 1.2 修改表空间

* 修改表空间大小

```
ALTER DATABASE DATAFILE file_name RESIZE newsize K|M;
```

* 为表空间增加数据文件

```
ALTER TABLESPACE tablespace_name ADD DATAFILE data_file_name SIZE number K|M [AUTOEXTEND OFF|ON [NEXT number K|M MAXSIZE UNLIMITED|number K|M]];
```

* 修改表空间数据文件的状态

```
ALTER DATABASE DATAFILE file_name ONLINE|OFFLINE|OFFLINE DROP;
```

* 当物理移动数据文件后，需要重新指定数据文件的位置

```
ALTER TABLESAPCE tablespace_name RENAME DATAFILE old_name TO new_name;
```

* 重命名表空间，但不能对system和sysaux表空间修改

```
ALTER TALBESPACE tablespace_name RENAME TO new_tablespace_name;
注意，表空间状态为ONLINE，则不能执行重命名操作
```

*  删除表空间

```
DROP TABLESPACE tablespace_name [INCLUDING CONTENTS [AND DATAFILES]];

INCLUDING CONTENTS, 表示删除表空间所有数据对象。如果表空间有数据对象则必须使用此选项；
AND DATAFILES, 表示删除对应的数据文件，否则仅删除数据字典和控制文件中该表空间的有关信息，而不会删除操作系统中与该表空间对应的数据文件；
```

#### 1.3 临时表空间和临时表空间组

临时表空间主要用于储存用户在执行ORDER BY等语句进行排序或者汇总时产生的临时数据，默认情况下用户使用temp作为默认的临时表空间，但允许用户指定其他表空间为临时表空间，这需要在创建用户时进行指定。

* 创建临时表空间，关键字TEMPORARY,与临时表空间对应的临时文件用TEMPFILE关键字

```
CREATE TEMPORARY TABLESPACE tablespace_name TEMPFILE tem_file_name SIZE number K|M AUTOEXTEND ON NEXT number K|M MAXSIZE number K|M;
```
如果需要增加临时文件，使用ADD TEMPFILE子句；
如果需要修改临时文件的大小，使用RESIZE关键字；
还可以修改临时文件的状态，ONLINE|OFFLINE；

1、临时表空间组不需要特别创建，只需要在创建临时表空间组时，使用TABLESPACE GROUP语句为其指定一个组即可；

```
CREATE TEMPORARY TABLESPACE tablespace_name TEMPFILE temp_file_name SIZE number K|M TABLESPACE GROUP group_name;
```
2、查看临时表空间组信息， 数据字典dba_tablespace_groups;

```
SELECT * FROME dab_tablespace_groups;
```

3、移动临时表空间到临时表空间组，使用ALTER TABLESPACE语句；

```
ALTER TABLESPACE temp_tablespace_name TABLESPACE GROUP group_name;
```

4、删除临时表空间组，也会删除临时表空间组中的临时表空间；

#### 1.4 大文件表空间

用于解决存储文件大小不够的问题。与普通表空间不同的是，大文件表空间只能够对应一个数据文件或临时文件，而普通表空间可以最多对应1022个数据文件或临时文件。虽然大文件表空间只能够对应一个数据文件，但这个数据文件可达到4G数据块大小。而普通表空间对应的文件最大可达到4M数据块大小。

创建大文件表空间使用BIGFILE关键字，与大文件表空间对应普通表空间使用SMALLFILE关键字表示，只不过默认创建的表空间可以省略这个关键字。可以通过数据字典database_properties了解当前表空间的类型。

```
CREATE BIFFILE TABLESPACE tablespace_name DATAFILE file_name SIZE number K|M;
```

#### 1.5 非标准数据块表空间

在前面所创建的表空间中，所有的数据块大小都时相同的。数据块的大小由参数DB_BLOCK_SIZE决定，并且在创建数据库后不能再进行修改。为了优化I/O性能，Oracle系统允许不同的表空间使用不同大小的数据块，这样可以实现将大规模的表存储在由大数据块构成的表空间，而小规模的表则存储在由小数据块构成的表空间中。在创建非标准数据块的表空间时，用户需要显式使用BLOCKSIZE选项。 

当在数据库中使用多种数据块尺寸时，必须为每种数据块分配相应的数据高速缓存，并且数据高速缓存的尺寸可以动态修改。具体而言，参数BLOCKSIZE必须与数据缓冲区参数DB_nk_CACHE_SIZE相对应，BLOCKSIZE与数据缓冲区参数DB_nk_CACHE_SIZE的对应关系如表所示。


BLOCKSIZE | DB_nK_CACHE_SIZE
---|---
2k | DB_2K_CACHE_SIZE
4k | DB_4K_CACHE_SIZE
8k | DB_8K_CACHE_SIZE
16k | DB_16K_CACHE_SIZE
32k | DB_32K_CACHE_SIZE

```
1. 设置参数
ALTER SYSTEM SET DB_16K_CACHE_SIZE = 16M;
2. 创建非标准数据块表空间
CREATE TABLESPACE blockspace DATAFILE file_name SIZE number K|M AUTOEXTED ON NETX number K|M BLOCKSIZE 16K;
```

可以通过数据字典dba_tablespaces查看

```
SELECT tablespace_name , block_size FROM dba_tablespaces;
```

#### 1.6 撤销表空间

为了实现对数据回退、恢复、事务回滚及撤销等操作，ORACLE提供了一部分存储空间，专门保存撤销记录，将修改前的数据保存到该表空间中，所以这部分空间被称为撤销表空间。多个撤销表空间可以存在于一个数据库中，但是在任何给定的时间内只有一个撤销表空间是可以获得的。

```
CREATE UNDO TABLESPACE undo_tablespace_name DATAFILE file_name SIZE number K|M AUTOEXNTEND ON;
```

撤销表空间主要由ORACLE系统自动管理，所以对撤销表空间的数据文件的修改也主要限于一下几种形式：1. 为撤销表空间添加新的数据文件；2. 修改撤销表空间的大小；3. 设置撤销表空间的数据文件的状态ONLINE或OFFLINE；

一个数据库中可以有多个撤销表空间，但数据库一次只能使用一个撤销表空间。默认情况下，数据库使用的是系统自动创建的undotbs1撤销表空间。如果要将数据库使用的撤销表空间切换成其他的表空间，使用ALTER SYSTEM语句修改参数undo_tablespace的值即可。切换撤销表空间后，数据库中新事务的撤销数据将保存在新的撤销表空间中。

```
ALTER SYSTEM SET UNDO_TABLESPACE = new_undo_tablespace_name;
```

在自动撤销记录管理方式中，可以指定撤销信息在提交后需要保留的时间，以防止在长时间的查询过程中出现snapshot too old错误。

在自动撤销管理的方式下，DAB使用UNDO_RETENTION参数，指定撤销记录的保留时间。由于UNDO_RETENSION参数是一个动态参数，在UNTO_RETENTIONY语句，来修改撤销记录的保留的时间。撤销记录保留时间的单位是秒，默认值是900；

```
ALTER SYSTEM SET UNDO_RETENTION = 600;
```

删除撤销表空间时，要确保该撤销表空间此时没有被数据库使用。如果需要删除正在使用的撤销表空间，则应手动切换撤销表空间一次。

```
DROP TABLESPACE undo_tablespace_name INCLUDING CONTENTS AND DATAFILES;
```

#### 1.7 默认表空间

用户的默认表空间为system,默认临时表空间为temp。但可以用其他表空间作为用户的默认表空间；

```
ALTER DATABASE DEFAULT [TEMPORARY] TABLESPACE tablespace_name;
```

如果使用TEMPORAY关键字，则指定默认临时表空间；如果没有使用TEMPORARY关键字则指定用户的默认永久表空间。

## 2. 管理控制文件和日志文件

* 创建日志文件组

```
ALTER DATABSE database_name ADD LOGFILE [GROUP group_nmber] (file1_name, file2_name, ...) [SIZE size] [REUSE]
```

如果日志文件成员已存在，可以使用REUSE关键字覆盖已存在的文件，但该文件不能已经属于其他日志文件组，否则无法替换。

* 创建日志文件

一般是向日志文件组中添加日志成员

```
ALTER DATABASE ADD LOGFILE MEMBER logfile_name TO GROUP group_number;
```

* 重新定义日志成员（重命名，要与实际文件路径文件名一致）

```
ALTER DATABSE RENAME FILE old_logfile_name TO new_logfile_name;
```

* 切换日志文件组

日志文件组是循环使用的，当一组日志文件被写满后，oracle系统自动切换到下一组文件。在需要的时候，数据库管理员也可以手动切换日志文件组。

```
ALTER SYSTEM SWITCH LOGFILE;
```

* 清空数据文件组

如果日志文件组中的日志收到损害，将导致受损的数据库无法将受损的日志文件进行归档，这会最终导致数据库停止运行。此时，在不关闭数据库的情况下，可以选择清空日志文件组中的内容。注意：被清空的日志文件组不能处于CURRENT状态，也就是说不能清空当前正在使用的日志文件组；当数据库中只有两个日志文件组时，不能清空数据文件组。

```
ALTER DATABASE CLEAR LOGFILE GROUP group_number;
```

* 删除日志文件

删除日志文件前，将要被删除的日志文件组不能处于CURRENT状态，需执行一次手工切换日志，将日志的状态改为INACTIVE;该日志文件所在的日志文件组必须有其他日志成员；如果数据库运行在归档模式下，则应该在删除日志文件前，确定它所在的日志文件组已经被归档，否则会导致数据丢失。

```
ALTER DATABSE DROP LOGFILE MEMBER logfile_name;

日志文件组的状态有：ACTIVE CURRENT INACTIVE UNUSED
日志文件的状态有：VALID INVALID STALE
```

* 删除日志文件组

```
ALTER DATABSE DROP LOGFILE GROUP group_number;
```

* 管理归档日志

ORACLE利用重做日志文件记录对数据库的操作，但是重做日志文件组是循环使用的，当所有的日志文件被填满时，系统自动切换到第一组日志文件，当然管理员也可以手工切换。而在循环使用日志文件时，日志文件中已存在的日志内容会被覆盖。为了完整的记录数据库的全部操作，Oracle提出了归档日志的概念。

如果是非归档日志模式，则切换日志文件时，日志文件内原有的内容将被新的的内容覆盖；如果是归档模式，则切换到日志文件时，，系统会先对日志文件进行归档存储，之后才允许向文件中写入新的日志内容。

修改数据库归档、非归档模式，默认为非归档

```
ALTER DATABASE ARCHIVELOG|NOARCHIVELOG;
```

设置归档目标

归档目标也就是指存放归档日志文件的目录。一个数据库口语有多个归档目标。在创建数据库的时候，默认设置了归档目标，可以通过db_recovery_file_dest参数查看。

设置归档目标的语法：

```
ALTER SYSTEM SET LOG_ARCHIVE_DEST_N = '{LOCATION|SERVER} = directory';

directory表示磁盘目录，LOCATION表示为本地系统目录，SERVER表示为远程数据库目录
```

设置归档日志的名称

通过参数log_archive_format，可以设置归档日志名称格式。

语法形式：

```
ALTER SYSTEM SET log_archive_format = 'fix_name%S_%R.%T' SCOPE = scope_type;

其中，fix_name是自定义的命名前缀；%S表示日志序列号；%R表示联机重做日志（RESETLOGS）的ID值；%T表示归档线程编号；SCOPE有三个参数值：MEMORY、SPFILE、BOTH。其中，MEMORY表示只改变当前实例运行参数；SPFILE表示只改变服务器参数文件SPFILE中的设置；BOTH则表示两者都改变。
```
