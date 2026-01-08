---
title: getWeekDates
description: Generates an array of dates for the week containing the given date.
---

# getWeekDates()

> **getWeekDates**(`date`, `startOfWeek?`): `Date`[]

Defined in: [utils/calendar.ts:22](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/calendar.ts#L22)

Generates an array of dates for the week containing the given date.

## Parameters

### date

`Date`

The date within the desired week.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`[]

- An array of 7 Date objects representing the week.

## See

 - [getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)
 - [addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const dates = getWeekDates(new Date('2024-01-15'));
// dates will be an array of 7 dates from 2024-01-14 to 2024-01-20 (assuming startOfWeek is 0)
```
