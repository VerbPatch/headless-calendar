---
title: subtractDays
description: Subtracts a specified number of days from a date.
---

# subtractDays()

> **subtractDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:603](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L603)

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
