# Function: cloneEvent()

> **cloneEvent**(`event`): [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [utils/events.ts:433](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/events.ts#L433)

Creates a deep clone of a calendar event, assigning a new unique ID.

## Parameters

### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The event to clone.

## Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

- A new event object with a unique ID and copied properties.

## See

 - [CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)
 - [generateId](https://verbpatch.com/calendar/docs/api/calendar-events/generateId)

## Example

```ts
const event = { id: '1', title: 'Meeting', start: new Date(), end: new Date() };
const clonedEvent = cloneEvent(event);
// clonedEvent will have a new unique ID
```
