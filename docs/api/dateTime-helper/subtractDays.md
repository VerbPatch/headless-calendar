---
title: subtractDays
description: Subtracts a specified number of days from a date.
---

# subtractDays()

> **subtractDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:603](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/date.ts#L603)

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
