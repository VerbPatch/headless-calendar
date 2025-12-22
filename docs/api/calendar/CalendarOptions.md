---
title: Calendar Options
description: Configuration options for initializing a calendar instance.
---

# CalendarOptions

Defined in: [types/calendar.ts:54](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L54)

Configuration options for initializing a calendar instance.

## Properties

### defaultDate?

> `optional` **defaultDate**: `Date`

Defined in: [types/calendar.ts:64](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L64)

The default date to display when the calendar is initialized.

#### Default

```ts
new Date()
```

***

### defaultView?

> `optional` **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:59](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L59)

The default view to display when the calendar is initialized.

#### Default

```ts
'month'
```

***

### endHour?

> `optional` **endHour**: `number`

Defined in: [types/calendar.ts:84](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L84)

The ending hour for time slots in day and week views.

#### Default

```ts
24
```

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:88](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L88)

An array of initial events to populate the calendar with.

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:135](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L135)

The locale to use for formatting dates and times.

#### Default

```ts
The user's browser locale.
```

***

### startHour?

> `optional` **startHour**: `number`

Defined in: [types/calendar.ts:79](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L79)

The starting hour for time slots in day and week views.

#### Default

```ts
0
```

***

### startOfWeek?

> `optional` **startOfWeek**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

Defined in: [types/calendar.ts:69](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L69)

The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).

#### Default

```ts
0
```

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:74](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L74)

The interval in minutes for time slots in day and week views.

#### Default

```ts
60
```

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/calendar.ts:124](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L124)

A callback function that is invoked when the current date of the calendar changes.

#### Parameters

##### date

`Date`

The new date.

#### Returns

`void`

***

### onEvent()?

> `optional` **onEvent**: (`events`) => `void`

Defined in: [types/calendar.ts:94](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L94)

A callback function that is invoked whenever the events array changes.

#### Parameters

##### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

The updated array of events.

#### Returns

`void`

***

### onEventCreate()?

> `optional` **onEventCreate**: (`event`) => `void`

Defined in: [types/calendar.ts:100](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L100)

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

Defined in: [types/calendar.ts:112](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L112)

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

Defined in: [types/calendar.ts:106](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L106)

A callback function that is invoked when an event is updated.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The updated event.

#### Returns

`void`

***

### onViewChange()?

> `optional` **onViewChange**: (`view`) => `void`

Defined in: [types/calendar.ts:118](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L118)

A callback function that is invoked when the calendar view changes.

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new calendar view.

#### Returns

`void`

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/calendar.ts:130](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/types/calendar.ts#L130)

The timezone to use for calendar operations.

#### Default

```ts
The user's local timezone.
@event
```
