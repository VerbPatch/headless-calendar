---
title: addMonths
description: Adds a specified number of months to a date.
---

# addMonths()

> **addMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:500](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L500)

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
const newDate = addMonths(new Date('2024-01-15'), 3); // 2024-04-15
```
