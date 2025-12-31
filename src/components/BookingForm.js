import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Check } from 'lucide-react';
import DatePicker from './DatePicker';
import TimeSlotGrid from './TimeSlotGrid';
import GuestCounter from './GuestCounter';
import OccasionRadioGroup from './OccasionRadioGroup';
import './BookingForm.css';

/**
 * BookingForm component for Little Lemon restaurant
 * Handles table reservation with comprehensive validation and modern UI
 * @param {Array} availableTimes - Array of available booking times
 * @param {Function} dispatch - Function to dispatch state updates for available times
 */
function BookingForm({ availableTimes = [], dispatch }) {
  // Initialize form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    occasion: 'Birthday',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Initialize errors state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  // Reset time field if current selection is not in available times
  useEffect(() => {
    if (formData.time && availableTimes && availableTimes.length > 0) {
      if (!availableTimes.includes(formData.time)) {
        setFormData(prev => ({
          ...prev,
          time: ''
        }));
      }
    }
  }, [availableTimes, formData.time]);

  /**
   * Generates unique confirmation ID (LL + 6 digits)
   */
  const generateConfirmationId = () => {
    const timestamp = Date.now();
    const lastSix = timestamp.toString().slice(-6);
    return `LL${lastSix}`;
  };

  /**
   * Validates email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates phone number format (allows various formats)
   */
  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-()]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 10;
  };

  /**
   * Validates date (must be today or future date)
   */
  const validateDate = (date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  /**
   * Validates time slot is not in the past if date is today
   */
  const validateTime = (date, time) => {
    if (!date || !time) return true;
    const selectedDate = new Date(date);
    const today = new Date();
    
    // If selected date is today, check if time is in the future
    if (selectedDate.toDateString() === today.toDateString()) {
      const [hours, minutes] = time.split(':').map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes, 0, 0);
      return selectedTime > today;
    }
    return true;
  };

  /**
   * Validates form field
   */
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid phone number (at least 10 digits)';
        }
        break;
      case 'date':
        if (!value) {
          error = 'Date is required';
        } else if (!validateDate(value)) {
          error = 'Please select today or a future date';
        }
        break;
      case 'time':
        if (!value) {
          error = 'Time is required';
        } else if (formData.date && !validateTime(formData.date, value)) {
          error = 'Please select a future time';
        }
        break;
      case 'guests':
        const guestsNum = parseInt(value);
        if (!value || guestsNum < 1) {
          error = 'Number of guests must be at least 1';
        } else if (guestsNum > 10) {
          error = 'Maximum 10 guests per reservation';
        }
        break;
      default:
        break;
    }

    return error;
  };

  /**
   * Handles input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If date changes, dispatch to update available times
    if (name === 'date' && dispatch) {
      dispatch({ date: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handles time slot selection
   */
  const handleTimeSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      time: time
    }));
    setTouched(prev => ({
      ...prev,
      time: true
    }));
    if (errors.time) {
      setErrors(prev => ({
        ...prev,
        time: ''
      }));
    }
  };

  /**
   * Handles blur events for validation
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Validates entire form
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (key !== 'specialRequests') {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
        }
      }
    });

    // Additional validation for time if date is today
    if (formData.date && formData.time && !newErrors.time) {
      const isTimeValid = validateTime(formData.date, formData.time);
      if (!isTimeValid) {
        newErrors.time = 'Please select a future time';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Checks if form is valid (for button state)
   */
  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'date', 'time', 'guests'];
    return requiredFields.every(field => {
      if (!formData[field]) return false;
      const error = validateField(field, formData[field]);
      if (error) return false;
      if (field === 'time' && formData.date) {
        return validateTime(formData.date, formData.time);
      }
      return true;
    });
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      // Generate confirmation ID
      const confId = generateConfirmationId();
      setConfirmationId(confId);
      
      // Submit form data to API
      let submissionSuccess = false;
      
      if (typeof window !== 'undefined' && window.submitAPI) {
        submissionSuccess = window.submitAPI(formData);
      } else {
        // Fallback: assume success if API is not available
        submissionSuccess = true;
        console.log('Form submitted:', formData);
      }
      
      if (submissionSuccess) {
        setIsSubmitted(true);
      } else {
        // Handle submission failure
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit reservation. Please try again.'
        }));
      }
    } else {
      // Focus on first error field
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        const field = document.querySelector(`[name="${firstErrorField}"]`);
        if (field) {
          field.focus();
        }
      }
    }
  };

  /**
   * Generates calendar event URL
   */
  const generateCalendarUrl = () => {
    const date = new Date(`${formData.date}T${formData.time}`);
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 2); // 2 hour reservation
    
    const formatDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const title = encodeURIComponent(`Reservation at Little Lemon`);
    const details = encodeURIComponent(
      `Reservation for ${formData.firstName} ${formData.lastName}\n` +
      `Party size: ${formData.guests} guests\n` +
      `Occasion: ${formData.occasion}\n` +
      `Confirmation: ${confirmationId}`
    );
    const location = encodeURIComponent('Little Lemon Restaurant, Chicago');
    const start = formatDate(date);
    const end = formatDate(endDate);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  // Show confirmation page if submitted
  if (isSubmitted) {
    return (
      <section id="booking" className="booking-section" aria-labelledby="booking-heading">
        <div className="booking-container">
          <div className="confirmation-page" role="alert" aria-live="polite">
            <div className="success-animation">
              <div className="checkmark-container">
                <Check className="checkmark" size={64} strokeWidth={3} />
              </div>
            </div>
            <h2 className="confirmation-title">Reservation Confirmed!</h2>
            <p className="confirmation-message">
              Thank you, <strong>{formData.firstName}</strong>! Your table reservation has been confirmed.
            </p>
            
            <div className="reservation-summary-card">
              <h3>Reservation Details</h3>
              <div className="summary-row">
                <span className="summary-label">Confirmation ID:</span>
                <span className="summary-value confirmation-id">{confirmationId}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Date:</span>
                <span className="summary-value">
                  {new Date(formData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Time:</span>
                <span className="summary-value">
                  {new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Party Size:</span>
                <span className="summary-value">{formData.guests} {formData.guests === '1' ? 'guest' : 'guests'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Occasion:</span>
                <span className="summary-value">{formData.occasion}</span>
              </div>
              {formData.specialRequests && (
                <div className="summary-row">
                  <span className="summary-label">Special Requests:</span>
                  <span className="summary-value">{formData.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="confirmation-actions">
              <a
                href={generateCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="calendar-cta-button"
                aria-label="Add reservation to calendar"
              >
                Add to Calendar
              </a>
            </div>

            <p className="confirmation-footer">
              We'll send a confirmation email to <strong>{formData.email}</strong> shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="booking-section" aria-labelledby="booking-heading">
      <div className="booking-container">
        <h2 id="booking-heading">Reserve a Table</h2>
        <form onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span aria-label="required">*</span>
              </label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} aria-hidden="true" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  className={`form-input ${errors.firstName && touched.firstName ? 'error' : ''}`}
                  placeholder="John"
              />
              </div>
              {errors.firstName && touched.firstName && (
                <span id="firstName-error" className="error-message" role="alert">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span aria-label="required">*</span>
              </label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} aria-hidden="true" />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  className={`form-input ${errors.lastName && touched.lastName ? 'error' : ''}`}
                  placeholder="Doe"
              />
              </div>
              {errors.lastName && touched.lastName && (
                <span id="lastName-error" className="error-message" role="alert">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email <span aria-label="required">*</span>
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                  placeholder="john.doe@example.com"
              />
              </div>
              {errors.email && touched.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span aria-label="required">*</span>
              </label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} aria-hidden="true" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                placeholder="(555) 123-4567"
              />
              </div>
              {errors.phone && touched.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                Date <span aria-label="required">*</span>
              </label>
              <DatePicker
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
                touched={touched.date}
              />
              {errors.date && touched.date && (
                <span id="date-error" className="error-message" role="alert">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Time <span aria-label="required">*</span>
              </label>
              <TimeSlotGrid
                availableTimes={availableTimes}
                selectedTime={formData.time}
                onTimeSelect={handleTimeSelect}
                error={errors.time}
                touched={touched.time}
              />
              {errors.time && touched.time && (
                <span id="time-error" className="error-message" role="alert">
                  {errors.time}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guests">
                Number of Guests <span aria-label="required">*</span>
              </label>
              <GuestCounter
                value={formData.guests}
                onChange={handleChange}
                error={errors.guests}
                touched={touched.guests}
              />
              {errors.guests && touched.guests && (
                <span id="guests-error" className="error-message" role="alert">
                  {errors.guests}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="occasion">
                Occasion <span aria-label="required">*</span>
              </label>
              <OccasionRadioGroup
                value={formData.occasion}
                onChange={handleChange}
                error={errors.occasion}
                touched={touched.occasion}
              />
              {errors.occasion && touched.occasion && (
                <span id="occasion-error" className="error-message" role="alert">
                  {errors.occasion}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="specialRequests">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
                placeholder="Dietary restrictions, seating preferences, or any other special requests..."
                aria-label="Special requests"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${!isFormValid() ? 'disabled' : ''}`}
            disabled={!isFormValid()}
            aria-label="Submit reservation form"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
