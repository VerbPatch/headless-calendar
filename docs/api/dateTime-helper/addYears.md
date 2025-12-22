---
title: Add Years
description: Adds a specified number of years to a date.
---

# Function: addYears()

> **addYears**(`date`, `years`): `Date`

Defined in: [utils/date.ts:496](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L496)

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
