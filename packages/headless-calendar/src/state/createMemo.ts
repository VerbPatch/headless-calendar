import type { DependencyList, MemoCache } from "./types";
import { haveDepsChanged } from "./util";

/**
 * @description A cache for storing memoized values.
 */
export const memoCache = new Map<string | number, MemoCache<any>>();

/**
 * @description Creates a memoized value that is recomputed only when its dependencies change.
 * @param factory - The function that computes the value.
 * @param deps - The dependency list for the memoized value.
 * @param memoId - A unique identifier for the memoized value.
 * @returns The memoized value.
 * @example
 * ```jsx
 * const memoizedValue = createMemo(() => {
 *   // Expensive calculation
 *   return value * 2;
 * }, [value], 'my-memo');
 * ```
 */
export function createMemo<T>(factory: () => T, deps: DependencyList, memoId: string | number): T {

    const cached = memoCache.get(memoId) as MemoCache<T> | undefined;

    if (!cached || haveDepsChanged(cached.deps, deps)) {
        const value = factory();
        memoCache.set(memoId, { value, deps });
        return value;
    }

    return cached.value;
}