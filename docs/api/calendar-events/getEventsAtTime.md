# Function: getEventsAtTime()

> **getEventsAtTime**(`events`, `date`, `hour`, `minute?`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:173](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/events.ts#L173)

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
