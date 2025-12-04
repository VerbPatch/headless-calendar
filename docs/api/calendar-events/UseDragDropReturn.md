---
title: Use Drag Drop Return
description: |-
  The return object of the 
   hook, providing state and functions for managing drag and drop operations.
---

# Interface: UseDragDropReturn

Defined in: [types/events.ts:301](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L301)

## Properties

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/events.ts:302](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L302)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/events.ts:305](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L305)

#### Returns

`void`

***

### getDragProps()

> **getDragProps**: (`event`) => `object`

Defined in: [types/events.ts:307](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L307)

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

Defined in: [types/events.ts:312](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L312)

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

Defined in: [types/events.ts:306](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L306)

#### Parameters

##### dropTarget

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

#### Returns

`void`

***

### isDragging

> **isDragging**: `boolean`

Defined in: [types/events.ts:303](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L303)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/events.ts:304](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L304)

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

##### dragData?

`Record`\<`string`, `any`\>

#### Returns

`void`
