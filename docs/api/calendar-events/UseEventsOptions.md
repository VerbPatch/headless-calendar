---
title: UseEventsOptions
description: |-
  Defines the configuration options for the 
   hook, including initial events and callback functions for event changes.
---

# UseEventsOptions

Defined in: [types/events.ts:339](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L339)

Configuration options for the `useEvents` hook.

## Properties

### calendarTimezone?

> `optional` **calendarTimezone**: `string`

Defined in: [types/events.ts:343](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L343)

The timezone to use for the calendar.

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/events.ts:371](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L371)

An array of initial events to populate the calendar with.

## Events

### onEvent()?

> `optional` **onEvent**: (`event`) => `void`

Defined in: [types/events.ts:349](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L349)

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

Defined in: [types/events.ts:355](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L355)

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

Defined in: [types/events.ts:367](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L367)

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

Defined in: [types/events.ts:361](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/events.ts#L361)

A callback function that is invoked when an event is updated.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The updated event.

#### Returns

`void`
