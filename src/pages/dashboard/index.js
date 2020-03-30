import {fromJS} from 'immutable';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DashboardCard, DashboardCardBody, DashboardCardHeader} from 'maven-ui';
import {useMutation} from '@apollo/react-hooks';

import DashboardLayout from '#root/components/layout/dashboard';
import {actions as announcementActions, selectors as announcementSelectors} from '#root/redux/ducks/announcements';
import {actions as courseActions, selectors as courseSelectors} from '#root/redux/ducks/courses';
import {actions as credentialActions, selectors as credentialSelectors} from '#root/redux/ducks/credentials';
import {actions as dashboardActions, selectors as dashboardSelectors} from '#root/redux/ducks/dashboard';
import {selectors as enrollmentSelectors} from '#root/redux/ducks/enrollments';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as pathActions, selectors as pathSelectors} from '#root/redux/ducks/paths';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {actions as userSettingsActions, selectors as userSettingSelectors} from '#root/redux/ducks/userSettings';

import DashboardAnnouncements from '../../components/dashboardAnnouncements';
// Import DashboardCard from '../../components/dashboardCard';
import DashboardCourse from '../../components/dashboardCourse';
import DashboardCredential from '../../components/dashboardCredential';
import DashboardCredentialIcons from '../../components/dashboardCredentialIcons';
import DashboardGrid from '../../components/dashboardGrid';
import DashboardNoData from '../../components/dashboardNoData';
import DashboardOnboarding from '../../components/dashboardOnboarding';
import DashboardProgress from '../../components/dashboardProgress';
import DashboardRecommendedPath from '../../components/dashboardRecommendedPath';
import Image from '../../components/image';
import MaIcon from '../../components/maIcon';
import MediaQuery from '../../components/mediaQuery';
import Tabs from '../../components/tabs';
import withAuthSync from '../../components/withAuthSync';
import {Routes} from '../../routes';
import updateUserSettingsMutation from '#root/api/mutations/updateUserSettings';

// eslint-disable-next-line complexity
const DashboardPage = ({
  cardVisibility,
  latestEnrollment,
  loadingDashboard,
  loadingCourses,
  user,
  loadingPaths,
  announcements,
  loadingAnnouncements,
  onboarding,
  courses,
  paths,
  credentials
}) => {
  const dispatch = useDispatch();
  const [updateUserSettings] = useMutation(updateUserSettingsMutation);

  useEffect(() => {
    dispatch(pathActions.pathsGet());
    dispatch(courseActions.coursesInit());
    dispatch(
      announcementActions.announcementsGet({
        order: '-fields.date'
      })
    );

    // V2 calls
    dispatch(dashboardActions.dashboardGet());
  }, []);

  const recommendedUserPath = user.getIn(['recommended_paths', 0]);
  let recommendedPath = null;

  if (recommendedUserPath) {
    recommendedPath = paths.find(p => p.get('id').toString() === recommendedUserPath.get('id').toString());
  }

  const completed = paths
    .filter(p => p.get('percentage_completed') >= 1)
    .concat(courses.filter(c => c.get('percentage_completed') >= 1))
    .filter(item => {
      const cred = credentials.find(c => c.get('group_id') === item.get('accredibleId'));

      return !cred;
    })
    .concat(credentials)
    .map(comp => {
      if (!comp || !comp.get('group_id')) {
        return comp;
      }

      let item = courses.find(c => c.get('accredibleId') === comp.get('group_id'));

      if (!item) {
        item = paths.find(p => p.get('accredibleId') === comp.get('group_id'));
      }

      if (!item) {
        return null;
      }

      return item;
    })
    .filter(item => item);

  const onboardingSettingKey = 'onboarding';
  const hasValue = cardVisibility.hasIn(['value', onboardingSettingKey]);
  const onboardingVisible = hasValue ? cardVisibility.getIn(['value', onboardingSettingKey]) : true;

  const onboardingComplete = onboarding.filter(f => f).count() === onboarding.count();

  const handleOnboardingHide = async e => {
    e.preventDefault();

    const {data: {updateUserSettings: userSettings} = {}} = await updateUserSettings({
      variables: {
        settings: [
          {
            setting_id: parseInt(cardVisibility.get('id'), 10),
            value: cardVisibility
              .update('value', u => {
                if (!u) {
                  u = fromJS({});
                }

                return u.set(onboardingSettingKey, !onboardingVisible);
              })
              .get('value')
          }
        ]
      }
    });

    dispatch(userSettingsActions.userSettingsSet(userSettings));
  };

  const Onboarding = (
    <DashboardCard hidden={onboardingVisible === false} loading={loadingDashboard}>
      <DashboardCardHeader
        buttons={
          onboardingComplete
            ? [
                {
                  onClick: handleOnboardingHide,
                  icon: 'eye-slash',
                  text: 'Hide'
                }
              ]
            : []
        }
        title="YOUR GETTING STARTED CHECKLIST"
      />
      <DashboardCardBody>
        {loadingDashboard === false ? (
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
        ) : (
          <div />
        )}
      </DashboardCardBody>
    </DashboardCard>
  );

  const RecentCourse = (
    <DashboardCard showWelcome settingsKey="recentCourse" loading={loadingDashboard || loadingCourses} title="Your Most Recent Course">
      <DashboardCardHeader title="Your Most Recent Course" />

      <DashboardCardBody>
        {(!latestEnrollment || latestEnrollment.isEmpty()) && loadingDashboard === false && loadingCourses === false ? (
          // eslint-disable-next-line
          <DashboardNoData btnText="View Courses" btnUrl={Routes.Courses} text="You haven’t started any courses yet. Let’s get started!">
            <Image
              src="/static/img/dashboard-no-data-328.png"
              wrapStyle={{
                paddingBottom: '70.12%'
              }}
              srcSet="/static/img/dashboard-no-data-328.png 328w,
              /static/img/dashboard-no-data-328.webp 328w,
              /static/img/dashboard-no-data-656.png 656w,
              /static/img/dashboard-no-data-656.webp 656w"
            />
          </DashboardNoData>
        ) : null}
        {latestEnrollment && !latestEnrollment.isEmpty() && loadingDashboard === false && loadingCourses === false ? (
          <DashboardCourse courseId={latestEnrollment.get('course_id')} percentage_completed={latestEnrollment.get('percentage_completed')} />
        ) : null}
      </DashboardCardBody>
    </DashboardCard>
  );

  const RecommendedPath = (
    <DashboardCard showWelcome settingsKey="recommendedPath" loading={loadingPaths}>
      <DashboardCardHeader title="Your Recommended Path" />
      <DashboardCardBody style={{position: loadingPaths ? 'relative' : 'static'}}>
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
      </DashboardCardBody>
    </DashboardCard>
  );

  const RockstarProgress = (
    <DashboardCard loading={loadingDashboard} settingsKey="rockstarProgress">
      <DashboardCardHeader title="Data Rockstar Progress" />
      <DashboardCardBody>
        <Tabs tabs={['Paths', 'Courses']}>
          <DashboardProgress items={paths} modal="pathDrawer" />
          <DashboardProgress items={courses} modal="courseDrawer" />
        </Tabs>
      </DashboardCardBody>
    </DashboardCard>
  );

  const NewsUpdates = (
    <DashboardCard settingsKey="news">
      <DashboardCardHeader title="News & Updates" />
      <DashboardCardBody>
        {(!announcements || announcements.isEmpty()) && loadingAnnouncements === false ? (
          <DashboardNoData text="Comming Soon!" />
        ) : (
          <DashboardAnnouncements announcements={announcements} />
        )}
      </DashboardCardBody>
    </DashboardCard>
  );

  const BadgeCreds = (
    <DashboardCard settingsKey="credentials" loading={loadingDashboard || loadingCourses}>
      <DashboardCardHeader title="Earned badges & credentials" />
      <DashboardCardBody>
        {loadingDashboard === false && loadingCourses === false && loadingDashboard === false && credentials.isEmpty() && completed.isEmpty() ? (
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
          // <DashboardCredentialIcons>
          //   {credentials.map(cred => {
          //     let item = courses.find(c => c.get('accredibleId') === cred.get('group_id'));

          //     if (!item) {
          //       item = paths.find(p => p.get('accredibleId') === cred.get('group_id'));
          //     }

          //     if (!item) {
          //       return null;
          //     }

          //     return <DashboardCredential key={item.get('id')} image={item.get('badge')} title={item.get('title')} />;
          //   })}
          // </DashboardCredentialIcons>
          <DashboardCredentialIcons>
            {completed.map(item => {
              return <DashboardCredential key={item.get('id')} image={item.get('badge')} title={item.get('title')} />;
            })}
          </DashboardCredentialIcons>
        )}
      </DashboardCardBody>
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
};

DashboardPage.propTypes = {
  cardVisibility: ImmutablePropTypes.map,
  loadingDashboard: PropTypes.bool,
  loadingCourses: PropTypes.bool,
  loadingPaths: PropTypes.bool,
  loadingAnnouncements: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func),
  latestEnrollment: ImmutablePropTypes.map,
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
  cardVisibility: userSettingSelectors.getUserSetting(state, 'dashboardCardVisibility'),
  latestEnrollment: enrollmentSelectors.getLatestEnrollment(state),
  onboarding: dashboardSelectors.getOnboarding(state),
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state),
  user: userSelectors.getUser(state),
  announcements: announcementSelectors.getAnnouncements(state),
  credentials: credentialSelectors.getCredentials(state),
  loadingDashboard: loadingSelectors.getLoading(['DASHBOARD_GET'])(state),
  loadingCourses: loadingSelectors.getLoading(['COURSESINIT'])(state),
  loadingPaths: loadingSelectors.getLoading(['PATHS_GET'])(state),
  loadingAnnouncements: loadingSelectors.getLoading(['ANNOUNCEMENTS_GET'])(state),
  loadingCredentials: loadingSelectors.getLoading(['CREDENTIALS_GET'])(state)
});

export default connect(mapStateToProps)(withAuthSync(DashboardPage));
