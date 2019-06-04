import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Countup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.interval = null;
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startCount();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled && !this.props.disabled) {
      this.startCount();
    }
  }

  startCount() {
    clearInterval(this.interval);
    this.interval = setInterval(this.run.bind(this), this.props.speed);
  }

  run() {
    const {value, duration, speed} = this.props;

    this.setState(prevState => {
      const increment = value / (duration / speed);
      let count = prevState.count + increment;

      if (count >= value) {
        clearInterval(this.interval);
        count = value;
      }

      return {
        count
      };
    });
  }

  getPrettyNumber(count) {
    count = Math.floor(count);
    count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return count;
  }

  render() {
    const {count} = this.state;

    return this.getPrettyNumber(count);
  }
}

Countup.propTypes = {
  value: PropTypes.number,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  speed: PropTypes.number
};

Countup.defaultProps = {
  duration: 5000,
  speed: 30
};

export default Countup;
