import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './GuestCounter.css';

/**
 * GuestCounter component
 * Increment/decrement system with 1-10 guest range
 */
function GuestCounter({ value, onChange, error, touched }) {
  const guests = parseInt(value) || 1;
  const minGuests = 1;
  const maxGuests = 10;

  const handleDecrement = () => {
    if (guests > minGuests) {
      onChange({
        target: {
          name: 'guests',
          value: (guests - 1).toString()
        }
      });
    }
  };

  const handleIncrement = () => {
    if (guests < maxGuests) {
      onChange({
        target: {
          name: 'guests',
          value: (guests + 1).toString()
        }
      });
    }
  };

  return (
    <div className="guest-counter-container">
      <div className={`guest-counter ${error && touched ? 'error' : ''}`}>
        <button
          type="button"
          className="counter-button decrement"
          onClick={handleDecrement}
          disabled={guests <= minGuests}
          aria-label="Decrease number of guests"
          aria-invalid={error && touched ? 'true' : 'false'}
        >
          <Minus size={20} aria-hidden="true" />
        </button>
        <div className="counter-display" aria-live="polite">
          <span className="counter-value">{guests}</span>
          <span className="counter-label">Guest{guests !== 1 ? 's' : ''}</span>
        </div>
        <button
          type="button"
          className="counter-button increment"
          onClick={handleIncrement}
          disabled={guests >= maxGuests}
          aria-label="Increase number of guests"
        >
          <Plus size={20} aria-hidden="true" />
        </button>
      </div>
      <input
        type="hidden"
        name="guests"
        value={guests}
        readOnly
      />
    </div>
  );
}

export default GuestCounter;

