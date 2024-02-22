---
title: How to connect to database?
titleTemplate: SQL
description: How to connect to database?
head:
  - - meta
    - name: description
      content: How to connect to database?
tags:
  - SQL
categories:
  - Notes
---

# How to connect to database? <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

Connect database with CLI:

::: code-group

```shell [PostgreSQL]
# PostgreSQL CLI connection command:
# https://help.ubuntu.com/community/PostgreSQL
psql -h <hostname or IP address>
     -p <port number>
     -U <username>
     -d <database name>
```

```shell [MySQL]
# MySQL CLI connection command:
# https://www.a2hosting.com/kb/developer-corner/mysql/connect-to-mysql-from-the-command-line/
mysql -h <hostname or IP address>
      -P <port number>
      -u <username>
      -p
      -D <database name>

```

:::

Examples:
::: code-group

```shell [PostgreSQL]
psql -h localhost -p 5432 -U postgres -d mydatabase
```

```shell [MySQL]
mysql -h localhost -P 3306 -u root -p -D mydatabase

```

:::
