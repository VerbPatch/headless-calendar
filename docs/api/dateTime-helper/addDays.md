---
title: addDays
description: Adds a specified number of days to a date.
---

# addDays()

> **addDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:463](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/date.ts#L463)

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
