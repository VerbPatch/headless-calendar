---
title: UseNavigationReturn
description: |-
  The return object of the 
   hook, providing access to the current date, view, and functions for navigating the calendar.
---

# UseNavigationReturn

Defined in: [types/views.ts:173](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L173)

## Properties

### canGoNext

> **canGoNext**: `boolean`

Defined in: [types/views.ts:223](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L223)

Indicates if navigation to the next period is possible.

***

### canGoPrevious

> **canGoPrevious**: `boolean`

Defined in: [types/views.ts:228](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L228)

Indicates if navigation to the previous period is possible.

***

### changeView()

> **changeView**: (`view`, `options?`) => `void`

Defined in: [types/views.ts:218](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L218)

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

### currentDate

> **currentDate**: `Date`

Defined in: [types/views.ts:178](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L178)

The currently selected date in the calendar.

***

### customViewOptions

> **customViewOptions**: [`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Defined in: [types/views.ts:189](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L189)

Configuration options for the 'custom' view.

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/views.ts:210](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L210)

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

Defined in: [types/views.ts:194](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L194)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/views.ts:199](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L199)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/views.ts:204](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L204)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### view

> **view**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:184](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L184)

The current view of the calendar (e.g., 'month', 'week', 'day').

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)
