---
title: getStartOfYear
description: Gets the start of the year for a given date.
---

# getStartOfYear()

> **getStartOfYear**(`date`): `Date`

Defined in: [utils/date.ts:363](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L363)

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
