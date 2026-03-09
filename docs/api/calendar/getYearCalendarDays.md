---
title: getYearCalendarDays
description: Generates an array of dates in a year, including days from the previous and next years to complete the weeks.
---

# getYearCalendarDays()

> **getYearCalendarDays**(`date`, `startOfWeek?`): `Date`[]

Defined in: [utils/calendar.ts:93](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/calendar.ts#L93)

Generates an array of dates in a year, including days from the previous and next years to complete the weeks.

## Parameters

### date

`Date`

A date within the desired year.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`[]

- An array of Date objects representing all visible days in the year.

## See

 - [getStartOfYear](/calendar/docs/api/dateTime-helper/getStartOfYear)
 - [getEndOfYear](/calendar/docs/api/dateTime-helper/getEndOfYear)

## Example

```ts
const dates = getYearCalendarDays(new Date('2024-01-15'));
// dates will be an array of dates for the year view of 2024
```
