import React from 'react';
import PropTypes from 'prop-types';

const Scroller = ({progress, height, width}) => {
  return (
    <div className="scroller" style={{width}}>
      <div
        style={{
          height: `calc(100% - ${height}px)`,
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
