---
title: getStartOfMonth
description: Gets the start of the month for a given date.
---

# getStartOfMonth()

> **getStartOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:378](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L378)

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
