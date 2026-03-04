---
title: getEndOfMonth
description: Gets the end of the month for a given date.
---

# getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:446](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/date.ts#L446)

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
