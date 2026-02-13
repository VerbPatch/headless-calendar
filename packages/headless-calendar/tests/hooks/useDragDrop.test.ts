import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDragDrop } from '../../src/hooks/useDragDrop';
import { clearAllCaches } from '../../src/state';
import { CalendarEvent } from '../../src/types/events';

describe('useDragDrop hook', () => {
  const event: CalendarEvent = {
    id: '1',
    title: 'Event',
    start: new Date(2024, 0, 15, 10),
    end: new Date(2024, 0, 15, 11),
  };

  beforeEach(() => {
    clearAllCaches();
  });

  const getDnd = (opts: any = {}) => useDragDrop(opts);

  it('should start drag', () => {
    const dnd = getDnd();
    dnd.startDrag(event);

    const updated = getDnd();
    expect(updated.draggedEvent?.event.id).toBe('1');
  });

  it('should end drag', () => {
    const dnd = getDnd();
    dnd.startDrag(event);
    dnd.endDrag();

    const updated = getDnd();
    expect(updated.draggedEvent).toBeNull();
  });

  it('should handle drop and move event', () => {
    const spy = vi.fn();
    const dnd = getDnd({ onEventMove: spy });

    dnd.startDrag(event);
    dnd.handleDrop({ date: new Date(2024, 0, 16), time: '12:00' });

    expect(spy).toHaveBeenCalled();
    const [id, start] = spy.mock.calls[0];
    expect(id).toBe('1');
    expect(start.getDate()).toBe(16);
    expect(start.getHours()).toBe(12);
  });

  it('should handle drop with no dragged event', () => {
    const spy = vi.fn();
    const dnd = getDnd({ onEventMove: spy });
    dnd.handleDrop({ date: new Date() });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle drop without time preserving original time', () => {
    const spy = vi.fn();
    const dnd = getDnd({ onEventMove: spy });
    dnd.startDrag(event);
    dnd.handleDrop({ date: new Date(2024, 0, 16) });
    const [, start] = spy.mock.calls[0];
    expect(start.getHours()).toBe(10);
  });

  it('should handle allDay event drop', () => {
    const spy = vi.fn();
    const dnd = getDnd({ onEventMove: spy });
    const allDay = { ...event, allDay: true };

    dnd.startDrag(allDay);
    dnd.handleDrop({ date: new Date(2024, 0, 16) });

    const [, start] = spy.mock.calls[0];
    expect(start.getHours()).toBe(0);
  });

  it('should call drag lifecycle callbacks', () => {
    const startSpy = vi.fn();
    const endSpy = vi.fn();
    const dnd = getDnd({ onDragStart: startSpy, onDragEnd: endSpy });

    dnd.startDrag(event);
    expect(startSpy).toHaveBeenCalledWith(event);

    dnd.endDrag();
    expect(endSpy).toHaveBeenCalledWith(event);
  });

  it('should provide drag and drop props', () => {
    const dnd = getDnd();
    const dragProps = dnd.getDragProps(event);
    expect(dragProps.draggable).toBe(true);
    expect(typeof dragProps.onDragStart).toBe('function');

    const dragEvent = { dataTransfer: { setData: vi.fn(), effectAllowed: '' } };
    dragProps.onDragStart(dragEvent as any);
    expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '1');

    const dropProps = dnd.getDropProps(new Date());
    expect(typeof dropProps.onDragOver).toBe('function');
    expect(typeof dropProps.onDrop).toBe('function');

    const dropEvent = { preventDefault: vi.fn(), dataTransfer: { dropEffect: '' } };
    dropProps.onDragOver(dropEvent as any);
    expect(dropEvent.preventDefault).toHaveBeenCalled();

    const realDropEvent = { preventDefault: vi.fn() };
    dropProps.onDrop(realDropEvent as any);
    expect(realDropEvent.preventDefault).toHaveBeenCalled();

    dragProps.onDragEnd({} as any);
    const final = getDnd();
    expect(final.draggedEvent).toBeNull();
  });

  it('should handle missing dataTransfer in drag/drop handlers', () => {
    const dnd = getDnd();
    const dragProps = dnd.getDragProps(event);
    const dropProps = dnd.getDropProps(new Date());

    expect(() => dragProps.onDragStart({} as any)).not.toThrow();
    expect(() => dropProps.onDragOver({ preventDefault: vi.fn() } as any)).not.toThrow();
  });

  it('should not call onEventMove if dropTarget has no date', () => {
    const spy = vi.fn();
    const dnd = getDnd({ onEventMove: spy });
    dnd.startDrag(event);
    dnd.handleDrop({ time: '10:00' } as any);
    expect(spy).not.toHaveBeenCalled();
  });
});
