---
title: cloneEvent
description: Creates a deep clone of a calendar event, assigning a new unique ID.
---

# cloneEvent()

> **cloneEvent**(`event`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [utils/events.ts:457](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/events.ts#L457)

Creates a deep clone of a calendar event, assigning a new unique ID.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event to clone.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

- A new event object with a unique ID and copied properties.

## See

 - [CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)
 - [generateId](/calendar/docs/api/calendar-events/generateId)

## Example

```ts
const event = { id: '1', title: 'Meeting', start: new Date(), end: new Date() };
const clonedEvent = cloneEvent(event);
// clonedEvent will have a new unique ID
```
