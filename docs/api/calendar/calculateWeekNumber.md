---
title: calculateWeekNumber
description: Calculates the week number of the year for a given date.
---

# calculateWeekNumber()

> **calculateWeekNumber**(`date`): `number`

Defined in: [utils/calendar.ts:256](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/calendar.ts#L256)

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
