import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
import DashboardLayout from '../../layouts/dashboard';
import CourseFilters from '../../components/courseFilters';
import DashboardGrid from '../../components/dashboardGrid';
import CourseCard from '../../components/courseCard';
import Image from '../../components/image';
import DashboardNoData from '../../components/dashboardNoData';
import withAuthSync from '../../components/withAuthSync';
import {getMatchScoreForCourse} from '../../utils/courseHelpers';
import {prettyPercent} from '../../utils/componentHelpers';
import {Routes} from '../../routes';
import {userEnrolled} from '../../utils/userHelpers';

class DashboardCourses extends Component {
  componentDidMount() {
    this.props.actions.coursesFilter();
  }

  render() {
    const {loading, user, courses} = this.props;

    return (
      <DashboardLayout sidebar={CourseFilters} showWelcome loading={loading} title="Self-Paced Courses" activeLink={2}>
        <DashboardGrid>
          {loading === false &&
            courses.count() > 0 &&
            courses.map(course => (
              <CourseCard
                full
                key={course.get('id')}
                resumeUrl={userEnrolled(user) ? course.get('url') : Routes.Signup}
                match={`${prettyPercent(getMatchScoreForCourse(course, user))}%`}
                course={course}
                progress={course.get('percentage_completed')}
                recommended={course.get('recommended') ? 'Recommended for you' : null}
              />
            ))}
          {loading === false && courses.count() === 0 && process.browser ? (
            <DashboardNoData text="No courses found!" className="grid-span-2">
              <Image
                src="/static/img/dashboard-no-data-328.jpg"
                wrapStyle={{
                  paddingBottom: '70.12%'
                }}
                srcSet="
                  /static/img/dashboard-no-data-328.webp 328w,
                  /static/img/dashboard-no-data-328.jpg 328w,
                  /static/img/dashboard-no-data-656.webp 656w,
                  /static/img/dashboard-no-data-656.jpg 656w
                "
              />
            </DashboardNoData>
          ) : null}
        </DashboardGrid>
      </DashboardLayout>
    );
  }
}

DashboardCourses.getInitialProps = async ctx => {
  const {store, asPath} = ctx;

  // Store.dispatch(courseActions.coursesFilter());
  // store.dispatch(dashboardActions.getProgress());

  // const url = asPath;

  // const search = url.split('?')[1] || '';

  // const query = qs.parse(search);

  return {
    loading: true
  };
};

DashboardCourses.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  user: ImmutablePropTypes.map,
  courses: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['COURSES_FILTER'])(state),
  error: errorSelectors.getError(['COURSES_FILTER'])(state),
  user: userSelectors.getUser(state),
  courses: courseSelectors.getCoursesByCompletionDesc(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...courseActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthSync(DashboardCourses));
