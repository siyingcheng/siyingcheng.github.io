---
title: SQL Injection
titleTemplate: SQL
description: SQL Injection
head:
  - - meta
    - name: description
      content: SQL Injection
tags:
  - SQL
categories:
  - Notes
---

# SQL Injection <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />

::: tip 💡 OWASP Broken Web Applications Project
https://sourceforge.net/projects/owaspbwa/
:::

## What is the SQL Injection

SQL injection is a dangerous web security vulnerability that allows attackers to
exploit weaknesses in the way user input is handled. By injecting malicious SQL
statements into forms or other input fields, attackers can manipulate the database
and gain unauthorized access to data, modify data, or even execute arbitrary code.

There are several common types of SQL injection:

- `Error-based injection`: Attackers inject code that triggers database errors,
  revealing information about the database structure or schema.
- `Time-based injection`: Attackers inject code that alters the timing of database
  responses, allowing them to infer the presence or absence of specific data.
- `Boolean-based injection`: Attackers inject code that manipulates the results of
  database queries, allowing them to gradually learn the content of specific data
  fields.
- `Union-based injection`: Attackers inject code that combines the attacker's query
  with the legitimate query, allowing them to retrieve unwanted data from the database.
- `Stacked injection`: Attackers inject multiple layers of malicious code, bypassing
  typical input validation filters.
- `Blind injection`: Attackers learn about the database without directly seeing the
  results, relying on indirect observations like timing differences or error messages.
- `DNSlog injection`: Attackers exploit vulnerabilities to make the database send
  information to a DNS server controlled by the attacker.

SQL injection can have severe consequences, leading to data theft, unauthorized
modifications, and even system compromise. To prevent these attacks, developers
should:

- Use prepared statements or parameterized queries. These pre-compile the SQL
  code, preventing malicious statements from being injected.
- Validate and sanitize user input. Filter out potentially harmful characters
  before they reach the database.
- Keep software up to date. Apply security patches promptly to address known
  vulnerabilities.

## How to Prevent SQL Injection

Here are essential strategies to prevent SQL injection attacks:

1. Use Prepared Statements or Parameterized Queries:

   - Separate query structure from user input.
   - Treat input as data, not code.
   - Prevent attackers from modifying the intended SQL statement.
   - Available in most programming languages and database frameworks.

2. Validate and Sanitize User Input:

   - Check for expected data types, lengths, and formats.
   - Remove or escape special characters like quotes, backslashes, and semicolons
     that could be used for injection.
   - Implement context-aware validation to match input with expected patterns.

3. Employ Least Privilege:

   - Grant database users only the minimum permissions needed for their roles.
   - Restrict access to sensitive data and operations.
   - Minimize the potential damage if an attacker gains unauthorized access.

4. Escape User Input for Dynamic Queries (If Parameterized Queries Not Possible):

   - Properly escape special characters within user input before constructing SQL queries.
   - Ensure correct escaping rules for the specific database system.
   - Use built-in escaping functions or libraries.

5. Keep Software Up to Date:

   - Apply security patches promptly to address known vulnerabilities in database
     systems, web frameworks, and libraries.
   - Utilize vulnerability scanning tools to identify potential weaknesses.

6. Regularly Review Code and Conduct Security Audits:

   - Scan for SQL injection vulnerabilities using static code analysis tools.
   - Perform penetration testing to simulate real-world attacks.
   - Train developers on secure coding practices and SQL injection prevention techniques.

7. Disable Database Error Messages for End Users:

   - Prevent attackers from gaining information about database structure or schema
     from error messages.
   - Provide user-friendly error messages without revealing sensitive details.

8. Consider Web Application Firewalls (WAFs):

   - Can detect and block common SQL injection attacks.
   - Provide an additional layer of defense for web applications.
   - Configure WAFs to monitor specific input fields and patterns.

9. Educate Developers and Users:

   - Raise awareness of SQL injection risks and best practices.
   - Train developers on secure coding techniques and input validation.
   - Teach users to be cautious about submitting personal information online.

## SQL Injections Examples

Here are examples of SQL injection attacks, illustrating different techniques and potential consequences:

1. Bypassing Authentication:

   - Attacker injects `' OR '1'='1' --` into a login form's password field.
   - Authenticates as a valid user without knowing the actual password.

2. Retrieving Sensitive Data:

   - Attacker injects `' UNION SELECT credit_card_number, expiry_date FROM users --`
     into a search field.
   - Retrieves sensitive credit card information from the database.

3. Modifying Data:

   - Attacker injects `'; UPDATE users SET password='newpassword' WHERE username='admin' --`
     into a profile update form.
   - Changes the administrator's password, gaining unauthorized access.

4. Deleting Data:

   - Attacker injects `'; DELETE FROM orders WHERE customer_id=1 --`
     into a shopping cart page.
   - Deletes all orders for a specific customer.

5. Executing Arbitrary Code:

   - Attacker injects `EXEC xp_cmdshell 'dir c:\' --` into a vulnerable input field.
   - Runs system commands on the database server, potentially compromising the
     server or network.

6. Blind SQL Injection:

   - Attacker injects code that delays responses or alters results in subtle ways,
     gradually extracting information without visible errors.

7. Second-Order SQL Injection:

   - Attacker injects malicious code that is stored in the database and later executed,
     bypassing initial input validation.
