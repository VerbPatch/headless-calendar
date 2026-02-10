import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createState, subscribeToState, clearAllCaches, createMemo, createEffect } from '../../src/state/index';

describe('State Engine', () => {
  beforeEach(() => {
    clearAllCaches();
  });

  describe('createState', () => {
    it('should initialize with value', () => {
      const [getVal] = createState(10, 'test');
      expect(getVal()).toBe(10);
    });

    it('should initialize with function', () => {
      const [getVal] = createState(() => 20, 'test-fn');
      expect(getVal()).toBe(20);
    });

    it('should update value', () => {
      const [getVal, setVal] = createState(0, 'counter');
      setVal(1);
      expect(getVal()).toBe(1);
    });

    it('should update with function', () => {
      const [getVal, setVal] = createState(10, 'counter');
      setVal(prev => prev + 5);
      expect(getVal()).toBe(15);
    });

    it('should notify subscribers', () => {
      const [, setVal] = createState(0, 's');
      const spy = vi.fn();
      subscribeToState('s', spy);

      setVal(1);
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('createMemo', () => {
    it('should return initial value', () => {
      const val = createMemo(() => 'result', [], 'memo');
      expect(val).toBe('result');
    });

    it('should recompute only when deps change', () => {
      let count = 0;
      const factory = () => {
        count++;
        return 'computed';
      };

      createMemo(factory, [1], 'm1');
      createMemo(factory, [1], 'm1'); // Same dep
      expect(count).toBe(1);

      createMemo(factory, [2], 'm1'); // New dep
      expect(count).toBe(2);
    });
  });

  describe('createEffect', () => {
    it('should run effect initially', () => {
      const spy = vi.fn();
      createEffect(spy, [], 'e1');
      expect(spy).toHaveBeenCalled();
    });

    it('should rerun when deps change', () => {
      const spy = vi.fn();
      let dep = 1;

      // Vitest closure behavior: we'll simulate the calls
      createEffect(spy, [dep], 'e2');
      createEffect(spy, [dep], 'e2'); // No change
      expect(spy).toHaveBeenCalledTimes(1);

      dep = 2;
      createEffect(spy, [dep], 'e2'); // Changed
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
