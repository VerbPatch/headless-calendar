---
title: UseEventsOptions
description: |-
  Defines the configuration options for the 
   hook, including initial events and callback functions for event changes.
---

# UseEventsOptions

Defined in: [types/events.ts:413](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L413)

Configuration options for the `useEvents` hook.

## Properties

### calendarId?

> `optional` **calendarId**: `string`

Defined in: [types/events.ts:417](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L417)

A unique identifier for the calendar instance.

***

### calendarTimezone?

> `optional` **calendarTimezone**: `string`

Defined in: [types/events.ts:421](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L421)

The timezone to use for the calendar.

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/events.ts:449](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L449)

An array of initial events to populate the calendar with.

## Events

### onEvent()?

> `optional` **onEvent**: (`event`) => `void`

Defined in: [types/events.ts:427](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L427)

A callback function that is invoked whenever the events array changes.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

The updated array of events.

#### Returns

`void`

***

### onEventCreate()?

> `optional` **onEventCreate**: (`event`) => `void`

Defined in: [types/events.ts:433](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L433)

A callback function that is invoked when a new event is created.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The newly created event.

#### Returns

`void`

***

### onEventDelete()?

> `optional` **onEventDelete**: (`event`) => `void`

Defined in: [types/events.ts:445](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L445)

A callback function that is invoked when an event is deleted.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The deleted event.

#### Returns

`void`

***

### onEventUpdate()?

> `optional` **onEventUpdate**: (`event`) => `void`

Defined in: [types/events.ts:439](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/types/events.ts#L439)

A callback function that is invoked when an event is updated.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The updated event.

#### Returns

`void`
