---
title: Write Scripts
titleTemplate: Postman
description: Postman Write Scripts
head:
  - - meta
    - name: description
      content: Postman Write Scripts
tags:
  - SQL
categories:
  - Notes
---

# Write Scripts <Badge type="tip" text="Postman" /><Badge type="warning" text="Notes" />

Postman tests can use [_Chai Assertion Library BDD_](https://www.chaijs.com/api/bdd/)
syntax, which provides options to optimize how readable your tests are to you and
your collaborators.

## Script Examples

### Set Variables

```javascript
// set collection variables
pm.collectionVariables.set(
  "created_username",
  pm.response.json().data.username
);
```

### Verify Response Status

```javascript
pm.test("Verify status is 200 OK", function () {
  pm.response.to.have.status(200);
  pm.expect(pm.response.code).to.eql(200);
  pm.expect(pm.response.status).to.eql("OK");
});
```

### Verify Response Body JSON

```javascript
// use response body as JSON
const response = pm.response.json();

// use collection variables
pm.expect(response.data.id).to.eql(
  parseInt(pm.collectionVariables.get("userid"))
);

// boolean
pm.expect(response.flag).to.eql(true);
pm.expect(response.flag).to.be.true;

// string
pm.expect(response.message).to.eql("Create user success");

// number
pm.expect(response.data.id).to.gt(0);
pm.expect(response.data.id).to.be.greaterThan(0);

// have property
pm.expect(response.data).to.have.property("username");

// property type is string|boolean|number
pm.expect(response.data.username).to.be.a("string");
pm.expect(response.data.id).to.be.a("number");
pm.expect(response.data.enabled).to.be.a("boolean");

// regex
pm.expect(response.data.id).to.match(/^[0-9]{3}$/);
```

Use predefined dynamic variables:

```javascript
// the request body parameter `customerName` is {{$randomFullName}}
pm.test("Customer name", function () {
  pm.expect(pm.response.customerName).to.eql(
    pm.variables.replaceIn("{{$randomFullName}}")
  );
});
```

### Verify JSON Schema

You can also validate your JSON schema with the [_Ajv JSON schema validator_](https://www.npmjs.com/package/ajv):

```javascript
pm.test("Verify response JSON schema", function () {
  const schema = {
    type: "object",
    properties: {
      flag: {
        type: "boolean",
      },
      message: {
        type: "string",
      },
      data: {
        type: "object",
        properties: {
          id: { type: "number" },
          username: { type: "string" },
          nickname: { type: "string" },
          email: { type: "string" },
          roles: {
            type: "string",
            pattern: "^ROLE_(USER|ADMIN)$", // optional
          },
          enabled: { type: "boolean" },
        },
        required: ["id", "username", "email", "roles", "enabled"],
        additionalProperties: false,
      },
    },
    required: ["flag", "message", "data"],
    additionalProperties: false,
  };
  pm.response.to.have.jsonSchema(schema);
});
```

Json schema type: https://ajv.js.org/json-type-definition.html

Learn more about JSON Schema: https://json-schema.org/

### Verify Response Headers

```javascript
pm.test("Verify response headers", function () {
  pm.expect(pm.response.headers.get("Content-Type")).to.equals(
    "application/json"
  );
});
```
