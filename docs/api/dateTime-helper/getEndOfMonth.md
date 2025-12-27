---
title: getEndOfMonth
description: Gets the end of the month for a given date.
---

# getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:394](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/utils/date.ts#L394)

Gets the end of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the month.

## Example

```ts
const end = getEndOfMonth(new Date('2024-01-15')); // 2024-01-31
```
