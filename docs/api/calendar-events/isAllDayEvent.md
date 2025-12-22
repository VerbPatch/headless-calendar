---
title: Is All Day Event
description: Checks if an event is an all-day event.
---

# isAllDayEvent()

> **isAllDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:150](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/events.ts#L150)

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
