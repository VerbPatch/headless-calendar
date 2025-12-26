---
title: isAllDayEvent
description: Checks if an event is an all-day event.
---

# isAllDayEvent()

> **isAllDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:150](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/events.ts#L150)

Checks if an event is an all-day event.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event.

## Returns

`boolean`

- True if the event is an all-day event, false otherwise.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { allDay: true, start: new Date(), end: new Date() };
const isAllDay = isAllDayEvent(event); // true
```
