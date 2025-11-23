# Function: addWeeks()

> **addWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:424](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/utils/date.ts#L424)

Adds a specified number of weeks to a date.

## Parameters

### date

`Date`

The original date.

### weeks

`number`

The number of weeks to add (can be negative).

## Returns

`Date`

- The new date.

## See

[addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const newDate = addWeeks(new Date('2024-01-15'), 2); // 2024-01-29
```
