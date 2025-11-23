# Function: cloneEvent()

> **cloneEvent**(`event`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [utils/events.ts:433](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/events.ts#L433)

Creates a deep clone of a calendar event, assigning a new unique ID.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event to clone.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

- A new event object with a unique ID and copied properties.

## See

 - [CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)
 - [generateId](/calendar/docs/api/calendar-events/generateId)

## Example

```ts
const event = { id: '1', title: 'Meeting', start: new Date(), end: new Date() };
const clonedEvent = cloneEvent(event);
// clonedEvent will have a new unique ID
```
