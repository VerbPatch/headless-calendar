---
title: Dragged Event
description: Represents an event that is currently being dragged, containing the event data and additional drag-related information.
---

# Interface: DraggedEvent

Defined in: [types/events.ts:259](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L259)

Represents an event that is currently being dragged.

## Indexable

\[`key`: `string`\]: `any`

Additional data associated with the drag operation.

## Properties

### event

> **event**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:264](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L264)

The calendar event being dragged.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### type

> **type**: `string`

Defined in: [types/events.ts:268](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L268)

The type of the dragged item (e.g., 'event').
