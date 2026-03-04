---
title: getEndOfYear
description: Gets the end of the year for a given date.
---

# getEndOfYear()

> **getEndOfYear**(`date`): `Date`

Defined in: [utils/date.ts:373](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/date.ts#L373)

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
