import React, { useState, useRef, useEffect } from 'react';
import { useCalendar } from '@verbpatch/react-calendar';

interface DatePickerProps {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    currentDate,
    goToPrevious,
    goToNext,
    monthData,
    utils: { formatLocalizedMonth, formatDate, daysofWeek },
  } = useCalendar({
    calendarId: `datepicker-${label.replace(/\s+/g, '-').toLowerCase()}`,
    defaultView: 'month',
    defaultDate: value || new Date(),
  });

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const displayValue = value ? formatDate(value, 'yyyy-MM-dd') : '';

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <label>{label}</label>
      <input
        type="text"
        readOnly
        value={displayValue}
        placeholder={placeholder || 'Select a date'}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
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
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              ←
            </button>
            <span>{formatLocalizedMonth(currentDate)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              →
            </button>
          </div>

          <table>
            <thead>
              <tr>
                {daysofWeek('narrow').map((day, index) => (
                  <th key={`${day}-${index}`}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthData?.weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((date, j) => {
                    const isCurrentMonth = monthData.isCurrentMonth(date);
                    const isSelected =
                      value &&
                      date.getDate() === value.getDate() &&
                      date.getMonth() === value.getMonth() &&
                      date.getFullYear() === value.getFullYear();
                    const isToday = monthData.isToday(date);

                    return (
                      <td
                        key={j}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCurrentMonth) handleDateSelect(date);
                        }}
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
      )}
    </div>
  );
};
