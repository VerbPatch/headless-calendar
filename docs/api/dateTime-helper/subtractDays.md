---
title: subtractDays
description: Subtracts a specified number of days from a date.
---

# subtractDays()

> **subtractDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:609](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L609)

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
