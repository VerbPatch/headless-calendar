---
title: getYearRange
description: Calculates the start and end dates of the year for a given date.
---

# getYearRange()

> **getYearRange**(`date`): `object`

Defined in: [utils/calendar.ts:237](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/calendar.ts#L237)

Calculates the start and end dates of the year for a given date.

## Parameters

### date

`Date`

The date within the desired year.

## Returns

`object`

- An object containing the start and end dates of the year.

### end

> **end**: `Date`

### start

> **start**: `Date`

## Example

```ts
const year = getYearRange(new Date('2024-05-15'));
// year will be { start: Date('2024-01-01'), end: Date('2024-12-31') }
```
