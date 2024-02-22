---
title: PostgreSQL Commands
titleTemplate: SQL
description: PostgreSQL Commands
head:
  - - meta
    - name: description
      content: PostgreSQL Commands
tags:
  - SQL
categories:
  - Notes
---

# PostgreSQL Commands <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## Database Interaction Commands

- `\q`: Exit the PostgreSQL client.
- `\h command_name`: Get help on a specific command.
- `?`: List all available commands.
- `\password`: Change your password.
- `\c db_name`: Connect to a specific database.
- `\l`: List available databases.
- `\dt`: List tables in the current database.
- `\d table_name`: Describe table, shows the structure of a table, including column
  names, data types, and constraints.
- `\du`: List users and their roles.
- `\df`: List all available functions in the current database.
- `\sf function_name`: Show the definition of a specific function.
- `\x`: Toggles between expanded and no-expanded output for query results, making
  it easier to read.
- `\i sql_file_path`: Executes batch SQL commands from file. Example: `\i /Volumes/Data/download/person.sql`
- `\copy sql_statement TO output_file_path`: Performs SQL COPY with data stream
  to the client host. Example:

```sql
\copy (SELECT * FROM person LEFT JOIN car ON car.id = person.car_id)
TO '/Volumes/Data/download/person-car-left-join.csv'
DELIMITER ',' CSV HEADER;
```

## Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM pg_available_extensions WHERE name = 'uuid-ossp';

-- \df to list functions
-- test=> \df
                                 List of functions
-- Schema |        Name        | Result data type |    Argument data types    | Type
----------+--------------------+------------------+---------------------------+------
-- public | uuid_generate_v1   | uuid             |                           | func
-- public | uuid_generate_v1mc | uuid             |                           | func
-- public | uuid_generate_v3   | uuid             | namespace uuid, name text | func
-- public | uuid_generate_v4   | uuid             |                           | func
-- public | uuid_generate_v5   | uuid             | namespace uuid, name text | func
-- public | uuid_nil           | uuid             |                           | func
-- public | uuid_ns_dns        | uuid             |                           | func
-- public | uuid_ns_oid        | uuid             |                           | func
-- public | uuid_ns_url        | uuid             |                           | func
-- public | uuid_ns_x500       | uuid             |                           | func

SELECT uuid_generate_v4();
```
