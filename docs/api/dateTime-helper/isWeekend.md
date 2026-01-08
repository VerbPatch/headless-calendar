---
title: isWeekend
description: Checks if a given date falls on a weekend (Saturday or Sunday).
---

# isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:710](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L710)

Checks if a given date falls on a weekend (Saturday or Sunday).

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is a weekend, false otherwise.

## Example

```ts
const result = isWeekend(new Date('2024-01-20')); // true (Saturday)
```
