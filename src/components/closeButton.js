import React from 'react';
import PropTypes from 'prop-types';

import Hamburger from './hamburger';

const CloseButton = ({className, onClick}) => {
  return (
    <Hamburger isActive onClick={onClick} extraClass={`${className} close-button`}/>
  );
};

CloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default CloseButton;
