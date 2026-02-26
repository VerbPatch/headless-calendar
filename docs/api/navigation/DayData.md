---
title: DayData
description: Represents the data structure for the day view, including the current date and its localized name.
---

# DayData

Defined in: [types/views.ts:113](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L113)

Data specific to the day view.

## Properties

### dates

> **dates**: `Date`[]

Defined in: [types/views.ts:117](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L117)

An array of dates visible in the day view (useful for custom multi-day views).

***

### dayName

> **dayName**: `string`

Defined in: [types/views.ts:121](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L121)

The localized name of the day or range.

***

### isToday

> **isToday**: `boolean`

Defined in: [types/views.ts:125](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L125)

Indicates if the primary date is today.
