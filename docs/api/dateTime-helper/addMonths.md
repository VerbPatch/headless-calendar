---
title: addMonths
description: Adds a specified number of months to a date.
---

# addMonths()

> **addMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:500](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/date.ts#L500)

Adds a specified number of months to a date.

## Parameters

### date

`Date`

The original date.

### months

`number`

The number of months to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addMonths(new Date('2024-01-15'), 3); // 2024-04-15
```
