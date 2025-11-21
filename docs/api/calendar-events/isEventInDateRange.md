# Function: isEventInDateRange()

> **isEventInDateRange**(`event`, `startDate`, `endDate`): `boolean`

Defined in: [utils/events.ts:31](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L31)

Checks if a given event falls within a specified date range.

## Parameters

### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event to check.

### startDate

`Date`

The start date of the range.

### endDate

`Date`

The end date of the range.

## Returns

`boolean`

- True if the event is within the range, false otherwise.

## See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
const inRange = isEventInDateRange(event, new Date('2024-01-10'), new Date('2024-01-20')); // true
```
