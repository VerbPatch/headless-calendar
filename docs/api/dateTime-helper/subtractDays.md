# Function: subtractDays()

> **subtractDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:474](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/date.ts#L474)

Subtracts a specified number of days from a date.

## Parameters

### date

`Date`

The original date.

### days

`number`

The number of days to subtract.

## Returns

`Date`

- The new date.

## See

[addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const newDate = subtractDays(new Date('2024-01-15'), 5); // 2024-01-10
```
