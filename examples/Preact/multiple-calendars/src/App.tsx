import { CalendarInstance } from './CalendarDemo';

export function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <h1>Multiple Calendars Example</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Each calendar below has a unique <code>calendarId</code> and maintains its own independent
        state (date, view, etc.).
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <CalendarInstance id="calendar-left" title="Left Calendar" />
        <CalendarInstance id="calendar-right" title="Right Calendar" />
      </div>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
        <h2>Default Calendar</h2>
        <p style={{ color: '#666' }}>
          This one uses the default ID. If you added another one without an ID, they would conflict.
        </p>
        <CalendarInstance id="default-calendar" title="Standard Calendar" />
      </div>
    </div>
  );
}
