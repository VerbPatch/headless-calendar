---
title: UseNavigationReturn
description: |-
  The return object of the 
   hook, providing access to the current date, view, and functions for navigating the calendar.
---

# UseNavigationReturn

Defined in: [types/views.ts:177](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L177)

## Properties

### canGoNext

> **canGoNext**: `boolean`

Defined in: [types/views.ts:227](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L227)

Indicates if navigation to the next period is possible.

***

### canGoPrevious

> **canGoPrevious**: `boolean`

Defined in: [types/views.ts:232](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L232)

Indicates if navigation to the previous period is possible.

***

### changeView()

> **changeView**: (`view`, `options?`) => `void`

Defined in: [types/views.ts:222](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L222)

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

Defined in: [types/views.ts:182](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L182)

The currently selected date in the calendar.

***

### customViewOptions

> **customViewOptions**: [`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Defined in: [types/views.ts:193](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L193)

Configuration options for the 'custom' view.

***

### goToDate()

> **goToDate**: (`date`) => `void`

Defined in: [types/views.ts:214](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L214)

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

Defined in: [types/views.ts:198](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L198)

**`Function`**

Navigates the calendar to the next period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToPrevious()

> **goToPrevious**: () => `void`

Defined in: [types/views.ts:203](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L203)

**`Function`**

Navigates the calendar to the previous period (day, week, or month depending on the current view).

#### Returns

`void`

***

### goToToday()

> **goToToday**: () => `void`

Defined in: [types/views.ts:208](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L208)

**`Function`**

Navigates the calendar to today's date.

#### Returns

`void`

***

### view

> **view**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:188](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/types/views.ts#L188)

The current view of the calendar (e.g., 'month', 'week', 'day').

#### See

[ViewType](/calendar/docs/api/navigation/ViewType)
