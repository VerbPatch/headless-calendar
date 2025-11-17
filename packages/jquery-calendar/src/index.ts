import {
  useCalendar,
  CalendarOptions,
  CalendarInstance,
  ViewType as CalendarView,
  CalendarEvent
} from "@verbpatch/headless-calendar";

export * from "@verbpatch/headless-calendar";

interface JQueryCalendarOptions extends CalendarOptions {
  onRender?: (calendar: CalendarInstance) => void;
}

interface JQueryCalendarState {
  $el: JQuery<HTMLElement>;
  options: JQueryCalendarOptions;
  calendar: CalendarInstance;
}

declare global {
  interface JQuery {
    headlessCalendar(options?: JQueryCalendarOptions | string, ...args: any[]): JQuery | any;
  }
}

(function ($) {
  'use strict';

  const PLUGIN_NAME = 'headlessCalendar';
  const DATA_KEY = 'jq.headlessCalendar';

  const defaultOptions = (): JQueryCalendarOptions => ({
    defaultView: 'month',
    defaultDate: new Date(),
    startOfWeek: 0,
    timeSlotInterval: 60,
    startHour: 0,
    endHour: 24,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language,
    initialEvents: []
  });

  function initInstance(element: HTMLElement, options: JQueryCalendarOptions) {
    const $el = $(element);
    const mergedOptions = $.extend({}, defaultOptions(), options);
    const calendar = useCalendar(mergedOptions);

    const state: JQueryCalendarState = { $el, options: mergedOptions, calendar };
    $el.data(DATA_KEY, state);

    if (mergedOptions.onRender) mergedOptions.onRender(calendar);
    $el.trigger('calendar:initialized', [calendar]);
  }

  function refreshCalendar(state: JQueryCalendarState) {
    const { options, calendar } = state;
    const newCalendar = useCalendar({
      ...options,
      defaultDate: calendar.currentDate,
      defaultView: calendar.view,
      initialEvents: calendar.events
    });
    state.calendar = newCalendar;
  }

  function updateAfter(state: JQueryCalendarState, action: () => void) {
    action();
    refreshCalendar(state);
    if (state.options.onRender) state.options.onRender(state.calendar);
  }

  const methods = {
    goToNext(state: JQueryCalendarState) {
      updateAfter(state, () => state.calendar.goToNext());
      state.$el.trigger('calendar:navigate', ['next', state.calendar.currentDate]);
    },
    goToPrevious(state: JQueryCalendarState) {
      updateAfter(state, () => state.calendar.goToPrevious());
      state.$el.trigger('calendar:navigate', ['previous', state.calendar.currentDate]);
    },
    goToToday(state: JQueryCalendarState) {
      updateAfter(state, () => state.calendar.goToToday());
      state.$el.trigger('calendar:navigate', ['today', state.calendar.currentDate]);
    },
    goToDate(state: JQueryCalendarState, date: Date) {
      updateAfter(state, () => state.calendar.goToDate(date));
      state.$el.trigger('calendar:navigate', ['date', state.calendar.currentDate]);
    },
    changeView(state: JQueryCalendarState, view: CalendarView) {
      updateAfter(state, () => state.calendar.changeView(view));
      state.$el.trigger('calendar:viewChanged', [view]);
    },
    createEvent(state: JQueryCalendarState, eventData: CalendarEvent) {
      let event: CalendarEvent;
      updateAfter(state, () => {
        event = state.calendar.createEvent(eventData);
      });
      state.$el.trigger('calendar:eventCreated', [event!]);
      return event!;
    },
    updateEvent(state: JQueryCalendarState, id: string, updates: CalendarEvent) {
      updateAfter(state, () => state.calendar.updateEvent(id, updates));
      state.$el.trigger('calendar:eventUpdated', [id, updates]);
    },
    deleteEvent(state: JQueryCalendarState, id: string) {
      updateAfter(state, () => state.calendar.deleteEvent(id));
      state.$el.trigger('calendar:eventDeleted', [id]);
    },
    moveEvent(state: JQueryCalendarState, id: string, start: Date, end?: Date) {
      updateAfter(state, () => state.calendar.moveEvent(id, start, end));
      state.$el.trigger('calendar:eventMoved', [id, start, end]);
    },
    duplicateEvent(state: JQueryCalendarState, id: string) {
      let dup: CalendarEvent | null = null;
      updateAfter(state, () => {
        dup = state.calendar.duplicateEvent(id);
      });
      if (dup) state.$el.trigger('calendar:eventDuplicated', [dup]);
      return dup;
    },
    clearAllEvents(state: JQueryCalendarState) {
      updateAfter(state, () => state.calendar.clearAllEvents());
      state.$el.trigger('calendar:eventAllCleared', []);
    },
    getEvents: (s: JQueryCalendarState) => s.calendar.events,
    getEvent: (s: JQueryCalendarState, id: string) => s.calendar.getEvent(id),
    getVisibleEvents: (s: JQueryCalendarState) => s.calendar.visibleEvents,
    getEventsForDate: (s: JQueryCalendarState, date: Date) => s.calendar.getEventsForDate(date),
    getEventsForDateRange: (s: JQueryCalendarState, a: Date, b: Date) => s.calendar.getEventsForDateRange(a, b),
    getCurrentDate: (s: JQueryCalendarState) => s.calendar.currentDate,
    getView: (s: JQueryCalendarState) => s.calendar.view,
    getCalendar: (s: JQueryCalendarState) => s.calendar,
    getMonthData: (s: JQueryCalendarState) => s.calendar.monthData,
    getWeekData: (s: JQueryCalendarState) => s.calendar.weekData,
    getDayData: (s: JQueryCalendarState) => s.calendar.dayData,
    getTimeSlots: (s: JQueryCalendarState) => s.calendar.timeSlots,
    getVisibleDates: (s: JQueryCalendarState) => s.calendar.visibleDates,
    refresh(state: JQueryCalendarState) {
      refreshCalendar(state);
      state.$el.trigger('calendar:refresh', [state.calendar]);
    },
    destroy(state: JQueryCalendarState) {
      state.$el.removeData(DATA_KEY);
      state.$el.trigger('calendar:destroyed');
    }
  };

  $.fn.headlessCalendar = function (this: JQuery, optionsOrMethod?: JQueryCalendarOptions | string, ...args: any[]): any {
    let returnValue: any = this;

    this.each(function () {
      const $el = $(this);
      let state = $el.data(DATA_KEY);

      if (!state) {
        if (typeof optionsOrMethod === 'string') {
          throw new Error(`Cannot call method '${optionsOrMethod}' before initialization.`);
        }
        initInstance(this, optionsOrMethod || {});
        return;
      }

      if (typeof optionsOrMethod === 'string') {
        const method = optionsOrMethod as keyof typeof methods;
        const fn = methods[method];
        if (!fn) throw new Error(`Method '${method}' does not exist on ${PLUGIN_NAME}`);

        const result = (fn as any)(state, ...(args as any[]));
        if (result !== undefined) {
          returnValue = result;
          return false;
        }
      }
    });

    return returnValue;
  };

})(jQuery);
