---
title: isSameYear
description: Checks if two dates are in the same year.
---

# isSameYear()

> **isSameYear**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:345](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L345)

Checks if two dates are in the same year.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are in the same year, false otherwise.

## See

[getStartOfYear](/calendar/docs/api/dateTime-helper/getStartOfYear)

## Example

```ts
const result = isSameYear(new Date('2024-01-15'), new Date('2024-02-25')); // true
```
