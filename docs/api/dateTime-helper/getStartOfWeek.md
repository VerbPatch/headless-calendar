---
title: getStartOfWeek
description: Gets the start of the week for a given date.
---

# getStartOfWeek()

> **getStartOfWeek**(`date`, `startOfWeek?`): `Date`

Defined in: [utils/date.ts:338](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L338)

Gets the start of the week for a given date.

## Parameters

### date

`Date`

The date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`

- The start of the week.

## Example

```ts
const start = getStartOfWeek(new Date('2024-01-15'), 1); // Monday, 2024-01-15
```
