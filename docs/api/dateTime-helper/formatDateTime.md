---
title: Format Date and Time
description: Formats a date and time object into a string based on the specified format, locale, and timezone.
---

# Function: formatDateTime()

> **formatDateTime**(`date`, `options?`): `string`

Defined in: [utils/date.ts:125](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L125)

Formats a date and time object into a string based on the specified format, locale, and timezone.

## Parameters

### date

`Date`

The date object to format.

### options?

Formatting options.

#### format?

`string`

The format string (e.g., "yyyy-MM-dd HH:mm:ss").

#### locale?

`string`

The locale to use for formatting.

#### timeZone?

`string`

The timezone to use for formatting.

## Returns

`string`

- The formatted date and time string.

## Example

```ts
formatDateTime(new Date(), { format: "yyyy-MM-dd HH:mm:ss", locale: "en-US", timeZone: "America/New_York" });
```
