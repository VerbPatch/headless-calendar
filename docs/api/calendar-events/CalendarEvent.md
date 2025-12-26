---
title: CalendarEvent
description: Represents a calendar event with properties such as ID, title, start and end times, and recurrence rules.
---

# CalendarEvent

Defined in: [types/events.ts:10](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L10)

Represents a calendar event.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### allDay?

> `optional` **allDay**: `boolean`

Defined in: [types/events.ts:31](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L31)

Indicates if the event is an all-day event.

#### Default

```ts
false
```

***

### color?

> `optional` **color**: `string`

Defined in: [types/events.ts:40](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L40)

The color used to display the event.

#### Default

```ts
'#3174ad'
```

***

### description?

> `optional` **description**: `string`

Defined in: [types/events.ts:35](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L35)

A description of the event.

***

### end

> **end**: `Date`

Defined in: [types/events.ts:26](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L26)

The end date and time of the event.

***

### id

> **id**: `string`

Defined in: [types/events.ts:14](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L14)

The unique identifier of the event.

***

### recurring?

> `optional` **recurring**: [`CalendarEventOccurance`](/calendar/docs/api/calendar-events/CalendarEventOccurance) \| `"never"`

Defined in: [types/events.ts:49](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L49)

Recurring event configuration. Use "never" for non-recurring events.

***

### start

> **start**: `Date`

Defined in: [types/events.ts:22](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L22)

The start date and time of the event.

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/events.ts:45](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L45)

The timezone of the event.

#### Default

```ts
The user's local timezone.
```

***

### title

> **title**: `string`

Defined in: [types/events.ts:18](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/types/events.ts#L18)

The title or name of the event.
