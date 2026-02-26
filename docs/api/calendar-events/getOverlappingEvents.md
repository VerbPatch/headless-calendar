---
title: getOverlappingEvents
description: Finds all events that overlap with a target event.
---

# getOverlappingEvents()

> **getOverlappingEvents**(`events`, `targetEvent`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:242](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/events.ts#L242)

Finds all events that overlap with a target event.

## Parameters

### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### targetEvent

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event to check for overlaps against.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of overlapping events.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const events = [
  { id: '1', start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') },
  { id: '2', start: new Date('2024-01-15T10:30:00'), end: new Date('2024-01-15T11:30:00') }
];
const overlapping = getOverlappingEvents(events, events[0]); // [events[1]]
```
