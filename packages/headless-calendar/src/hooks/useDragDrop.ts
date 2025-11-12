import { CalendarEvent, UseDragDropOptions, UseDragDropReturn } from '../types/events';
import { DraggedEvent, DropTarget } from '../types/calendar';
import { createCallback, createState } from '../state';

export const useDragDrop = (options: UseDragDropOptions = {}): UseDragDropReturn => {
  const { onEventMove, onDragStart, onDragEnd, onDrop } = options;

  const [getDraggedEvent, setDraggedEvent] = createState<DraggedEvent | null>(null, 'dragged-event');

  const startDrag = createCallback((event: CalendarEvent, dragData: Record<string, any> = {}): void => {
    setDraggedEvent({
      event,
      type: 'event',
      ...dragData
    });
    onDragStart?.(event);
  },
    [onDragStart],
    'drag-start');

  const endDrag = createCallback((): void => {
    const _evnt = getDraggedEvent()?.event;
    if (_evnt) {
      onDragEnd?.(_evnt);
    }
    setDraggedEvent(null);
  },
    [getDraggedEvent, onDragEnd],
    'drag-end');

  const handleDrop = createCallback((dropTarget: DropTarget): void => {
    const event = getDraggedEvent()?.event;
    if (!getDraggedEvent() || !event) return;

    const eventStart = event.start;
    const eventEnd = event.end;
    const duration = eventEnd.getTime() - eventStart.getTime();

    let newStart: Date, newEnd: Date;

    if (dropTarget.date) {
      if (dropTarget.time) {
        // Drop to specific time slot
        newStart = new Date(dropTarget.date);
        const [hours, minutes] = dropTarget.time.split(':');
        newStart.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        newEnd = new Date(newStart.getTime() + duration);
      } else {
        // Drop to date (all day or preserve time)
        newStart = new Date(dropTarget.date);
        if (event.allDay) {
          newStart.setHours(0, 0, 0, 0);
          newEnd = new Date(newStart.getTime() + duration);
        } else {
          newStart.setHours(eventStart.getHours(), eventStart.getMinutes());
          newEnd = new Date(newStart.getTime() + duration);
        }
      }

      onEventMove?.(event.id as string, newStart, newEnd);
      onDrop?.(event, dropTarget);
    }

    endDrag();
  },
    [getDraggedEvent, onEventMove, onDrop, endDrag],
    'handle-drag');

  const getDragProps = createCallback((event: CalendarEvent) => ({
    draggable: true,
    onDragStart: (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', event.id as string);
      }
      startDrag(event);
    },
    onDragEnd: (e: DragEvent) => {
      //eslint-disable-next-line
      console.log(e)
      endDrag();
    }
  }),
    [startDrag, endDrag],
    'get-drag-props');

  const getDropProps = createCallback((date: Date, time?: string) => ({
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer)
        e.dataTransfer.dropEffect = 'move';
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      handleDrop({ date, time });
    }
  }),
    [handleDrop],
    'get-drop-props');

  return {
    draggedEvent: getDraggedEvent(),
    isDragging: getDraggedEvent !== null,
    startDrag,
    endDrag,
    handleDrop,
    getDragProps,
    getDropProps
  };
};