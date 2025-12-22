---
title: Is Future
description: Checks if a given date is in the future.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / isFuture

# Function: isFuture()

> **isFuture**(`date`): `boolean`

Defined in: [utils/date.ts:619](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L619)

Checks if a given date is in the future.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the future, false otherwise.

## Example

```ts
const result = isFuture(new Date('2100-01-01')); // true
```
