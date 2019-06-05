import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({children}) => {
  return (
    <div className="carousel-slide">
      {children}
    </div>
  );
};

CarouselSlide.propTypes = {
  children: PropTypes.node.isRequired
};

export default CarouselSlide;
