---
title: UseNavigationReturn
description: |-
  The return object of the 
   hook, providing access to the current date, view, and functions for navigating the calendar.
---

# UseNavigationReturn

Defined in: [types/views.ts:147](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L147)

## Properties

### canGoNext

> **canGoNext**: `boolean`

Defined in: [types/views.ts:191](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L191)

Indicates if navigation to the next period is possible.

***

### canGoPrevious

> **canGoPrevious**: `boolean`

Defined in: [types/views.ts:196](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L196)

Indicates if navigation to the previous period is possible.

***

### changeView()

> **changeView**: (`view`) => `void`

Defined in: [types/views.ts:186](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L186)

**`Function`**

Changes the current view of the calendar (e.g., 'month', 'week', 'day').

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new view to set.

#### Returns

`void`

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)

***

### currentDate

> **currentDate**: `Date`

Defined in: [types/views.ts:152](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L152)

The currently selected date in the calendar.

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/views.ts:179](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L179)

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

Defined in: [types/views.ts:163](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L163)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/views.ts:168](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L168)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/views.ts:173](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L173)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### view

> **view**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:158](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L158)

The current view of the calendar (e.g., 'month', 'week', 'day').

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)
