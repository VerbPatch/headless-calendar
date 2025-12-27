---
title: getStartOfMonth
description: Gets the start of the month for a given date.
---

# getStartOfMonth()

> **getStartOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:378](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/utils/date.ts#L378)

Gets the start of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the month.

## Example

```ts
const start = getStartOfMonth(new Date('2024-01-15')); // 2024-01-01
```
