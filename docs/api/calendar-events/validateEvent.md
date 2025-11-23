# Function: validateEvent()

> **validateEvent**(`event`): `string`[]

Defined in: [utils/events.ts:227](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/events.ts#L227)

Validates a calendar event object for required fields and logical consistency.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event to validate.

## Returns

`string`[]

- An array of error messages. If the array is empty, the event is valid.

## See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { title: '', start: new Date(), end: new Date('2000-01-01') };
const errors = validateEvent(event);
// errors will contain messages about missing title and invalid end date
```
