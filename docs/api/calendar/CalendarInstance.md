---
title: CalendarInstance
description: |-
  The main object returned by the 
   hook, providing access to the calendar's state, navigation functions, event management functions, and other utilities.
---

# CalendarInstance

Defined in: [types/calendar.ts:344](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L344)

## Properties

### changeView()

> **changeView**: (`view`, `options?`) => `void`

Defined in: [types/calendar.ts:418](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L418)

**`Function`**

Changes the current view of the calendar (e.g., 'month', 'week', 'day').

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new view to set.

##### options?

[`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Configuration options for the 'custom' view.

#### Returns

`void`

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)

***

### clearAllEvents()

> **clearAllEvents**: () => `void`

Defined in: [types/calendar.ts:469](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L469)

**`Function`**

Clears all events from the calendar.

#### Returns

`void`

***

### createEvent()

> **createEvent**: (`eventData`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

Defined in: [types/calendar.ts:442](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L442)

**`Function`**

Creates a new calendar event.

#### Parameters

##### eventData

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The data for the new event.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

- The newly created event.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### currentDate

> **currentDate**: `Date`

Defined in: [types/calendar.ts:349](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L349)

The currently selected date in the calendar.

***

### customViewOptions?

> `optional` **customViewOptions**: [`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Defined in: [types/calendar.ts:361](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L361)

Returns custom view option when view is 'custom'

#### See

[CustomViewOptions](/calendar/docs/api/navigation/CustomViewOptions)

***

### dayData

> **dayData**: [`DayData`](/calendar/docs/api/navigation/DayData) \| `null`

Defined in: [types/calendar.ts:583](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L583)

Provides data specific to the day view, such as the current date, its localized day name, and a utility function to check if the date is today.

#### See

[DayData](/calendar/docs/api/navigation/DayData)

***

### deleteEvent()

> **deleteEvent**: (`eventId`) => `void`

Defined in: [types/calendar.ts:456](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L456)

**`Function`**

Deletes a calendar event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to delete.

#### Returns

`void`

***

### downloadICS()

> **downloadICS**: (`filename?`, `prodId?`) => `void`

Defined in: [types/calendar.ts:539](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L539)

**`Function`**

Downloads the calendar events as an .ics file.

#### Parameters

##### filename?

`string`

The name of the file to download.

##### prodId?

`string`

Optional product identifier.

#### Returns

`void`

***

### draggedEvent

> **draggedEvent**: [`DraggedEvent`](/calendar/docs/api/calendar-events/DraggedEvent) \| `null`

Defined in: [types/calendar.ts:373](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L373)

The event currently being dragged, if any.

#### See

[DraggedEvent](/calendar/docs/api/calendar-events/DraggedEvent)

***

### duplicateEvent()

> **duplicateEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

Defined in: [types/calendar.ts:477](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L477)

**`Function`**

Duplicates an existing event.

#### Parameters

##### eventId

`string`

The ID of the event to duplicate.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `null`

- The duplicated event object if successful, otherwise null.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### endDrag()

> **endDrag**: () => `void`

Defined in: [types/calendar.ts:491](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L491)

**`Function`**

Ends the current drag operation.

#### Returns

`void`

***

### events

> **events**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:367](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L367)

An array of all events currently managed by the calendar.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### exportToICS()

> **exportToICS**: (`prodId?`) => `string`

Defined in: [types/calendar.ts:531](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L531)

**`Function`**

Exports the calendar events to iCalendar (.ics) format.

#### Parameters

##### prodId?

`string`

Optional product identifier.

#### Returns

`string`

- The calendar in .ics format.

***

### getEvent()

> **getEvent**: (`eventId`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

Defined in: [types/calendar.ts:427](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L427)

**`Function`**

Retrieves a specific event by its ID.

#### Parameters

##### eventId

`string`

The ID of the event to retrieve.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent) \| `undefined`

- The event object if found, otherwise undefined.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEventsForDate()

> **getEventsForDate**: (`date`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:516](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L516)

**`Function`**

Retrieves events for a specific date.

#### Parameters

##### date

`Date`

The date to retrieve events for.

#### Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events on the specified date.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### getEventsForDateRange()

> **getEventsForDateRange**: (`startDate`, `endDate`) => [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:508](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L508)

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

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- An array of events within the specified range.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/calendar.ts:410](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L410)

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

Defined in: [types/calendar.ts:394](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L394)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/calendar.ts:399](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L399)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/calendar.ts:404](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L404)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### handleDrop()

> **handleDrop**: (`dropTarget`) => `void`

Defined in: [types/calendar.ts:498](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L498)

**`Function`**

Handles the drop of a dragged event onto a target.

#### Parameters

##### dropTarget

[`DropTarget`](/calendar/docs/api/calendar/DropTarget)

The target where the event was dropped.

#### Returns

`void`

#### See

[DropTarget](/calendar/docs/api/calendar/DropTarget)

***

### importFromICS()

> **importFromICS**: (`icsContent`) => `void`

Defined in: [types/calendar.ts:523](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L523)

**`Function`**

Imports events from an iCalendar (.ics) string and adds them to the calendar.

#### Parameters

##### icsContent

`string`

The content of the iCalendar file.

#### Returns

`void`

***

### locale?

> `optional` **locale**: `string`

Defined in: [types/calendar.ts:383](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L383)

The locale used for formatting dates and times.

***

### monthData

> **monthData**: [`MonthData`](/calendar/docs/api/navigation/MonthData) \| `null`

Defined in: [types/calendar.ts:571](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L571)

Provides data specific to the month view, such as weeks, month name, and utility functions to check if a date is in the current month or is today.

#### See

[MonthData](/calendar/docs/api/navigation/MonthData)

***

### moveEvent()

> **moveEvent**: (`eventId`, `newStart`, `newEnd?`) => `void`

Defined in: [types/calendar.ts:464](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L464)

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

### setEvents()

> **setEvents**: (`events`) => `void`

Defined in: [types/calendar.ts:434](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L434)

**`Function`**

Appends new events to the existing list of events.

#### Parameters

##### events

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

The new array of events to append.

#### Returns

`void`

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### startDrag()

> **startDrag**: (`event`, `dragData?`) => `void`

Defined in: [types/calendar.ts:486](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L486)

**`Function`**

Initiates a drag operation for an event.

#### Parameters

##### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The event to drag.

##### dragData?

`Record`\<`string`, `any`\>

Additional data to associate with the drag operation.

#### Returns

`void`

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### timeSlotInterval?

> `optional` **timeSlotInterval**: `number`

Defined in: [types/calendar.ts:388](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L388)

The interval in minutes for time slots in day/week views.

***

### timeSlots

> **timeSlots**: [`TimeSlot`](/calendar/docs/api/calendar/TimeSlot)[]

Defined in: [types/calendar.ts:557](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L557)

An array of time slots for the current day view, e.g., ['09:00', '10:00'].

#### See

[TimeSlot](/calendar/docs/api/calendar/TimeSlot)

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/calendar.ts:378](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L378)

The timezone used for calendar operations.

***

### updateEvent()

> **updateEvent**: (`eventId`, `updates`) => `void`

Defined in: [types/calendar.ts:450](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L450)

**`Function`**

Updates an existing calendar event.

#### Parameters

##### eventId

`string`

The ID of the event to update.

##### updates

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The partial event data to apply as updates.

#### Returns

`void`

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### utils

> **utils**: [`CalendarUtils`](/calendar/docs/api/calendar/CalendarUtils)

Defined in: [types/calendar.ts:590](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L590)

A collection of utility functions for date manipulation and formatting.

#### See

[CalendarUtils](/calendar/docs/api/calendar/CalendarUtils)

***

### view

> **view**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/calendar.ts:355](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L355)

The current view of the calendar (e.g., 'year', 'month', 'week', 'day', 'custom').

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)

***

### visibleDates

> **visibleDates**: `Date`[]

Defined in: [types/calendar.ts:545](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L545)

An array of dates currently visible in the calendar, based on the current view.

***

### visibleEvents

> **visibleEvents**: [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [types/calendar.ts:551](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L551)

An array of calendar events that are visible within the current date range.

#### See

[CalendarEvent](/calendar/docs/api/calendar-events/CalendarEvent)

***

### weekData

> **weekData**: [`WeekData`](/calendar/docs/api/navigation/WeekData) \| `null`

Defined in: [types/calendar.ts:577](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L577)

Provides data specific to the week view, such as the dates in the week, the week's date range, and a utility function to check if a date is today.

#### See

[WeekData](/calendar/docs/api/navigation/WeekData)

***

### yearData

> **yearData**: [`YearData`](/calendar/docs/api/navigation/YearData) \| `null`

Defined in: [types/calendar.ts:564](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L564)

Provides data specific to the Year with all month, weeks, month name, and month data has utility functions to check if a date is in the current month or is today.

#### See

[YearData](/calendar/docs/api/navigation/YearData)
