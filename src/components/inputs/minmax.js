import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {noop} from '../../utils/componentHelpers';

class MinMaxInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      down: false,
      percentageMin: 0,
      percentageMax: 0,
      valueMin: props.valueMin,
      valueMax: props.valueMax
    };

    this.el = createRef();
    this.control = null;

    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      percentageMin: this.getPercentageFromValue(this.props.valueMin),
      percentageMax: this.getPercentageFromValue(this.props.valueMax)
    });
  }

  getXPos(x) {
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

    if (distance > total) {
      distance = total;
    }

    let percentage = distance;

    // if (percentage > 100) {
    //   percentage = 100;
    // }

    return percentage;
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

    let percentage = distance / total;

    if (percentage > 1) {
      percentage = 1;
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

    return this.getXPos(x);
  }

  getValueFromX(x) {
    return Math.round(this.props.max * this.getPercentage(x));
  }

  getXPosFromEvent(e) {
    const event = e.touches && e.touches[0] ? e.touches[0] : e;

    return event.clientX;
  }

  handleDocumentDrag(e) {
    e.preventDefault();
  }

  handleMinChange(e) {
    this.handleMinValueChange(parseFloat(e.target.value));
  }

  handleMaxChange(e) {
    this.handleMaxValueChange(parseFloat(e.target.value));
  }

  handleMinValueChange(value) {
    this.props.onMinChange(value);
    this.setState({
      percentageMin: this.getPercentageFromValue(value)
    });
  }

  handleMaxValueChange(value) {
    this.props.onMaxChange(value);
    this.setState({
      percentageMax: this.getPercentageFromValue(value)
    });
  }

  handleMouseDown(control) {
    return e => {
      this.control = control;

      this.handleMouseEvent(e);

      document.addEventListener('mousemove', this.handleMouseMove, {passive: false});
      document.addEventListener('touchmove', this.handleDocumentDrag, {passive: false});
      document.addEventListener('mouseup', this.handleMouseUp);
      document.body.style.overflowX = 'hidden';
    };
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

  handleMouseUp(e) {
    this.setState({
      down: false
    });

    const x = this.getXPosFromEvent(e);
    let value = this.getValueFromX(x);

    if (this.control === 'max') {
      this.props.onMaxChange(value);
    }

    if (this.control === 'min') {
      this.props.onMinChange(value);
    }

    this.control = null;

    document.body.style.overflowX = null;

    document.removeEventListener('mousemove', this.handleMouseMove, {passive: false});
    document.removeEventListener('touchmove', this.handleDocumentDrag, {passive: false});
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseEvent(e, down = true) {
    const x = this.getXPosFromEvent(e);
    let value = this.getValueFromX(x);
    const control = this.control;

    if (control === 'min') {
      if (value >= this.props.valueMax) {
        value = this.props.valueMax - 1;
      }

      if (value < 0) {
        value = 0;
      }

      return this.setState({
        down,
        valueMin: value,
        percentageMin: this.getXPos(x)
      });
    }

    if (control === 'max') {
      if (value <= this.props.valueMin) {
        value = this.props.valueMin + 1;
      }

      if (value >= this.props.max) {
        value = this.props.max;
      }

      this.setState({
        down,
        valueMax: value,
        percentageMax: this.getXPos(x)
      });
    }
  }

  render() {
    const {percentageMin, percentageMax} = this.state;

    return (
      <div
        ref={this.el}
        draggable
        className="range-input minmax"
      >
        <div className="bar"/>
        <div
          className="progress"
          style={{
            left: percentageMin,
            width: percentageMax - percentageMin
          }}
        />
        <div
          onMouseDown={this.handleMouseDown('min')}
          onTouchStart={this.handleMouseDown('min')}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          onTouchCancel={this.handleMouseUp}
          className="indicator min"
          style={{
            transform: `translateX(${percentageMin}px)`
          }}
        >
          <span>{this.state.valueMin} hrs</span>
        </div>
        <div
          onMouseDown={this.handleMouseDown('max')}
          onTouchStart={this.handleMouseDown('max')}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          onTouchCancel={this.handleMouseUp}
          className="indicator max"
          style={{
            transform: `translateX(${percentageMax}px)`
          }}
        >
          <span>{this.state.valueMax} hrs</span>
        </div>
        <input
          id={this.props.idMin}
          name={this.props.idMin}
          type="range"
          value={this.props.valueMin}
          className="input"
          min={0}
          max={this.props.max}
          onChange={this.handleMinChange}
        />
        <input
          id={this.props.idMax}
          name={this.props.idMax}
          type="range"
          value={this.props.valueMax}
          className="input"
          min={0}
          max={this.props.max}
          onChange={this.handleMaxChange}
        />
      </div>
    );
  }
}

MinMaxInput.propTypes = {
  max: PropTypes.number,
  onMinChange: PropTypes.func,
  onMaxChange: PropTypes.func,
  valueMin: PropTypes.number,
  valueMax: PropTypes.number,
  idMin: PropTypes.string,
  idMax: PropTypes.string
};

MinMaxInput.defaultProps = {
  max: 10,
  onMinChange: noop,
  onMaxChange: noop,
  valueMin: 2,
  valueMax: 7
};

export default MinMaxInput;
