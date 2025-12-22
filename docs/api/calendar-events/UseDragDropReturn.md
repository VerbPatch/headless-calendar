---
title: Use Drag Drop Return
description: |-
  The return object of the 
   hook, providing state and functions for managing drag and drop operations.
---

# UseDragDropReturn

Defined in: [types/events.ts:316](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L316)

## Properties

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/events.ts:317](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L317)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/events.ts:320](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L320)

#### Returns

`void`

***

### getDragProps()

> **getDragProps**: (`event`) => `object`

Defined in: [types/events.ts:322](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L322)

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

#### Returns

`object`

##### draggable

> **draggable**: `boolean`

##### onDragEnd()

> **onDragEnd**: (`e`) => `void`

###### Parameters

###### e

`DragEvent`

###### Returns

`void`

##### onDragStart()

> **onDragStart**: (`e`) => `void`

###### Parameters

###### e

`DragEvent`

###### Returns

`void`

***

### getDropProps()

> **getDropProps**: (`date`, `time?`) => `object`

Defined in: [types/events.ts:327](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L327)

#### Parameters

##### date

`Date`

##### time?

`string`

#### Returns

`object`

##### onDragOver()

> **onDragOver**: (`e`) => `void`

###### Parameters

###### e

`DragEvent`

###### Returns

`void`

##### onDrop()

> **onDrop**: (`e`) => `void`

###### Parameters

###### e

`DragEvent`

###### Returns

`void`

***

### handleDrop()

> **handleDrop**: (`dropTarget`) => `void`

Defined in: [types/events.ts:321](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L321)

#### Parameters

##### dropTarget

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

#### Returns

`void`

***

### isDragging

> **isDragging**: `boolean`

Defined in: [types/events.ts:318](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L318)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/events.ts:319](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/events.ts#L319)

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

##### dragData?

`Record`\<`string`, `any`\>

#### Returns

`void`
