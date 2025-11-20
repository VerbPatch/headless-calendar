import { callbackCache } from "./createCallback";
import { effectCache } from "./createEffect";
import { memoCache } from "./createMemo";
import { stateCache } from "./createState";

export * from "./createCallback";
export * from "./createEffect";
export * from "./createMemo";
export * from "./createState";

/**
 * Clears all caches for state, effects, callbacks, and memos.
 * This is useful for testing and for resetting the calendar state completely.
 */
export function clearAllCaches(): void {
  stateCache.clear();
  effectCache.clear();
  callbackCache.clear();
  memoCache.clear();
}
