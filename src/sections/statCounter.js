import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import TrackVisibility from '../components/trackVisibility';
import Countup from '../components/countup';

class StatCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inView: true
    };

    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState({
      inView: true
    });
  }

  render() {
    const {stats} = this.props;

    return (
      <TrackVisibility alwaysShow className="stat-counter" onShow={this.handleShow} offset={50} delay={100}>
        {inView => {
          return (
            <div className="container">
              <ul>
                {stats.map(stat => (
                  <li key={stat.get('value')}>
                    <span className="stat-counter__value">
                      <Countup duration={1500} disabled={!inView} value={stat.get('value')}/>
                      {stat.get('postFix')}
                    </span>
                    <span className="stat-counter__text">{stat.get('text')}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </TrackVisibility>
    );
  }
}

StatCounter.propTypes = {
  stats: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    value: PropTypes.number,
    text: PropTypes.string
  }))
};

export default StatCounter;
