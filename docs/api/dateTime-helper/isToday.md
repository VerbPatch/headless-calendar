---
title: isToday
description: Checks if a given date is today.
---

# isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:610](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/date.ts#L610)

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
