---
title: Is Past
description: Checks if a given date is in the past.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / isPast

# Function: isPast()

> **isPast**(`date`): `boolean`

Defined in: [utils/date.ts:603](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L603)

Checks if a given date is in the past.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the past, false otherwise.

## Example

```ts
const result = isPast(new Date('2000-01-01')); // true
```
