---
title: useEvents
description: A hook for managing calendar events, including creating, updating, deleting, and moving events.
---

# useEvents()

> **useEvents**(`options`): [`UseEventsReturn`](/calendar/docs/api/calendar-events/UseEventsReturn)

Defined in: [hooks/useEvents.ts:39](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/hooks/useEvents.ts#L39)

A hook for managing calendar events, including creating, updating, deleting, and moving events.

## Parameters

### options

[`UseEventsOptions`](/calendar/docs/api/calendar-events/UseEventsOptions) = `{}`

Configuration options for event management.

## Returns

[`UseEventsReturn`](/calendar/docs/api/calendar-events/UseEventsReturn)

- An object containing the list of events and functions to manage them.

## See

 - [UseEventsOptions](/calendar/docs/api/calendar-events/UseEventsOptions)
 - [UseEventsReturn](/calendar/docs/api/calendar-events/UseEventsReturn)

## Example

```typescript
const { events, createEvent, updateEvent, deleteEvent } = useEvents({
  initialEvents: [
    { id: '1', title: 'Meeting', start: new Date(), end: new Date(new Date().getTime() + 3600000) },
  ],
});

// Create a new event
const newEvent = createEvent({
  id: '2',
  title: 'New Event',
  start: new Date(),
  end: new Date(new Date().getTime() + 7200000),
});

// Update an event
updateEvent('1', { title: 'Updated Meeting' });

// Delete an event
deleteEvent('1');
```
