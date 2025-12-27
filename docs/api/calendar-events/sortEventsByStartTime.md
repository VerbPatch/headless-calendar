---
title: sortEventsByStartTime
description: Sorts an array of calendar events by their start time in ascending order.
---

# sortEventsByStartTime()

> **sortEventsByStartTime**(`events`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:108](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/utils/events.ts#L108)

Sorts an array of calendar events by their start time in ascending order.

## Parameters

### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- A new array of events sorted by start time.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const events = [
  { start: new Date('2024-01-15T14:00:00'), end: new Date('2024-01-15T15:00:00') },
  { start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }
];
const sortedEvents = sortEventsByStartTime(events);
```
