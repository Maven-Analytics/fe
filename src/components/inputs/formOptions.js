import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {click} from '../../utils/componentHelpers';

class FormOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      value: props.value
    };
  }

  handleChange(value) {
    this.setState({value});
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="form-options">
        <ul>
          {this.props.options.map(option => {
            const classList = [];

            if (option === this.state.value) {
              classList.push('active');
            }

            return (
              <li key={option} className={classList.join(' ')}>
                <button type="button" role="button" onClick={click(this.handleChange, option)}>{option}</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

FormOptions.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any
};

export default FormOptions;
