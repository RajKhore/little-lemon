import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

/**
 * Test suite for Footer component
 */
describe('Footer Component', () => {
  test('renders restaurant name', () => {
    render(<Footer />);
    const heading = screen.getByRole('heading', { name: /little lemon/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/123 main street/i)).toBeInTheDocument();
    expect(screen.getByText(/chicago, il/i)).toBeInTheDocument();
  });

  test('renders phone and email links', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', { name: /call us at/i });
    const emailLink = screen.getByRole('link', { name: /email us at/i });
    
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
    
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
  });

  test('renders hours information', () => {
    render(<Footer />);
    expect(screen.getByText(/monday - thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/friday - saturday/i)).toBeInTheDocument();
    expect(screen.getByText(/sunday/i)).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);
    const socialNav = screen.getByRole('navigation', { name: /social media links/i });
    expect(socialNav).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
  });

  test('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});

