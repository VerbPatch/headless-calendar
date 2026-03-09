---
title: getStartOfYear
description: Gets the start of the year for a given date.
---

# getStartOfYear()

> **getStartOfYear**(`date`): `Date`

Defined in: [utils/date.ts:357](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L357)

Gets the start of the year for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the year.

## Example

```ts
const start = getStartOfYear(new Date('2024-05-15')); // 2024-01-01
```
