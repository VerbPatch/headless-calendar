---
title: getEndOfMonth
description: Gets the end of the month for a given date.
---

# getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:394](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L394)

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
