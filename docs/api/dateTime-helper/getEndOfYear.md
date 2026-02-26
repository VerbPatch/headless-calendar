---
title: getEndOfYear
description: Gets the end of the year for a given date.
---

# getEndOfYear()

> **getEndOfYear**(`date`): `Date`

Defined in: [utils/date.ts:379](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L379)

Gets the end of the year for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the year.

## Example

```ts
const end = getEndOfYear(new Date('2024-05-15')); // 2024-11-31
```
