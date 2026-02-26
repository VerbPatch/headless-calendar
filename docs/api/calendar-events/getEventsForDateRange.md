---
title: getEventsForDateRange
description: Retrieves all events that fall within a specified date range.
---

# getEventsForDateRange()

> **getEventsForDateRange**(`events`, `startDate`, `endDate`, `startofWeek`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:92](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/events.ts#L92)

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

### startofWeek

`number`

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
