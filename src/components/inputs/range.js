import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop, stateNum} from '../../utils/componentHelpers';

class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      down: false,
      x: 0
    };

    this.el = createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getPercentage(x) {
    if (!this.el || !this.el.current) {
      return 0;
    }

    const {current: el} = this.el;

    const total = el.offsetWidth;
    let distance = x - el.offsetLeft;

    if (distance < 0) {
      distance = 0;
    }

    let percentage = distance / total * 100;

    if (percentage > 100) {
      percentage = 100;
    }

    return percentage;
  }

  getXFromValue(value = this.state.value) {
    if (!this.el || !this.el.current) {
      return 0;
    }

    const {current: el} = this.el;

    const total = el.offsetWidth;
    const x = (total / this.props.max * value) + el.offsetLeft;

    return x;
  }

  componentDidUpdate() {
    if (this.props.value !== this.state.value) {
      this.handleChange(this.props.value);
    }
  }

  handleChange(state) {
    if (state) {
      this.handleValueChange(state.value);
    }
  }

  handleValueChange(value) {
    this.setState({
      x: this.getXFromValue(value),
      value
    }, () => {
      this.props.onChange(value);
    });
  }

  handleKeyDown() {
    this.getXFromValue();
  }

  handleMouseDown(e) {
    const event = e.touches && e.touches[0] ? e.touches[0] : e;

    this.setState({
      down: true,
      x: event.clientX
    });

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  cancelDocumentTouches(e) {
    e.preventDefault();
  }

  handleMouseMove(e) {
    if (!this.state.down) {
      return;
    }

    const event = e.touches && e.touches[0] ? e.touches[0] : e;

    this.setState({
      x: event.clientX,
      value: Math.round(this.getPercentage(event.clientX) / this.props.max)
    });
  }

  handleMouseUp(e) {
    const event = e.touches && e.touches[0] ? e.touches[0] : e;

    this.setState({
      down: false,
      x: event.clientX
    });

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const {x} = this.state;
    const percentage = this.getPercentage(x);

    return (
      <div
        ref={this.el}
        className="range-input"
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
        onTouchCancel={this.handleMouseUp}
      >
        <div className="bar"/>
        <div
          className="progress"
          style={{
            width: `${percentage}%`
          }}
        />
        <div
          className="indicator"
          style={{
            transform: `translateX(${percentage}%)`
          }}
        />
        <input
          type="range"
          value={this.state.value}
          className="input"
          min={0}
          max={this.props.max}
          onChange={stateNum(this.handleChange, 'value')}
        />
      </div>
    );
  }
}

RangeInput.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number
};

RangeInput.defaultProps = {
  max: 10,
  onChange: noop,
  value: 0
};

export default RangeInput;
