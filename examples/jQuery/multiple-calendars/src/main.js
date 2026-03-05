import $ from 'jquery';
import '@verbpatch/jquery-calendar';

$(document).ready(function () {
  function setupCalendar(selector) {
    const $elem = $(selector);
    const id = $elem.data('id');
    const title = $elem.data('title');

    $elem.headlessCalendar({
      calendarId: id,
      defaultView: 'month',
      onRender: function (cal) {
        const { view, currentDate, monthData, weekData, dayData, utils } = cal;

        let html = `<h3 style="margin-top: 0; margin-bottom: 12px">${title} (ID: ${id})</h3>`;

        // View Switcher
        html += '<div class="view-switcher">';
        ['month', 'week', 'day'].forEach((viewType) => {
          const activeClass = view === viewType ? 'active' : '';
          html += `<button class="view-btn ${activeClass}" data-action="change-view" data-view="${viewType}">${viewType}</button>`;
        });
        html += '</div>';

        // Navigation
        const navText =
          view === 'day'
            ? utils.formatLocalizedDate(currentDate)
            : utils.formatLocalizedMonth(currentDate);

        html += `
          <div class="nav">
            <button data-action="prev">←</button>
            <span>${navText}</span>
            <button data-action="next">→</button>
          </div>
          <button class="today-btn" data-action="today">Today</button>
          <div style="min-height: 200px">
        `;

        // Month View
        if (view === 'month' && monthData) {
          html += '<table><thead><tr>';
          utils.daysofWeek('narrow').forEach((day) => {
            html += `<th>${day}</th>`;
          });
          html += '</tr></thead><tbody>';

          monthData.weeks.forEach((week) => {
            html += '<tr>';
            week.forEach((date) => {
              const isCurrentMonth = monthData.isCurrentMonth(date);
              const isToday = monthData.isToday(date);
              const classes = ['day-cell'];
              if (isToday) classes.push('today');
              if (isCurrentMonth) classes.push('current-month');
              else classes.push('other-month');

              html += `<td class="${classes.join(' ')}">${utils.formatDate(date, 'd')}</td>`;
            });
            html += '</tr>';
          });
          html += '</tbody></table>';
        }
        // Week View
        else if (view === 'week' && weekData) {
          html += `
            <div class="week-view">
              <div class="week-range">${weekData.weekRange}</div>
              <div class="week-dates">
          `;
          weekData.dates.forEach((date) => {
            const isToday = weekData.isToday(date);
            html += `
              <div class="week-date ${isToday ? 'today' : ''}">
                <div style="font-size: 10px; text-transform: uppercase; color: #888">
                  ${utils.formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })}
                </div>
                <div style="font-weight: bold; font-size: 14px">
                  ${utils.formatDate(date, 'd')}
                </div>
              </div>
            `;
          });
          html += '</div></div>';
        }
        // Day View
        else if (view === 'day' && dayData) {
          const isToday = dayData.isToday;
          html += `
            <div class="day-view ${isToday ? 'today' : ''}">
              <div style="font-size: 14px; color: #666; margin-bottom: 4px">
                ${utils.formatLocalizedDate(currentDate, undefined, undefined, { weekday: 'long' })}
              </div>
              <div style="font-size: 32px; font-weight: bold">
                ${utils.formatDate(currentDate, 'd')}
              </div>
              <div style="font-size: 14px; color: #666; margin-top: 4px">
                ${utils.formatLocalizedMonth(currentDate)}
              </div>
            </div>
          `;
        }

        html += '</div>'; // End min-height
        $elem.html(html);
      },
    });

    // Event bindings
    $elem.on('click', 'button[data-action="prev"]', function () {
      $elem.headlessCalendar('goToPrevious');
    });
    $elem.on('click', 'button[data-action="next"]', function () {
      $elem.headlessCalendar('goToNext');
    });
    $elem.on('click', 'button[data-action="today"]', function () {
      $elem.headlessCalendar('goToToday');
    });
    $elem.on('click', 'button[data-action="change-view"]', function () {
      const newView = $(this).data('view');
      $elem.headlessCalendar('changeView', newView);
    });
  }

  setupCalendar('#calendar-left');
  setupCalendar('#calendar-right');
  setupCalendar('#default-calendar');
});
