import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import './Hero.css';

/**
 * Hero component for Little Lemon restaurant
 * Displays the main promotional section with high-impact CTA
 */
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-image-wrapper">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Little Lemon restaurant interior with warm Mediterranean ambiance"
          fallback="🍋"
          className="hero-background-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 id="hero-heading">Little Lemon</h1>
        <p className="hero-subtitle">Chicago's Premier Mediterranean Dining Experience</p>
        <p className="hero-description">
          Experience authentic Mediterranean cuisine crafted with the finest ingredients 
          and traditional recipes passed down through generations.
        </p>
        <Link to="/booking" className="cta-button" aria-label="Make a reservation">
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

export default Hero;

