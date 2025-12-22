---
title: Get Overlapping Events
description: Finds all events that overlap with a target event.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getOverlappingEvents

# Function: getOverlappingEvents()

> **getOverlappingEvents**(`events`, `targetEvent`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:220](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/events.ts#L220)

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
