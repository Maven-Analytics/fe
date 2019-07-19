import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {fromJS} from 'immutable';

import Checkbox from './inputs/checkbox';
import {stateCheck} from '../utils/componentHelpers';

class CourseFilterChecks extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  getSetValues() {
    return fromJS(this.state)
      .filter(f => f)
      .keySeq()
      .toJS();
  }

  handleChange(state) {
    return this.setState(state, () => {
      this.props.onChange(this.getSetValues());
    });
  }

  render() {
    const {active, id, label, options} = this.props;

    return (
      <div className="form-group form-group--dark course-filter">
        <label htmlFor={id}>{label}</label>
        {options.map(option => (
          <Checkbox
            checked={this.state[option.get('label')] || false}
            key={option.get('value')}
            name={`${id}[${option.get('label')}]`}
            id={`${id}[${option.get('label')}]`}
            onChange={stateCheck(this.handleChange, option.get('label'))}
          >
            {option.has('image') ? option.get('image') : null}
            {option.get('label')}
          </Checkbox>
        ))}
      </div>
    );
  }
}

CourseFilterChecks.propTypes = {
  active: ImmutablePropTypes.list,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: ImmutablePropTypes.list,
  onChange: PropTypes.func
};

export default CourseFilterChecks;
