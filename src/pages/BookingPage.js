import React from 'react';
import BookingForm from '../components/BookingForm';

/**
 * BookingPage component
 * Page for making table reservations
 */
function BookingPage({ availableTimes, dispatch }) {
  return <BookingForm availableTimes={availableTimes} dispatch={dispatch} />;
}

export default BookingPage;

