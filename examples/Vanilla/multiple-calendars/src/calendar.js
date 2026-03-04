import { useCalendar } from '@verbpatch/headless-calendar';

export function setupCalendar($elem, options = {}) {
  let calendar;

  function render() {
    calendar = useCalendar({
      calendarId: options.id || 'default-calendar',
      defaultView: 'month',
    });

    const { view, monthData, weekData, dayData, utils } = calendar;

    let html = `
      <div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; width: 350px">
        <h3 style="margin-top: 0; margin-bottom: 12px">${options.title || 'Calendar'} (ID: ${options.id || 'default'})</h3>

        <div style="display: flex; gap: 4px; margin-bottom: 10px">
          ${['month', 'week', 'day']
            .map(
              (viewType) => `
            <button
              data-action="change-view" data-view="${viewType}"
              style="
                flex: 1;
                padding: 4px;
                font-size: 12px;
                background-color: ${view === viewType ? '#007bff' : '#f0f0f0'};
                color: ${view === viewType ? '#fff' : '#000'};
                border: 1px solid #ccc;
                border-radius: 4px;
                cursor: pointer;
                text-transform: capitalize;
              "
            >
              ${viewType}
            </button>
          `,
            )
            .join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
          <button data-action="prev">←</button>
          <span style="font-weight: bold; font-size: 14px">
            ${
              view === 'day'
                ? utils.formatLocalizedDate(calendar.currentDate)
                : utils.formatLocalizedMonth(calendar.currentDate)
            }
          </span>
          <button data-action="next">→</button>
        </div>

        <button
          data-action="today"
          style="
            width: 100%;
            margin-bottom: 15px;
            padding: 6px;
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: #fff;
          "
        >
          Today
        </button>

        <div style="min-height: 200px">
    `;

    if (view === 'month' && monthData) {
      html += '<table style="width: 100%; border-collapse: collapse"><thead><tr>';
      utils.daysofWeek('narrow').forEach((day) => {
        html += `<th style="padding: 4px; font-size: 12px">${day}</th>`;
      });
      html += '</tr></thead><tbody>';

      monthData.weeks.forEach((week) => {
        html += '<tr>';
        week.forEach((date) => {
          const isCurrentMonth = monthData.isCurrentMonth(date);
          const isToday = monthData.isToday(date);
          html += `
            <td style="
              text-align: center;
              padding: 4px;
              font-size: 14px;
              color: ${isCurrentMonth ? '#000' : '#ccc'};
              background-color: ${isToday ? '#e6f7ff' : 'transparent'};
              border-radius: ${isToday ? '50%' : '0'};
            ">
              ${utils.formatDate(date, 'd')}
            </td>
          `;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
    } else if (view === 'week' && weekData) {
      html += `
        <div style="display: flex; flex-direction: column; gap: 8px">
          <div style="font-size: 12px; color: #666; text-align: center; margin-bottom: 4px">
            ${weekData.weekRange}
          </div>
          <div style="display: flex; justify-content: space-between; gap: 4px">
            ${weekData.dates
              .map((date) => {
                const isToday = weekData.isToday(date);
                return `
                <div style="
                  flex: 1;
                  text-align: center;
                  padding: 8px 4px;
                  border-radius: 4px;
                  background-color: ${isToday ? '#e6f7ff' : '#f9f9f9'};
                  border: ${isToday ? '1px solid #007bff' : '1px solid #eee'};
                ">
                  <div style="font-size: 10px; text-transform: uppercase; color: #888">
                    ${utils.formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })}
                  </div>
                  <div style="font-weight: bold; font-size: 14px">
                    ${utils.formatDate(date, 'd')}
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      `;
    } else if (view === 'day' && dayData) {
      const isToday = dayData.isToday;
      html += `
        <div style="
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          background-color: ${isToday ? '#e6f7ff' : '#f9f9f9'};
          border: ${isToday ? '1px solid #007bff' : '1px solid #eee'};
        ">
          <div style="font-size: 14px; color: #666; margin-bottom: 4px">
            ${utils.formatLocalizedDate(calendar.currentDate, undefined, undefined, { weekday: 'long' })}
          </div>
          <div style="font-size: 32px; font-weight: bold">
            ${utils.formatDate(calendar.currentDate, 'd')}
          </div>
          <div style="font-size: 14px; color: #666; margin-top: 4px">
            ${utils.formatLocalizedMonth(calendar.currentDate)}
          </div>
        </div>
      `;
    }

    html += '</div></div>';
    $elem.innerHTML = html;
  }

  $elem.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;
    const action = target.getAttribute('data-action');
    if (action === 'prev') {
      calendar.goToPrevious();
      render();
    } else if (action === 'today') {
      calendar.goToToday();
      render();
    } else if (action === 'next') {
      calendar.goToNext();
      render();
    } else if (action === 'change-view') {
      const newView = target.getAttribute('data-view');
      calendar.changeView(newView);
      render();
    }
  });

  render();
}
