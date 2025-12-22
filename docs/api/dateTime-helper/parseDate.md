---
title: Parse Date
description: Parses a date string into a Date object.
---

# parseDate()

> **parseDate**(`dateString`): `Date`

Defined in: [utils/date.ts:230](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L230)

Parses a date string into a Date object.

## Parameters

### dateString

`string`

The date string to parse.

## Returns

`Date`

- The parsed Date object.

## Example

```ts
const date = parseDate('2024-01-15T12:00:00.000Z');
```
