---
title: isPast
description: Checks if a given date is in the past.
---

# isPast()

> **isPast**(`date`): `boolean`

Defined in: [utils/date.ts:678](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/utils/date.ts#L678)

Checks if a given date is in the past.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the past, false otherwise.

## Example

```ts
const result = isPast(new Date('2000-01-01')); // true
```
