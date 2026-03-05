import { useCalendar, type ViewType } from '@verbpatch/preact-calendar';

interface Props {
  id: string;
  title: string;
}

export const CalendarInstance = ({ id, title }: Props) => {
  const {
    view,
    currentDate,
    goToPrevious,
    goToToday,
    goToNext,
    changeView,
    monthData,
    weekData,
    dayData,
    utils: { formatLocalizedMonth, formatLocalizedDate, formatDate, daysofWeek },
  } = useCalendar({
    calendarId: id,
    defaultView: 'month',
  });

  const renderViewSwitcher = () => (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
      {(['month', 'week', 'day'] as ViewType[]).map((viewType) => (
        <button
          key={viewType}
          onClick={() => changeView(viewType)}
          style={{
            flex: 1,
            padding: '4px',
            fontSize: '12px',
            backgroundColor: view === viewType ? '#007bff' : '#f0f0f0',
            color: view === viewType ? '#fff' : '#000',
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
  );

  const renderMonthView = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {daysofWeek('narrow').map((day, index) => (
            <th key={`${day}-${index}`} style={{ padding: '4px', fontSize: '12px' }}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthData?.weeks.map((week, i) => (
          <tr key={i}>
            {week.map((date, j) => {
              const isCurrentMonth = monthData?.isCurrentMonth(date);
              const isToday = monthData?.isToday(date);
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
                  {formatDate(date, 'd')}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderWeekView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginBottom: '4px' }}>
        {weekData?.weekRange}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
        {weekData?.dates.map((date, i) => {
          const isToday = weekData?.isToday(date);
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
                {formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{formatDate(date, 'd')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDayView = () => {
    const isToday = dayData?.isToday;
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: isToday ? '#e6f7ff' : '#f9f9f9',
          border: isToday ? '1px solid #007bff' : '1px solid #eee',
        }}
      >
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
          {formatLocalizedDate(currentDate, undefined, undefined, { weekday: 'long' })}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{formatDate(currentDate, 'd')}</div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
          {formatLocalizedMonth(currentDate)}
        </div>
      </div>
    );
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '350px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '12px' }}>
        {title} (ID: {id})
      </h3>

      {renderViewSwitcher()}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <button onClick={goToPrevious}>←</button>
        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
          {view === 'day' ? formatLocalizedDate(currentDate) : formatLocalizedMonth(currentDate)}
        </span>
        <button onClick={goToNext}>→</button>
      </div>

      <button
        onClick={goToToday}
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
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </div>
  );
};
