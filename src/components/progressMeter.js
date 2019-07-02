import React from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from './trackVisibility';
import CountUp from './countup';
import {prettyPercent} from '../utils/componentHelpers';

const ProgressMeter = ({value, title, barHeight, animationDuration}) => {
  return (
    <TrackVisibility alwaysShow>
      {inView => (
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
                  width: inView ? `${value * 100}%` : 0,
                  transitionDuration: `${animationDuration}ms`
                }}
              />
            </div>
            <span className="progress-meter__readout">
              <CountUp disabled={!inView} value={prettyPercent(value)} duration={animationDuration}/>%
            </span>
          </div>
        </div>
      )}
    </TrackVisibility>
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
