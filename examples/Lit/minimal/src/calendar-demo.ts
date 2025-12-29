import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  useCalendar,
  CalendarEvent,
  generateId,
} from "@verbpatch/lit-calendar";

@customElement("calendar-demo")
export class CalendarDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
      margin: 0 auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    th,
    td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: center;
    }
    .header-controls button {
      margin: 0 4px;
      padding: 8px 12px;
      cursor: pointer;
    }
    .view-controls button {
      margin-left: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }
    .event {
      background-color: #3b82f6;
      color: white;
      padding: 2px 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      font-size: 0.8em;
      cursor: pointer;
    }
    .today {
      background-color: #e0e0e0;
      font-weight: bold;
    }
    .current-month {
      color: #000;
    }
    .other-month {
      color: #888;
    }
  `;

  @state()
  private _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    this._calendarState = useCalendar(this, {
      defaultView: "month",
      startOfWeek: 0, // 0 = Sunday, 1 = Monday
      timeSlotInterval: 30,
      initialEvents: this.initialEvents,
      onViewChange: (view) => {
        this.requestUpdate();
      },
      onDateChange: (date) => {
        this.requestUpdate();
      },
      locale: "en-IN",
      timezone: "Asia/Calcutta",
      onEvent: (events: CalendarEvent[]) => {
        this.requestUpdate();
      },
    });
  }

  private initialEvents: CalendarEvent[] = (() => {
    const _today = new Date();
    const today = new Date(
      _today.getFullYear(),
      _today.getMonth(),
      _today.getDate(),
      0,
      0,
      0
    );
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        id: generateId(),
        title: "Team Meeting",
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          16,
          0,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0
        ),
        description: "Weekly team sync",
        allDay: false,
        color: "#3b82f6",
        timezone: "Asia/Calcutta",
      },
      {
        id: generateId(),
        title: "Project Deadline",
        start: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          0,
          0,
          0
        ),
        end: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          0,
          0,
          0
        ),
        allDay: true,
        color: "#ef4444",
        timezone: "Asia/Calcutta",
      },
    ];
  })();

  private generateColor(): string {
    const randomColorValue = Math.floor(Math.random() * 16777215);
    const hexColor = randomColorValue.toString(16).padStart(6, "0");
    return `#${hexColor}`;
  }

  private handleDateClick(date: Date): void {
    const startTime = new Date(date);
    startTime.setHours(7, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(8, 0, 0, 0);

    this._calendarState.calendar.createEvent({
      id: generateId(),
      title: "New Event",
      start: startTime,
      end: endTime,
      color: this.generateColor(),
    });
  }

  private handleEventDragStart(event: CalendarEvent, e: DragEvent): void {
    this._calendarState.calendar.startDrag(event, { type: "event" });
  }

  private eventHandleDrop(e: DragEvent, date: Date, time?: string): void {
    this._calendarState.calendar.handleDrop({ date, time });
  }

  private renderMonthView() {
    const { monthData, getEventsForDate, utils } = this._calendarState.calendar;
    if (!monthData) return html``;

    return html`
      <tr>
        ${utils.daysofWeek("long").map(
      (day) => html`<td align="center">${day}</td>`
    )}
      </tr>

      ${monthData.weeks.map(
      (week, weekIndex) => html`
          <tr key=${weekIndex}>
            ${week.map((date, dayIndex) => {
        const dateEvents = getEventsForDate(date);
        const isCurrentMonth = monthData.isCurrentMonth(date);
        const isToday = monthData.isToday(date);

        return html`
                <td
                  align="center"
                  class="${isToday ? "today" : ""} ${isCurrentMonth
            ? "current-month"
            : "other-month"}"
                  @click=${() => this.handleDateClick(date)}
                  @dragover=${(e: DragEvent) => e.preventDefault()}
                  @drop=${(e: DragEvent) => this.eventHandleDrop(e, date)}
                >
                  <div>${utils.formatDate(date, "d")}</div>

                  <div>
                    ${dateEvents.slice(0, 2).map(
              (event) => html`
                        <div
                          class="event"
                          style="background-color: ${event.color}"
                          draggable="true"
                          @dragstart=${(e: DragEvent) =>
                  this.handleEventDragStart(event, e)}
                          @click=${(e: Event) => {
                  e.stopPropagation();
                }}
                        >
                          ${event.title}
                        </div>
                      `
            )}

                    ${dateEvents.length > 2
            ? html`<div>+${dateEvents.length - 2} more</div>`
            : ""}
                  </div>
                </td>
              `;
      })}
          </tr>
        `
    )}
    `;
  }

  private renderWeekView() {
    const { weekData, timeSlots, getEventsForDate, timeSlotInterval, utils } =
      this._calendarState.calendar;
    if (!weekData) return html``;

    return html`
      <div>
        <div>
          <div></div>
          ${weekData.dates.map(
      (date, index) => html`
              <div key=${index}>
                <div
                  class="font-semibold ${weekData.isToday(date)
          ? "text-blue-600"
          : ""}"
                >
                  ${utils.formatDateTime(date, "EEE")}
                </div>
                <div
                  class="text-sm ${weekData.isToday(date)
          ? "text-blue-600"
          : "text-gray-600"}"
                >
                  ${utils.formatDateTime(date, "d")}
                </div>
              </div>
            `
    )}
        </div>

        <div>
          <div>
            ${timeSlots.map(
      (slot) => html`<div data-slot=${slot.time}>${slot.label}</div>`
    )}
          </div>

          ${weekData.dates.map(
      (date, dateIndex) => html`
              <div key=${dateIndex}>
                ${timeSlots.map((slot) => {
        const slotEvents = getEventsForDate(date).filter((event) => {
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          return utils.dateTimeInBetween(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              slot.hour,
              slot.minute,
              0
            ),
            eventStart,
            eventEnd
          );
        });
        return html`
                    <div
                      data-slot=${slot.time}
                      @dragover=${(e: DragEvent) => e.preventDefault()}
                      @drop=${(e: DragEvent) =>
            this.eventHandleDrop(e, date, slot.time)}
                      @click=${() => {
            const eventStart = new Date(date);
            eventStart.setHours(slot.hour, slot.minute);
            const eventEnd = new Date(eventStart);
            eventEnd.setMinutes(
              eventEnd.getMinutes() + (timeSlotInterval ?? 60)
            );

            this._calendarState.calendar.createEvent({
              id: generateId(),
              title: "New Event",
              start: eventStart,
              end: eventEnd,
              color: this.generateColor(),
            });
          }}
                    >
                      ${slotEvents.map(
            (event) => html`
                          <div
                            class="event"
                            style="background-color: ${event.color}"
                            draggable="true"
                            @dragstart=${(e: DragEvent) =>
                this.handleEventDragStart(event, e)}
                            data-props=${JSON.stringify(event)}
                          >
                            ${event.title}
                          </div>
                        `
          )}
                    </div>
                  `;
      })}
              </div>
            `
    )}
        </div>
      </div>
    `;
  }

  private renderDayView() {
    const { dayData, timeSlots, getEventsForDate, utils } = this._calendarState.calendar;
    if (!dayData) return html``;

    return html`
      <div>
        <div>
          <h2
            class="text-xl font-semibold ${dayData.isToday
        ? "text-blue-600"
        : ""}"
          >
            ${dayData.dayName}
          </h2>
        </div>

        <div>
          <div>
            ${timeSlots.map(
          (slot) => html`<div key=${slot.time}>${slot.label}</div>`
        )}
          </div>

          <div>
            ${timeSlots.map((slot) => {
          const slotEvents = getEventsForDate(dayData.date).filter(
            (event) => {
              const eventStart = new Date(event.start);
              return (
                eventStart.getHours() === slot.hour &&
                eventStart.getMinutes() === slot.minute
              );
            }
          );

          return html`
                <div
                  key=${slot.time}
                  @dragover=${(e: DragEvent) => e.preventDefault()}
                  @drop=${(e: DragEvent) =>
              this.eventHandleDrop(e, dayData.date, slot.time)}
                  @click=${() => {
              const eventStart = new Date(dayData.date);
              eventStart.setHours(slot.hour, slot.minute);
              const eventEnd = new Date(eventStart);
              eventEnd.setMinutes(eventEnd.getMinutes() + 60);

              this._calendarState.calendar.createEvent({
                id: generateId(),
                title: "New Event",
                start: eventStart,
                end: eventEnd,
                color: this.generateColor(),
              });
            }}
                >
                  ${slotEvents.map(
              (event) => html`
                      <div
                        data-time=${JSON.stringify(event)}
                        class="event"
                        style="background-color: ${event.color}"
                        draggable="true"
                        @dragstart=${(e: DragEvent) =>
                  this.handleEventDragStart(event, e)}
                      >
                        <div>${event.title}</div>
                        ${event.description
                  ? html`<div>${event.description}</div>`
                  : ""}
                      </div>
                    `
            )}
                </div>
              `;
        })}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const {
      view,
      events,
      changeView,
      goToPrevious,
      goToToday,
      goToNext,
      monthData,
      weekData,
      dayData,
      utils,
    } = this._calendarState.calendar;

    return html`
      <table border="0" style="width: 800px; height: 800px; margin: 0 auto;">
        <tbody>
          <tr>
            <td style="height: 600px;">
              <table border="1">
                <thead>
                  <tr>
                    <td colspan="2" align="center" class="header-controls">
                      <button type="button" @click=${goToPrevious}>←</button>
                      <button type="button" @click=${goToToday}>Today</button>
                      <button type="button" @click=${goToNext}>→</button>
                    </td>
                    <td colspan="3" align="center">
                      <h3>
                        ${view === "month" ? monthData?.monthName : nothing}
                        ${view === "week" ? weekData?.weekRange : nothing}
                        ${view === "day" ? dayData?.dayName : nothing}
                      </h3>
                    </td>
                    <td colspan="2" align="center" class="view-controls">
                      <button
                        @click=${() => changeView("month")}
                        class="${view === "month"
        ? "bg-blue-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"}"
                      >
                        Month
                      </button>
                      <button
                        @click=${() => changeView("week")}
                        class="${view === "week"
        ? "bg-blue-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"}"
                      >
                        Week
                      </button>
                      <button
                        type="button"
                        @click=${() => changeView("day")}
                        class="${view === "day"
        ? "bg-blue-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"}"
                      >
                        Day
                      </button>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  ${view === "month" ? this.renderMonthView() : html``}
                  ${view === "week" ? this.renderWeekView() : html``}
                  ${view === "day" ? this.renderDayView() : html``}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Events (${events.length})</h3>
              <div style="height: 200px; overflow: auto;">
                <div>
                  ${events.map(
          (event) => html`
                      <div
                        key=${event.id}
                        style="background-color: ${event.color}; display: flex; margin-bottom: 8px; padding: 4px; justify-content: space-between; align-items: center;"
                      >
                        <div>
                          <strong style="display: block;">${event.title}</strong>
                          <span style="font-size: 11px;">
                            ${utils.formatDateTime(
            event.start,
            "dd MMM yyyy hh:mm a"
          )}
                            to
                            ${utils.formatDateTime(
            event.end,
            "dd MMM yyyy hh:mm a"
          )}
                          </span>
                        </div>

                        <button
                          type="button"
                          @click=${() => this._calendarState.calendar.deleteEvent(event.id as string)}
                        >
                          Delete
                        </button>
                      </div>
                    `
        )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'alendar-demo': CalendarDemo
  }
}
