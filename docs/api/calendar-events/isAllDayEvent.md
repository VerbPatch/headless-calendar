# Function: isAllDayEvent()

> **isAllDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:136](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L136)

Checks if an event is an all-day event.

## Parameters

### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event.

## Returns

`boolean`

- True if the event is an all-day event, false otherwise.

## See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { allDay: true, start: new Date(), end: new Date() };
const isAllDay = isAllDayEvent(event); // true
```
