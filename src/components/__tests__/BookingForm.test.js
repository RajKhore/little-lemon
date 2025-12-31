import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../BookingForm';

/**
 * Test suite for BookingForm component
 */
describe('BookingForm Component', () => {
  // Mock dispatch function
  const mockDispatch = jest.fn();
  
  // Default available times for testing
  const defaultAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  
  // Helper function to render BookingForm with default props
  const renderBookingForm = (props = {}) => {
    return render(
      <BookingForm 
        availableTimes={props.availableTimes || defaultAvailableTimes}
        dispatch={props.dispatch || mockDispatch}
        {...props}
      />
    );
  };

  // Helper function to fill out the form with valid data
  const fillValidForm = async () => {
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const dateInput = screen.getByLabelText(/date/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.type(phoneInput, '5551234567');
    
    // Set date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await userEvent.type(dateInput, dateString);
    
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '4');
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders form heading', () => {
    renderBookingForm();
    const heading = screen.getByRole('heading', { name: /reserve a table/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    renderBookingForm();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('shows validation error for empty first name', async () => {
    renderBookingForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    await userEvent.click(firstNameInput);
    await userEvent.tab(); // Blur the field
    
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid email', async () => {
    renderBookingForm();
    
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid phone number', async () => {
    renderBookingForm();
    
    const phoneInput = screen.getByLabelText(/phone number/i);
    await userEvent.type(phoneInput, '123');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/valid phone number/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for guests exceeding maximum', async () => {
    renderBookingForm();
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '15');
    await userEvent.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
    });
  });

  test('shows validation error on form submit with missing fields', async () => {
    renderBookingForm();
    
    const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      // Should show validation errors for required fields
      const firstNameError = screen.queryByText(/first name is required/i);
      const dateError = screen.queryByText(/date is required/i);
      expect(firstNameError || dateError).toBeTruthy();
    });
  });

  test('submits form with valid data', async () => {
    // Mock submitAPI
    window.submitAPI = jest.fn(() => true);
    
    renderBookingForm();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    const dateInput = screen.getByLabelText(/date/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.type(phoneInput, '5551234567');
    
    // Set date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    await userEvent.type(dateInput, dateString);
    
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '4');
    
    const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('dispatches date change when date is selected', async () => {
    renderBookingForm();
    
    const dateInput = screen.getByLabelText(/date/i);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    await userEvent.type(dateInput, dateString);
    
    expect(mockDispatch).toHaveBeenCalledWith({ date: dateString });
  });

  test('has proper accessibility attributes', () => {
    renderBookingForm();
    
    const form = screen.getByRole('form', { name: /table reservation form/i });
    expect(form).toBeInTheDocument();
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('aria-required', 'true');
  });
});
