---
title: CalendarOptions
description: Configuration options for initializing a calendar instance.
---

# CalendarOptions

Defined in: [types/calendar.ts:52](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L52)

Configuration options for initializing a calendar instance.

## Properties

### calendarId?

> `optional` **calendarId**: `string`

Defined in: [types/calendar.ts:57](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L57)

A unique identifier for the calendar instance. Required for managing multiple calendars in a single view.

#### Default

```ts
'default-calendar'
```

***

### customViewOptions?

> `optional` **customViewOptions**: [`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Defined in: [types/calendar.ts:142](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L142)

Configuration options for the 'custom' view.

***

### defaultDate?

> `optional` **defaultDate**: `Date`

Defined in: [types/calendar.ts:67](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L67)

The default date to display when the calendar is initialized.

#### Default

```ts
new Date()
```

***

### defaultView?

> `optional` **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:62](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L62)

The default view to display when the calendar is initialized.

#### Default

```ts
'month'
```

***

### endHour?

> `optional` **endHour**: `number`

Defined in: [types/calendar.ts:87](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L87)

The ending hour for time slots in day and week views.

#### Default

```ts
24
```

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:91](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L91)

An array of initial events to populate the calendar with.

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:138](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L138)

The locale to use for formatting dates and times.

#### Default

```ts
The user's browser locale.
```

***

### startHour?

> `optional` **startHour**: `number`

Defined in: [types/calendar.ts:82](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L82)

The starting hour for time slots in day and week views.

#### Default

```ts
0
```

***

### startOfWeek?

> `optional` **startOfWeek**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

Defined in: [types/calendar.ts:72](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L72)

The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).

#### Default

```ts
0
```

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:77](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L77)

The interval in minutes for time slots in day and week views.

#### Default

```ts
60
```

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/calendar.ts:127](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L127)

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

Defined in: [types/calendar.ts:97](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L97)

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

Defined in: [types/calendar.ts:103](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L103)

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

Defined in: [types/calendar.ts:115](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L115)

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

Defined in: [types/calendar.ts:109](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L109)

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

Defined in: [types/calendar.ts:121](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L121)

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

Defined in: [types/calendar.ts:133](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/types/calendar.ts#L133)

The timezone to use for calendar operations.

#### Default

```ts
The user's local timezone.
@event
```
