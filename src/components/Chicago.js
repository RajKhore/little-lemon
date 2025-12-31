import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import './Chicago.css';

/**
 * Chicago component for Little Lemon restaurant
 * Displays information about the restaurant and its history
 */
function Chicago() {
  return (
    <section id="about" className="chicago-section" aria-labelledby="chicago-heading">
      <div className="chicago-container">
        <div className="chicago-content">
          <div className="chicago-text">
            <h2 id="chicago-heading">Little Lemon</h2>
            <h3 className="chicago-subtitle">Chicago</h3>
            <p className="chicago-description">
              Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, 
              focused on traditional recipes served with a modern twist. The chefs draw inspiration 
              from Italian, Greek, and Turkish culture and have a menu of 12-15 items that they 
              rotate seasonally.
            </p>
            <p className="chicago-description">
              The restaurant has a rustic and relaxed atmosphere with moderate prices, making it 
              a popular place for a meal any time of the day. Little Lemon is owned by two Italian 
              brothers, Mario and Adrian, who moved to the United States to pursue their shared dream 
              of owning a restaurant.
            </p>
            <p className="chicago-description">
              To craft the menu, Mario relies on family recipes and his experience as a chef in Italy, 
              and Adrian does all the marketing for the restaurant and led the effort to expand the menu 
              beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
            </p>
          </div>
          <div className="chicago-images">
            <div className="chicago-image-wrapper" aria-label="Restaurant interior image">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                alt="Little Lemon restaurant interior with warm Mediterranean ambiance"
                fallback="🏛️"
                className="chicago-image"
              />
            </div>
            <div className="chicago-image-wrapper" aria-label="Chefs preparing food image">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
                alt="Chefs preparing authentic Mediterranean dishes at Little Lemon"
                fallback="👨‍🍳"
                className="chicago-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chicago;

