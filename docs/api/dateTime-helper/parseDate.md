---
title: Parse Date
description: Parses a date string into a Date object.
---

# Function: parseDate()

> **parseDate**(`dateString`): `Date`

Defined in: [utils/date.ts:230](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L230)

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
