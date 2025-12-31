import React, { useState, useRef, useEffect } from 'react';
import './OccasionDropdown.css';

/**
 * Animated dropdown component for occasion selection
 * Implements smooth animations similar to Figma Smart Animate
 */
function OccasionDropdown({ value, onChange, id, name, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef(null);

  const occasions = [
    { value: 'Birthday', label: 'Birthday' },
    { value: 'Engagement', label: 'Engagement' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Business', label: 'Business' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Other', label: 'Other' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  const handleSelect = (occasionValue) => {
    setSelectedValue(occasionValue);
    setIsOpen(false);
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: occasionValue
        }
      });
    }
  };

  const selectedOccasion = occasions.find(occ => occ.value === selectedValue) || occasions[0];

  return (
    <div className="occasion-dropdown-container" ref={dropdownRef}>
      <label htmlFor={id} className="occasion-label">
        {label || 'Occasion'}
      </label>
      <div className="occasion-dropdown-wrapper">
        <button
          type="button"
          className={`occasion-dropdown-button ${isOpen ? 'open' : ''} ${selectedValue ? 'selected' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Select occasion. Currently selected: ${selectedOccasion.label}`}
        >
          <span className="occasion-button-text">{selectedOccasion.label}</span>
          <span className={`occasion-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">
            ▼
          </span>
        </button>
        {isOpen && (
          <div className="occasion-dropdown-list" role="listbox">
            {occasions.map((occasion) => (
              <button
                key={occasion.value}
                type="button"
                className={`occasion-dropdown-item ${selectedValue === occasion.value ? 'selected' : ''}`}
                onClick={() => handleSelect(occasion.value)}
                role="option"
                aria-selected={selectedValue === occasion.value}
              >
                {occasion.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <input
        type="hidden"
        id={id}
        name={name}
        value={selectedValue}
        readOnly
      />
    </div>
  );
}

export default OccasionDropdown;

