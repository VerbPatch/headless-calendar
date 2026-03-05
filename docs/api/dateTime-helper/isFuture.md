---
title: isFuture
description: Checks if a given date is in the future.
---

# isFuture()

> **isFuture**(`date`): `boolean`

Defined in: [utils/date.ts:706](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/utils/date.ts#L706)

Checks if a given date is in the future.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the future, false otherwise.

## Example

```ts
const result = isFuture(new Date('2100-01-01')); // true
```
