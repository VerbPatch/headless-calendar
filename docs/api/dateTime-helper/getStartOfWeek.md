---
title: Get Start Of Week
description: Gets the start of the week for a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getStartOfWeek

# Function: getStartOfWeek()

> **getStartOfWeek**(`date`, `startOfWeek?`): `Date`

Defined in: [utils/date.ts:315](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L315)

Gets the start of the week for a given date.

## Parameters

### date

`Date`

The date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`

- The start of the week.

## Example

```ts
const start = getStartOfWeek(new Date('2024-01-15'), 1); // Monday, 2024-01-15
```
