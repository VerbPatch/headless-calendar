---
title: CalendarEventOccurance
description: |-
  Represents a calendar event occurance like when to repeat and on which days/weeks/months and between dates.
  Contains both simplified properties and full RFC 5545 compliant properties.
---

# CalendarEventOccurance

Defined in: [types/events.ts:225](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L225)

## Examples

1. Repeat every day until end of time
```tsx
recurring: {
    repeat: "daily",
    every: 1
}
```

2. Repeat every day until end date
```tsx
recurring: {
    repeat: "daily",
    every: 1,
    end: new Date(2025, 6, 1) // July 1, 2025 (month is 0-indexed)
}
```

3. Repeat every day until count completes
```tsx
recurring: {
    repeat: "daily",
    every: 1,
    count: 5 // Repeats 5 times and then stops
}
```

4. Repeat every week on Monday & Friday until end of time
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [1, 5], // Monday and Friday
    every: 1
}
```

5. Repeat every 2 weeks on Tuesday for 3 occurrences
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [2], // Tuesday
    every: 2,
    count: 3 // Repeats 3 times and then stops
}
```

6. Repeat every week on Sunday until end date
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [0], // Sunday
    every: 1,
    end: new Date(2025, 6, 1) // July 1, 2025
}
```

7. Repeat every month on the 5th day until end of time
```tsx
recurring: {
    repeat: "monthly",
    every: 1,
    day: 5
}
```

8. Repeat every month on the last day for 4 times
```tsx
recurring: {
    repeat: "monthly",
    every: 1,
    day: -1, // Last day of the month
    count: 4
}
```

9. Repeat every month on the last Saturday until end of time
```tsx
recurring: {
    repeat: "monthly",
    weekDays: [6], // Saturday
    every: 1,
    week: -1 // Last week of the month
}
```

10. Repeat every 2 months on the 2nd Saturday until end date
```tsx
recurring: {
    repeat: "monthly",
    weekDays: [6], // Saturday
    every: 2,
    week: 2, // Second week of the month
    end: new Date(2027, 11, 31) // December 31, 2027
}
```

11. Repeat every year on April 1st until end of time
```tsx
recurring: {
    repeat: "yearly",
    day: 1,
    month: 3, // April (0-indexed: 0=Jan, 1=Feb, 2=Mar, 3=Apr)
    every: 1
}
```

12. Repeat every year on the last day of February until end of time
```tsx
recurring: {
    repeat: "yearly",
    day: -1, // Last day of the month
    month: 1, // February (0-indexed)
    every: 1
}
```

13. Repeat every year on the last Friday of March until end of time
```tsx
recurring: {
    repeat: "yearly",
    month: 2, // March (0-indexed)
    weekDays: [5], // Friday
    every: 1,
    week: -1 // Last week of the month
}
```

## Properties

### byDay?

> `optional` **byDay**: (`string` \| `number`)[]

Defined in: [types/events.ts:306](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L306)

Alias for weekDays.
Corresponds to RFC 5545 BYDAY.

***

### byMonth?

> `optional` **byMonth**: `number`[]

Defined in: [types/events.ts:312](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L312)

Alias for month.
Corresponds to RFC 5545 BYMONTH.

***

### byMonthDay?

> `optional` **byMonthDay**: `number`[]

Defined in: [types/events.ts:318](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L318)

Alias for day.
Corresponds to RFC 5545 BYMONTHDAY.

***

### bySetPos?

> `optional` **bySetPos**: `number`[]

Defined in: [types/events.ts:300](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L300)

The position of the occurrence in the set of events.
Corresponds to RFC 5545 BYSETPOS.

***

### byWeekNo?

> `optional` **byWeekNo**: `number`[]

Defined in: [types/events.ts:294](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L294)

The week number of the year (1 to 53 or -53 to -1).
Corresponds to RFC 5545 BYWEEKNO.

***

### byYearDay?

> `optional` **byYearDay**: `number`[]

Defined in: [types/events.ts:288](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L288)

The day of the year (1 to 366 or -366 to -1).
Corresponds to RFC 5545 BYYEARDAY.

***

### count?

> `optional` **count**: `number`

Defined in: [types/events.ts:270](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L270)

The number of occurrences before the recurrence stops.
Corresponds to RFC 5545 COUNT.

***

### day?

> `optional` **day**: `number` \| `number`[]

Defined in: [types/events.ts:250](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L250)

The day of the month.
Corresponds to RFC 5545 BYMONTHDAY.

***

### end?

> `optional` **end**: `Date`

Defined in: [types/events.ts:276](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L276)

The end date for the recurrence.
Corresponds to RFC 5545 UNTIL.

***

### every

> **every**: `number`

Defined in: [types/events.ts:237](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L237)

The interval for the recurrence.
Corresponds to RFC 5545 INTERVAL.

#### Default

```ts
1
```

***

### month?

> `optional` **month**: `number` \| `number`[]

Defined in: [types/events.ts:264](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L264)

The month of the year.
0-11 for compatibility, or 1-12 for RFC 5545 strictness (logic should handle both).
Corresponds to RFC 5545 BYMONTH.

***

### repeat

> **repeat**: `"yearly"` \| `"monthly"` \| `"weekly"` \| `"daily"` \| `"hourly"` \| `"minutely"` \| `"secondly"`

Defined in: [types/events.ts:230](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L230)

The type of recurrence pattern.
Corresponds to RFC 5545 FREQ.

***

### week?

> `optional` **week**: `number` \| `number`[]

Defined in: [types/events.ts:257](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L257)

The week number within the month or year.
Used with weekDays for complex patterns.
Can also be mapped to RFC 5545 BYSETPOS in some contexts or BYWEEKNO in yearly.

***

### weekDays?

> `optional` **weekDays**: (`string` \| `number`)[]

Defined in: [types/events.ts:244](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L244)

The days of the week for recurrence.
Supports both 0-6 integers and RFC 5545 string format (e.g., 'SU', '1MO', '-1FR').
Corresponds to RFC 5545 BYDAY.

***

### wkst?

> `optional` **wkst**: `"SU"` \| `"MO"` \| `"TU"` \| `"WE"` \| `"TH"` \| `"FR"` \| `"SA"`

Defined in: [types/events.ts:282](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/events.ts#L282)

The day that the work week starts.
Corresponds to RFC 5545 WKST.
