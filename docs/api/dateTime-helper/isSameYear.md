---
title: isSameYear
description: Checks if two dates are in the same year.
---

# isSameYear()

> **isSameYear**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:339](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L339)

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
