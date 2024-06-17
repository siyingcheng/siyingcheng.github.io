# Xpath

## Basic XPath Syntax

- `/` : Selects from the root element
- `//` : Selects nodes anywhere in the document
- `.` : Represents the current node
- `..` : Represents the parent of the current node

## Selectors

1. `tagname` : Selects all elements with the given tag name
2. `@attribute` : Selects elements with the given attribute
3. `*` : Selects all elements
4. `text()` : Selects the text content of an element
5. `|` : Selects elements that match either of the two expressions
6. `[predicate]` : Adds a condition to filter nodes
7. `()` : Groups expressions

## Predicates

- `[name='value']` - Selects nodes with the specified attribute value.
- `[position()]` - Selects nodes based on their position.
- `[last()]` - Selects the last node of a given type.
- `[contains(@attribute, 'value')]` - Selects nodes with attribute values containing 'value'.
- `[not(predicate)]` - Negates a condition.

## Axes

- `ancestor::` - Selects all ancestors.
- `ancestor-or-self::` - Selects ancestors and the current node.
- `child::` - Selects all children.
- `descendant::` - Selects all descendants.
- `descendant-or-self::` - Selects descendants and the current node.
- `following::` - Selects all following nodes.
- `following-sibling::` - Selects following siblings.
- `parent::` - Selects the parent node.
- `preceding::` - Selects all preceding nodes.
- `preceding-sibling::`- Selects preceding siblings.
- `self::` - Selects the current node.

## Operators

- `=` - Equal to.
- `!=` - Not equal to.
- `<` - Less than.
- `<=` - Less than or equal to.
- `>` - Greater than.
- `>=` - Greater than or equal to.
- `and` - Logical AND.
- `or` - Logical OR.
- `not` - Logical NOT.

## Functions

- `name()` - Returns the name of the current node.
- `count(nodes)` - Returns the number of nodes in the node-set.
- `concat(string1, string2)` - Concatenates two strings.
- `contains(string, substr)` - Checks if a string contains a substring.
- `substring(string, start, length)` - Returns a substring.
- `normalize-space(string)` - Removes leading/trailing whitespace and collapses spaces.
