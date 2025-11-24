# Function: getEndOfWeek()

> **getEndOfWeek**(`date`, `startOfWeek?`): `Date`

Defined in: [utils/date.ts:316](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/utils/date.ts#L316)

Gets the end of the week for a given date.

## Parameters

### date

`Date`

The date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`

- The end of the week.

## See

[getStartOfWeek](/calendar/docs/api/dateTime-helper/getStartOfWeek)

## Example

```ts
const end = getEndOfWeek(new Date('2024-01-15'), 1); // Sunday, 2024-01-21
```
