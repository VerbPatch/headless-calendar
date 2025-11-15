import useCalendar, {
  CalendarEvent,
  generateId,
} from "@verbpatch/marko-calendar";

export default class {
  onCreate() {
    this.state = useCalendar(this, {
      defaultView: "month",
      startOfWeek: 0, // 0 = Sunday, 1 = Monday
      timeSlotInterval: 30,
      initialEvents: this.initialEvents,
      onViewChange: (view) => {
        console.log(view);
        this.setStateDirty("view");
      },
      onDateChange: (date) => {
        console.log("Current date:", date);
        this.setStateDirty("currentDate");
      },
      locale: "en-IN",
      timezone: "Asia/Calcutta",
      onEvent: (events: CalendarEvent[]) => {
        console.log("Events:", events);
        this.setStateDirty("events");
      },
    });
  }

  initialEvents = (() => {
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

  generateColor() {
    const randomColorValue = Math.floor(Math.random() * 16777215);
    const hexColor = randomColorValue.toString(16).padStart(6, "0");
    return `#${hexColor}`;
  }

  handleDateClick(date) {
    const startTime = new Date(date);
    startTime.setHours(7, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(8, 0, 0, 0);

    this.state.createEvent({
      id: generateId(),
      title: "New Event",
      start: startTime,
      end: endTime,
      color: this.generateColor(),
    });
  }

  handleEventDragStart(event) {
    this.state.startDrag(event, { type: "event" });
  }

  eventHandleDrop(e, date, time) {
    e.preventDefault();
    this.state.handleDrop({ date, time });
  }

  createWeekEvent(date, slot) {
    const eventStart = new Date(date);
    eventStart.setHours(slot.hour, slot.minute);
    const eventEnd = new Date(eventStart);
    eventEnd.setMinutes(eventEnd.getMinutes() + (this.state.timeSlotInterval ?? 60));

    this.state.createEvent({
      id: generateId(),
      title: "New Event",
      start: eventStart,
      end: eventEnd,
      color: this.generateColor(),
    });
  }

  createDayEvent(slot) {
    const eventStart = new Date(this.state.dayData.date);
    eventStart.setHours(slot.hour, slot.minute);
    const eventEnd = new Date(eventStart);
    eventEnd.setMinutes(eventEnd.getMinutes() + 60);

    this.state.createEvent({
      id: generateId(),
      title: "New Event",
      start: eventStart,
      end: eventEnd,
      color: this.generateColor(),
    });
  }

  changeView(view) {
    this.state.changeView(view);
  }

  goToPrevious() {
    this.state.goToPrevious();
  }

  goToToday() {
    this.state.goToToday();
  }

  goToNext() {
    this.state.goToNext();
  }

  deleteEvent(id) {
    this.state.deleteEvent(id);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  preventDefault(e) {
    e.preventDefault();
  }
}
