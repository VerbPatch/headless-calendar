# Interface: UseDragDropOptions

Defined in: [types/events.ts:260](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L260)

Configuration options for the `useDragDrop` hook.

## Events

### onDragEnd()?

> `optional` **onDragEnd**: (`event`) => `void`

Defined in: [types/events.ts:280](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L280)

A callback function that is invoked when a drag operation ends.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The event that was dragged.

#### Returns

`void`

***

### onDragStart()?

> `optional` **onDragStart**: (`event`) => `void`

Defined in: [types/events.ts:274](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L274)

A callback function that is invoked when a drag operation starts.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The event being dragged.

#### Returns

`void`

***

### onDrop()?

> `optional` **onDrop**: (`event`, `target`) => `void`

Defined in: [types/events.ts:287](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L287)

A callback function that is invoked when an event is dropped on a valid target.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The event that was dropped.

##### target

[`DropTarget`](https://verbpatch.com/calendar/docs/api/calendar/DropTarget)

The target where the event was dropped.

#### Returns

`void`

***

### onEventMove()?

> `optional` **onEventMove**: (`eventId`, `newStart`, `newEnd`) => `void`

Defined in: [types/events.ts:268](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L268)

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
