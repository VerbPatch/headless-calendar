# Function: getEventsForDate()

> **getEventsForDate**(`events`, `date`): [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:53](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L53)

Retrieves all events that occur on a specific date.

## Parameters

### events

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### date

`Date`

The date to filter events by.

## Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events occurring on the specified date.

## See

 - [CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)
 - [getStartOfDay](https://verbpatch.com/calendar/docs/api/dateTime-helper/getStartOfDay)
 - [getEndOfDay](https://verbpatch.com/calendar/docs/api/dateTime-helper/getEndOfDay)
 - [isEventInDateRange](https://verbpatch.com/calendar/docs/api/calendar-events/isEventInDateRange)

## Example

```ts
const events = [{ start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }];
const eventsForDate = getEventsForDate(events, new Date('2024-01-15'));
```
