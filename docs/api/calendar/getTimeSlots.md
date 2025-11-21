# Function: getTimeSlots()

> **getTimeSlots**(`startHour?`, `endHour?`, `interval?`): [`TimeSlot`](https://verbpatch.com/calendar/docs/api/calendar/TimeSlot)[]

Defined in: [utils/calendar.ts:74](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/calendar.ts#L74)

Generates an array of time slots for a given range of hours and interval.

## Parameters

### startHour?

`number` = `0`

The starting hour (0-23).

### endHour?

`number` = `24`

The ending hour (0-24).

### interval?

`number` = `60`

The interval in minutes between time slots.

## Returns

[`TimeSlot`](https://verbpatch.com/calendar/docs/api/calendar/TimeSlot)[]

- An array of TimeSlot objects.

## See

[TimeSlot](https://verbpatch.com/calendar/docs/api/calendar/TimeSlot)

## Example

```ts
const slots = getTimeSlots(9, 17, 30);
// slots will be an array of time slots from 9:00 to 16:30 with a 30-minute interval
```
