---
title: isPast
description: Checks if a given date is in the past.
---

# isPast()

> **isPast**(`date`): `boolean`

Defined in: [utils/date.ts:678](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L678)

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
