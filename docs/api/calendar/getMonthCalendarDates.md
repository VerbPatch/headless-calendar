---
title: Get Month Calendar Dates
description: Generates an array of dates for the calendar month view, including days from the previous and next months to complete the weeks.
---

# getMonthCalendarDates()

> **getMonthCalendarDates**(`date`, `startOfWeek?`): `Date`[]

Defined in: [utils/calendar.ts:45](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/calendar.ts#L45)

Generates an array of dates for the calendar month view, including days from the previous and next months to complete the weeks.

## Parameters

### date

`Date`

A date within the desired month.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`[]

- An array of Date objects representing all visible days in the month view.

## See

 - [getStartOfMonth](/calendar/docs/api/dateTime-helper/getStartOfMonth)
 - [getEndOfMonth](/calendar/docs/api/dateTime-helper/getEndOfMonth)
 - [getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)
 - [getEndOfWeek](/calendar/docs/api/dateTime-helper/getEndOfWeek)

## Example

```ts
const dates = getMonthCalendarDates(new Date('2024-01-15'));
// dates will be an array of dates for the month view of January 2024
```
