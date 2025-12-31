import React from 'react';
import { render, screen } from '@testing-library/react';
import Menu from '../Menu';

/**
 * Test suite for Menu component
 */
describe('Menu Component', () => {
  test('renders menu heading', () => {
    render(<Menu />);
    const heading = screen.getByRole('heading', { name: /our specials/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all menu items', () => {
    render(<Menu />);
    expect(screen.getByText('Greek Salad')).toBeInTheDocument();
    expect(screen.getByText('Bruschetta')).toBeInTheDocument();
    expect(screen.getByText('Grilled Fish')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  test('displays menu item prices', () => {
    render(<Menu />);
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('$8.99')).toBeInTheDocument();
    expect(screen.getByText('$24.99')).toBeInTheDocument();
    expect(screen.getByText('$16.99')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Menu />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(4);
  });

  test('has proper accessibility attributes', () => {
    render(<Menu />);
    const section = screen.getByRole('region', { name: /our specials/i });
    expect(section).toBeInTheDocument();
  });
});

