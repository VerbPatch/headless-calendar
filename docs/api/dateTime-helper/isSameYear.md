---
title: isSameYear
description: Checks if two dates are in the same year.
---

# isSameYear()

> **isSameYear**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:339](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L339)

Checks if two dates are in the same year.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are in the same year, false otherwise.

## See

[getStartOfYear](/calendar/docs/api/dateTime-helper/getStartOfYear)

## Example

```ts
const result = isSameYear(new Date('2024-01-15'), new Date('2024-02-25')); // true
```
