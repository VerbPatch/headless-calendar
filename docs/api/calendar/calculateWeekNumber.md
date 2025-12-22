---
title: Calculate Week Number
description: Calculates the week number of the year for a given date.
---

# Function: calculateWeekNumber()

> **calculateWeekNumber**(`date`): `number`

Defined in: [utils/calendar.ts:209](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/calendar.ts#L209)

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
