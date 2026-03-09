import { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  useCalendar as createCalendar,
  CalendarOptions,
  CalendarInstance,
  CalendarEvent,
  ViewType,
  disposeCalendar,
  generateId,
} from '@verbpatch/headless-calendar';
export * from '@verbpatch/headless-calendar';

export class CalendarController implements ReactiveController {
  private host: ReactiveControllerHost;
  private options: CalendarOptions;
  private _calendar!: CalendarInstance;
  private calendarId: string;

  public get calendar(): CalendarInstance {
    return this._calendar;
  }

  constructor(host: ReactiveControllerHost, options: CalendarOptions) {
    this.host = host;
    this.options = options;
    this.calendarId = options.calendarId ?? `lit-cal-${generateId()}`;
    host.addController(this);
    this.refreshCalendar();
  }

  private refreshCalendar(): void {
    this._calendar = createCalendar({
      ...this.options,
      calendarId: this.calendarId,
      onEvent: (event: CalendarEvent[]) => {
        this.refreshCalendar();
        this.options?.onEvent?.(event);
      },
      onDateChange: (date: Date) => {
        this.refreshCalendar();
        this.options?.onDateChange?.(date);
      },
      onViewChange: (view: ViewType) => {
        this.refreshCalendar();
        this.options?.onViewChange?.(view);
      },
    });

    this.host.requestUpdate();
  }

  hostConnected() {
    // Connected
  }

  hostDisconnected() {
    disposeCalendar(this.calendarId);
  }
}

export function useCalendar(host: ReactiveControllerHost, options: CalendarOptions) {
  return new CalendarController(host, options);
}
