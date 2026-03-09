---
title: YearData
description: Represents the data structure for the year view, including months, weeks, month name, and utility functions.
---

# YearData

Defined in: [types/views.ts:38](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/types/views.ts#L38)

Data specific to the year view.

## Properties

### isCurrentYear()

> **isCurrentYear**: (`date`) => `boolean`

Defined in: [types/views.ts:52](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/types/views.ts#L52)

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

Defined in: [types/views.ts:42](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/types/views.ts#L42)

An array of month data representing all months of a years .

***

### year

> **year**: `string`

Defined in: [types/views.ts:46](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/types/views.ts#L46)

Year label.
