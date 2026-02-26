---
title: CustomViewOptions
description: Defines the configuration for a custom view, such as the number of days, weeks, or months to display.
---

# CustomViewOptions

Defined in: [types/views.ts:15](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L15)

Configuration for a custom view.

## Properties

### count

> **count**: `number`

Defined in: [types/views.ts:23](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L23)

The number of 'day' | 'week' | 'month' to display based on type.

***

### includeSpecificDays?

> `optional` **includeSpecificDays**: `number`[]

Defined in: [types/views.ts:29](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L29)

Specific days of the week to include (0 for Sunday, 1 for Monday, etc.).
If provided, only these days will be visible in the custom view.
Only works if type is set to either week or month

***

### type

> **type**: `"month"` \| `"week"` \| `"day"`

Defined in: [types/views.ts:19](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L19)

The type of view for the custom view.
