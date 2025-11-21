# Function: useDragDrop()

> **useDragDrop**(`options`): [`UseDragDropReturn`](https://verbpatch.com/calendar/docs/api/calendar-events/UseDragDropReturn)

Defined in: [hooks/useDragDrop.ts:30](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/hooks/useDragDrop.ts#L30)

A hook for managing drag and drop functionality for calendar events.

## Parameters

### options

[`UseDragDropOptions`](https://verbpatch.com/calendar/docs/api/calendar-events/UseDragDropOptions) = `{}`

Configuration options for drag and drop.

## Returns

[`UseDragDropReturn`](https://verbpatch.com/calendar/docs/api/calendar-events/UseDragDropReturn)

- An object containing state and functions for drag and drop.

## See

 - [UseDragDropOptions](https://verbpatch.com/calendar/docs/api/calendar-events/UseDragDropOptions)
 - [UseDragDropReturn](https://verbpatch.com/calendar/docs/api/calendar-events/UseDragDropReturn)

## Example

```typescript
const { draggedEvent, getDragProps, getDropProps } = useDragDrop({
  onEventMove: (eventId, newStart, newEnd) => {
    console.log(`Event ${eventId} moved to ${newStart} - ${newEnd}`);
  },
});

// In your component:
<div {...getDragProps(event)}>
  {event.title}
</div>

<div {...getDropProps(date, time)}>
  // Drop target
</div>
```
