---
title: WeekData
description: Represents the data structure for the week view, including the dates in the current week and the week's date range.
---

# WeekData

Defined in: [types/views.ts:67](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L67)

Data specific to the week view.

## Properties

### dates

> **dates**: `Date`[]

Defined in: [types/views.ts:71](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L71)

An array of dates in the current week.

***

### isToday()

> **isToday**: (`date`) => `boolean`

Defined in: [types/views.ts:81](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L81)

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

Defined in: [types/views.ts:75](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L75)

A string representing the date range of the week.
