---
title: UseDragDropOptions
description: |-
  Defines the configuration options for the 
   hook, including callback functions for drag and drop events.
---

# UseDragDropOptions

Defined in: [types/events.ts:348](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L348)

Configuration options for the `useDragDrop` hook.

## Events

### onDragEnd()?

> `optional` **onDragEnd**: (`event`) => `void`

Defined in: [types/events.ts:368](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L368)

A callback function that is invoked when a drag operation ends.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event that was dragged.

#### Returns

`void`

***

### onDragStart()?

> `optional` **onDragStart**: (`event`) => `void`

Defined in: [types/events.ts:362](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L362)

A callback function that is invoked when a drag operation starts.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event being dragged.

#### Returns

`void`

***

### onDrop()?

> `optional` **onDrop**: (`event`, `target`) => `void`

Defined in: [types/events.ts:375](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L375)

A callback function that is invoked when an event is dropped on a valid target.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event that was dropped.

##### target

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

The target where the event was dropped.

#### Returns

`void`

***

### onEventMove()?

> `optional` **onEventMove**: (`eventId`, `newStart`, `newEnd`) => `void`

Defined in: [types/events.ts:356](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L356)

A callback function that is invoked when an event is moved via drag and drop.

#### Parameters

##### eventId

`string`

The ID of the moved event.

##### newStart

`Date`

The new start date and time of the event.

##### newEnd

`Date`

The new end date and time of the event.

#### Returns

`void`
