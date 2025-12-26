---
title: getEventsForDateRange
description: Retrieves all events that fall within a specified date range.
---

# getEventsForDateRange()

> **getEventsForDateRange**(`events`, `startDate`, `endDate`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:85](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/events.ts#L85)

Retrieves all events that fall within a specified date range.

## Parameters

### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### startDate

`Date`

The start date of the range.

### endDate

`Date`

The end date of the range.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events within the specified date range.

## See

 - [CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)
 - [isEventInDateRange](/calendar/docs/api/calendar-events/isEventInDateRange)

## Example

```ts
const events = [{ start: new Date('2024-01-15'), end: new Date('2024-01-16') }];
const eventsInRange = getEventsForDateRange(events, new Date('2024-01-10'), new Date('2024-01-20'));
```
