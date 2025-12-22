---
title: Get Weeks In Month
description: Divides the dates of a month into weeks.
---

# getWeeksInMonth()

> **getWeeksInMonth**(`date`, `startOfWeek?`): `Date`[][]

Defined in: [utils/calendar.ts:139](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/calendar.ts#L139)

Divides the dates of a month into weeks.

## Parameters

### date

`Date`

A date within the desired month.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`[][]

- An array of arrays, where each inner array represents a week.

## See

[getMonthCalendarDates](/calendar/docs/api/calendar/getMonthCalendarDates)

## Example

```ts
const weeks = getWeeksInMonth(new Date('2024-01-15'));
// weeks will be a 2D array of dates for the month of January 2024
```
