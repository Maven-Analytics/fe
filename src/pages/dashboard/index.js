import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as dashboardActions, selectors as dashboardSelectors} from '../../redux/ducks/dashboard';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import DashboardLayout from '../../layouts/dashboard';
import DashboardCard from '../../components/dashboardCard';
import DashboardCourse from '../../components/dashboardCourse';
import DashboardGrid from '../../components/dashboardGrid';
import Tabs from '../../components/tabs';
import MediaQuery from '../../components/mediaQuery';
import {Routes} from '../../routes';
import DashboardProgress from '../../components/dashboardProgress';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.actions.getProgress();
  }

  render() {
    const {recentCourse, progress, loadingProgress} = this.props;

    console.log(progress.toJS());

    const RecentCourse = (
      <DashboardCard loading={loadingProgress} title="Your Most Recent Course">
        <DashboardCourse
          title={recentCourse.getIn(['course', 'title'])}
          percentage_completed={0.42}
          detailUrl={`${Routes.Course}/${recentCourse.getIn(['course', 'slug'])}`}
          resumeUrl={`${Routes.CourseTake}/${recentCourse.get('thinkificSlug')}`}
          excerpt={recentCourse.getIn(['course', 'excerpt'])}
          badge={recentCourse.getIn(['course', 'badge'])}
        />
      </DashboardCard>
    );

    const RockstarProgress = (
      <DashboardCard title="Data Rockstar Progress">
        <Tabs tabs={['Paths', 'Courses']}>
          <DashboardProgress items={progress.get('paths')}/>
          <DashboardProgress items={progress.get('courses')}/>
        </Tabs>
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
  }
}

DashboardPage.getInitialProps = async ctx => {
  const {store} = ctx;
  store.dispatch(pathActions.pathsInit());
  store.dispatch(courseActions.coursesInit());
};

DashboardPage.propTypes = {
  loadingProgress: PropTypes.bool,
  errorProgress: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  recentCourse: ImmutablePropTypes.map,
  progress: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  recentCourse: dashboardSelectors.getRecentCourse(state),
  progress: dashboardSelectors.getProgress(state),
  courses: courseSelectors.getCourses(state),
  loadingProgress: loadingSelectors.getLoading(['DASHBOARD_PROGRESS'])(state),
  errorProgress: errorSelectors.getError(['DASHBOARD_PROGRESS'])(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...dashboardActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
