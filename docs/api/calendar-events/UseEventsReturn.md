---
title: UseEventsReturn
description: |-
  The return object of the 
   hook, providing access to the list of events and functions to manage them.
---

# UseEventsReturn

Defined in: [types/events.ts:379](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L379)

## Properties

### clearEvents()

> **clearEvents**: () => `void`

Defined in: [types/events.ts:436](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L436)

**`Function`**

Clears all events from the calendar.

#### Returns

`void`

***

### createEvent()

> **createEvent**: (`eventData`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:393](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L393)

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

Defined in: [types/events.ts:407](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L407)

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

Defined in: [types/events.ts:423](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L423)

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

Defined in: [types/events.ts:385](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L385)

An array of all events currently managed by the calendar.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEvent()

> **getEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

Defined in: [types/events.ts:431](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L431)

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

Defined in: [types/events.ts:415](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L415)

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

Defined in: [types/events.ts:443](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L443)

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

Defined in: [types/events.ts:401](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L401)

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
