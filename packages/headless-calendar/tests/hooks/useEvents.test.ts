import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useEvents } from '../../src/hooks/useEvents';
import { clearAllCaches } from '../../src/state';
import { CalendarEvent } from '../../src/types/events';

describe('useEvents hook', () => {
  const initialEvents: CalendarEvent[] = [
    { id: '1', title: 'Initial Event', start: new Date(2024, 0, 15, 10), end: new Date(2024, 0, 15, 11) }
  ];

  beforeEach(() => {
    clearAllCaches();
  });

  const getEventsManager = (opts: any = {}) => useEvents({
    calendarTimezone: 'UTC',
    initialEvents: initialEvents,
    ...opts
  });

  it('should initialize with events', () => {
    const manager = getEventsManager();
    expect(manager.events).toHaveLength(1);
    expect(manager.events[0].title).toBe('Initial Event');
  });

  it('should create event', () => {
    const manager = getEventsManager();
    const newEvent: CalendarEvent = {
      id: "1",
      title: 'New Event',
      start: new Date(2024, 0, 16, 10),
      end: new Date(2024, 0, 16, 11)
    };

    manager.createEvent(newEvent);

    const updated = getEventsManager();
    expect(updated.events).toHaveLength(2);
    expect(updated.events.some(e => e.title === 'New Event')).toBe(true);
  });

  it('should update event', () => {
    const updateSpy = vi.fn();
    const eventSpy = vi.fn();
    const manager = getEventsManager({ onEventUpdate: updateSpy, onEvent: eventSpy });
    const event = manager.getEvent('1')!;
    manager.updateEvent('1', { ...event, title: 'Updated Title' });

    const updated = getEventsManager();
    expect(updated.getEvent('1')?.title).toBe('Updated Title');
    expect(updateSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should delete event', () => {
    const manager = getEventsManager();
    manager.deleteEvent('1');

    const updated = getEventsManager();
    expect(updated.events).toHaveLength(0);
  });

  it('should duplicate event', () => {
    const spy = vi.fn();
    const manager = getEventsManager({ onEvent: spy });
    const dup = manager.duplicateEvent('1');

    expect(dup).not.toBeNull();
    expect(dup?.title).toContain('Copy');
    expect(spy).toHaveBeenCalled();

    const updated = getEventsManager();
    expect(updated.events).toHaveLength(2);
  });

  it('should move event and trigger callback', () => {
    const spy = vi.fn();
    const manager = getEventsManager({ onEvent: spy });
    const newStart = new Date(2024, 0, 20, 10);
    const newEnd = new Date(2024, 0, 20, 11);
    manager.moveEvent('1', newStart, newEnd);
    expect(spy).toHaveBeenCalled();
  });

  it('should move event without end date', () => {
    const spy = vi.fn();
    const manager = getEventsManager({ onEvent: spy });
    manager.moveEvent('1', new Date(2024, 0, 25));
    expect(spy).toHaveBeenCalled();
  });

  it('should handle duplicating non-existent event', () => {
    const manager = getEventsManager();
    expect(manager.duplicateEvent('non-existent')).toBeNull();
  });

  it('should throw error on invalid event creation', () => {
    const manager = getEventsManager();
    const invalid: any = { title: '' };
    expect(() => manager.createEvent(invalid)).toThrow();
  });

  it('should throw error on invalid event update', () => {
    const manager = getEventsManager();
    const event = manager.getEvent('1')!;
    const invalid: any = { ...event, title: '' };
    expect(() => manager.updateEvent('1', invalid)).toThrow('Invalid event update: Event title is required');
  });

  it('should handle deleting non-existent event', () => {
    const spy = vi.fn();
    const manager = getEventsManager({ onEvent: spy });
    manager.deleteEvent('non-existent');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should clear all events', () => {
    const manager = getEventsManager();
    manager.clearEvents();

    const updated = getEventsManager();
    expect(updated.events).toHaveLength(0);
  });

  it('should call callbacks', () => {
    const createSpy = vi.fn();
    const manager = getEventsManager({ onEventCreate: createSpy });

    manager.createEvent({
      id: "2",
      title: 'Event',
      start: new Date(2024, 0, 15, 12),
      end: new Date(2024, 0, 15, 13)
    });

    expect(createSpy).toHaveBeenCalled();
  });
});