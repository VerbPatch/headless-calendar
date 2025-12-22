---
title: Get Event Duration
description: Calculates the duration of an event in milliseconds.
---

# Function: getEventDuration()

> **getEventDuration**(`event`): `number`

Defined in: [utils/events.ts:130](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/events.ts#L130)

Calculates the duration of an event in milliseconds.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event.

## Returns

`number`

- The duration of the event in milliseconds.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') };
const duration = getEventDuration(event); // 3600000
```
