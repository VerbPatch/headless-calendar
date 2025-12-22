---
title: Calculate Week Number
description: Calculates the week number of the year for a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / calculateWeekNumber

# Function: calculateWeekNumber()

> **calculateWeekNumber**(`date`): `number`

Defined in: [utils/calendar.ts:209](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/calendar.ts#L209)

Calculates the week number of the year for a given date.

## Parameters

### date

`Date`

The date to calculate the week number for.

## Returns

`number`

- The week number (1-52 or 53).

## Example

```ts
const weekNumber = calculateWeekNumber(new Date('2024-01-15')); // 3
```
