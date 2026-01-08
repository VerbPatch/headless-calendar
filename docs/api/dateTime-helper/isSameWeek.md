---
title: isSameWeek
description: Checks if two dates are in the same week.
---

# isSameWeek()

> **isSameWeek**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:299](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L299)

Checks if two dates are in the same week.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are in the same week, false otherwise.

## See

[getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)

## Example

```ts
const result = isSameWeek(new Date('2024-01-15'), new Date('2024-01-17')); // true
```
