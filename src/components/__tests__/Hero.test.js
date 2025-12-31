import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

/**
 * Test suite for Hero component
 */
describe('Hero Component', () => {
  test('renders main heading', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { name: /welcome to little lemon/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    render(<Hero />);
    const subtitle = screen.getByText(/chicago's premier mediterranean dining experience/i);
    expect(subtitle).toBeInTheDocument();
  });

  test('renders call to action button', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('link', { name: /make a reservation/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '#booking');
  });

  test('has proper accessibility attributes', () => {
    render(<Hero />);
    const section = screen.getByRole('region', { name: /welcome to little lemon/i });
    expect(section).toBeInTheDocument();
  });
});

