---
title: isAllDayEvent
description: Checks if an event is an all-day event.
---

# isAllDayEvent()

> **isAllDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:168](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/events.ts#L168)

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
