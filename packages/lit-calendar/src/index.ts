import { ReactiveController, ReactiveControllerHost } from 'lit';
import { useCalendar as createCalendar, CalendarOptions, CalendarInstance } from '@verbpatch/headless-calendar';
export * from "@verbpatch/headless-calendar";

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
    this.updateCalendarState();
  }

  private updateCalendarState(): void {
    this._calendar = createCalendar({
      ...this.options,
      onEvent: (event) => {
        this.updateCalendarState();
        this.options?.onEvent?.(event);
      },
      onDateChange: (date) => {
        this.updateCalendarState();
        this.options?.onDateChange?.(date);
      },
      onViewChange: (view) => {
        this.updateCalendarState();
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