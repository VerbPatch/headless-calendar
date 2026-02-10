import { useCalendar } from '@verbpatch/headless-calendar';

export function setupCalendar($elem) {
  let calendar;

  function render() {
    calendar = useCalendar({
      defaultView: 'month',
      startOfWeek: 0,
      locale: 'en-IN',
    });

    const { view, monthData, weekData, dayData, timeSlots, utils } = calendar;

    let html = `
      <h1>Vanilla Calendar minimal Example</h1>
      <table border="0" width="840" cellspacing="0" style="height:700px; border-left:1px solid; border-top:1px solid;">
        <thead>
          <tr>
            <th colspan="2" style="border-bottom: 1px solid;">
              <button type="button" data-action="prev"> ← </button>
              <button type="button" data-action="today"> Today </button>
              <button type="button" data-action="next"> → </button>
            </th>
            <th colspan="3" style="border-bottom: 1px solid;">
              <h3>
                ${view === 'month' ? monthData?.monthName || '' : ''}
                ${view === 'week' ? weekData?.weekRange || '' : ''}
                ${view === 'day' ? dayData?.dayName || '' : ''}
              </h3>
            </th>
            <th colspan="2" style="border-bottom: 1px solid; border-right:1px solid;">
              <select id="view-select">
                <option value="month" ${view === 'month' ? 'selected' : ''}>Month</option>
                <option value="week" ${view === 'week' ? 'selected' : ''}>Week</option>
                <option value="day" ${view === 'day' ? 'selected' : ''}>Day</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
    `;

    if (view === 'month' && monthData) {
      html += '<tr>';
      utils.daysofWeek('short').forEach((day) => {
        html += `<th style="width: 120px; border-right:1px solid; border-bottom:1px solid;">${day}</th>`;
      });
      html += '</tr>';

      monthData.weeks.forEach((week) => {
        html += '<tr>';
        week.forEach((date) => {
          const isCurrentMonth = monthData.isCurrentMonth(date);
          const isToday = monthData.isToday(date);
          html += `
            <td style="
              ${!isCurrentMonth ? 'color: gray;' : ''}
              ${isToday ? 'font-weight: bold;' : ''}
              border-right: 1px solid; border-bottom: 1px solid;
            ">
              ${utils.formatDate(date, 'd')}
            </td>
          `;
        });
        html += '</tr>';
      });
    } else if (view === 'week' && weekData) {
      html += `
        <tr>
          <td colspan="7" style="border-right:1px solid;">
            <table cellpadding="5" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td></td>
                  ${weekData.dates
                    .map(
                      (date) => `
                    <td style="${weekData.isToday(date) ? 'font-weight: bold;' : ''}">
                      ${utils.formatDateTime(date, 'EEE d')}
                    </td>
                  `,
                    )
                    .join('')}
                </tr>
                ${timeSlots
                  .map(
                    (slot) => `
                  <tr>
                    <td style="border-bottom: 1px solid;">${slot.label}</td>
                    ${weekData.dates
                      .map(
                        (date) => `
                      <td style="${weekData.isToday(date) ? 'font-weight: bold;' : ''} border-bottom: 1px solid;">
                        &nbsp;
                      </td>
                    `,
                      )
                      .join('')}
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </td>
        </tr>
      `;
    } else if (view === 'day' && dayData) {
      html += `
        <tr>
          <td colspan="7" align="center" style="border-right: 1px solid; border-bottom: 1px solid;">
            ${dayData.dayName}
          </td>
        </tr>
        <tr>
          <td colspan="7" style="border-right: 1px solid;">
            <table width="100%" cellspacing="0" style="height: 100%;">
              <tbody>
                ${timeSlots
                  .map(
                    (slot) => `
                  <tr>
                    <td width="25%" style="border-bottom: 1px solid;">
                      ${slot.label} &nbsp;
                    </td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </td>
        </tr>
      `;
    }

    html += '</tbody></table>';
    $elem.innerHTML = html;
  }

  // Event delegation
  $elem.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-action');
    if (action === 'prev') {
      calendar.goToPrevious();
      render();
    } else if (action === 'today') {
      calendar.goToToday();
      render();
    } else if (action === 'next') {
      calendar.goToNext();
      render();
    }
  });

  $elem.addEventListener('change', (e) => {
    if (e.target.id === 'view-select') {
      calendar.changeView(e.target.value);
      render();
    }
  });

  render();
}
