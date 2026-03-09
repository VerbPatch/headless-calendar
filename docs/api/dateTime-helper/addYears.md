---
title: addYears
description: Adds a specified number of years to a date.
---

# addYears()

> **addYears**(`date`, `years`): `Date`

Defined in: [utils/date.ts:577](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L577)

Adds a specified number of years to a date.

## Parameters

### date

`Date`

The original date.

### years

`number`

The number of years to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addYears(new Date('2024-02-29'), 1); // 2025-02-28
```
