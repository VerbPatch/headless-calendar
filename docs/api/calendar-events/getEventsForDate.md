---
title: Get Events For Date
description: Retrieves all events that occur on a specific date.
---

# getEventsForDate()

> **getEventsForDate**(`events`, `date`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:59](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/events.ts#L59)

Retrieves all events that occur on a specific date.

## Parameters

### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### date

`Date`

The date to filter events by.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events occurring on the specified date.

## See

 - [CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)
 - [getStartOfDay](/calendar/docs/api/dateTime-helper/getStartOfDay)
 - [getEndOfDay](/calendar/docs/api/dateTime-helper/getEndOfDay)
 - [isEventInDateRange](/calendar/docs/api/calendar-events/isEventInDateRange)

## Example

```ts
const events = [{ start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }];
const eventsForDate = getEventsForDate(events, new Date('2024-01-15'));
```
