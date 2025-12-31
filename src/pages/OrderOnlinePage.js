import React from 'react';
import Menu from '../components/Menu';
import './OrderOnlinePage.css';

/**
 * OrderOnlinePage component
 * Page for ordering food online
 */
function OrderOnlinePage() {
  return (
    <div className="order-online-page">
      <section className="order-online-hero">
        <div className="order-online-container">
          <h1>Order Online</h1>
          <p>Browse our menu and place your order for pickup or delivery</p>
        </div>
      </section>
      <Menu />
    </div>
  );
}

export default OrderOnlinePage;

