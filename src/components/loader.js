import PropTypes from 'prop-types';
import React from 'react';

const Loader = ({colors, id, loading, width, height, center, position, text}) => {
  const classList = ['async-loader'];

  if (center) {
    classList.push('async-loader--center');
  }

  if (position) {
    classList.push(position);
  }

  if (loading) {
    classList.push('loading');
  }

  return (
    <div className={classList.join(' ')} style={{width, height: text ? height + 16 : height}}>
      <svg width={width} height={height} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%" >
            <stop offset="0%" stopColor={[colors[0]]}>
              <animate attributeName="stop-color" values={`${colors[0]};${colors[0]};${colors[0]}`} dur="4s" repeatCount="indefinite"></animate>
            </stop>
            <stop offset="100%" stopColor={[colors[1]]}>
              <animate attributeName="stop-color" values={`${colors[1]};${colors[1]};${colors[1]}`} dur="4s" repeatCount="indefinite"></animate>
            </stop>
          </linearGradient>
        </defs>
        <circle className="circle" cx="50" cy="50" r="30" fill="none" style={{stroke: `url(#${id})`}}></circle>
      </svg>
      {text ? <p>{text}</p> : null}
    </div>
  );
};

Loader.propTypes = {
  id: PropTypes.string,
  colors: PropTypes.array,
  loading: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  center: PropTypes.bool,
  position: PropTypes.string,
  text: PropTypes.string
};

Loader.defaultProps = {
  id: 'loaderGradient',
  colors: ['#7A5FFF', '#01FF89'],
  width: 45,
  height: 45,
  center: true
};

export default Loader;
