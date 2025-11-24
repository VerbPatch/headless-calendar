# Function: getEndOfDay()

> **getEndOfDay**(`date`): `Date`

Defined in: [utils/date.ts:375](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/utils/date.ts#L375)

Gets the end of the day for a given date (23:59:59:999).

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the day.

## Example

```ts
const end = getEndOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T23:59:59.999
```
