import type { CallbackCache, DependencyList } from './types';
import { haveDepsChanged } from './util';

/**
 * A cache for storing callbacks.
 */
export const callbackCache = new Map<string | number, CallbackCache<any>>();

/**
 * Creates a memoized callback that only changes if its dependencies have changed.
 * @param callback - The callback function to memoize.
 * @param deps - The dependency list for the callback.
 * @param callbackId - A unique identifier for the callback.
 * @returns The memoized callback function.
 * @example
 * ```typescript
 * const handleClick = createCallback(() => {
 *   console.log('Button clicked');
 * }, [], 'my-click-handler');
 * ```
 */
export function createCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  callbackId: string | number,
): T {
  const cached = callbackCache.get(callbackId) as CallbackCache<T> | undefined;

  if (!cached || haveDepsChanged(cached.deps, deps)) {
    callbackCache.set(callbackId, { callback, deps });
    return callback;
  }

  return cached.callback;
}
