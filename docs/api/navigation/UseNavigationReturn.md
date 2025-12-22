---
title: Use Navigation Return
description: |-
  The return object of the 
   hook, providing access to the current date, view, and functions for navigating the calendar.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / UseNavigationReturn

# Interface: UseNavigationReturn

Defined in: [types/views.ts:124](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L124)

## Properties

### canGoNext

> **canGoNext**: `boolean`

Defined in: [types/views.ts:168](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L168)

Indicates if navigation to the next period is possible.

***

### canGoPrevious

> **canGoPrevious**: `boolean`

Defined in: [types/views.ts:173](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L173)

Indicates if navigation to the previous period is possible.

***

### changeView()

> **changeView**: (`view`) => `void`

Defined in: [types/views.ts:163](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L163)

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

Defined in: [types/views.ts:129](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L129)

The currently selected date in the calendar.

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/views.ts:156](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L156)

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

Defined in: [types/views.ts:140](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L140)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/views.ts:145](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L145)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/views.ts:150](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L150)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### view

> **view**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:135](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L135)

The current view of the calendar (e.g., 'month', 'week', 'day').

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)
