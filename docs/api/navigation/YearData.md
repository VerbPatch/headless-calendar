---
title: YearData
description: Represents the data structure for the year view, including months, weeks, month name, and utility functions.
---

# YearData

Defined in: [types/views.ts:15](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L15)

Data specific to the year view.

## Properties

### isCurrentYear()

> **isCurrentYear**: (`date`) => `boolean`

Defined in: [types/views.ts:29](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L29)

A function to check if a date is in the current year.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is in the current year, false otherwise.

***

### months

> **months**: [`MonthData`](/calendar/docs/api/navigation/MonthData)[]

Defined in: [types/views.ts:19](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L19)

An array of month data representing all months of a years .

***

### year

> **year**: `string`

Defined in: [types/views.ts:23](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L23)

Year label.
