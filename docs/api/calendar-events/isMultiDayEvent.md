# Function: isMultiDayEvent()

> **isMultiDayEvent**(`event`): `boolean`

Defined in: [utils/events.ts:152](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L152)

Checks if an event spans multiple days.

## Parameters

### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event.

## Returns

`boolean`

- True if the event spans multiple days, false otherwise.

## See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
const isMultiDay = isMultiDayEvent(event); // true
```
