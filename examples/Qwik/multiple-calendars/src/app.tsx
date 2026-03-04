import { component$ } from '@builder.io/qwik';
import { useCalendar, type ViewType } from '@verbpatch/qwik-calendar';

interface Props {
  id: string;
  title: string;
}

export const CalendarInstance = component$(({ id, title }: Props) => {
  const calendar = useCalendar({
    calendarId: id,
    defaultView: 'month',
  });

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '350px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '12px' }}>
        {title} (ID: {id})
      </h3>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
        {(['month', 'week', 'day'] as ViewType[]).map((viewType) => (
          <button
            key={viewType}
            onClick$={() => calendar.changeView(viewType)}
            style={{
              flex: 1,
              padding: '4px',
              fontSize: '12px',
              backgroundColor: calendar.view === viewType ? '#007bff' : '#f0f0f0',
              color: calendar.view === viewType ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {viewType}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <button onClick$={() => calendar.goToPrevious()}>←</button>
        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
          {calendar.view === 'day'
            ? calendar.utils.formatLocalizedDate(calendar.currentDate)
            : calendar.utils.formatLocalizedMonth(calendar.currentDate)}
        </span>
        <button onClick$={() => calendar.goToNext()}>→</button>
      </div>

      <button
        onClick$={() => calendar.goToToday()}
        style={{
          width: '100%',
          marginBottom: '15px',
          padding: '6px',
          cursor: 'pointer',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        Today
      </button>

      <div style={{ minHeight: '200px' }}>
        {calendar.view === 'month' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {calendar.utils.daysofWeek('narrow').map((day, index) => (
                  <th key={`${day}-${index}`} style={{ padding: '4px', fontSize: '12px' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendar.monthData?.weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((date, j) => {
                    const isCurrentMonth = calendar.monthData?.isCurrentMonth(date);
                    const isToday = calendar.monthData?.isToday(date);
                    return (
                      <td
                        key={j}
                        style={{
                          textAlign: 'center',
                          padding: '4px',
                          fontSize: '14px',
                          color: isCurrentMonth ? '#000' : '#ccc',
                          backgroundColor: isToday ? '#e6f7ff' : 'transparent',
                          borderRadius: isToday ? '50%' : '0',
                        }}
                      >
                        {calendar.utils.formatDate(date, 'd')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {calendar.view === 'week' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginBottom: '4px' }}
            >
              {calendar.weekData?.weekRange}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              {calendar.weekData?.dates.map((date, i) => {
                const isToday = calendar.weekData?.isToday(date);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px 4px',
                      borderRadius: '4px',
                      backgroundColor: isToday ? '#e6f7ff' : '#f9f9f9',
                      border: isToday ? '1px solid #007bff' : '1px solid #eee',
                    }}
                  >
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#888' }}>
                      {calendar.utils.formatLocalizedDate(date, undefined, undefined, {
                        weekday: 'short',
                      })}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {calendar.utils.formatDate(date, 'd')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {calendar.view === 'day' && (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: calendar.dayData?.isToday ? '#e6f7ff' : '#f9f9f9',
              border: calendar.dayData?.isToday ? '1px solid #007bff' : '1px solid #eee',
            }}
          >
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              {calendar.utils.formatLocalizedDate(calendar.currentDate, undefined, undefined, {
                weekday: 'long',
              })}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {calendar.utils.formatDate(calendar.currentDate, 'd')}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              {calendar.utils.formatLocalizedMonth(calendar.currentDate)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export const App = component$(() => {
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
});
