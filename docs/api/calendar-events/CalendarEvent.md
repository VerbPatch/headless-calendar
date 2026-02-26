---
title: CalendarEvent
description: Represents a calendar event with properties such as ID, title, start and end times, and recurrence rules.
---

# CalendarEvent

Defined in: [types/events.ts:10](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L10)

Represents a calendar event.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### allDay?

> `optional` **allDay**: `boolean`

Defined in: [types/events.ts:31](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L31)

Indicates if the event is an all-day event.

#### Default

```ts
false
```

***

### color?

> `optional` **color**: `string`

Defined in: [types/events.ts:40](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L40)

The color used to display the event.

#### Default

```ts
'#3174ad'
```

***

### description?

> `optional` **description**: `string`

Defined in: [types/events.ts:35](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L35)

A description of the event.

***

### end

> **end**: `Date`

Defined in: [types/events.ts:26](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L26)

The end date and time of the event.

***

### exdate?

> `optional` **exdate**: `Date`[]

Defined in: [types/events.ts:54](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L54)

List of dates to exclude from the recurrence.
Corresponds to RFC 5545 EXDATE.

***

### id

> **id**: `string`

Defined in: [types/events.ts:14](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L14)

The unique identifier of the event.

***

### rdate?

> `optional` **rdate**: `Date`[]

Defined in: [types/events.ts:59](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L59)

List of additional dates to include in the recurrence.
Corresponds to RFC 5545 RDATE.

***

### recurrenceId?

> `optional` **recurrenceId**: `string` \| `Date`

Defined in: [types/events.ts:64](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L64)

The recurrence identifier for a specific instance of a recurring event.
Corresponds to RFC 5545 RECURRENCE-ID.

***

### recurring?

> `optional` **recurring**: [`CalendarEventOccurance`](/calendar/docs/api/calendar-events/CalendarEventOccurance) \| `"never"`

Defined in: [types/events.ts:49](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L49)

Recurring event configuration. Use "never" for non-recurring events.

***

### start

> **start**: `Date`

Defined in: [types/events.ts:22](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L22)

The start date and time of the event.

***

### status?

> `optional` **status**: `"TENTATIVE"` \| `"CONFIRMED"` \| `"CANCELLED"`

Defined in: [types/events.ts:69](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L69)

The status of the event.
Corresponds to RFC 5545 STATUS.

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/events.ts:45](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L45)

The timezone of the event.

#### Default

```ts
The user's local timezone.
```

***

### title

> **title**: `string`

Defined in: [types/events.ts:18](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L18)

The title or name of the event.

***

### transparency?

> `optional` **transparency**: `"OPAQUE"` \| `"TRANSPARENT"`

Defined in: [types/events.ts:74](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L74)

The transparency of the event.
Corresponds to RFC 5545 TRANSP.
