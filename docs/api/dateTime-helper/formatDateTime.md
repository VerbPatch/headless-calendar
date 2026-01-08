---
title: formatDateTime
description: Formats a date and time object into a string based on the specified format, locale, and timezone.
---

# formatDateTime()

> **formatDateTime**(`date`, `options?`): `string`

Defined in: [utils/date.ts:145](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L145)

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
formatDateTime(new Date(), { 
 format: "yyyy-MM-dd HH:mm:ss",
 locale: "en-US", 
 timeZone: "America/New_York" 
});
```
