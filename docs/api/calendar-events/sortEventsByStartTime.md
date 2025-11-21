# Function: sortEventsByStartTime()

> **sortEventsByStartTime**(`events`): [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:98](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L98)

Sorts an array of calendar events by their start time in ascending order.

## Parameters

### events

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

## Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

- A new array of events sorted by start time.

## See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const events = [
  { start: new Date('2024-01-15T14:00:00'), end: new Date('2024-01-15T15:00:00') },
  { start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }
];
const sortedEvents = sortEventsByStartTime(events);
```
