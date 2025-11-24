# Function: isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:537](https://github.com/VerbPatch/headless-calendar/blob/9a730b39418dd9b987039719025c6e01611f225e/packages/headless-calendar/src/utils/date.ts#L537)

Checks if a given date is today.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is today, false otherwise.

## See

[isSameDay](/calendar/docs/api/dateTime-helper/isSameDay)

## Example

```ts
const result = isToday(new Date()); // true
```
