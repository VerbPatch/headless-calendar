import { ReactiveController, ReactiveControllerHost } from 'lit';
import { useCalendar as createCalendar, CalendarOptions, CalendarInstance } from '@verbpatch/headless-calendar';
export * from "@verbpatch/headless-calendar";

export class CalendarController implements ReactiveController {
  private host: ReactiveControllerHost;
  public calendar: CalendarInstance;

  constructor(host: ReactiveControllerHost, options: CalendarOptions) {
    (this.host = host).addController(this);
    this.calendar = createCalendar({
      ...options,
      onEvent: (event) => {
        this.host.requestUpdate();
        options?.onEvent?.(event);
      },
      onDateChange: (date) => {
        this.host.requestUpdate();
        options?.onDateChange?.(date);
      },
      onViewChange: (view) => {
        this.host.requestUpdate();
        options?.onViewChange?.(view);
      },
    });
  }

  hostConnected() {
    // Connected
  }

  hostDisconnected() {
    // Disconnected
  }
}

export function useCalendar(host: ReactiveControllerHost, options: CalendarOptions) {
  return new CalendarController(host, options).calendar;
}