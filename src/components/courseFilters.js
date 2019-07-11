import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CourseFilterChecks from './courseFilterChecks';
import {fromJS, List} from 'immutable';

class CourseFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tools: [],
      paths: [],
      instructors: [],
      skills: [],
      length: [],
      status: []
    };
  }

  render() {
    const {title} = this.props;

    return (
      <div className="course-filters">
        <h4>{title}</h4>
        <CourseFilterChecks
          id="status"
          label="Status"
          values={List()}
          options={fromJS([
            {
              label: 'Not Started',
              value: ['percentage_completed', '^[0]d*$']
            }
          ])}
        />
      </div>
    );
  }
}

CourseFilters.propTypes = {
  title: PropTypes.string
};

CourseFilters.defaultProps = {
  title: 'Filter Results'
};

export default CourseFilters;
