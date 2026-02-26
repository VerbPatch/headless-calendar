---
title: addWeeks
description: Adds a specified number of weeks to a date.
---

# addWeeks()

> **addWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:541](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L541)

Adds a specified number of weeks to a date.

## Parameters

### date

`Date`

The original date.

### weeks

`number`

The number of weeks to add (can be negative).

## Returns

`Date`

- The new date.

## See

[addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const newDate = addWeeks(new Date('2024-01-15'), 2); // 2024-01-29
```
