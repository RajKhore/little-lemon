import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Header component for Little Lemon restaurant
 * Displays navigation and restaurant branding
 */
function Header() {
  return (
    <header role="banner">
      <div className="logo">
        <Link to="/" aria-label="Little Lemon home">
          <h1>Little Lemon</h1>
        </Link>
      </div>
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li><Link to="/" aria-label="Go to home page">Home</Link></li>
          <li><Link to="/about" aria-label="Go to about page">About</Link></li>
          <li><Link to="/menu" aria-label="Go to menu page">Menu</Link></li>
          <li><Link to="/booking" aria-label="Go to reservations page">Reservations</Link></li>
          <li><Link to="/order-online" aria-label="Go to order online page">Order online</Link></li>
          <li><Link to="/login" aria-label="Go to login page">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

