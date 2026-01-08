---
title: getQuarterDates
description: Calculates the start and end dates of the quarter for a given date.
---

# getQuarterDates()

> **getQuarterDates**(`date`): `object`

Defined in: [utils/calendar.ts:201](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/calendar.ts#L201)

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
