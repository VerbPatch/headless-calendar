---
title: isFuture
description: Checks if a given date is in the future.
---

# isFuture()

> **isFuture**(`date`): `boolean`

Defined in: [utils/date.ts:694](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/utils/date.ts#L694)

Checks if a given date is in the future.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the future, false otherwise.

## Example

```ts
const result = isFuture(new Date('2100-01-01')); // true
```
