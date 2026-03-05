---
title: getQuarterDates
description: Calculates the start and end dates of the quarter for a given date.
---

# getQuarterDates()

> **getQuarterDates**(`date`): `object`

Defined in: [utils/calendar.ts:211](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/utils/calendar.ts#L211)

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
