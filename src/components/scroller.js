import PropTypes from 'prop-types';
import React from 'react';

const Scroller = ({progress}) => {
  return (
    <div className="scroller">
      <div
        style={{
          transform: `translate3d(0, ${progress * 100}%, 0)`
        }}
      />
    </div>
  );
};

Scroller.propTypes = {
  progress: PropTypes.number.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

Scroller.defaultProps = {
  height: 6,
  width: 115
};

export default Scroller;
