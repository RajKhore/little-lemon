import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import './Menu.css';

/**
 * Menu component for Little Lemon restaurant
 * Displays featured menu items (highlights/specials) with ImageWithFallback
 */
function Menu() {
  const menuItems = [
    {
      id: 1,
      name: 'Greek Salad',
      description: 'Fresh tomatoes, cucumbers, olives, and feta cheese with our house dressing',
      price: '$12.99',
      image: 'public/images/tomato-salad.jpg',
      fallback: '🥗'
    },
    {
      id: 2,
      name: 'Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, basil, and garlic',
      price: '$8.99',
      image: `${process.env.PUBLIC_URL}/images/bruschetta.jpg`,
      fallback: '🍞'
    },
    {
      id: 3,
      name: 'Grilled Fish',
      description: 'Seasonal catch grilled to perfection with lemon and herbs',
      price: '$24.99',
      image: `${process.env.PUBLIC_URL}/images/grilled-fish.jpg`,
      fallback: '🐟'
    },
    {
      id: 4,
      name: 'Lemon Dessert',
      description: 'Zesty lemon tart with a buttery crust and fresh whipped cream',
      price: '$16.99',
      image: `${process.env.PUBLIC_URL}/images/lemon-dessert.jpg`,
      fallback: '🍋'
    }
  ];

  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-heading">
      <div className="menu-container">
        <div className="menu-header">
          <h2 id="menu-heading">This Week's Specials</h2>
          <Link to="/order-online" className="order-online-button" aria-label="Go to order online page">
            Order Online
          </Link>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <article key={item.id} className="menu-item" aria-labelledby={`menu-item-${item.id}`}>
              <div className="menu-item-image" aria-hidden="true">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  fallback={item.fallback}
                  className="menu-image"
                />
              </div>
              <div className="menu-item-content">
                <h3 id={`menu-item-${item.id}`}>{item.name}</h3>
                <p className="menu-description">{item.description}</p>
                <p className="menu-price" aria-label={`Price: ${item.price}`}>{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;

