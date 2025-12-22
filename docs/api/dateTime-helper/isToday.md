---
title: Is Today
description: Checks if a given date is today.
---

# isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:587](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L587)

Checks if a given date is today.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is today, false otherwise.

## See

[isSameDay](/calendar/docs/api/dateTime-helper/isSameDay)

## Example

```ts
const result = isToday(new Date()); // true
```
