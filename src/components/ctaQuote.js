import React from 'react';
import PropTypes from 'prop-types';
import Image from './image';

const CtaQuote = ({children, cite, image, imageStyle}) => (
  <div className="cta-quote">
    <blockquote>
      {children}
      <cite>{cite}</cite>
    </blockquote>
    <Image wrapStyle={imageStyle} src={image}/>
  </div>
);

CtaQuote.propTypes = {
  children: PropTypes.any,
  cite: PropTypes.string,
  image: PropTypes.string,
  imageStyle: PropTypes.object
};

export default CtaQuote;
