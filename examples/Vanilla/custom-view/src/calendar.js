import { useCalendar, generateId } from "@verbpatch/headless-calendar";

export function setupCalendar($elem) {
  let calendar;
  let customOptions = { unit: "day", count: 2 };

  function bindCalendar() {
    // Preserving currentDate when re-binding
    const options = {
      defaultView: "custom",
      customViewOptions: customOptions,
      initialEvents: [
        { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
        { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
      ]
    };

    if (calendar) {
      options.defaultDate = calendar.currentDate;
    }

    calendar = useCalendar(options);
    render();
  }

  // Attach event listener once to the parent container
  $elem.addEventListener("click", (event) => {
    const target = event.target;
    if (!target) return;

    // Navigation
    if (target.id === "prev") {
      calendar.goToPrevious();
      bindCalendar();
    } else if (target.id === "today") {
      calendar.goToToday();
      bindCalendar();
    } else if (target.id === "next") {
      calendar.goToNext();
      bindCalendar();
    } 
    // Presets - using closest to catch clicks on inner text if any
    else {
      const presetBtn = target.closest(".preset");
      if (presetBtn) {
        const unit = presetBtn.dataset.unit;
        const count = parseInt(presetBtn.dataset.count);
        const include = presetBtn.dataset.include ? presetBtn.dataset.include.split(',').map(Number) : undefined;
        
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
      <div class="calendar-wrapper">
        <div class="header">
          <div class="nav">
            <button id="prev">Previous</button>
            <button id="today">Today</button>
            <button id="next">Next</button>
          </div>
          <h2 class="range">${title}</h2>
        </div>

        <div class="presets">
          <strong>View Presets:</strong>
          <div class="preset-buttons">
            <button class="preset" data-unit="day" data-count="2">2 Days</button>
            <button class="preset" data-unit="week" data-count="1" data-include="1,2,3,4,5">Work Week</button>
            <button class="preset" data-unit="week" data-count="2">2 Weeks</button>
            <button class="preset" data-unit="month" data-count="1" data-include="1,2,3,4,5">1 Month Weekdays</button>
            <button class="preset" data-unit="month" data-count="3">Quarter (3 Months)</button>
          </div>
        </div>

        <div class="view-content">`;

    if (opts?.unit === 'month' && calendar.monthData) {
      const count = opts.count || 1;
      for (let i = 0; i < count; i++) {
        const mDate = utils.addMonths(calendar.currentDate, i);
        const m = mDate.getMonth();
        const y = mDate.getFullYear();
        
        html += `<div class="month-container">
          <div class="month-title">${utils.formatLocalizedMonth(mDate)}</div>
          <table class="calendar-table" border="1">
            <thead>
              <tr>${utils.daysofWeek('short').map(day => `<th>${day}</th>`).join('')}</tr>
            </thead>
            <tbody>`;

        calendar.monthData.weeks.forEach(week => {
          const hasDaysInMonth = week.some(d => d.getMonth() === m && d.getFullYear() === y);
          if (!hasDaysInMonth) return;
          
          html += '<tr>';
          [0,1,2,3,4,5,6].forEach(dayIdx => {
            const date = week.find(d => d.getDay() === dayIdx);
            const isInMonth = date && date.getMonth() === m && date.getFullYear() === y;
            const isToday = date && utils.isSameDay(date, new Date());
            
            if (isInMonth) {
              const events = calendar.getEventsForDate(date);
              html += `<td class="${isToday ? 'today' : ''}">
                <div class="day-num">${date.getDate()}</div>
                <div class="events">
                  ${events.map(e => `<div class="event-pill" style="background-color: ${e.color}">${e.title}</div>`).join('')}
                </div>
              </td>`;
            } else {
              html += '<td class="empty-cell"></td>';
            }
          });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
      }
    } else {
      const data = opts?.unit === 'week' ? calendar.weekData : calendar.dayData;
      if (data) {
        html += `<table class="calendar-table horizontal-view" border="1">
          <thead>
            <tr>${data.dates.map(date => `
              <th>
                <div class="day-name-small">${utils.formatDate(date, 'EEE')}</div>
                <div class="day-num-large">${date.getDate()}</div>
              </th>`).join('')}
            </tr>
          </thead>
          <tbody><tr>`;
        
        data.dates.forEach(date => {
          const isToday = utils.isSameDay(date, new Date());
          const events = calendar.getEventsForDate(date);
          html += `<td class="${isToday ? 'today' : ''}">
            <div class="events">
              ${events.map(e => `<div class="event-pill" style="background-color: ${e.color}">${e.title}</div>`).join('')}
            </div>
          </td>`;
        });
        
        html += '</tr></tbody></table>';
      }
    }

    html += `</div></div>`;
    $elem.innerHTML = html;
  }

  bindCalendar();
}