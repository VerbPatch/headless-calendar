---
title: isToday
description: Checks if a given date is today.
---

# isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:674](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/utils/date.ts#L674)

Checks if a given date is today.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is today, false otherwise.

## See

[isSameDay](/calendar/docs/api/dateTime-helper/isSameDay)

## Example

```ts
const result = isToday(new Date()); // true
```
