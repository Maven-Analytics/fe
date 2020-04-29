import PropTypes from 'prop-types';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {prettyPercent} from '#root/utils/componentHelpers';

import CountUp from './countup';

const ProgressMeter = ({value, title, barHeight, animationDuration}) => {
  return (
    <VisibilitySensor>
      {({isVisible}) => (
        <div className="progress-meter">
          {title ? <p>{title}</p> : null}
          <div className="progress-meter__inner">
            <div
              className="progress-meter__bar"
              style={{
                height: barHeight
              }}
            >
              <div
                className="progress-meter__value"
                style={{
                  width: isVisible ? `${value * 100}%` : 0,
                  transitionDuration: `${animationDuration}ms`
                }}
              />
            </div>
            <span className="progress-meter__readout">
              <CountUp disabled={!isVisible} value={prettyPercent(value)} duration={animationDuration} />%
            </span>
          </div>
        </div>
      )}
    </VisibilitySensor>
  );
};

ProgressMeter.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  barHeight: PropTypes.number,
  animationDuration: PropTypes.number
};

ProgressMeter.defaultProps = {
  barHeight: 10,
  animationDuration: 500
};

export default ProgressMeter;
