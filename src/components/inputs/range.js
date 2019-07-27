import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop} from '../../utils/componentHelpers';

class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      down: false,
      percentage: 0
    };

    this.el = createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      percentage: this.getPercentageFromValue(this.props.value)
    });
  }

  getPercentage(x) {
    if (!this.el || !this.el.current) {
      return 0;
    }

    const {current: el} = this.el;

    const elRect = el.getBoundingClientRect();
    const total = elRect.width;
    let distance = x - elRect.left;

    if (distance < 0) {
      distance = 0;
    }

    let percentage = distance / total * 100;

    if (percentage > 100) {
      percentage = 100;
    }

    return percentage;
  }

  getPercentageFromValue(value = this.state.value) {
    if (!this.el || !this.el.current) {
      return 0;
    }

    const {current: el} = this.el;
    const elRect = el.getBoundingClientRect();

    const total = elRect.width;
    const x = (total / this.props.max * value) + elRect.left;

    return this.getPercentage(x);
  }

  getValueFromX(x) {
    return Math.round(this.getPercentage(x) / this.props.max);
  }

  getXPosFromEvent(e) {
    const event = e.touches && e.touches[0] ? e.touches[0] : e;

    return event.clientX;
  }

  handleDocumentDrag(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.handleValueChange(parseFloat(e.target.value));
  }

  handleValueChange(value) {
    this.props.onChange({[this.props.id]: value});
    this.setState({
      percentage: this.getPercentageFromValue(value)
    });
  }

  handleMouseDown(e) {
    this.handleMouseEvent(e);

    document.addEventListener('mousemove', this.handleMouseMove, {passive: false});
    document.addEventListener('touchmove', this.handleDocumentDrag, {passive: false});
    document.addEventListener('mouseup', this.handleMouseUp);
    document.body.style.overflowX = 'hidden';
  }

  handleMouseMove(e) {
    if (!this.state.down) {
      return;
    }

    // Prevents selecting other elements when moving mouse around screen
    if (!e.touches) {
      e.preventDefault();
    }

    this.handleMouseEvent(e);
  }

  handleMouseUp() {
    this.setState({
      down: false
    });

    document.body.style.overflowX = null;

    document.removeEventListener('mousemove', this.handleMouseMove, {passive: false});
    document.removeEventListener('touchmove', this.handleDocumentDrag, {passive: false});
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseEvent(e, down = true) {
    const x = this.getXPosFromEvent(e);
    const value = this.getValueFromX(x);

    this.props.onChange({[this.props.id]: value});

    this.setState({
      down,
      percentage: this.getPercentage(x)
    });
  }

  render() {
    const {percentage} = this.state;

    return (
      <div
        ref={this.el}
        draggable
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
          id={this.props.id}
          name={this.props.id}
          type="range"
          value={this.props.value}
          className="input"
          min={0}
          max={this.props.max}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

RangeInput.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number,
  id: PropTypes.string.isRequired
};

RangeInput.defaultProps = {
  max: 10,
  onChange: noop,
  value: 0
};

export default RangeInput;
