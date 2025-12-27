---
title: WeekData
description: Represents the data structure for the week view, including the dates in the current week and the week's date range.
---

# WeekData

Defined in: [types/views.ts:44](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/types/views.ts#L44)

Data specific to the week view.

## Properties

### dates

> **dates**: `Date`[]

Defined in: [types/views.ts:48](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/types/views.ts#L48)

An array of dates in the current week.

***

### isToday()

> **isToday**: (`date`) => `boolean`

Defined in: [types/views.ts:58](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/types/views.ts#L58)

A function to check if a date is today.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is today, false otherwise.

***

### weekRange

> **weekRange**: `string`

Defined in: [types/views.ts:52](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/types/views.ts#L52)

A string representing the date range of the week.
