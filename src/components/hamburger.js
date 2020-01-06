import PropTypes from 'prop-types';
import React from 'react';

const Hamburger = ({isActive, onClick, extraClass}) => {
  const className = ['hamburger', 'hamburger--slider'];

  if (isActive) {
    className.push('is-active');
  }

  if (extraClass) {
    className.push(extraClass);
  }

  return (
    <button className={className.join(' ')} onClick={onClick}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

Hamburger.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  extraClass: PropTypes.string
};

export default Hamburger;
