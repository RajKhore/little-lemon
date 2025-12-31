import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './OccasionRadioGroup.css';

/**
 * OccasionRadioGroup component
 * Custom radio group for occasion selection (Birthday, Anniversary, Business)
 */
function OccasionRadioGroup({ value, onChange, error, touched }) {
  const occasions = [
    { value: 'Birthday', label: 'Birthday' },
    { value: 'Anniversary', label: 'Anniversary' },
    { value: 'Business', label: 'Business Meeting' }
  ];

  const handleValueChange = (newValue) => {
    onChange({
      target: {
        name: 'occasion',
        value: newValue
      }
    });
  };

  return (
    <div className="occasion-radio-container">
      <RadioGroup.Root
        className={`occasion-radio-group ${error && touched ? 'error' : ''}`}
        value={value || 'Birthday'}
        onValueChange={handleValueChange}
        aria-label="Select occasion"
        aria-invalid={error && touched ? 'true' : 'false'}
        aria-describedby={error && touched ? 'occasion-error' : undefined}
      >
        {occasions.map((occasion) => (
          <div key={occasion.value} className="radio-item-wrapper">
            <RadioGroup.Item
              className="radio-item"
              value={occasion.value}
              id={`occasion-${occasion.value}`}
            >
              <RadioGroup.Indicator className="radio-indicator" />
            </RadioGroup.Item>
            <label
              htmlFor={`occasion-${occasion.value}`}
              className="radio-label"
            >
              {occasion.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
}

export default OccasionRadioGroup;

