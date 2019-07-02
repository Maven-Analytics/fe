import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import DashboardLayout from '../../layouts/dashboard';
import DashboardCard from '../../components/dashboardCard';
import DashboardCourse from '../../components/dashboardCourse';
import DashboardGrid from '../../components/dashboardGrid';
import MediaQuery from '../../components/mediaQuery';
import {Routes} from '../../routes';

const DashboardPage = ({courses}) => {
  const course = courses.first();

  const RecentCourse = (
    <DashboardCard title="Your Most Recent Course">
      <DashboardCourse
        title={course.get('title')}
        percentage_completed={0.42}
        detailUrl="/"
        resumeUrl={`${Routes.CourseTake}/${course.get('slug')}`}
        excerpt={course.get('excerpt')}
        badge={course.get('badge')}
      />
    </DashboardCard>
  );

  const RockstarProgress = (
    <DashboardCard title="Data Rockstar Progress">
      paths/courses go here
    </DashboardCard>
  );

  const NewsUpdates = (
    <DashboardCard title="News & Updates">
      news & updates
    </DashboardCard>
  );

  const BadgeCreds = (
    <DashboardCard title="Earned badges & credentials">
      badges & creds
    </DashboardCard>
  );

  console.log(course.toJS());
  return (
    <DashboardLayout title="My Dashboard" activeLink={0}>
      <MediaQuery min="lg">
        <DashboardGrid horizontal>
          <DashboardGrid vertical>
            {RecentCourse}
            {NewsUpdates}
          </DashboardGrid>
          <DashboardGrid vertical>
            {RockstarProgress}
            {BadgeCreds}
          </DashboardGrid>
        </DashboardGrid>
      </MediaQuery>
      <MediaQuery max="lg">
        <DashboardGrid vertical>
          {RecentCourse}
          {RockstarProgress}
          {BadgeCreds}
          {NewsUpdates}
        </DashboardGrid>
      </MediaQuery>
    </DashboardLayout>
  );
};

DashboardPage.getInitialProps = async ctx => {
  const {store} = ctx;
  store.dispatch(pathActions.pathsInit());
  store.dispatch(courseActions.coursesInit());
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state)
  // surveyResults: surveyResultSelectors.getSurveyResult(state),
  // recommendedCourses: surveyResultSelectors.getRecommendedCourses(state),
  // recommendedPaths: surveyResultSelectors.getRecommendedPaths(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
