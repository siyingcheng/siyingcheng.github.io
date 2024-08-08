---
title: Cucumber Queries
titleTemplate: Javascript
description: Notes for Cucumber.js queries.
head:
  - - meta
    - name: description
      content: Notes for Cucumber.js queries.
tags:
  - Cucumber
categories:
  - Queries
---

# Queries <Badge type="tip" text="Cucumber" /><Badge type="warning" text="Notes" />

## What are the three practices of BDD, and in what order do you apply them to a story?

::: details Answer
`Discover - Formulation - Automation`

We start by collaboratively **_discovering_** the scope of the behaviour required by the story. Once we have agreed on that behaviour, we **_formulate_** the specification in business-readable language. Finally, we **_automate_** the formulated specification to verify that the system actually behaves as expected.
:::

## How are Cucumber and BDD related?

::: details Answer
`BDD is a collaborative way of working for teams that can include using Cucumber`

Cucumber is a tool that understands your documentation and turns it into automated tests.

BDD is a collaborative approach, made up of three practices. BDD practitioners may use Cucumber to automate their documentation.
:::

## BDD practitioners prefer comprehensive documentation over collaboration?

::: details Answer
`False`

BDD is a collaborative activity. Living documentation is a secondary, valuable, output of applying BDD practices.
:::

## Which of these statements correctly describes how each of these keywords should be used?

The Gherkin keywords `Given`, `When` and `Then`, allow us to express three different components of a scenario.

::: details Answer
**Given** is the _context_ for the scenario. We’re putting the system into a specific state, ready for the scenario to unfold.

**When** is an _action_. Something that happens to the system that will cause something else to happen: an outcome.

**Then** is the _outcome_. It’s the behaviour we expect from the system when this action happens in this context.
:::
