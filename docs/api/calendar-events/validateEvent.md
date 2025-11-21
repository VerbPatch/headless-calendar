# Function: validateEvent()

> **validateEvent**(`event`): `string`[]

Defined in: [utils/events.ts:227](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L227)

Validates a calendar event object for required fields and logical consistency.

## Parameters

### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The calendar event to validate.

## Returns

`string`[]

- An array of error messages. If the array is empty, the event is valid.

## See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

## Example

```ts
const event = { title: '', start: new Date(), end: new Date('2000-01-01') };
const errors = validateEvent(event);
// errors will contain messages about missing title and invalid end date
```
