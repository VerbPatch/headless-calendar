---
title: Subtract Days
description: Subtracts a specified number of days from a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / subtractDays

# Function: subtractDays()

> **subtractDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:516](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L516)

Subtracts a specified number of days from a date.

## Parameters

### date

`Date`

The original date.

### days

`number`

The number of days to subtract.

## Returns

`Date`

- The new date.

## See

[addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const newDate = subtractDays(new Date('2024-01-15'), 5); // 2024-01-10
```
