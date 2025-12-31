import React, { useState } from 'react';
import './ImageWithFallback.css';

/**
 * ImageWithFallback component
 * Ensures UI doesn't break if an image fails to load
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} fallback - Fallback text or emoji to display
 * @param {object} className - Additional CSS classes
 * @param {object} style - Inline styles
 */
function ImageWithFallback({ src, alt, fallback = '🍽️', className = '', style = {} }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError || !src) {
    return (
      <div 
        className={`image-fallback ${className}`}
        style={style}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
    />
  );
}

export default ImageWithFallback;

