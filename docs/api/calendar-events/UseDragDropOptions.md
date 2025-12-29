---
title: UseDragDropOptions
description: |-
  Defines the configuration options for the 
   hook, including callback functions for drag and drop events.
---

# UseDragDropOptions

Defined in: [types/events.ts:281](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L281)

Configuration options for the `useDragDrop` hook.

## Events

### onDragEnd()?

> `optional` **onDragEnd**: (`event`) => `void`

Defined in: [types/events.ts:301](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L301)

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

Defined in: [types/events.ts:295](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L295)

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

Defined in: [types/events.ts:308](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L308)

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

Defined in: [types/events.ts:289](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/types/events.ts#L289)

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
