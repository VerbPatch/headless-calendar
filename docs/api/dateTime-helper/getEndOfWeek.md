---
title: Get End Of Week
description: Gets the end of the week for a given date.
---

# getEndOfWeek()

> **getEndOfWeek**(`date`, `startOfWeek?`): `Date`

Defined in: [utils/date.ts:338](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L338)

Gets the end of the week for a given date.

## Parameters

### date

`Date`

The date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`

- The end of the week.

## See

[getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)

## Example

```ts
const end = getEndOfWeek(new Date('2024-01-15'), 1); // Sunday, 2024-01-21
```
