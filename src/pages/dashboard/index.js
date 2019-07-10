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
import DashboardNoData from '../../components/dashboardNoData';
import Image from '../../components/image';
import Tabs from '../../components/tabs';
import MediaQuery from '../../components/mediaQuery';
import {Routes} from '../../routes';
import DashboardProgress from '../../components/dashboardProgress';
import MaIcon from '../../components/maIcon';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.actions.getProgress();
  }

  render() {
    const {recentCourse, progress, loadingProgress} = this.props;

    const RecentCourse = (
      <DashboardCard showWelcome loading={loadingProgress} title="Your Most Recent Course">
        {(!recentCourse || recentCourse.isEmpty()) && loadingProgress === false ? (
          <DashboardNoData
            btnText="View Courses"
            btnUrl={Routes.Courses}
            text="You haven’t started any courses yet. Let’s get started!"
          >
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
        {!recentCourse.isEmpty() && loadingProgress === false ? (
          <DashboardCourse
            title={recentCourse.getIn(['course', 'title'])}
            percentage_completed={recentCourse.get('percentage_completed')}
            detailUrl={`${Routes.Course}/${recentCourse.getIn(['course', 'slug'])}`}
            resumeUrl={`${Routes.CourseTake}/${recentCourse.get('thinkificSlug')}`}
            excerpt={recentCourse.getIn(['course', 'excerpt'])}
            badge={recentCourse.getIn(['course', 'badge'])}
          />
        ) : null}
      </DashboardCard>
    );

    const RockstarProgress = (
      <DashboardCard loading={loadingProgress} title="Data Rockstar Progress">
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
        <DashboardNoData
          btnText="View All Badges"
          btnUrl={Routes.Badges}
          btnClass="btn btn--default"
          title="You haven’t earned any badges yet."
          text="Complete courses to earn badges and credentials."
        >
          <MaIcon icon="badge-alt"/>
        </DashboardNoData>
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
