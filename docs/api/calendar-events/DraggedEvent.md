---
title: Dragged Event
description: Represents an event that is currently being dragged, containing the event data and additional drag-related information.
---

# Interface: DraggedEvent

Defined in: [types/events.ts:244](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L244)

Represents an event that is currently being dragged.

## Indexable

\[`key`: `string`\]: `any`

Additional data associated with the drag operation.

## Properties

### event

> **event**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:249](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L249)

The calendar event being dragged.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### type

> **type**: `string`

Defined in: [types/events.ts:253](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L253)

The type of the dragged item (e.g., 'event').
