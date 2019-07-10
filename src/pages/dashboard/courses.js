import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as dashboardActions, selectors as dashboardSelectors} from '../../redux/ducks/dashboard';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {actions as stateActions} from '../../redux/ducks/state';
import DashboardLayout from '../../layouts/dashboard';
import CourseFilters from '../../components/courseFilters';
import DashboardGrid from '../../components/dashboardGrid';
import CourseCard from '../../components/courseCard';
import {prettyPercent, clickAction} from '../../utils/componentHelpers';
import {getMatchForPath, getLastestCourseSlugResumeCourseUrl} from '../../utils/pathHelpers';
import {getResumeCourseUrl} from '../../utils/routeHelpers';

class DashboardCourses extends Component {
  componentDidMount() {
    this.props.actions.getProgress();
  }

  render() {
    const {progress, loadingProgress, user, enrollments, actions} = this.props;

    return (
      <DashboardLayout sidebar={CourseFilters} showWelcome loading={loadingProgress} title="Self-Paced Courses" activeLink={2}>
        <DashboardGrid>
          {progress.get('courses').map(course => (
            <CourseCard
              full
              key={course.getIn(['course', 'id'])}
              course={course.get('course')}
              progress={course.get('percentage_completed')}
              recommended={course.getIn(['course', 'recommended']) ? 'Recommended for you' : null}
            />
          ))}
        </DashboardGrid>
      </DashboardLayout>
    );
  }
}

DashboardCourses.getInitialProps = async ctx => {
  const {store} = ctx;
  store.dispatch(courseActions.coursesInit());
};

DashboardCourses.propTypes = {
  loadingProgress: PropTypes.bool,
  errorProgress: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  progress: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  progress: dashboardSelectors.getProgress(state),
  loadingProgress: loadingSelectors.getLoading(['DASHBOARD_PROGRESS'])(state),
  errorProgress: errorSelectors.getError(['DASHBOARD_PROGRESS'])(state),
  user: userSelectors.getUser(state),
  enrollments: dashboardSelectors.getEnrollments(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...dashboardActions,
      ...stateActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCourses);
