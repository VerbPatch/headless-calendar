---
title: addWeeks
description: Adds a specified number of weeks to a date.
---

# addWeeks()

> **addWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:483](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L483)

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
