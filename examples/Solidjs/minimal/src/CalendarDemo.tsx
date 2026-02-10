import { type Component, Show, For } from 'solid-js';
import { useCalendar, type ViewType } from '@verbpatch/solidjs-calendar';

const CalendarDemo: Component = () => {
  const calendar = useCalendar({ defaultView: 'month', startOfWeek: 0, locale: 'en-IN' });

  return (
    <Show when={calendar()}>
      {(cal) => (
        <>
          <h1>Solidjs Calendar minimal Example</h1>
          <table
            style={{
              height: '700px',
              'border-left': '1px solid',
              'border-top': '1px solid',
              width: '840px',
              'border-collapse': 'collapse',
            }}
          >
            <thead>
              <tr>
                <th colspan={2} style={{ 'border-bottom': '1px solid' }}>
                  <button type="button" onClick={() => cal().goToPrevious()}>
                    {' '}
                    ←{' '}
                  </button>
                  <button type="button" onClick={() => cal().goToToday()}>
                    {' '}
                    Today{' '}
                  </button>
                  <button type="button" onClick={() => cal().goToNext()}>
                    {' '}
                    →{' '}
                  </button>
                </th>
                <th colspan={3} style={{ 'border-bottom': '1px solid' }}>
                  <h3>
                    {cal().view === 'month' ? cal().monthData?.monthName : ''}
                    {cal().view === 'week' ? cal().weekData?.weekRange : ''}
                    {cal().view === 'day' ? cal().dayData?.dayName : ''}
                  </h3>
                </th>
                <th
                  colspan={2}
                  style={{ 'border-bottom': '1px solid', 'border-right': '1px solid' }}
                >
                  <select
                    value={cal().view}
                    onChange={(e) => {
                      cal().changeView(e.currentTarget.value as ViewType);
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
              <Show when={cal().view === 'month'}>
                <tr>
                  <For each={cal().utils.daysofWeek('short')}>
                    {(day) => (
                      <th
                        style={{
                          width: '120px',
                          'border-right': '1px solid',
                          'border-bottom': '1px solid',
                        }}
                      >
                        {day}
                      </th>
                    )}
                  </For>
                </tr>
                <For each={cal().monthData?.weeks}>
                  {(week) => (
                    <tr>
                      <For each={week}>
                        {(date) => (
                          <td
                            style={{
                              color: !cal().monthData?.isCurrentMonth(date) ? 'gray' : undefined,
                              'font-weight': cal().monthData?.isToday(date) ? 'bold' : 'normal',
                              'border-right': '1px solid',
                              'border-bottom': '1px solid',
                            }}
                          >
                            {cal().utils.formatDate(date, 'd')}
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </Show>

              <Show when={cal().view === 'week'}>
                <tr>
                  <td colspan={7} style={{ 'border-right': '1px solid' }}>
                    <table style={{ width: '100%', 'border-collapse': 'collapse' }}>
                      <tbody>
                        <tr>
                          <td></td>
                          <For each={cal().weekData?.dates}>
                            {(date) => (
                              <td
                                style={{
                                  'font-weight': cal().weekData?.isToday(date) ? 'bold' : 'normal',
                                }}
                              >
                                {cal().utils.formatDateTime(date, 'EEE d')}
                              </td>
                            )}
                          </For>
                        </tr>
                        <For each={cal().timeSlots}>
                          {(slot) => (
                            <tr>
                              <td style={{ 'border-bottom': '1px solid' }}>{slot.label}</td>
                              <For each={cal().weekData?.dates}>
                                {(date) => (
                                  <td
                                    style={{
                                      'font-weight': cal().weekData?.isToday(date)
                                        ? 'bold'
                                        : 'normal',
                                      'border-bottom': '1px solid',
                                    }}
                                  >
                                    &nbsp;
                                  </td>
                                )}
                              </For>
                            </tr>
                          )}
                        </For>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </Show>

              <Show when={cal().view === 'day'}>
                <tr>
                  <td
                    colspan={7}
                    align="center"
                    style={{ 'border-right': '1px solid', 'border-bottom': '1px solid' }}
                  >
                    {cal().dayData?.dayName}
                  </td>
                </tr>
                <tr>
                  <td colspan={7} style={{ 'border-right': '1px solid' }}>
                    <table style={{ height: '100%', width: '100%', 'border-collapse': 'collapse' }}>
                      <tbody>
                        <For each={cal().timeSlots}>
                          {(slot) => (
                            <tr>
                              <td width="25%" style={{ 'border-bottom': '1px solid' }}>
                                {slot.label}
                                &nbsp;
                              </td>
                            </tr>
                          )}
                        </For>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </Show>
            </tbody>
          </table>
        </>
      )}
    </Show>
  );
};

export default CalendarDemo;
