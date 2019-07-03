import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {List} from 'immutable';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import PageLayout from '../layouts/page';

const CourseList = ({courses}) => {
  return (
    <PageLayout>
      {courses.map(course => (
        <h1 key={course.get('id')}>{course.get('title')}</h1>
      ))}
    </PageLayout>
  );
};

CourseList.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(courseActions.coursesInit());

  return {};
};

CourseList.propTypes = {
  courses: ImmutablePropTypes.list.isRequired
};

CourseList.defaultProps = {
  courses: List()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state)
});

export default connect(mapStateToProps)(CourseList);
