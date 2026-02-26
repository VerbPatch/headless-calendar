---
title: DraggedEvent
description: Represents an event that is currently being dragged, containing the event data and additional drag-related information.
---

# DraggedEvent

Defined in: [types/events.ts:326](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L326)

Represents an event that is currently being dragged.

## Indexable

\[`key`: `string`\]: `any`

Additional data associated with the drag operation.

## Properties

### event

> **event**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:331](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L331)

The calendar event being dragged.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### type

> **type**: `string`

Defined in: [types/events.ts:335](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L335)

The type of the dragged item (e.g., 'event').
