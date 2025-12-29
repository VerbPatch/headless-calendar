---
title: calculateWeekNumber
description: Calculates the week number of the year for a given date.
---

# calculateWeekNumber()

> **calculateWeekNumber**(`date`): `number`

Defined in: [utils/calendar.ts:209](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/calendar.ts#L209)

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
