import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer component for Little Lemon restaurant
 * Displays contact information, doormat navigation, and links
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>Little Lemon</h3>
          </div>
          <p>Authentic Mediterranean cuisine in the heart of Chicago</p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <nav aria-label="Footer navigation">
            <ul className="footer-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/booking">Reservations</Link></li>
              <li><Link to="/order-online">Order Online</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <address>
            <p>123 Main Street</p>
            <p>Chicago, IL 60601</p>
            <p>
              <a href="tel:+15551234567" aria-label="Call us at 555-123-4567">
                (555) 123-4567
              </a>
            </p>
            <p>
              <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">
                info@littlelemon.com
              </a>
            </p>
          </address>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <nav aria-label="Social media links">
            <ul className="social-links">
              <li>
                <a href="#facebook" aria-label="Visit our Facebook page">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#instagram" aria-label="Visit our Instagram page">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#twitter" aria-label="Visit our Twitter page">
                  Twitter
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

