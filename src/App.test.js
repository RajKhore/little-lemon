import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { initializeTimes, updateTimes } from './App';

/**
 * Test suite for App component
 */
describe('App Component', () => {
  test('renders Little Lemon header', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('renders hero section', () => {
    render(<App />);
    const heroHeading = screen.getByRole('heading', { name: /welcome to little lemon/i });
    expect(heroHeading).toBeInTheDocument();
  });

  test('renders menu section', () => {
    render(<App />);
    const menuHeading = screen.getByRole('heading', { name: /our specials/i });
    expect(menuHeading).toBeInTheDocument();
  });

  test('renders booking form', () => {
    render(<App />);
    const bookingHeading = screen.getByRole('heading', { name: /reserve a table/i });
    expect(bookingHeading).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});

/**
 * Test suite for booking time functions
 */
describe('Booking Time Functions', () => {
  // Mock fetchAPI function
  const mockFetchAPI = jest.fn((date) => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  });

  beforeEach(() => {
    // Set up mock fetchAPI in window object
    if (typeof window !== 'undefined') {
      window.fetchAPI = mockFetchAPI;
    }
  });

  afterEach(() => {
    // Clean up
    if (typeof window !== 'undefined') {
      delete window.fetchAPI;
    }
    jest.clearAllMocks();
  });

  test('initializeTimes returns expected value', () => {
    const result = initializeTimes();
    
    // Should return a non-empty array
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    // If fetchAPI is available, it should be called
    if (typeof window !== 'undefined' && window.fetchAPI) {
      expect(mockFetchAPI).toHaveBeenCalled();
    }
  });

  test('updateTimes returns available times from fetchAPI for selected date', () => {
    const currentState = ['17:00', '18:00', '19:00'];
    const selectedDate = '2024-12-25';
    const action = { date: selectedDate };
    
    const result = updateTimes(currentState, action);
    
    // Should return an array
    expect(Array.isArray(result)).toBe(true);
    
    // If fetchAPI is available, it should return the result from fetchAPI
    if (typeof window !== 'undefined' && window.fetchAPI) {
      expect(mockFetchAPI).toHaveBeenCalledWith(selectedDate);
      expect(result).toEqual(mockFetchAPI(selectedDate));
    } else {
      // Fallback: should return the same state if API is not available
      expect(result).toEqual(currentState);
    }
  });
});
