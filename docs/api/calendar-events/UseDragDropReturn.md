# Interface: UseDragDropReturn

Defined in: [types/events.ts:293](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L293)

## Properties

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/events.ts:294](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L294)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/events.ts:297](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L297)

#### Returns

`void`

***

### getDragProps()

> **getDragProps**: (`event`) => `object`

Defined in: [types/events.ts:299](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L299)

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

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

Defined in: [types/events.ts:304](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L304)

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

Defined in: [types/events.ts:298](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L298)

#### Parameters

##### dropTarget

[`DropTarget`](https://verbpatch.com/calendar/docs/api/calendar/DropTarget)

#### Returns

`void`

***

### isDragging

> **isDragging**: `boolean`

Defined in: [types/events.ts:295](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L295)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/events.ts:296](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L296)

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

##### dragData?

`Record`\<`string`, `any`\>

#### Returns

`void`
