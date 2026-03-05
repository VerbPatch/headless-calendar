---
title: getYearRange
description: Calculates the start and end dates of the year for a given date.
---

# getYearRange()

> **getYearRange**(`date`): `object`

Defined in: [utils/calendar.ts:235](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/utils/calendar.ts#L235)

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
