import { component$ } from '@builder.io/qwik';
import { useCalendar, type ViewType } from '@verbpatch/qwik-calendar';

export const App = component$(() => {
  const {
    view,
    monthData,
    weekData,
    dayData,
    timeSlots,
    goToPrevious,
    goToToday,
    goToNext,
    changeView,
    utils,
  } = useCalendar({ defaultView: 'month', startOfWeek: 0, locale: 'en-IN' });

  const renderViewText = () => {
    if (view === 'month') return monthData?.monthName;
    else if (view === 'week') return weekData?.weekRange;
    else if (view === 'day') return dayData?.dayName;
    else return 'Unkwown view';
  };

  const renderMonthView = () => {
    if (!monthData) return null;
    return (
      <>
        <tr>
          {utils?.daysofWeek('short').map((day) => (
            <th
              key={day}
              style={{
                width: '120px',
                'border-right': '1px solid',
                'border-bottom': '1px solid',
              }}
            >
              {day}
            </th>
          ))}
        </tr>
        {monthData.weeks.map((week, i) => (
          <tr key={i}>
            {week.map((date, j) => (
              <td
                key={j}
                style={{
                  color: !monthData.isCurrentMonth(date) ? 'gray' : undefined,
                  'font-weight': monthData.isToday(date) ? 'bold' : 'normal',
                  'border-right': '1px solid',
                  'border-bottom': '1px solid',
                }}
              >
                {utils?.formatDate(date, 'd')}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const renderWeekView = () => {
    if (!weekData) return null;
    return (
      <tr>
        <td colSpan={7} style={{ 'border-right': '1px solid' }}>
          <table cellPadding="5" cellSpacing="0" width="100%">
            <tbody>
              <tr>
                <td></td>
                {weekData.dates.map((date, i) => (
                  <td key={i} style={{ 'font-weight': weekData.isToday(date) ? 'bold' : 'normal' }}>
                    {utils?.formatDateTime(date, 'EEE d')}
                  </td>
                ))}
              </tr>
              {timeSlots.map((slot) => (
                <tr key={slot.time}>
                  <td style={{ 'border-bottom': '1px solid' }}>{slot.label}</td>
                  {weekData.dates.map((date, i) => (
                    <td
                      key={i}
                      style={{
                        'font-weight': weekData.isToday(date) ? 'bold' : 'normal',
                        'border-bottom': '1px solid',
                      }}
                    >
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    );
  };

  const renderDayName = () => dayData?.dayName;
  const renderDayView = () => {
    if (!dayData) return null;
    return (
      <>
        <tr>
          <td
            colSpan={7}
            align="center"
            style={{ 'border-right': '1px solid', 'border-bottom': '1px solid' }}
          >
            {renderDayName()}
          </td>
        </tr>
        <tr>
          <td colSpan={7} style={{ 'border-right': '1px solid' }}>
            <table width="100%" cellSpacing="0" style={{ height: '100%' }}>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.time}>
                    <td width="25%" style={{ 'border-bottom': '1px solid' }}>
                      {slot.label}
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <h1>Qwik Calendar minimal Example</h1>
      <table
        border="0"
        width="840"
        cellSpacing="0"
        style={{ height: '700px', 'border-left': '1px solid', 'border-top': '1px solid' }}
      >
        <thead>
          <tr>
            <th colSpan={2} style={{ 'border-bottom': '1px solid' }}>
              <button type="button" onClick$={() => goToPrevious()}>
                {' '}
                ←{' '}
              </button>
              <button type="button" onClick$={() => goToToday()}>
                {' '}
                Today{' '}
              </button>
              <button type="button" onClick$={() => goToNext()}>
                {' '}
                →{' '}
              </button>
            </th>
            <th colSpan={3} style={{ 'border-bottom': '1px solid' }}>
              <h3>{renderViewText()}</h3>
            </th>
            <th colSpan={2} style={{ 'border-bottom': '1px solid', 'border-right': '1px solid' }}>
              <select
                value={view}
                onChange$={(e) => {
                  changeView((e.target as HTMLSelectElement).value as ViewType);
                }}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </tbody>
      </table>
    </>
  );
});
