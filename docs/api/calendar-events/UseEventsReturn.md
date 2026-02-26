---
title: UseEventsReturn
description: |-
  The return object of the 
   hook, providing access to the list of events and functions to manage them.
---

# UseEventsReturn

Defined in: [types/events.ts:449](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L449)

## Properties

### clearEvents()

> **clearEvents**: () => `void`

Defined in: [types/events.ts:506](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L506)

**`Function`**

Clears all events from the calendar.

#### Returns

`void`

***

### createEvent()

> **createEvent**: (`eventData`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/events.ts:463](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L463)

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

Defined in: [types/events.ts:477](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L477)

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

Defined in: [types/events.ts:493](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L493)

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

Defined in: [types/events.ts:455](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L455)

An array of all events currently managed by the calendar.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEvent()

> **getEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

Defined in: [types/events.ts:501](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L501)

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

### importFromICS()

> **importFromICS**: (`icsContent`) => `void`

Defined in: [types/events.ts:519](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L519)

**`Function`**

Imports events from an iCalendar (.ics) string and adds them to the calendar.

#### Parameters

##### icsContent

`string`

The content of the iCalendar file.

#### Returns

`void`

***

### moveEvent()

> **moveEvent**: (`eventId`, `newStart`, `newEnd?`) => `void`

Defined in: [types/events.ts:485](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L485)

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

Defined in: [types/events.ts:513](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L513)

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

Defined in: [types/events.ts:471](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L471)

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
