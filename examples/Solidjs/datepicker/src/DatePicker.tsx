import { createSignal, onCleanup, onMount, type Component, For, Show } from 'solid-js';
import { useCalendar } from '@verbpatch/solidjs-calendar';

interface Props {
  label: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export const DatePicker: Component<Props> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  const calendar = useCalendar({
    calendarId: `datepicker-${props.label.replace(/\s+/g, '-').toLowerCase()}`,
    defaultView: 'month',
    defaultDate: props.value || new Date(),
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleDateSelect = (date: Date) => {
    props.onChange(date);
    setIsOpen(false);
  };

  const displayValue = () =>
    props.value ? calendar()?.utils.formatDate(props.value, 'yyyy-MM-dd') : '';

  return (
    <div ref={containerRef} style={{ position: 'relative', 'margin-bottom': '20px' }}>
      <label style={{ display: 'block' }}>{props.label}</label>
      <input
        type="text"
        readOnly
        value={displayValue()}
        placeholder={props.placeholder || 'Select a date'}
        onClick={() => setIsOpen(!isOpen())}
      />

      <Show when={isOpen()}>
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            'z-index': 1000,
            background: 'white',
            border: '1px solid black',
          }}
        >
          <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                calendar()?.goToPrevious();
              }}
            >
              ←
            </button>
            <span>{calendar()?.utils.formatLocalizedMonth(calendar()?.currentDate!)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                calendar()?.goToNext();
              }}
            >
              →
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <For each={calendar()?.utils.daysofWeek('narrow')}>{(day) => <th>{day}</th>}</For>
              </tr>
            </thead>
            <tbody>
              <For each={calendar()?.monthData?.weeks}>
                {(week) => (
                  <tr>
                    <For each={week}>
                      {(date) => {
                        const isCurrentMonth = calendar()?.monthData?.isCurrentMonth(date);
                        const isSelected =
                          props.value && date.toDateString() === props.value.toDateString();
                        const isToday = calendar()?.monthData?.isToday(date);
                        return (
                          <td
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrentMonth) handleDateSelect(date);
                            }}
                            style={{
                              cursor: isCurrentMonth ? 'pointer' : 'default',
                              color: isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray',
                              'font-weight': isToday ? 'bold' : 'normal',
                              border: isSelected ? '1px solid blue' : 'none',
                            }}
                          >
                            {date.getDate()}
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>

          <div style={{ 'text-align': 'center' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDateSelect(new Date());
              }}
            >
              Today
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};
