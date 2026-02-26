---
title: UseDragDropReturn
description: |-
  The return object of the 
   hook, providing state and functions for managing drag and drop operations.
---

# UseDragDropReturn

Defined in: [types/events.ts:383](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L383)

## Properties

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/events.ts:384](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L384)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/events.ts:387](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L387)

#### Returns

`void`

***

### getDragProps()

> **getDragProps**: (`event`) => `object`

Defined in: [types/events.ts:389](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L389)

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

Defined in: [types/events.ts:394](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L394)

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

Defined in: [types/events.ts:388](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L388)

#### Parameters

##### dropTarget

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

#### Returns

`void`

***

### isDragging

> **isDragging**: `boolean`

Defined in: [types/events.ts:385](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L385)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/events.ts:386](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L386)

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

##### dragData?

`Record`\<`string`, `any`\>

#### Returns

`void`
