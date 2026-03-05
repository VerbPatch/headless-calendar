import { useCalendar } from '@verbpatch/headless-calendar';

export function setupDatePicker($container, options) {
  let calendar;
  let isOpen = false;
  let selectedDate = options.value;

  function render() {
    calendar = useCalendar({
      calendarId: `datepicker-${options.label.replace(/\s+/g, '-').toLowerCase()}`,
      defaultView: 'month',
      defaultDate: selectedDate || new Date(),
    });

    const { currentDate, monthData, utils } = calendar;
    const displayValue = selectedDate ? utils.formatDate(selectedDate, 'yyyy-MM-dd') : '';

    $container.innerHTML = `
      <div class="datepicker-container" style="position: relative; margin-bottom: 20px">
        <label style="display: block">${options.label}</label>
        <input type="text" readonly value="${displayValue}" placeholder="${options.placeholder || 'Select a date'}" class="datepicker-input" />
        
        <div class="datepicker-popup" style="display: ${isOpen ? 'block' : 'none'}; position: absolute; top: 100%; left: 0; z-index: 1000; background: white; border: 1px solid black; padding: 10px;">
          <div style="display: flex; justify-content: space-between">
            <button type="button" class="btn-prev">←</button>
            <span>${utils.formatLocalizedMonth(currentDate)}</span>
            <button type="button" class="btn-next">→</button>
          </div>

          <table>
            <thead>
              <tr>
                ${utils
                  .daysofWeek('narrow')
                  .map((day) => `<th>${day}</th>`)
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${monthData?.weeks
                .map(
                  (week) => `
                <tr>
                  ${week
                    .map((date) => {
                      const isCurrentMonth = monthData.isCurrentMonth(date);
                      const isSelected =
                        selectedDate && date.toDateString() === selectedDate.toDateString();
                      const isToday = monthData.isToday(date);
                      const style = `
                      cursor: ${isCurrentMonth ? 'pointer' : 'default'};
                      color: ${isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray'};
                      font-weight: ${isToday ? 'bold' : 'normal'};
                      border: ${isSelected ? '1px solid blue' : 'none'};
                    `;
                      return `<td class="day-cell" data-date="${date.toISOString()}" style="${style}">${date.getDate()}</td>`;
                    })
                    .join('')}
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>

          <div style="text-align: center; margin-top: 5px;">
            <button type="button" class="btn-today">Today</button>
          </div>
        </div>
      </div>
    `;

    // Re-attach event listeners after render
    const $input = $container.querySelector('.datepicker-input');
    $input.onclick = () => {
      isOpen = !isOpen;
      render();
    };

    $container.querySelector('.btn-prev').onclick = (e) => {
      e.stopPropagation();
      calendar.goToPrevious();
      render();
    };
    $container.querySelector('.btn-next').onclick = (e) => {
      e.stopPropagation();
      calendar.goToNext();
      render();
    };
    $container.querySelector('.btn-today').onclick = (e) => {
      e.stopPropagation();
      selectedDate = new Date();
      isOpen = false;
      options.onChange(selectedDate);
      render();
    };

    $container.querySelectorAll('.day-cell').forEach(($cell) => {
      $cell.onclick = (e) => {
        e.stopPropagation();
        const date = new Date($cell.dataset.date);
        if (monthData.isCurrentMonth(date)) {
          selectedDate = date;
          isOpen = false;
          options.onChange(selectedDate);
          render();
        }
      };
    });
  }

  // Outside click
  document.addEventListener('mousedown', (e) => {
    if (!$container.contains(e.target)) {
      if (isOpen) {
        isOpen = false;
        render();
      }
    }
  });

  render();
}
