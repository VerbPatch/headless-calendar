---
title: Get Events At Time
description: Retrieves events that occur at a specific time on a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getEventsAtTime

# Function: getEventsAtTime()

> **getEventsAtTime**(`events`, `date`, `hour`, `minute?`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:191](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/events.ts#L191)

Retrieves events that occur at a specific time on a given date.

## Parameters

### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### date

`Date`

The date to filter by.

### hour

`number`

The hour to filter by (0-23).

### minute?

`number` = `0`

The minute to filter by (0-59).

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events occurring at the specified time.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const events = [{ start: new Date('2024-01-15T10:30:00'), end: new Date('2024-01-15T11:30:00') }];
const eventsAtTime = getEventsAtTime(events, new Date('2024-01-15'), 10, 30);
```
