import { type Component, For, Show } from 'solid-js';
import { useCalendar, type ViewType } from '@verbpatch/solidjs-calendar';

interface Props {
  id: string;
  title: string;
}

export const CalendarDemo: Component<Props> = (props) => {
  const calendar = useCalendar({
    calendarId: props.id,
    defaultView: 'month',
  });

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '16px', 'border-radius': '8px', width: '350px' }}
    >
      <h3 style={{ 'margin-top': '0', 'margin-bottom': '12px' }}>
        {props.title} (ID: {props.id})
      </h3>

      <div style={{ display: 'flex', gap: '4px', 'margin-bottom': '10px' }}>
        <For each={['month', 'week', 'day'] as ViewType[]}>
          {(viewType) => (
            <button
              onClick={() => calendar()?.changeView(viewType)}
              style={{
                flex: 1,
                padding: '4px',
                'font-size': '12px',
                'background-color': calendar()?.view === viewType ? '#007bff' : '#f0f0f0',
                color: calendar()?.view === viewType ? '#fff' : '#000',
                border: '1px solid #ccc',
                'border-radius': '4px',
                cursor: 'pointer',
                'text-transform': 'capitalize',
              }}
            >
              {viewType}
            </button>
          )}
        </For>
      </div>

      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          'margin-bottom': '10px',
        }}
      >
        <button onClick={() => calendar()?.goToPrevious()}>←</button>
        <span style={{ 'font-weight': 'bold', 'font-size': '14px' }}>
          {calendar()?.view === 'day'
            ? calendar()?.utils.formatLocalizedDate(calendar()?.currentDate!)
            : calendar()?.utils.formatLocalizedMonth(calendar()?.currentDate!)}
        </span>
        <button onClick={() => calendar()?.goToNext()}>→</button>
      </div>

      <button
        onClick={() => calendar()?.goToToday()}
        style={{
          width: '100%',
          'margin-bottom': '15px',
          padding: '6px',
          cursor: 'pointer',
          'border-radius': '4px',
          border: '1px solid #ccc',
          'background-color': '#fff',
        }}
      >
        Today
      </button>

      <div style={{ 'min-height': '200px' }}>
        <Show when={calendar()?.view === 'month'}>
          <table style={{ width: '100%', 'border-collapse': 'collapse' }}>
            <thead>
              <tr>
                <For each={calendar()?.utils.daysofWeek('narrow')}>
                  {(day) => <th style={{ padding: '4px', 'font-size': '12px' }}>{day}</th>}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={calendar()?.monthData?.weeks}>
                {(week) => (
                  <tr>
                    <For each={week}>
                      {(date) => {
                        const isCurrentMonth = calendar()?.monthData?.isCurrentMonth(date);
                        const isToday = calendar()?.monthData?.isToday(date);
                        return (
                          <td
                            style={{
                              'text-align': 'center',
                              padding: '4px',
                              'font-size': '14px',
                              color: isCurrentMonth ? '#000' : '#ccc',
                              'background-color': isToday ? '#e6f7ff' : 'transparent',
                              'border-radius': isToday ? '50%' : '0',
                            }}
                          >
                            {calendar()?.utils.formatDate(date, 'd')}
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Show>

        <Show when={calendar()?.view === 'week'}>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '8px' }}>
            <div
              style={{
                'font-size': '12px',
                color: '#666',
                'text-align': 'center',
                'margin-bottom': '4px',
              }}
            >
              {calendar()?.weekData?.weekRange}
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between', gap: '4px' }}>
              <For each={calendar()?.weekData?.dates}>
                {(date) => {
                  const isToday = calendar()?.weekData?.isToday(date);
                  return (
                    <div
                      style={{
                        flex: 1,
                        'text-align': 'center',
                        padding: '8px 4px',
                        'border-radius': '4px',
                        'background-color': isToday ? '#e6f7ff' : '#f9f9f9',
                        border: isToday ? '1px solid #007bff' : '1px solid #eee',
                      }}
                    >
                      <div
                        style={{
                          'font-size': '10px',
                          'text-transform': 'uppercase',
                          color: '#888',
                        }}
                      >
                        {calendar()?.utils.formatLocalizedDate(date, undefined, undefined, {
                          weekday: 'short',
                        })}
                      </div>
                      <div style={{ 'font-weight': 'bold', 'font-size': '14px' }}>
                        {calendar()?.utils.formatDate(date, 'd')}
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </Show>

        <Show when={calendar()?.view === 'day'}>
          <div
            style={{
              'text-align': 'center',
              padding: '20px',
              'border-radius': '8px',
              'background-color': calendar()?.dayData?.isToday ? '#e6f7ff' : '#f9f9f9',
              border: calendar()?.dayData?.isToday ? '1px solid #007bff' : '1px solid #eee',
            }}
          >
            <div style={{ 'font-size': '14px', color: '#666', 'margin-bottom': '4px' }}>
              {calendar()?.utils.formatLocalizedDate(
                calendar()?.currentDate!,
                undefined,
                undefined,
                { weekday: 'long' },
              )}
            </div>
            <div style={{ 'font-size': '32px', 'font-weight': 'bold' }}>
              {calendar()?.utils.formatDate(calendar()?.currentDate!, 'd')}
            </div>
            <div style={{ 'font-size': '14px', color: '#666', 'margin-top': '4px' }}>
              {calendar()?.utils.formatLocalizedMonth(calendar()?.currentDate!)}
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};
