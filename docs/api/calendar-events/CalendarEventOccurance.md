---
title: Calendar Event Occurance
description: Represents a calendar event occurance like when to repeat and on which days/weeks/months and between dates.
---

# Interface: CalendarEventOccurance

Defined in: [types/events.ts:198](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L198)

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

### count?

> `optional` **count**: `number`

Defined in: [types/events.ts:245](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L245)

The number of occurrences before the recurrence stops.
Mutually exclusive with the `end` property.

***

### day?

> `optional` **day**: `number`

Defined in: [types/events.ts:224](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L224)

The day of the month for monthly or yearly recurrence.
Positive values: 1-31 (1st to 31st day).
Negative values: -1 to -31 (last day to 31st-to-last day).
Cannot be 0.
Mutually exclusive with the `weekDays` + `week` combination.

***

### end?

> `optional` **end**: `Date`

Defined in: [types/events.ts:251](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L251)

The end date for the recurrence (must be after the event's end date).
Mutually exclusive with the `count` property.

***

### every

> **every**: `number`

Defined in: [types/events.ts:207](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L207)

The interval for the recurrence (e.g., every 2 weeks, every 3 months).

***

### month?

> `optional` **month**: `number`

Defined in: [types/events.ts:239](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L239)

The month of the year for yearly recurrence (required for yearly).
0 = January, 1 = February, ..., 11 = December.

***

### repeat

> **repeat**: `"yearly"` \| `"monthly"` \| `"weekly"` \| `"daily"`

Defined in: [types/events.ts:202](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L202)

The type of recurrence pattern.

***

### week?

> `optional` **week**: `number`

Defined in: [types/events.ts:233](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L233)

The week of the month for monthly or yearly recurrence.
Positive values: 1-4 (1st to 4th week).
Negative values: -1 (last week).
Cannot be 0.
Must be used with the `weekDays` property.

***

### weekDays?

> `optional` **weekDays**: `number`[]

Defined in: [types/events.ts:215](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/types/events.ts#L215)

The days of the week for weekly, monthly, or yearly recurrence.
0 = Sunday, 1 = Monday, ..., 6 = Saturday.
Required for weekly recurrence.
Optional for monthly/yearly when used with the `week` property.
