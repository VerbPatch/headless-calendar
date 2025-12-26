---
title: isFuture
description: Checks if a given date is in the future.
---

# isFuture()

> **isFuture**(`date`): `boolean`

Defined in: [utils/date.ts:642](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/date.ts#L642)

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
