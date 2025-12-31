import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import './Testimonials.css';

/**
 * Testimonials component for Little Lemon restaurant
 * Displays customer reviews and ratings
 */
function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      review: 'Amazing Mediterranean cuisine! The atmosphere is warm and inviting, and the staff is incredibly friendly.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      fallback: '👩'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      review: 'Best restaurant in Chicago! The Greek Salad is fresh and the pasta dishes are outstanding.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      fallback: '👨'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 4,
      review: 'Great food and excellent service. The reservation process was smooth and easy.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      fallback: '👩'
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 5,
      review: 'Little Lemon has become our favorite spot. The specials are always creative and delicious!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      fallback: '👨'
    }
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-container">
        <h2 id="testimonials-heading">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="testimonial-card" aria-labelledby={`testimonial-${testimonial.id}`}>
              <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                {renderStars(testimonial.rating)}
              </div>
              <div className="testimonial-content">
                <p className="testimonial-review">"{testimonial.review}"</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-image-wrapper" aria-hidden="true">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={`${testimonial.name} profile picture`}
                    fallback={testimonial.fallback}
                    className="testimonial-image"
                  />
                </div>
                <div className="testimonial-name">{testimonial.name}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

