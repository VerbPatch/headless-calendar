---
title: isMultiDayEvent
description: Checks if an event spans multiple days.
---

# isMultiDayEvent()

> **isMultiDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:168](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/utils/events.ts#L168)

Checks if an event spans multiple days.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event.

## Returns

`boolean`

- True if the event spans multiple days, false otherwise.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
const isMultiDay = isMultiDayEvent(event); // true
```
