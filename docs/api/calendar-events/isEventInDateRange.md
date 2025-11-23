# Function: isEventInDateRange()

> **isEventInDateRange**(`event`, `startDate`, `endDate`): `boolean`

Defined in: [utils/events.ts:31](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/events.ts#L31)

Checks if a given event falls within a specified date range.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

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

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
const inRange = isEventInDateRange(event, new Date('2024-01-10'), new Date('2024-01-20')); // true
```
