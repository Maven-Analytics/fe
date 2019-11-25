import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, List} from 'immutable';

import {actions as dashboardActions, selectors as dashboardSelectors} from '../../redux/ducks/dashboard';
import {actions as pathActions, selectors as pathSelectors} from '../../redux/ducks/paths';
import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {actions as announcementActions, selectors as announcementSelectors} from '../../redux/ducks/announcements';
import {actions as credentialActions, selectors as credentialSelectors} from '../../redux/ducks/credentials';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {selectors as userSelectors} from '../../redux/ducks/user';
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
import DashboardCredentialIcons from '../../components/dashboardCredentialIcons';
import DashboardCredential from '../../components/dashboardCredential';
import withAuthSync from '../../components/withAuthSync';
import DashboardRecommendedPath from '../../components/dashboardRecommendedPath';
import DashboardAnnouncements from '../../components/dashboardAnnouncements';
import DashboardOnboarding from '../../components/dashboardOnboarding';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.actions.pathsInit();
    this.props.actions.coursesInit();
    this.props.actions.getProgress();
    this.props.actions.getOnboarding();
    this.props.actions.credentialsGet();
    this.props.actions.announcementsGet({
      order: '-fields.date'
    });
  }

  // eslint-disable-next-line complexity
  render() {
    const {
      recentCourse,
      progress,
      loadingProgress,
      completedCourses,
      completedPaths,
      loadingCourses,
      user,
      loadingPaths,
      announcements,
      loadingAnnouncements,
      loadingCredentials,
      onboarding,
      loadingOnboarding,
      courses,
      paths,
      credentials
    } = this.props;
    const recommendedUserPath = user.getIn(['recommended_paths', 0]);
    let recommendedPath = null;

    if (recommendedUserPath) {
      recommendedPath = progress.get('paths').find(p => p.get('id').toString() === recommendedUserPath.get('id').toString());
    }

    const completed = fromJS([...completedPaths.toJS(), ...completedCourses.toJS()]);

    const Onboarding = (
      <DashboardCard loading={loadingOnboarding} title="YOUR GETTING STARTED CHECKLIST">
        {loadingOnboarding === false ? (
          <DashboardOnboarding
            onboarding={onboarding}
            items={fromJS([
              {
                text: 'Complete the match survey',
                complete: onboarding.get('completedMatch'),
                linkUrl: Routes.WelcomeSurvey,
                linkText: 'Start Survey'
              },
              {
                text: 'Start your first course',
                complete: onboarding.get('startedCourse')
              },
              {
                text: 'Complete a benchmark assessment',
                complete: onboarding.get('completedBenchmark')
              },
              {
                text: 'Earn your first credential',
                complete: onboarding.get('earnedCredential')
              }
            ])}
          />
        ) : <div/>}
      </DashboardCard>
    );

    const RecentCourse = (
      <DashboardCard showWelcome loading={loadingProgress || loadingCourses} title="Your Most Recent Course">
        {(!recentCourse || recentCourse.isEmpty()) && loadingProgress === false && loadingCourses === false ? (
          <DashboardNoData btnText="View Courses" btnUrl={Routes.Courses} text="You haven’t started any courses yet. Let’s get started!">
            <Image
              src="/static/img/dashboard-no-data-328.png"
              wrapStyle={{
                paddingBottom: '70.12%'
              }}
              srcSet="
                /static/img/dashboard-no-data-328.png 328w,
                /static/img/dashboard-no-data-328.webp 328w,
                /static/img/dashboard-no-data-656.png 656w
                /static/img/dashboard-no-data-656.webp 656w,
              "
            />
          </DashboardNoData>
        ) : null}
        {recentCourse && !recentCourse.isEmpty() && loadingProgress === false ? (
          <DashboardCourse
            course={recentCourse}
            title={recentCourse.get('title')}
            percentage_completed={recentCourse.get('percentage_completed')}
            resumeUrl={recentCourse.get('url')}
            excerpt={recentCourse.get('excerpt')}
            badge={recentCourse.get('badge')}
          />
        ) : null}
      </DashboardCard>
    );

    const RecommendedPath = (
      <DashboardCard showWelcome loading={loadingPaths} title="Your Recommended Path">
        {(!recommendedPath || recommendedPath.isEmpty()) && loadingPaths === false ? (
          <DashboardNoData
            btnText="Take Survey"
            btnUrl={Routes.WelcomeSurvey}
            imgWidth={176}
            title="Take the Match Survey to find your personal recommended learning path!"
            btnClass="btn btn--default"
          >
            <Image
              src="/static/img/dashboard-no-data-328.png"
              wrapStyle={{
                paddingBottom: '79.55%'
              }}
              srcSet="
                /static/img/no-data-match-survey-176.png 176w,
                /static/img/no-data-match-survey-356.png 356w
              "
            />
          </DashboardNoData>
        ) : null}
        {recommendedPath && !recommendedPath.isEmpty() && loadingPaths === false ? (
          <DashboardRecommendedPath
            path={recommendedPath}
            match={recommendedUserPath.get('percentage')}
            title={recommendedPath.get('title')}
            percentage_completed={recommendedPath.get('percentage_completed')}
            excerpt={recommendedPath.get('excerpt')}
            badge={recommendedPath.get('badge')}
          />
        ) : null}
      </DashboardCard>
    );

    const RockstarProgress = (
      <DashboardCard loading={loadingProgress} title="Data Rockstar Progress">
        <Tabs tabs={['Paths', 'Courses']}>
          <DashboardProgress items={progress.get('paths')} modal="pathDrawer" />
          <DashboardProgress items={progress.get('courses')} modal="courseDrawer" />
        </Tabs>
      </DashboardCard>
    );

    const NewsUpdates = (
      <DashboardCard title="News & Updates">
        {(!announcements || announcements.isEmpty()) && loadingAnnouncements === false ? (
          <DashboardNoData text="Comming Soon!" />
        ) : (
          <DashboardAnnouncements announcements={announcements} />
        )}
      </DashboardCard>
    );

    const BadgeCreds = (
      <DashboardCard title="Earned badges & credentials" loading={loadingProgress || loadingCourses || loadingCredentials}>
        {loadingProgress === false && loadingCourses === false && loadingCredentials && credentials.isEmpty() ? (
          <DashboardNoData
            btnText="View All Badges"
            btnUrl={Routes.DashboardCredentials}
            btnClass="btn btn--default"
            title="You haven’t earned any badges yet."
            text="Complete courses to earn badges and credentials."
          >
            <MaIcon icon="badge-alt" />
          </DashboardNoData>
        ) : (
          <DashboardCredentialIcons>
            {credentials.map(cred => {
              let item = courses.find(c => c.get('accredibleId') === cred.get('group_id'));

              console.log(paths.toJS());

              if (!item) {
                item = paths.find(p => p.get('accredibleId') === cred.get('group_id'));
              }

              if (!item) {
                return null;
              }

              return <DashboardCredential key={item.get('id')} image={item.get('badge')} title={item.get('title')} />
            })}
          </DashboardCredentialIcons>
        )}
      </DashboardCard>
    );

    return (
      <DashboardLayout showWelcome title="My Dashboard" activeLink={0}>
        <MediaQuery min="lg">
          <DashboardGrid horizontal>
            <DashboardGrid vertical>
              {Onboarding}
              {RecentCourse}
              {NewsUpdates}
            </DashboardGrid>
            <DashboardGrid vertical>
              {RecommendedPath}
              {RockstarProgress}
              {BadgeCreds}
            </DashboardGrid>
          </DashboardGrid>
        </MediaQuery>
        <MediaQuery max="lg">
          <DashboardGrid vertical>
            {Onboarding}
            {RecentCourse}
            {RecommendedPath}
            {RockstarProgress}
            {BadgeCreds}
            {NewsUpdates}
          </DashboardGrid>
        </MediaQuery>
      </DashboardLayout>
    );
  }
}

DashboardPage.propTypes = {
  loadingProgress: PropTypes.bool,
  loadingOnboarding: PropTypes.bool,
  loadingCourses: PropTypes.bool,
  loadingPaths: PropTypes.bool,
  loadingAnnouncements: PropTypes.bool,
  loadingCredentials: PropTypes.bool,
  errorProgress: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  recentCourse: ImmutablePropTypes.map,
  progress: ImmutablePropTypes.map,
  onboarding: ImmutablePropTypes.map,
  completedPaths: ImmutablePropTypes.list,
  completedCourses: ImmutablePropTypes.list,
  user: ImmutablePropTypes.map,
  announcements: ImmutablePropTypes.list,
  credentials: ImmutablePropTypes.list,
  courses: ImmutablePropTypes.list,
  paths: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  recentCourse: dashboardSelectors.getRecentCourse(state),
  progress: dashboardSelectors.getProgress(state),
  onboarding: dashboardSelectors.getOnboarding(state),
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state),
  loadingCourses: loadingSelectors.getLoading(['COURSESINIT'])(state),
  loadingPaths: loadingSelectors.getLoading(['PATHSINIT'])(state),
  loadingProgress: loadingSelectors.getLoading(['DASHBOARD_PROGRESS'])(state),
  loadingOnboarding: loadingSelectors.getLoading(['DASHBOARD_ONBOARDING'])(state),
  loadingAnnouncements: loadingSelectors.getLoading(['ANNOUNCEMENTS_GET'])(state),
  loadingCredentials: loadingSelectors.getLoading(['CREDENTIALS_GET'])(state),
  errorProgress: errorSelectors.getError(['DASHBOARD_PROGRESS'])(state),
  completedCourses: courseSelectors.getCompletedCourses(state),
  completedPaths: pathSelectors.getCompletedPaths(state),
  user: userSelectors.getUser(state),
  announcements: announcementSelectors.getAnnouncements(state),
  credentials: credentialSelectors.getCredentials(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions,
      ...pathActions,
      ...courseActions,
      ...announcementActions,
      ...credentialActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthSync(DashboardPage));
