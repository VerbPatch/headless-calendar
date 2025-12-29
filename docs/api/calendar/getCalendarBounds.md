---
title: getCalendarBounds
description: Determines the start and end date bounds for a given calendar view.
---

# getCalendarBounds()

> **getCalendarBounds**(`view`, `date`, `startOfWeek?`): `object`

Defined in: [utils/calendar.ts:234](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/calendar.ts#L234)

Determines the start and end date bounds for a given calendar view.

## Parameters

### view

The current calendar view.

`"month"` | `"week"` | `"day"`

### date

`Date`

The reference date for the view.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`object`

- An object containing the start and end dates of the visible calendar period.

### end

> **end**: `Date`

### start

> **start**: `Date`

## See

 - [getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)
 - [getEndOfWeek](/calendar/docs/api/dateTime-helper/getEndOfWeek)
 - [getMonthCalendarDates](/calendar/docs/api/calendar/getMonthCalendarDates)

## Example

```ts
const bounds = getCalendarBounds('week', new Date('2024-01-15'));
// bounds will be { start: Date('2024-01-14'), end: Date('2024-01-20') } (assuming startOfWeek is 0)
```
