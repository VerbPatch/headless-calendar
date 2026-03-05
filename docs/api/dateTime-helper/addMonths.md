---
title: addMonths
description: Adds a specified number of months to a date, clamping to the last day if necessary.
---

# addMonths()

> **addMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:552](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/utils/date.ts#L552)

Adds a specified number of months to a date.

## Parameters

### date

`Date`

The original date.

### months

`number`

The number of months to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addMonths(new Date('2024-01-31'), 1); // 2024-02-29
```
