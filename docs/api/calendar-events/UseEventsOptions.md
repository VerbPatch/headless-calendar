---
title: Use Events Options
description: |-
  Defines the configuration options for the 
   hook, including initial events and callback functions for event changes.
---

# Interface: UseEventsOptions

Defined in: [types/events.ts:324](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L324)

Configuration options for the `useEvents` hook.

## Properties

### calendarTimezone?

> `optional` **calendarTimezone**: `string`

Defined in: [types/events.ts:328](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L328)

The timezone to use for the calendar.

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/events.ts:356](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L356)

An array of initial events to populate the calendar with.

## Events

### onEvent()?

> `optional` **onEvent**: (`event`) => `void`

Defined in: [types/events.ts:334](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L334)

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

Defined in: [types/events.ts:340](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L340)

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

Defined in: [types/events.ts:352](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L352)

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

Defined in: [types/events.ts:346](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/events.ts#L346)

A callback function that is invoked when an event is updated.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The updated event.

#### Returns

`void`
