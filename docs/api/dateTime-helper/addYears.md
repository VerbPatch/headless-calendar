---
title: addYears
description: Adds a specified number of years to a date.
---

# addYears()

> **addYears**(`date`, `years`): `Date`

Defined in: [utils/date.ts:519](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L519)

Adds a specified number of years to a date.

## Parameters

### date

`Date`

The original date.

### years

`number`

The number of years to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addYears(new Date('2024-01-15'), 1); // 2025-01-15
```
