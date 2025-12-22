---
title: Is Same Day
description: Checks if two dates are the same day.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / isSameDay

# Function: isSameDay()

> **isSameDay**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:258](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L258)

Checks if two dates are the same day.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are the same day, false otherwise.

## Example

```ts
const result = isSameDay(new Date('2024-01-15'), new Date('2024-01-15')); // true
```
