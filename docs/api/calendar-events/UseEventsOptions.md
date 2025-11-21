# Interface: UseEventsOptions

Defined in: [types/events.ts:314](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L314)

Configuration options for the `useEvents` hook.

## Properties

### calendarTimezone?

> `optional` **calendarTimezone**: `string`

Defined in: [types/events.ts:318](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L318)

The timezone to use for the calendar.

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/events.ts:346](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L346)

An array of initial events to populate the calendar with.

## Events

### onEvent()?

> `optional` **onEvent**: (`event`) => `void`

Defined in: [types/events.ts:324](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L324)

A callback function that is invoked whenever the events array changes.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

The updated array of events.

#### Returns

`void`

***

### onEventCreate()?

> `optional` **onEventCreate**: (`event`) => `void`

Defined in: [types/events.ts:330](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L330)

A callback function that is invoked when a new event is created.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The newly created event.

#### Returns

`void`

***

### onEventDelete()?

> `optional` **onEventDelete**: (`event`) => `void`

Defined in: [types/events.ts:342](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L342)

A callback function that is invoked when an event is deleted.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The deleted event.

#### Returns

`void`

***

### onEventUpdate()?

> `optional` **onEventUpdate**: (`event`) => `void`

Defined in: [types/events.ts:336](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L336)

A callback function that is invoked when an event is updated.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The updated event.

#### Returns

`void`
