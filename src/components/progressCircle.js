import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import TrackVisibility from './trackVisibility';

class ProgressCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barProps: {
        strokeDashoffset: 0
      }
    };

    this.circle = createRef();
    this.bar = createRef();
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percent !== this.props.percent) {
      this.init();
    }
  }

  init() {
    const {current: bar} = this.bar;
    let {percent} = this.props;

    if (!bar) {
      console.warn('Couldn\'t find ref: bar');
      return;
    }

    if (percent > 100) {
      percent = 100;
    }

    if (percent < 0) {
      percent = 0;
    }

    const length = bar.getTotalLength();

    this.setState({
      barProps: {
        strokeDashoffset: ((100 - percent) / 100) * length
      }
    });
  }

  render() {
    const {size, borderWidth} = this.props;
    const halfSize = size / 2;
    const radius = halfSize - borderWidth;
    const pathLength = (size - (borderWidth * 2)) * Math.PI;

    return (
      <TrackVisibility alwaysShow className="progress-circle">
        {inView => (
          <svg id="svg" width={size} height={size} viewport={`0 0 ${halfSize} ${halfSize}`} version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(-90)">
            <defs>
              <linearGradient id="progressCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F6FDA5" />
                <stop offset="100%" stopColor="#23E3D7" />
              </linearGradient>
            </defs>
            <circle ref={this.circle} stroke="#f3f3f3" strokeWidth={borderWidth} r={radius} cx={halfSize} cy={halfSize} fill="transparent" strokeDasharray={pathLength} strokeDashoffset="0"></circle>
            <circle ref={this.bar} stroke="url(#progressCircleGradient)" strokeWidth={borderWidth} id="bar" r={radius} cx={halfSize} cy={halfSize} fill="transparent" strokeDasharray={pathLength} style={{transition: 'all 0.5s 0.3s'}} strokeDashoffset={inView ? this.state.barProps.strokeDashoffset : pathLength}></circle>
          </svg>
        )}
      </TrackVisibility>
    );
  }
}

ProgressCircle.propTypes = {
  percent: PropTypes.number,
  size: PropTypes.number,
  borderWidth: PropTypes.number
};

ProgressCircle.defaultProps = {
  size: 116,
  borderWidth: 10
};

export default ProgressCircle;
