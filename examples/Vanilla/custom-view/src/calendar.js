import { useCalendar, generateId } from '@verbpatch/headless-calendar';

export function setupCalendar($elem) {
  let calendar;
  let customOptions = { unit: 'day', count: 2 };

  function bindCalendar() {
    const options = {
      defaultView: 'custom',
      customViewOptions: customOptions,
      initialEvents: [
        {
          id: '1',
          title: 'Project Review',
          start: new Date(),
          end: new Date(new Date().getTime() + 3600000),
          color: '#8b5cf6',
        },
        {
          id: '2',
          title: 'Lunch Sync',
          start: new Date(new Date().setHours(12, 0)),
          end: new Date(new Date().setHours(13, 0)),
          color: '#10b981',
        },
      ],
    };

    if (calendar) {
      options.defaultDate = calendar.currentDate;
    }

    calendar = useCalendar(options);
    render();
  }

  $elem.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;

    if (target.id === 'prev') {
      calendar.goToPrevious();
      bindCalendar();
    } else if (target.id === 'today') {
      calendar.goToToday();
      bindCalendar();
    } else if (target.id === 'next') {
      calendar.goToNext();
      bindCalendar();
    } else {
      const presetBtn = target.closest('.preset');
      if (presetBtn) {
        const unit = presetBtn.dataset.unit;
        const count = parseInt(presetBtn.dataset.count);
        const include = presetBtn.dataset.include
          ? presetBtn.dataset.include.split(',').map(Number)
          : undefined;

        customOptions = { unit, count, includeSpecificDays: include };
        calendar.changeView('custom', customOptions);
        bindCalendar();
      }
    }
  });

  function getTitle(cal) {
    const opts = cal.customViewOptions;
    if (!opts) return '';
    if (opts.unit === 'month') return cal.monthData?.monthName;
    if (opts.unit === 'week') return cal.weekData?.weekRange;
    return cal.dayData?.dayName;
  }

  function render() {
    const title = getTitle(calendar);
    const opts = calendar.customViewOptions;
    const utils = calendar.utils;

    let html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>Vanilla Calendar Custom View Example</h1>
        <div>
          <button id="prev">Prev</button>
          <button id="today">Today</button>
          <button id="next">Next</button>
          <span style="margin-left: 20px;"><strong>${title}</strong></span>
        </div>

        <div style="margin: 20px 0;">
          <strong>Presets:</strong>
          <button class="preset" data-unit="day" data-count="2">2 Days</button>
          <button class="preset" data-unit="week" data-count="1" data-include="1,2,3,4,5">Work Week</button>
          <button class="preset" data-unit="week" data-count="2">2 Weeks</button>
          <button class="preset" data-unit="month" data-count="1" data-include="1,2,3,4,5">1 Month (WD)</button>
          <button class="preset" data-unit="month" data-count="3">Quarter</button>
        </div>

        <div class="view-content">`;

    if (opts?.unit === 'month' && calendar.monthData) {
      const count = opts.count || 1;
      for (let i = 0; i < count; i++) {
        const mDate = utils.addMonths(calendar.currentDate, i);
        const m = mDate.getMonth();
        const y = mDate.getFullYear();

        html += `<div><h3>${utils.formatLocalizedMonth(mDate)}</h3>`;
        html +=
          '<table border="1" cellpadding="5" width="100%" style="border-collapse: collapse; text-align: center;">';
        html += `<thead><tr>${utils
          .daysofWeek('short')
          .map((day) => `<th>${day}</th>`)
          .join('')}</tr></thead><tbody>`;

        calendar.monthData.weeks.forEach((week) => {
          const hasDaysInMonth = week.some((d) => d.getMonth() === m && d.getFullYear() === y);
          if (!hasDaysInMonth) return;

          html += '<tr>';
          [0, 1, 2, 3, 4, 5, 6].forEach((dayIdx) => {
            const date = week.find((d) => d.getDay() === dayIdx);
            const isInMonth = date && date.getMonth() === m && date.getFullYear() === y;
            const isToday = date && utils.isSameDay(date, new Date());

            if (isInMonth) {
              const events = calendar.getEventsForDate(date);
              html += `<td style="height: 80px; vertical-align: top; background: ${isToday ? '#eee' : 'transparent'}">`;
              html += `<div><strong>${date.getDate()}</strong></div>`;
              html += events
                .map(
                  (e) =>
                    `<div style="border: 1px solid; font-size: 10px; margin-bottom: 2px;">${e.title}</div>`,
                )
                .join('');
              html += `</td>`;
            } else {
              html += '<td style="background: #f9fafb;"></td>';
            }
          });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
      }
    } else {
      const data = opts?.unit === 'week' ? calendar.weekData : calendar.dayData;
      if (data) {
        html +=
          '<table border="1" cellpadding="5" width="100%" style="border-collapse: collapse; text-align: center;"><thead><tr>';
        data.dates.forEach((date) => {
          html += `<th>${utils.formatDate(date, 'EEE d')}</th>`;
        });
        html += '</tr></thead><tbody><tr>';
        data.dates.forEach((date) => {
          const isToday = utils.isSameDay(date, new Date());
          const events = calendar.getEventsForDate(date);
          html += `<td style="height: 100px; vertical-align: top; background: ${isToday ? '#eee' : 'transparent'}">`;
          html += events
            .map(
              (e) =>
                `<div style="border: 1px solid; font-size: 11px; margin-bottom: 2px;">${e.title}</div>`,
            )
            .join('');
          html += `</td>`;
        });
        html += '</tr></tbody></table>';
      }
    }

    html += `</div></div>`;
    $elem.innerHTML = html;
  }

  bindCalendar();
}
