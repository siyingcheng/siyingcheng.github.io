---
title: Troubleshooting
titleTemplate: SQL
description: SQL Troubleshooting
head:
  - - meta
    - name: description
      content: SQL Trigger
tags:
  - SQL
categories:
  - Notes
---

# Troubleshooting <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

## psql: error: connection to server at "localhost" (::1), port 5432 failed: FATAL: Ident authentication failed for user

::: tip
https://stackoverflow.com/questions/74481804/psql-error-connection-to-server-at-localhost-1-port-5432-failed-fatal
:::

Solution: (In my fedora environment)

Try to change in the file `/var/lib/pgsql/data/pg_hba.conf` all values `ident` to `scram-sha-256`

And then restart server: `sudo systemctl restart postgresql`
