import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as courseActions, selectors as courseSelectors} from '../../redux/ducks/courses';
import {selectors as errorSelectors} from '../../redux/ducks/error';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import {actions as stateActions} from '../../redux/ducks/state';
import DashboardLayout from '../../layouts/dashboard';
import CourseFilters from '../../components/courseFilters';
import DashboardGrid from '../../components/dashboardGrid';
import CourseCard from '../../components/courseCard';
import Image from '../../components/image';
import DashboardNoData from '../../components/dashboardNoData';
import {clickAction} from '../../utils/componentHelpers';

class DashboardCourses extends Component {
  componentDidMount() {
    this.props.actions.coursesFilter();
  }

  render() {
    const {loading, courses, actions} = this.props;

    return (
      <DashboardLayout sidebar={CourseFilters} showWelcome loading={loading} title="Self-Paced Courses" activeLink={2}>
        <DashboardGrid>
          {loading === false && courses.count() > 0 && courses.map(course => (
            <CourseCard
              full
              key={course.get('id')}
              course={course}
              progress={course.get('percentage_completed')}
              recommended={course.get('recommended') ? 'Recommended for you' : null}
              onView={clickAction(actions.modalOpen, 'courseDrawer', course)}
            />
          ))}
          {loading === false && courses.count() === 0 ? (
            <DashboardNoData
              text="No courses found!"
              className="grid-span-2"
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
        </DashboardGrid>
      </DashboardLayout>
    );
  }
}

// DashboardCourses.getInitialProps = async ctx => {
//   const {store, asPath} = ctx;

//   const url = asPath;

//   const search = url.split('?')[1] || '';

//   const query = qs.parse(search);
// };

DashboardCourses.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  courses: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  loading: loadingSelectors.getLoading(['COURSES_FILTER'])(state),
  error: errorSelectors.getError(['COURSES_FILTER'])(state),
  courses: courseSelectors.getCourses(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...courseActions,
      ...stateActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCourses);
