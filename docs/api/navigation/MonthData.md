---
title: MonthData
description: Represents the data structure for the month view, including weeks, month name, and utility functions.
---

# MonthData

Defined in: [types/views.ts:38](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L38)

Data specific to the month view.

## Properties

### isCurrentMonth()

> **isCurrentMonth**: (`date`) => `boolean`

Defined in: [types/views.ts:52](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L52)

A function to check if a date is in the current month.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is in the current month, false otherwise.

***

### isToday()

> **isToday**: (`date`) => `boolean`

Defined in: [types/views.ts:58](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L58)

A function to check if a date is today.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is today, false otherwise.

***

### monthName

> **monthName**: `string`

Defined in: [types/views.ts:46](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L46)

The localized name of the month.

***

### weeks

> **weeks**: `Date`[][]

Defined in: [types/views.ts:42](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/views.ts#L42)

A 2D array of dates representing the weeks of the month.
