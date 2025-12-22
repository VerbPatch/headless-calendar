---
title: Validate Event
description: Validates a calendar event object for required fields and logical consistency.
---

# Function: validateEvent()

> **validateEvent**(`event`): `string`[]

Defined in: [utils/events.ts:249](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/events.ts#L249)

Validates a calendar event object for required fields and logical consistency.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event to validate.

## Returns

`string`[]

- An array of error messages. If the array is empty, the event is valid.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { title: '', start: new Date(), end: new Date('2000-01-01') };
const errors = validateEvent(event);
// errors will contain messages about missing title and invalid end date
```
