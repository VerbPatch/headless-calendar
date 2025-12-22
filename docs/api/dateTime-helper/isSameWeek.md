---
title: Is Same Week
description: Checks if two dates are in the same week.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / isSameWeek

# Function: isSameWeek()

> **isSameWeek**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:276](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L276)

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
