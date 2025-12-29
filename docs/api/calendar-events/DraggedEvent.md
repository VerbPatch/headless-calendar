---
title: DraggedEvent
description: Represents an event that is currently being dragged, containing the event data and additional drag-related information.
---

# DraggedEvent

Defined in: [types/events.ts:259](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L259)

Represents an event that is currently being dragged.

## Indexable

\[`key`: `string`\]: `any`

Additional data associated with the drag operation.

## Properties

### event

> **event**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:264](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L264)

The calendar event being dragged.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### type

> **type**: `string`

Defined in: [types/events.ts:268](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L268)

The type of the dragged item (e.g., 'event').
