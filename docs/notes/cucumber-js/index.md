---
title: Cucumber
titleTemplate: Javascript
description: Notes for Cucumber.js
head:
  - - meta
    - name: description
      content: Notes for Cucumber.js
tags:
  - Cucumber
categories:
  - Queries
---

# Cucumber <Badge type="tip" text="Cucumber" /><Badge type="warning" text="Notes" />

::: info
You can learn more about Cucumber at [https://school.cucumber.io/](https://school.cucumber.io/).
:::

Cucumber is a **Behavior-Driven Development (BDD)** tool that supports writing
automated tests in a **human-readable** format.

::: details What is BDD?
**BDD** is an approach that collaboratively specifies the system's desired behaviour. Each time a piece of behaviour is agreed, we use that specification to "drive" the development of the code that will implement that behaviour.
:::

## Basic CLI

To run Cucumber tests, we need to install the `cucumber-js` package and run the `cucumber-js` command in the terminal.

```bash
npm install cucumber-js --save-dev
```

Then, we can run the tests using the following command:

```bash
npx cucumber-js
```

This will run all the feature files in the `features` directory.

To run a specific feature file, we can use the `--name` option:

```bash
npx cucumber-js --name "My Feature"
```

To run a specific scenario, we can use the `--name` option with the scenario name:

```bash
npx cucumber-js --name "My Scenario"
```

To run a specific scenario outline, we can use the `--name` option with the scenario outline name and the example row:

```bash
npx cucumber-js --name "My Scenario Outline" --example "row 1"
```

To run all scenarios in a feature file, we can use the `--name` option with the feature file name:

```bash
npx cucumber-js --name "My Feature"
```

To run all scenarios in a specific directory, we can use the `--path` option:

```bash
npx cucumber-js --path "features/my-directory"
```

Output html report:

```bash
npx cucumber-js -f html:reports/cucumber_report.html
```
