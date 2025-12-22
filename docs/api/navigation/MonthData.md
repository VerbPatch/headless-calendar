---
title: Month Data
description: Represents the data structure for the month view, including weeks, month name, and utility functions.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / MonthData

# Interface: MonthData

Defined in: [types/views.ts:15](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L15)

Data specific to the month view.

## Properties

### isCurrentMonth()

> **isCurrentMonth**: (`date`) => `boolean`

Defined in: [types/views.ts:29](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L29)

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

Defined in: [types/views.ts:35](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L35)

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

Defined in: [types/views.ts:23](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L23)

The localized name of the month.

***

### weeks

> **weeks**: `Date`[][]

Defined in: [types/views.ts:19](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/types/views.ts#L19)

A 2D array of dates representing the weeks of the month.
