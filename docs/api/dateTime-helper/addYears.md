---
title: Add Years
description: Adds a specified number of years to a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / addYears

# Function: addYears()

> **addYears**(`date`, `years`): `Date`

Defined in: [utils/date.ts:496](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L496)

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
