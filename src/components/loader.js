import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({loading, width, height, color, center}) => {
  const classList = ['loader'];

  if (center) {
    classList.push('loader--center');
  }

  if (loading) {
    classList.push('loading');
  }

  return (
    <div className={classList.join(' ')} style={{width, height}}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" stroke={color}>
        <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
          <circle cx="22" cy="22" r="6" strokeOpacity="0">
            <animate attributeName="r"
              begin="1.5s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
              begin="1.5s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="stroke-width"
              begin="1.5s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="6" strokeOpacity="0">
            <animate attributeName="r"
              begin="3s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
              begin="3s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
            <animate attributeName="stroke-width"
              begin="3s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate attributeName="r"
              begin="0s" dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  center: PropTypes.bool
};

Loader.defaultProps = {
  width: 45,
  height: 45,
  color: '#252525',
  center: true
};

export default Loader;