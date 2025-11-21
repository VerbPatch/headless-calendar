# Function: isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:579](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/date.ts#L579)

Checks if a given date falls on a weekend (Saturday or Sunday).

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is a weekend, false otherwise.

## Example

```ts
const result = isWeekend(new Date('2024-01-20')); // true (Saturday)
```
