---
title: subtractWeeks
description: Subtracts a specified number of weeks from a date.
---

# subtractWeeks()

> **subtractWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:609](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L609)

Subtracts a specified number of weeks from a date.

## Parameters

### date

`Date`

The original date.

### weeks

`number`

The number of weeks to subtract.

## Returns

`Date`

- The new date.

## See

[addWeeks](/calendar/docs/api/dateTime-helper/addWeeks)

## Example

```ts
const newDate = subtractWeeks(new Date('2024-01-15'), 2); // 2024-01-01
```
