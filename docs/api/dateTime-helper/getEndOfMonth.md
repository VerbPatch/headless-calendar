---
title: Get End Of Month
description: Gets the end of the month for a given date.
---

# getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:371](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L371)

Gets the end of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the month.

## Example

```ts
const end = getEndOfMonth(new Date('2024-01-15')); // 2024-01-31
```
