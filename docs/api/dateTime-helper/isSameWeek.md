---
title: isSameWeek
description: Checks if two dates are in the same week.
---

# isSameWeek()

> **isSameWeek**(`date1`, `date2`, `startOfWeek?`): `boolean`

Defined in: [utils/date.ts:305](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L305)

Checks if two dates are in the same week.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`boolean`

- True if the dates are in the same week, false otherwise.

## See

[getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)

## Example

```ts
const result = isSameWeek(new Date('2024-01-15'), new Date('2024-01-17'), 1); // true
```
