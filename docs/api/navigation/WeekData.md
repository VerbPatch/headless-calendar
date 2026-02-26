---
title: WeekData
description: Represents the data structure for the week view, including the dates in the current week and the week's date range.
---

# WeekData

Defined in: [types/views.ts:90](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L90)

Data specific to the week view.

## Properties

### dates

> **dates**: `Date`[]

Defined in: [types/views.ts:94](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L94)

An array of dates in the current week.

***

### isToday()

> **isToday**: (`date`) => `boolean`

Defined in: [types/views.ts:104](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L104)

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

Defined in: [types/views.ts:98](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L98)

A string representing the date range of the week.
