import { describe, it, expect } from 'vitest';
import * as hooks from '../../src/hooks/index';

describe('Hooks Index', () => {
  it('should export all hooks', () => {
    expect(hooks.useCalendar).toBeDefined();
    expect(hooks.useEvents).toBeDefined();
    expect(hooks.useNavigation).toBeDefined();
    expect(hooks.useDragDrop).toBeDefined();
  });
});
