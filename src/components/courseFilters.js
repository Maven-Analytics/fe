import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
    }
  }

  render() {
    const {title} = this.props;

    return (
      <div className="course-filters">
        <h4>{title}</h4>
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
