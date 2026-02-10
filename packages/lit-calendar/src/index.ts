import { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  useCalendar as createCalendar,
  CalendarOptions,
  CalendarInstance,
  CalendarEvent,
  ViewType,
} from '@verbpatch/headless-calendar';
export * from '@verbpatch/headless-calendar';

export class CalendarController implements ReactiveController {
  private host: ReactiveControllerHost;
  private options: CalendarOptions;
  private _calendar!: CalendarInstance;

  public get calendar(): CalendarInstance {
    return this._calendar;
  }

  constructor(host: ReactiveControllerHost, options: CalendarOptions) {
    this.host = host;
    this.options = options;
    host.addController(this);
    this.refreshCalendar();
  }

  private refreshCalendar(): void {
    this._calendar = createCalendar({
      ...this.options,
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
    // Disconnected
  }
}

export function useCalendar(host: ReactiveControllerHost, options: CalendarOptions) {
  return new CalendarController(host, options);
}
