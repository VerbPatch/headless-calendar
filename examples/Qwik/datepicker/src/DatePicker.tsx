import { component$, useSignal, $, useOnDocument, type PropFunction } from '@builder.io/qwik';
import { useCalendar } from '@verbpatch/qwik-calendar';

interface DatePickerProps {
  label: string;
  value?: Date;
  onChange$: PropFunction<(date: Date) => void>;
  placeholder?: string;
}

export const DatePicker = component$(({ label, value, onChange$, placeholder }: DatePickerProps) => {
  const isOpen = useSignal(false);
  const containerRef = useSignal<Element | undefined>();

  const calendar = useCalendar({
    calendarId: `datepicker-${label.replace(/\s+/g, '-').toLowerCase()}`,
    defaultView: 'month',
    defaultDate: value || new Date(),
  });

  // Outside click logic
  useOnDocument('mousedown', $((event: Event) => {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  }));

  const handleDateSelect = $( (date: Date) => {
    onChange$(date);
    isOpen.value = false;
  });

  const displayValue = value ? calendar.utils.formatDate(value, 'yyyy-MM-dd') : '';

  return (
    <div ref={containerRef} style={{ position: 'relative', marginBottom: '20px' }}>
      <label style={{ display: 'block' }}>{label}</label>
      <input
        type="text"
        readOnly
        value={displayValue}
        placeholder={placeholder || 'Select a date'}
        onClick$={() => (isOpen.value = !isOpen.value)}
      />

      {isOpen.value && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            background: 'white',
            border: '1px solid black'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick$={$(() => calendar.goToPrevious())}>←</button>
            <span>{calendar.utils.formatLocalizedMonth(calendar.currentDate)}</span>
            <button type="button" onClick$={$(() => calendar.goToNext())}>→</button>
          </div>

          <table>
            <thead>
              <tr>
                {calendar.utils.daysofWeek('narrow').map((day, index) => (
                  <th key={`${day}-${index}`}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendar.monthData?.weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((date, j) => {
                    const isCurrentMonth = calendar.monthData?.isCurrentMonth(date);
                    const isSelected =
                      value &&
                      date.getDate() === value.getDate() &&
                      date.getMonth() === value.getMonth() &&
                      date.getFullYear() === value.getFullYear();
                    const isToday = calendar.monthData?.isToday(date);

                    return (
                      <td
                        key={j}
                        onClick$={$(() => {
                          if (isCurrentMonth) handleDateSelect(date);
                        })}
                        style={{
                          cursor: isCurrentMonth ? 'pointer' : 'default',
                          color: isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray',
                          fontWeight: isToday ? 'bold' : 'normal',
                          border: isSelected ? '1px solid blue' : 'none'
                        }}
                      >
                        {date.getDate()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'center' }}>
            <button type="button" onClick$={$(() => handleDateSelect(new Date()))}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
});
