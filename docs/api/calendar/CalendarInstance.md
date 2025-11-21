# Interface: CalendarInstance

Defined in: [types/calendar.ts:335](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L335)

## Properties

### changeView()

> **changeView**: (`view`) => `void`

Defined in: [types/calendar.ts:402](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L402)

**`Function`**

Changes the current view of the calendar (e.g., 'month', 'week', 'day').

#### Parameters

##### view

[`ViewType`](https://verbpatch.com/calendar/docs/api/navigation/ViewType)

The new view to set.

#### Returns

`void`

#### See

[ViewType](https://verbpatch.com/calendar/docs/api/navigation/ViewType)

***

### clearAllEvents()

> **clearAllEvents**: () => `void`

Defined in: [types/calendar.ts:446](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L446)

**`Function`**

Clears all events from the calendar.

#### Returns

`void`

***

### createEvent()

> **createEvent**: (`eventData`) => [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/calendar.ts:419](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L419)

**`Function`**

Creates a new calendar event.

#### Parameters

##### eventData

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The data for the new event.

#### Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

- The newly created event.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### currentDate

> **currentDate**: `Date`

Defined in: [types/calendar.ts:340](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L340)

The currently selected date in the calendar.

***

### dayData

> **dayData**: [`DayData`](https://verbpatch.com/calendar/docs/api/navigation/DayData) \| `null`

Defined in: [types/calendar.ts:530](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L530)

Provides data specific to the day view, such as the current date, its localized day name, and a utility function to check if the date is today.

#### See

[DayData](https://verbpatch.com/calendar/docs/api/navigation/DayData)

***

### deleteEvent()

> **deleteEvent**: (`eventId`) => `void`

Defined in: [types/calendar.ts:433](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L433)

**`Function`**

Deletes a calendar event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to delete.

#### Returns

`void`

***

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/calendar.ts:358](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L358)

The event currently being dragged, if any.

#### See

[DraggedEvent](https://verbpatch.com/calendar/docs/api/calendar-events/DraggedEvent)

***

### duplicateEvent()

> **duplicateEvent**: (`eventId`) => [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

Defined in: [types/calendar.ts:454](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L454)

**`Function`**

Duplicates an existing event.

#### Parameters

##### eventId

`string`

The ID of the event to duplicate.

#### Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

- The duplicated event object if successful, otherwise null.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/calendar.ts:468](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L468)

**`Function`**

Ends the current drag operation.

#### Returns

`void`

***

### events

> **events**: [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:352](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L352)

An array of all events currently managed by the calendar.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEvent()

> **getEvent**: (`eventId`) => [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

Defined in: [types/calendar.ts:411](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L411)

**`Function`**

Retrieves a specific event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to retrieve.

#### Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

- The event object if found, otherwise undefined.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEventsForDate()

> **getEventsForDate**: (`date`) => [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:493](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L493)

**`Function`**

Retrieves events for a specific date.

#### Parameters

##### date

`Date`

The date to retrieve events for.

#### Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events on the specified date.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEventsForDateRange()

> **getEventsForDateRange**: (`startDate`, `endDate`) => [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:485](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L485)

**`Function`**

Retrieves events within a specified date range.

#### Parameters

##### startDate

`Date`

The start date of the range.

##### endDate

`Date`

The end date of the range.

#### Returns

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events within the specified range.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/calendar.ts:395](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L395)

**`Function`**

Navigates the calendar to a specific date.

#### Parameters

##### date

`Date`

The date to navigate to.

#### Returns

`void`

***

### goToNext()

> **goToNext**: () => `void`

Defined in: [types/calendar.ts:379](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L379)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/calendar.ts:384](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L384)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/calendar.ts:389](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L389)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### handleDrop()

> **handleDrop**: (`dropTarget`) => `void`

Defined in: [types/calendar.ts:475](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L475)

**`Function`**

Handles the drop of a dragged event onto a target.

#### Parameters

##### dropTarget

[`DropTarget`](https://verbpatch.com/calendar/docs/api/calendar/DropTarget)

The target where the event was dropped.

#### Returns

`void`

#### See

[DropTarget](https://verbpatch.com/calendar/docs/api/calendar/DropTarget)

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:368](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L368)

The locale used for formatting dates and times.

***

### monthData

> **monthData**: [`MonthData`](https://verbpatch.com/calendar/docs/api/navigation/MonthData) \| `null`

Defined in: [types/calendar.ts:518](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L518)

Provides data specific to the month view, such as weeks, month name, and utility functions to check if a date is in the current month or is today.

#### See

[MonthData](https://verbpatch.com/calendar/docs/api/navigation/MonthData)

***

### moveEvent()

> **moveEvent**: (`eventId`, `newStart`, `newEnd?`) => `void`

Defined in: [types/calendar.ts:441](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L441)

**`Function`**

Moves an event to a new start and optional end date.

#### Parameters

##### eventId

`string`

The ID of the event to move.

##### newStart

`Date`

The new start date for the event.

##### newEnd?

`Date`

The new end date for the event (optional, defaults to newStart if not provided).

#### Returns

`void`

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/calendar.ts:463](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L463)

**`Function`**

Initiates a drag operation for an event.

#### Parameters

##### event

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The event to drag.

##### dragData?

`Record`\<`string`, `any`\>

Additional data to associate with the drag operation.

#### Returns

`void`

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:373](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L373)

The interval in minutes for time slots in day/week views.

***

### timeSlots

> **timeSlots**: [`TimeSlot`](https://verbpatch.com/calendar/docs/api/calendar/TimeSlot)[]

Defined in: [types/calendar.ts:511](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L511)

An array of time slots for the current day view, e.g., ['09:00', '10:00'].

#### See

[TimeSlot](https://verbpatch.com/calendar/docs/api/calendar/TimeSlot)

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/calendar.ts:363](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L363)

The timezone used for calendar operations.

***

### updateEvent()

> **updateEvent**: (`eventId`, `updates`) => `void`

Defined in: [types/calendar.ts:427](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L427)

**`Function`**

Updates an existing calendar event.

#### Parameters

##### eventId

`string`

The ID of the event to update.

##### updates

[`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

The partial event data to apply as updates.

#### Returns

`void`

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### utils

> **utils**: [`CalendarUtils`](https://verbpatch.com/calendar/docs/api/calendar/CalendarUtils)

Defined in: [types/calendar.ts:537](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L537)

A collection of utility functions for date manipulation and formatting.

#### See

[CalendarUtils](https://verbpatch.com/calendar/docs/api/calendar/CalendarUtils)

***

### view

> **view**: [`ViewType`](https://verbpatch.com/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:346](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L346)

The current view of the calendar (e.g., 'month', 'week', 'day').

#### See

[ViewType](https://verbpatch.com/calendar/docs/api/navigation/ViewType)

***

### visibleDates

> **visibleDates**: `Date`[]

Defined in: [types/calendar.ts:499](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L499)

An array of dates currently visible in the calendar, based on the current view.

***

### visibleEvents

> **visibleEvents**: [`CalendarEvent`](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:505](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L505)

An array of calendar events that are visible within the current date range.

#### See

[CalendarEvent](https://verbpatch.com/calendar/docs/api/calendar-events/CalendarEvent)

***

### weekData

> **weekData**: [`WeekData`](https://verbpatch.com/calendar/docs/api/navigation/WeekData) \| `null`

Defined in: [types/calendar.ts:524](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/calendar.ts#L524)

Provides data specific to the week view, such as the dates in the week, the week's date range, and a utility function to check if a date is today.

#### See

[WeekData](https://verbpatch.com/calendar/docs/api/navigation/WeekData)
