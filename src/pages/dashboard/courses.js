import PropTypes from 'prop-types';
import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DashboardLayout from '#root/components/layout/dashboard';
import {actions as courseActions, selectors as courseSelectors} from '#root/redux/ducks/courses';
import {selectors as errorSelectors} from '#root/redux/ducks/error';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {selectors as subscriptionSelectors} from '#root/redux/ducks/subscription';

import CourseCard from '../../components/courseCard';
import CourseFilters from '../../components/courseFilters';
import DashboardGrid from '../../components/dashboardGrid';
import DashboardNoData from '../../components/dashboardNoData';
import Image from '../../components/image';
import withAuthSync from '../../components/withAuthSync';
import {Routes} from '../../routes';
import {prettyPercent} from '../../utils/componentHelpers';
import {subscriptionEnrolled} from '../../utils/subscriptionHelpers';

class DashboardCourses extends Component {
  componentDidMount() {
    this.props.actions.coursesFilter();
  }

  render() {
    const {loading, subscription, courses} = this.props;

    return (
      <DashboardLayout sidebar={CourseFilters} showWelcome loading={loading} title="Self-Paced Courses" activeLink={2}>
        <DashboardGrid>
          {loading === false &&
            courses.count() > 0 &&
            courses.map(course => (
              <CourseCard
                full
                key={course.get('id')}
                resumeUrl={subscriptionEnrolled(subscription) ? course.get('url') : Routes.Signup}
                match={`${prettyPercent(course.get('match'))}%`}
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

DashboardCourses.getInitialProps = async () => {
  return {
    loading: true
  };
};

DashboardCourses.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  subscription: ImmutablePropTypes.map,
  courses: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['COURSES_FILTER'])(state),
  error: errorSelectors.getError(['COURSES_FILTER'])(state),
  subscription: subscriptionSelectors.getSubscription(state),
  courses: courseSelectors.getCourses(state)
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
