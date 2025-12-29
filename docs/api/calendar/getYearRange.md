---
title: getYearRange
description: Calculates the start and end dates of the year for a given date.
---

# getYearRange()

> **getYearRange**(`date`): `object`

Defined in: [utils/calendar.ts:188](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/calendar.ts#L188)

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
