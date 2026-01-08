---
title: CalendarUtils
description: A collection of utility functions for date manipulation and formatting, bound to the calendar's locale and timezone.
---

# CalendarUtils

Defined in: [types/calendar.ts:141](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L141)

## Properties

### addDays()

> **addDays**: (`date`, `days`) => `Date`

Defined in: [types/calendar.ts:196](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L196)

**`Function`**

Adds a specified number of days to a date.

#### Parameters

##### date

`Date`

The original date.

##### days

`number`

The number of days to add (can be negative).

#### Returns

`Date`

- The new date.

***

### addMonths()

> **addMonths**: (`date`, `months`) => `Date`

Defined in: [types/calendar.ts:212](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L212)

**`Function`**

Adds a specified number of months to a date.

#### Parameters

##### date

`Date`

The original date.

##### months

`number`

The number of months to add (can be negative).

#### Returns

`Date`

- The new date.

***

### addWeeks()

> **addWeeks**: (`date`, `weeks`) => `Date`

Defined in: [types/calendar.ts:204](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L204)

**`Function`**

Adds a specified number of weeks to a date.

#### Parameters

##### date

`Date`

The original date.

##### weeks

`number`

The number of weeks to add (can be negative).

#### Returns

`Date`

- The new date.

***

### convertToTimeZone()

> **convertToTimeZone**: (`date`, `fromTimeZone`, `toTimeZone`) => `Date`

Defined in: [types/calendar.ts:277](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L277)

**`Function`**

Converts a date from one timezone to another.

#### Parameters

##### date

`Date`

The date to convert.

##### fromTimeZone

`string`

The original timezone of the date.

##### toTimeZone

`string`

The target timezone.

#### Returns

`Date`

- The converted date object.

***

### dateTimeInBetween()

> **dateTimeInBetween**: (`between`, `startDateTime`, `endDateTime`) => `boolean`

Defined in: [types/calendar.ts:251](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L251)

**`Function`**

Checks if a given date and time falls within a specified range.

#### Parameters

##### between

`Date`

The date to check.

##### startDateTime

`Date`

The start of the range.

##### endDateTime

`Date`

The end of the range.

#### Returns

`boolean`

- True if the date is within the range, false otherwise.

***

### daysofWeek()

> **daysofWeek**: (`format?`, `locale?`) => `string`[]

Defined in: [types/calendar.ts:258](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L258)

**`Function`**

Returns an array of localized day names for the week, starting from the specified `startOfWeek`.

#### Parameters

##### format?

The format of the weekday names ('short' for 'Mon', 'long' for 'Monday').

`"long"` | `"short"` | `"narrow"`

##### locale?

`string`

#### Returns

`string`[]

- An array of localized weekday names.

***

### formatDate()

> **formatDate**: (`date`, `format?`) => `string`

Defined in: [types/calendar.ts:149](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L149)

**`Function`**

Formats a date object into a string based on the specified format, locale, and timezone.

#### Parameters

##### date

`Date`

The date object to format.

##### format?

`string`

The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").

#### Returns

`string`

- The formatted date string.

***

### formatDateInTimeZone()

> **formatDateInTimeZone**: (`date`, `locale?`, `timeZone?`, `options?`) => `string`

Defined in: [types/calendar.ts:268](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L268)

**`Function`**

Formats a date into a string according to the specified locale and timezone.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### options?

`DateTimeFormatOptions`

Additional formatting options.

#### Returns

`string`

- The formatted date string.

***

### formatDateTime()

> **formatDateTime**: (`date`, `format?`) => `string`

Defined in: [types/calendar.ts:157](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L157)

**`Function`**

Formats a date and time object into a string based on the specified format, locale, and timezone.

#### Parameters

##### date

`Date`

The date object to format.

##### format?

`string`

The format string (e.g., "yyyy-MM-dd HH:mm:ss").

#### Returns

`string`

- The formatted date and time string.

***

### formatLocalizedDate()

> **formatLocalizedDate**: (`date`, `locale?`, `timeZone?`, `options?`) => `string`

Defined in: [types/calendar.ts:287](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L287)

**`Function`**

Formats a date into a localized date string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### options?

`DateTimeFormatOptions`

Additional formatting options.

#### Returns

`string`

- The localized date string.

***

### formatLocalizedMonth()

> **formatLocalizedMonth**: (`date`, `locale?`, `timeZone?`) => `string`

Defined in: [types/calendar.ts:301](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L301)

**`Function`**

Formats a date into a localized month string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

#### Returns

`string`

- The localized month string.

***

### formatLocalizedTime()

> **formatLocalizedTime**: (`date`, `locale?`, `timeZone?`, `hour12?`) => `string`

Defined in: [types/calendar.ts:330](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L330)

**`Function`**

Formats a date into a localized time string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### hour12?

`boolean`

Whether to use 12-hour format.

#### Returns

`string`

- The localized time string.

***

### formatLocalizedWeekday()

> **formatLocalizedWeekday**: (`date`, `locale?`, `timeZone?`, `format?`) => `string`

Defined in: [types/calendar.ts:315](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L315)

**`Function`**

Formats a date into a localized weekday string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### format?

The format of the weekday (e.g., 'short', 'long').

`"long"` | `"short"` | `"narrow"`

#### Returns

`string`

- The localized weekday string.

***

### getEndOfMonth()

> **getEndOfMonth**: (`date`) => `Date`

Defined in: [types/calendar.ts:242](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L242)

**`Function`**

Gets the end of the month for a given date.

#### Parameters

##### date

`Date`

The date.

#### Returns

`Date`

- The end of the month.

***

### getEndOfWeek()

> **getEndOfWeek**: (`date`, `startOfWeek?`) => `Date`

Defined in: [types/calendar.ts:228](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L228)

**`Function`**

Gets the end of the week for a given date.

#### Parameters

##### date

`Date`

The date.

##### startOfWeek?

`number`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

#### Returns

`Date`

- The end of the week.

***

### getStartOfMonth()

> **getStartOfMonth**: (`date`) => `Date`

Defined in: [types/calendar.ts:235](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L235)

**`Function`**

Gets the start of the month for a given date.

#### Parameters

##### date

`Date`

The date.

#### Returns

`Date`

- The start of the month.

***

### getStartOfWeek()

> **getStartOfWeek**: (`date`, `startOfWeek?`) => `Date`

Defined in: [types/calendar.ts:220](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L220)

**`Function`**

Gets the start of the week for a given date.

#### Parameters

##### date

`Date`

The date.

##### startOfWeek?

`number`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

#### Returns

`Date`

- The start of the week.

***

### isSameDay()

> **isSameDay**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:172](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L172)

**`Function`**

Checks if two dates are the same day.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are the same day, false otherwise.

***

### isSameMonth()

> **isSameMonth**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:188](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L188)

**`Function`**

Checks if two dates are in the same month.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are in the same month, false otherwise.

***

### isSameWeek()

> **isSameWeek**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:180](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L180)

**`Function`**

Checks if two dates are in the same week.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are in the same week, false otherwise.

***

### parseDate()

> **parseDate**: (`dateString`) => `Date`

Defined in: [types/calendar.ts:164](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/types/calendar.ts#L164)

**`Function`**

Parses a date string into a Date object.

#### Parameters

##### dateString

`string`

The date string to parse.

#### Returns

`Date`

- The parsed Date object.
