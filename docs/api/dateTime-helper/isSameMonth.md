---
title: isSameMonth
description: Checks if two dates are in the same month.
---

# isSameMonth()

> **isSameMonth**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:325](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L325)

Checks if two dates are in the same month.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are in the same month, false otherwise.

## See

[getStartOfMonth](/calendar/docs/api/dateTime-helper/getStartOfMonth)

## Example

```ts
const result = isSameMonth(new Date('2024-01-15'), new Date('2024-01-25')); // true
```
