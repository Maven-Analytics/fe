import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {fromJS} from 'immutable';

import Checkbox from './inputs/checkbox';
import {stateCheck} from '../utils/componentHelpers';
import CourseAuthor from './courseAuthor';

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
            checked={active.contains(option.get('value')) || false}
            key={option.get('value')}
            name={`${id}[${option.get('value')}]`}
            id={`${id}[${option.get('value')}]`}
            onChange={stateCheck(this.handleChange, option.get('value'))}
          >
            {option.has('author') ? <CourseAuthor name={option.getIn(['author', 'name'])} thumbnail={option.getIn(['author', 'thumbnail'])}/> : option.get('label')}
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
