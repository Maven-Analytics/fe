import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Checkbox from './inputs/checkbox';
import {stateCheck} from '../utils/componentHelpers';

const CourseFilterChecks = ({values, id, label, options, onChange}) => (
  <div className="form-group form-group--dark course-filter">
    <label htmlFor={id}>{label}</label>
    {options.map(option => (
      <Checkbox
        checked={(values.indexOf(option.get('label')) > -1)}
        key={option.get('value')}
        name={`${id}[${option.get('label')}]`}
        id={`${id}[${option.get('label')}]`}
        onChange={stateCheck(onChange, option.get('label'))}
      >
        {option.has('image') ? option.get('image') : null}
        {option.get('label')}
      </Checkbox>
    ))}
  </div>
);

CourseFilterChecks.propTypes = {
  values: ImmutablePropTypes.list,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: ImmutablePropTypes.list,
  onChange: PropTypes.func
};

export default CourseFilterChecks;
