---
title: Is Same Month
description: Checks if two dates are in the same month.
---

# Function: isSameMonth()

> **isSameMonth**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:296](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L296)

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
