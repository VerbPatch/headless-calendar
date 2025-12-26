---
title: CalendarOptions
description: Configuration options for initializing a calendar instance.
---

# CalendarOptions

Defined in: [types/calendar.ts:52](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L52)

Configuration options for initializing a calendar instance.

## Properties

### defaultDate?

> `optional` **defaultDate**: `Date`

Defined in: [types/calendar.ts:62](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L62)

The default date to display when the calendar is initialized.

#### Default

```ts
new Date()
```

***

### defaultView?

> `optional` **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:57](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L57)

The default view to display when the calendar is initialized.

#### Default

```ts
'month'
```

***

### endHour?

> `optional` **endHour**: `number`

Defined in: [types/calendar.ts:82](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L82)

The ending hour for time slots in day and week views.

#### Default

```ts
24
```

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:86](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L86)

An array of initial events to populate the calendar with.

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:133](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L133)

The locale to use for formatting dates and times.

#### Default

```ts
The user's browser locale.
```

***

### startHour?

> `optional` **startHour**: `number`

Defined in: [types/calendar.ts:77](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L77)

The starting hour for time slots in day and week views.

#### Default

```ts
0
```

***

### startOfWeek?

> `optional` **startOfWeek**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

Defined in: [types/calendar.ts:67](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L67)

The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).

#### Default

```ts
0
```

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:72](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L72)

The interval in minutes for time slots in day and week views.

#### Default

```ts
60
```

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/calendar.ts:122](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L122)

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

Defined in: [types/calendar.ts:92](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L92)

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

Defined in: [types/calendar.ts:98](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L98)

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

Defined in: [types/calendar.ts:110](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L110)

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

Defined in: [types/calendar.ts:104](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L104)

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

Defined in: [types/calendar.ts:116](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L116)

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

Defined in: [types/calendar.ts:128](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/calendar.ts#L128)

The timezone to use for calendar operations.

#### Default

```ts
The user's local timezone.
@event
```
