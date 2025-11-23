# Function: getEventDuration()

> **getEventDuration**(`event`): `number`

Defined in: [utils/events.ts:118](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/events.ts#L118)

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
