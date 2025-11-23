# Interface: CalendarOptions

Defined in: [types/calendar.ts:48](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L48)

Configuration options for initializing a calendar instance.

## Properties

### defaultDate?

> `optional` **defaultDate**: `Date`

Defined in: [types/calendar.ts:58](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L58)

The default date to display when the calendar is initialized.

#### Default

```ts
new Date()
```

***

### defaultView?

> `optional` **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:53](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L53)

The default view to display when the calendar is initialized.

#### Default

```ts
'month'
```

***

### endHour?

> `optional` **endHour**: `number`

Defined in: [types/calendar.ts:78](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L78)

The ending hour for time slots in day and week views.

#### Default

```ts
24
```

***

### initialEvents?

> `optional` **initialEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:82](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L82)

An array of initial events to populate the calendar with.

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:129](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L129)

The locale to use for formatting dates and times.

#### Default

```ts
The user's browser locale.
```

***

### startHour?

> `optional` **startHour**: `number`

Defined in: [types/calendar.ts:73](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L73)

The starting hour for time slots in day and week views.

#### Default

```ts
0
```

***

### startOfWeek?

> `optional` **startOfWeek**: `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6`

Defined in: [types/calendar.ts:63](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L63)

The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).

#### Default

```ts
0
```

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:68](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L68)

The interval in minutes for time slots in day and week views.

#### Default

```ts
60
```

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/calendar.ts:118](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L118)

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

Defined in: [types/calendar.ts:88](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L88)

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

Defined in: [types/calendar.ts:94](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L94)

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

Defined in: [types/calendar.ts:106](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L106)

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

Defined in: [types/calendar.ts:100](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L100)

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

Defined in: [types/calendar.ts:112](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L112)

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

Defined in: [types/calendar.ts:124](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L124)

The timezone to use for calendar operations.

#### Default

```ts
The user's local timezone.
@event
```
