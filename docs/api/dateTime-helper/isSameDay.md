# Function: isSameDay()

> **isSameDay**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:244](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/date.ts#L244)

Checks if two dates are the same day.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are the same day, false otherwise.

## Example

```ts
const result = isSameDay(new Date('2024-01-15'), new Date('2024-01-15')); // true
```
