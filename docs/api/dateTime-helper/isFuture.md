---
title: Is Future
description: Checks if a given date is in the future.
---

# Function: isFuture()

> **isFuture**(`date`): `boolean`

Defined in: [utils/date.ts:619](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L619)

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
