# Interface: UseEventsReturn

Defined in: [types/events.ts:352](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L352)

## Properties

### clearEvents()

> **clearEvents**: () => `void`

Defined in: [types/events.ts:409](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L409)

**`Function`**

Clears all events from the calendar.

#### Returns

`void`

***

### createEvent()

> **createEvent**: (`eventData`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:366](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L366)

**`Function`**

Creates a new calendar event.

#### Parameters

##### eventData

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The data for the new event.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

- The newly created event.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### deleteEvent()

> **deleteEvent**: (`eventId`) => `void`

Defined in: [types/events.ts:380](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L380)

**`Function`**

Deletes a calendar event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to delete.

#### Returns

`void`

***

### duplicateEvent()

> **duplicateEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

Defined in: [types/events.ts:396](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L396)

**`Function`**

Duplicates an existing event.

#### Parameters

##### eventId

`string`

The ID of the event to duplicate.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

- The duplicated event object if successful, otherwise null.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### events

> **events**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/events.ts:358](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L358)

An array of all events currently managed by the calendar.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEvent()

> **getEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

Defined in: [types/events.ts:404](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L404)

**`Function`**

Retrieves a specific event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to retrieve.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

- The event object if found, otherwise undefined.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### moveEvent()

> **moveEvent**: (`eventId`, `newStart`, `newEnd?`) => `void`

Defined in: [types/events.ts:388](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L388)

**`Function`**

Moves an event to a new start and optional end date.

#### Parameters

##### eventId

`string`

The ID of the event to move.

##### newStart

`Date`

The new start date for the event.

##### newEnd?

`Date`

The new end date for the event (optional, defaults to newStart if not provided).

#### Returns

`void`

***

### setEvents()

> **setEvents**: (`events`) => `void`

Defined in: [types/events.ts:416](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L416)

**`Function`**

Sets the entire list of events, replacing existing ones.

#### Parameters

##### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

The new array of events to set.

#### Returns

`void`

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### updateEvent()

> **updateEvent**: (`eventId`, `updates`) => `void`

Defined in: [types/events.ts:374](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/types/events.ts#L374)

**`Function`**

Updates an existing calendar event.

#### Parameters

##### eventId

`string`

The ID of the event to update.

##### updates

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The partial event data to apply as updates.

#### Returns

`void`

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)
