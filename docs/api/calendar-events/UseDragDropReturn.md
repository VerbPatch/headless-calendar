---
title: UseDragDropReturn
description: |-
  The return object of the 
   hook, providing state and functions for managing drag and drop operations.
---

# UseDragDropReturn

Defined in: [types/events.ts:387](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L387)

## Properties

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/events.ts:388](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L388)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/events.ts:391](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L391)

#### Returns

`void`

***

### getDragProps()

> **getDragProps**: (`event`) => `object`

Defined in: [types/events.ts:393](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L393)

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

Defined in: [types/events.ts:398](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L398)

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

Defined in: [types/events.ts:392](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L392)

#### Parameters

##### dropTarget

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

#### Returns

`void`

***

### isDragging

> **isDragging**: `boolean`

Defined in: [types/events.ts:389](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L389)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/events.ts:390](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/events.ts#L390)

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

##### dragData?

`Record`\<`string`, `any`\>

#### Returns

`void`
