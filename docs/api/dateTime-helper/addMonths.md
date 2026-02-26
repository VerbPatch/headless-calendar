---
title: addMonths
description: Adds a specified number of months to a date, clamping to the last day if necessary.
---

# addMonths()

> **addMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:558](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L558)

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
