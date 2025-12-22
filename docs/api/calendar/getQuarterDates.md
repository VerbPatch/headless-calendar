---
title: Get Quarter Dates
description: Calculates the start and end dates of the quarter for a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getQuarterDates

# Function: getQuarterDates()

> **getQuarterDates**(`date`): `object`

Defined in: [utils/calendar.ts:164](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/calendar.ts#L164)

Calculates the start and end dates of the quarter for a given date.

## Parameters

### date

`Date`

The date within the desired quarter.

## Returns

`object`

- An object containing the start and end dates of the quarter.

### end

> **end**: `Date`

### start

> **start**: `Date`

## Example

```ts
const quarter = getQuarterDates(new Date('2024-05-15'));
// quarter will be { start: Date('2024-04-01'), end: Date('2024-06-30') }
```
