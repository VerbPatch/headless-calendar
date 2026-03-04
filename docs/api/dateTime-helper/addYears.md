---
title: addYears
description: Adds a specified number of years to a date.
---

# addYears()

> **addYears**(`date`, `years`): `Date`

Defined in: [utils/date.ts:577](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/date.ts#L577)

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
const newDate = addYears(new Date('2024-02-29'), 1); // 2025-02-28
```
