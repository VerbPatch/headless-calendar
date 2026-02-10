import { describe, it, expect } from 'vitest';
import * as index from '../src/index';

describe('Library Index', () => {
  it('should export all hooks and utils', () => {
    expect(index.useCalendar).toBeDefined();
    expect(index.useEvents).toBeDefined();
    expect(index.useNavigation).toBeDefined();
    expect(index.useDragDrop).toBeDefined();
    expect(index.addDays).toBeDefined();
    expect(index.getTimeSlots).toBeDefined();
  });
});
