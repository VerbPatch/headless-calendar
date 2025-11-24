import { CalendarEvent, DraggedEvent, UseDragDropOptions, UseDragDropReturn } from '../types/events';
import { DropTarget } from '../types/calendar';
import { createCallback, createState } from '../state';

/**
 * A hook for managing drag and drop functionality for calendar events.
 * @param {UseDragDropOptions} options - Configuration options for drag and drop.
 * @returns {UseDragDropReturn} - An object containing state and functions for drag and drop.
 * @see {@link UseDragDropOptions}
 * @see {@link UseDragDropReturn}
 * @example
 * ```typescript
 * const { draggedEvent, getDragProps, getDropProps } = useDragDrop({
 *   onEventMove: (eventId, newStart, newEnd) => {
 *     console.log(`Event ${eventId} moved to ${newStart} - ${newEnd}`);
 *   },
 * });
 *
 * // In your component:
 * <div {...getDragProps(event)}>
 *   {event.title}
 * </div>
 *
 * <div {...getDropProps(date, time)}>
 *   // Drop target
 * </div>
 * ```
 * @group hooks
 * @title Drag and Drop Events Hook
 * @description A hook for managing drag and drop functionality for calendar events.
 */
export const useDragDrop = (options: UseDragDropOptions = {}): UseDragDropReturn => {
  const { onEventMove, onDragStart, onDragEnd, onDrop } = options;

  const [getDraggedEvent, setDraggedEvent] = createState<DraggedEvent | null>(null, 'dragged-event');

  /**
   * Initiates a drag operation for a calendar event.
   * @param {CalendarEvent} event - The event to be dragged.
   * @param {Record<string, any>} [dragData={}] - Additional data to associate with the drag operation.
   * @see {@link CalendarEvent}
   */
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

  /**
   * Ends the current drag operation and resets the dragged event state.
   */
  const endDrag = createCallback((): void => {
    const _evnt = getDraggedEvent()?.event;
    if (_evnt) {
      onDragEnd?.(_evnt);
    }
    setDraggedEvent(null);
  },
    [getDraggedEvent, onDragEnd],
    'drag-end');

  /**
   * Handles the drop of a dragged event onto a target, calculating the new start and end times and invoking callbacks.
   * @param {DropTarget} dropTarget - The target where the event was dropped.
   * @see {@link DropTarget}
   */
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

  /**
   * Returns props to be spread onto a draggable event element.
   * @param {CalendarEvent} event - The calendar event to get drag props for.
   * @returns {{ draggable: boolean; onDragStart: (e: DragEvent) => void; onDragEnd: (e: DragEvent) => void; }} - Draggable props.
   * @see {@link CalendarEvent}
   */
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

  /**
   * Returns props to be spread onto a drop target element.
   * @param {Date} date - The date of the drop target.
   * @param {string} [time] - The time of the drop target (e.g., "09:00").
   * @returns {{ onDragOver: (e: DragEvent) => void; onDrop: (e: DragEvent) => void; }} - Droppable props.
   */
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