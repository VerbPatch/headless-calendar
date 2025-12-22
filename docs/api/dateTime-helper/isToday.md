---
title: Is Today
description: Checks if a given date is today.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / isToday

# Function: isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:587](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L587)

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
