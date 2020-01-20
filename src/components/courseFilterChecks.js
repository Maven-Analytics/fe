import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import {check} from '#root/utils/componentHelpers';

import CourseAuthor from './courseAuthor';
import Checkbox from './inputs/checkbox';

class CourseFilterChecks extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    return checked => {
      if (checked) {
        return this.props.onCheck(val);
      }

      return this.props.onUncheck(val);
    };
  }

  render() {
    const {active, id, label, options, valueKey} = this.props;

    return (
      <div className="form-group form-group--dark course-filter">
        <label htmlFor={id}>{label}</label>
        {options.map(option => (
          <Checkbox
            checked={active.contains(option.get(valueKey)) || false}
            key={option.get('title')}
            name={`${id}[${option.get('title')}]`}
            id={`${id}[${option.get('title')}]`}
            onChange={check(this.handleChange(option.get(valueKey)))}
          >
            {option.has('image') ? <CourseAuthor name={option.get('title')} thumbnail={option.get('image')}/> : option.get('title')}
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
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func,
  valueKey: PropTypes.string
};

CourseFilterChecks.defaultProps = {
  valueKey: 'id'
};

export default CourseFilterChecks;
