import { describe, it, expect } from 'vitest';
import * as utils from '../../src/utils/index';

describe('Utils Index', () => {
  it('should export all utils', () => {
    expect(utils.addDays).toBeDefined();
    expect(utils.getTimeSlots).toBeDefined();
    expect(utils.validateEvent).toBeDefined();
  });
});
