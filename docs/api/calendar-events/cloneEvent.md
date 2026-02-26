---
title: cloneEvent
description: Creates a deep clone of a calendar event, assigning a new unique ID.
---

# cloneEvent()

> **cloneEvent**(`event`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [utils/events.ts:549](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/events.ts#L549)

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
