# Function: getStartOfWeek()

> **getStartOfWeek**(`date`, `startOfWeek?`): `Date`

Defined in: [utils/date.ts:295](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/date.ts#L295)

Gets the start of the week for a given date.

## Parameters

### date

`Date`

The date.

### startOfWeek?

`number` = `0`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

## Returns

`Date`

- The start of the week.

## Example

```ts
const start = getStartOfWeek(new Date('2024-01-15'), 1); // Monday, 2024-01-15
```
