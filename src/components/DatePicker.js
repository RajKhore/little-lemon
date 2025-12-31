import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { format, isPast, startOfDay, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import './DatePicker.css';

/**
 * DatePicker component with popover
 * Prevents selection of past dates
 */
function DatePicker({ value, onChange, error, touched }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const today = startOfDay(new Date());

  const handleDateSelect = (date) => {
    if (isPast(startOfDay(date)) && format(date, 'yyyy-MM-dd') !== format(today, 'yyyy-MM-dd')) {
      return; // Prevent selecting past dates
    }
    setSelectedDate(date);
    const dateString = format(date, 'yyyy-MM-dd');
    onChange({
      target: {
        name: 'date',
        value: dateString
      }
    });
    setIsOpen(false);
  };

  const formatDisplayDate = (date) => {
    if (!date) return 'Select a date';
    return format(new Date(date), 'EEEE, MMMM d, yyyy');
  };

  const generateCalendarDays = () => {
    const days = [];
    const startDate = startOfDay(new Date());
    
    // Show next 30 days for better UX
    for (let i = 0; i < 30; i++) {
      const date = addDays(startDate, i);
      days.push(date);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="date-picker-container">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`date-picker-trigger ${error && touched ? 'error' : ''} ${selectedDate ? 'selected' : ''}`}
            aria-label="Select date"
            aria-invalid={error && touched ? 'true' : 'false'}
            aria-describedby={error && touched ? 'date-error' : undefined}
          >
            <CalendarIcon size={20} aria-hidden="true" />
            <span>{formatDisplayDate(value)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="date-picker-content" sideOffset={5}>
            <div className="date-picker-calendar">
              <div className="calendar-header">
                <h3>Select Date</h3>
                <p className="calendar-hint">Available for the next 30 days</p>
              </div>
              <div className="calendar-grid">
                {calendarDays.map((date) => {
                  const dateString = format(date, 'yyyy-MM-dd');
                  const isPastDate = isPast(startOfDay(date)) && dateString !== format(today, 'yyyy-MM-dd');
                  const isSelected = value === dateString;
                  
                  return (
                    <button
                      key={dateString}
                      type="button"
                      className={`calendar-day ${isPastDate ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => !isPastDate && handleDateSelect(date)}
                      disabled={isPastDate}
                      aria-label={`Select ${format(date, 'MMMM d, yyyy')}`}
                    >
                      <span className="day-number">{format(date, 'd')}</span>
                      <span className="day-name">{format(date, 'EEE')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default DatePicker;

