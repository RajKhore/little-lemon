import React from 'react';
import './TimeSlotGrid.css';

/**
 * TimeSlotGrid component
 * Displays available time slots in a 3-column grid
 * Time slots from 17:00 to 21:30 (30-minute intervals)
 */
function TimeSlotGrid({ availableTimes = [], selectedTime, onTimeSelect, error, touched }) {
  // Generate time slots from 17:00 to 21:30 in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 17; hour <= 21; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 21) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const allTimeSlots = generateTimeSlots();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isAvailable = (time) => {
    return availableTimes.includes(time);
  };

  return (
    <div className="time-slot-container">
      <div 
        className={`time-slot-grid ${error && touched ? 'has-error' : ''}`}
        role="radiogroup"
        aria-label="Select time slot"
        aria-invalid={error && touched ? 'true' : 'false'}
        aria-describedby={error && touched ? 'time-error' : undefined}
      >
        {allTimeSlots.map((time) => {
          const available = isAvailable(time);
          const isSelected = selectedTime === time;
          
          return (
            <button
              key={time}
              type="button"
              className={`time-slot ${isSelected ? 'selected' : ''} ${!available ? 'unavailable' : ''}`}
              onClick={() => available && onTimeSelect(time)}
              disabled={!available}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${formatTime(time)} ${available ? 'available' : 'unavailable'}`}
            >
              {formatTime(time)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlotGrid;

