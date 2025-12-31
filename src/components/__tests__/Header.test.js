import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

/**
 * Test suite for Header component
 */
describe('Header Component', () => {
  test('renders Little Lemon heading', () => {
    render(<Header />);
    const heading = screen.getByText('Little Lemon');
    expect(heading).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /go to home section/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to menu section/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to booking section/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to about section/i })).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
});

