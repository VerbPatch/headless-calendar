---
title: addDays
description: Adds a specified number of days to a date.
---

# addDays()

> **addDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:463](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/date.ts#L463)

Adds a specified number of days to a date.

## Parameters

### date

`Date`

The original date.

### days

`number`

The number of days to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addDays(new Date('2024-01-15'), 5); // 2024-01-20
```
