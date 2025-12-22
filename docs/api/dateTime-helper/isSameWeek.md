---
title: Is Same Week
description: Checks if two dates are in the same week.
---

# Function: isSameWeek()

> **isSameWeek**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:276](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L276)

Checks if two dates are in the same week.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are in the same week, false otherwise.

## See

[getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)

## Example

```ts
const result = isSameWeek(new Date('2024-01-15'), new Date('2024-01-17')); // true
```
