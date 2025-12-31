import React from 'react';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import Chicago from '../components/Chicago';

/**
 * HomePage component
 * Main landing page for Little Lemon restaurant
 */
function HomePage() {
  return (
    <>
      <Hero />
      <Menu />
      <Testimonials />
      <Chicago />
    </>
  );
}

export default HomePage;

