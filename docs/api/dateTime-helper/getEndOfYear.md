---
title: getEndOfYear
description: Gets the end of the year for a given date.
---

# getEndOfYear()

> **getEndOfYear**(`date`): `Date`

Defined in: [utils/date.ts:373](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L373)

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
