---
title: useDragDrop
description: A hook for managing drag and drop functionality for calendar events.
---

# useDragDrop()

> **useDragDrop**(`options`): [`UseDragDropReturn`](/calendar/docs/api/calendar-events/UseDragDropReturn)

Defined in: [hooks/useDragDrop.ts:32](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/hooks/useDragDrop.ts#L32)

A hook for managing drag and drop functionality for calendar events.

## Parameters

### options

[`UseDragDropOptions`](/calendar/docs/api/calendar-events/UseDragDropOptions) = `{}`

Configuration options for drag and drop.

## Returns

[`UseDragDropReturn`](/calendar/docs/api/calendar-events/UseDragDropReturn)

- An object containing state and functions for drag and drop.

## See

 - [UseDragDropOptions](/calendar/docs/api/calendar-events/UseDragDropOptions)
 - [UseDragDropReturn](/calendar/docs/api/calendar-events/UseDragDropReturn)

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
