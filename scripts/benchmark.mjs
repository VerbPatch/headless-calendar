import { performance } from 'perf_hooks';
import { useCalendar, disposeCalendar } from '../packages/headless-calendar/dist/index.esm.js';

// Configuration
const NUM_EVENTS = 5000;
const NUM_RECURRING = 100;
const START_YEAR = 2026;

// Helper to generate a random date in 2026
function getRandomDate() {
  const start = new Date(START_YEAR, 0, 1).getTime();
  const end = new Date(START_YEAR, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

// Generate events
const initialEvents = [];

for (let i = 0; i < NUM_EVENTS - NUM_RECURRING; i++) {
  const start = getRandomDate();
  const end = new Date(start.getTime() + Math.random() * 3600000 * 4); // Up to 4 hours
  initialEvents.push({
    id: `evt-${i}`,
    title: `Event ${i}`,
    start,
    end,
    allDay: Math.random() > 0.9,
  });
}

// Generate recurring events
for (let i = 0; i < NUM_RECURRING; i++) {
  const start = getRandomDate();
  const end = new Date(start.getTime() + 3600000);
  initialEvents.push({
    id: `evt-rec-${i}`,
    title: `Recurring Event ${i}`,
    start,
    end,
    recurring: {
      repeat: 'weekly',
      every: 1,
      weekDays: [start.getDay()],
    }, // Repeat on the same day of the week
  });
}

console.log(`Generated ${NUM_EVENTS} events (${NUM_RECURRING} recurring). Running benchmarks...\n`);

function runBenchmark(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const durationMs = end - start;

  if (durationMs > 1000) {
    console.log(`[${(durationMs / 1000).toFixed(3)} seconds] ${name}`);
  } else {
    console.log(`[${durationMs.toFixed(3)} milliseconds] ${name}`);
  }

  return result;
}

// 1. Initialization
let calendar;
runBenchmark('Initialize Calendar (Month View, 5000 events)', () => {
  calendar = useCalendar({
    calendarId: 'perf-cal',
    defaultView: 'month',
    defaultDate: new Date(START_YEAR, 5, 15), // Mid year
    initialEvents,
  });
});

// 2. Accessing visible dates and events
runBenchmark('Get Visible Dates (Month View)', () => {
  return calendar.visibleDates;
});

runBenchmark('Get Visible Events (Month View)', () => {
  return calendar.visibleEvents;
});

runBenchmark('Get Events For Each Visible Date (Simulate Month Render)', () => {
  let count = 0;
  for (const date of calendar.visibleDates) {
    count += calendar.getEventsForDate(date).length;
  }
  return count;
});

// 3. Change View to Week
runBenchmark('Change View -> Week', () => {
  calendar.changeView('week');
});

runBenchmark('Get Events For Each Visible Date (Simulate Week Render)', () => {
  let count = 0;
  for (const date of calendar.visibleDates) {
    count += calendar.getEventsForDate(date).length;
  }
  return count;
});

// 4. Change View to Year
runBenchmark('Change View -> Year', () => {
  calendar.changeView('year');
});

runBenchmark('Get Year Data Structure (Simulate Year Render)', () => {
  return calendar.yearData;
});

// 5. Change View to Custom
runBenchmark('Change View -> Custom (2 week)', () => {
  calendar.changeView('custom', { type: 'week', count: 2 });
});

runBenchmark('Get Events For Each Visible Date (Simulate Custom Render ~90 days)', () => {
  let count = 0;
  for (const date of calendar.visibleDates) {
    count += calendar.getEventsForDate(date).length;
  }
  return count;
});

// 6. Navigate Next
runBenchmark('Navigate -> Next', () => {
  calendar.goToNext();
});

// 7. Event Operations (CRUD)
const newEventId = runBenchmark('Create Single Event', () => {
  const event = calendar.createEvent({
    title: 'Benchmark New Event',
    start: new Date(START_YEAR, 5, 15, 10, 0),
    end: new Date(START_YEAR, 5, 15, 11, 0),
  });
  return event.id;
});

runBenchmark('Update Single Event', () => {
  const existingEvent = calendar.getEvent(newEventId);
  calendar.updateEvent(newEventId, { ...existingEvent, title: 'Updated Benchmark Event' });
});

runBenchmark('Move Single Event', () => {
  calendar.moveEvent(newEventId, new Date(START_YEAR, 5, 16, 10, 0));
});

runBenchmark('Delete Single Event', () => {
  calendar.deleteEvent(newEventId);
});

// 8. ICS Operations
let icsString = '';
runBenchmark('Export to ICS (5000 events)', () => {
  icsString = calendar.exportToICS();
});

// Create a completely new calendar to test import performance without overlap
let importCalendar;
runBenchmark('Initialize ICS calendar (Month View)', () => {
  importCalendar = useCalendar({
    calendarId: 'import-cal',
    defaultView: 'month',
  });
});

runBenchmark('Import from ICS (5000 events string parsing)', () => {
  importCalendar.importFromICS(icsString);
});

runBenchmark('Disposing perf calendar', () => disposeCalendar('perf-cal'));
runBenchmark('Disposing import calendar', () => disposeCalendar('import-cal'));
