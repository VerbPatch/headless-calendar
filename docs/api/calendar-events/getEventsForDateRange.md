# Function: getEventsForDateRange()

> **getEventsForDateRange**(`events`, `startDate`, `endDate`): [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/events.ts:77](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L77)

Retrieves all events that fall within a specified date range.

## Parameters

### events

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of calendar events.

### startDate

`Date`

The start date of the range.

### endDate

`Date`

The end date of the range.

## Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events within the specified date range.

## See

 - [CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)
 - [isEventInDateRange](https://verbpatch.com/calendar/docs/api/calendar-events/isEventInDateRange)

## Example

```ts
const events = [{ start: new Date('2024-01-15'), end: new Date('2024-01-16') }];
const eventsInRange = getEventsForDateRange(events, new Date('2024-01-10'), new Date('2024-01-20'));
```
