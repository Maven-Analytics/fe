import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Router, {withRouter} from 'next/router';
import qs from 'query-string';
import {bindActionCreators} from 'redux';
import {TransitionMotion, spring, presets} from 'react-motion';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import {actions as stateActions} from '../redux/ducks/state';
import {selectors as loadingSelectors} from '../redux/ducks/loading';
import {handleScrollIntoView, click, clickAction, absolutePosition} from '../utils/componentHelpers';
import Brochure from '../layouts/brochure';
import PathListingItem from '../components/pathListingItem';
import CourseHero from '../components/courseHero';
import MaIcon from '../components/maIcon';
import CtaSurvey from '../sections/ctaSurvey';
import OffmenuFilters from '../modals/offmenuFilters';
import DashboardGrid from '../components/dashboardGrid';
import CourseCard from '../components/courseCard';
import Loader from '../components/loader';
import CoursePathNav from '../components/coursePathNav';

class CoursesLearningPaths extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.view,
      items: [props.view]
    };

    this.handleNavClick = this.handleNavClick.bind(this);
    this.willLeave = this.willLeave.bind(this);
    this.willEnter = this.willEnter.bind(this);
  }

  handleNavClick(activeItem) {
    this.setState({activeItem, items: [activeItem]});

    const href = {
      pathname: this.props.router.pathname,
      query: {
        view: activeItem
      }
    };

    this.props.actions.offmenuClose('filters');

    Router.push(href, href, {shallow: true});
  }

  getStyles() {
    return this.state.items.map(item => {
      return {
        key: item,
        style: {
          opacity: spring(1, presets.stiff),
          x: spring(0, presets.stiff)
        }
      };
    });
  }

  willLeave() {
    return {
      position: 0,
      opacity: spring(0, presets.stiff),
      x: this.state.activeItem === 'paths' ? spring(50, presets.stiff) : spring(-50, presets.stiff)
    };
  }

  willEnter() {
    return {
      opacity: 0,
      x: this.state.activeItem === 'paths' ? -50 : 50
    };
  }

  getTabStyle(style) {
    const s = {
      opacity: style.opacity
    };

    if (style.position === 0) {
      s.position = 'absolute';
    }

    if (style.x) {
      s.transform = `translate3d(${style.x}px, 0, 0)`;
    }

    return s;
  }

  renderPaths(style) {
    const {paths} = this.props;

    return (
      <li
        key="paths"
        className="courses-learning-paths__tab"
        style={this.getTabStyle(style)}
      >
        {paths.map((path, index) => (
          <PathListingItem key={index} coursesOpen={index === 0} path={path}/>
        ))}
      </li>
    );
  }

  renderCourses(style) {
    const {courses, actions, loadingCourses} = this.props;

    return (
      <li
        key="courses"
        className="courses-learning-paths__tab"
        style={this.getTabStyle(style)}
      >
        <DashboardGrid cols={3} >
          <Loader center={false} loading={loadingCourses} position="top-center"/>
          {courses.map(course => (
            <CourseCard
              full
              key={course.get('id')}
              course={course}
              progress={course.get('percentage_completed')}
              recommended={course.get('recommended') ? 'Recommended for you' : null}
              onView={clickAction(actions.modalOpen, 'courseDrawer', course)}
            />
          ))}
        </DashboardGrid>
      </li>
    );
  }

  render() {
    const {paths, actions, courses} = this.props;
    const {activeItem} = this.state;

    const scrollTo = (
      <Fragment>
        View course & paths
        <MaIcon icon="long-arrow-alt-right"/>
      </Fragment>
    );

    return (
      <Brochure>
        <div className="courses-learning-paths">
          <OffmenuFilters/>
          <CourseHero
            meta={false}
            className="course-hero--large"
            title="ONLINE COURSES<br/>& LEARNING PATHS"
            description="<p>We’ve created hundeds of hours of detailed videos, course files and interactive content to help you learn every aspect of data analysis and business intelligence. From formulas & functions through complicated data models and advanced business modeling there is a course for everyone. Take a look and find the right course for your data rockstar goals!</p>"
            colClasses={['col-md-7 col-lg-6 col-xl-5', 'col-md-5 col-lg-6 col-xl-7']}
            linkContent={scrollTo}
            linkHref="#"
            onLinkClick={handleScrollIntoView('#courses-paths-main')}
            // thumbnail={course.get('thumbnail')}
          />
          <CtaSurvey/>
          <div className="container container--lg">
            <div id="courses-paths-main" className="courses-learning-paths__main">
              <CoursePathNav
                onFilterClick={click(actions.offmenuToggle, 'filters')}
                onViewChange={this.handleNavClick}
                activeItem={activeItem}
              />
              <TransitionMotion
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
              >
                {interpolatedStyles => (
                  <ul className="courses-learning-paths__tabs">
                    {interpolatedStyles.map(config => {
                      if (config.key === 'paths') {
                        return this.renderPaths(config.style);
                      }

                      if (config.key === 'courses') {
                        return this.renderCourses(config.style);
                      }

                      return null;
                    })}
                  </ul>
                )}
              </TransitionMotion>
            </div>
          </div>
        </div>
      </Brochure>
    );
  }
}

CoursesLearningPaths.getInitialProps = ctx => {
  const {store, asPath} = ctx;

  store.dispatch(courseActions.coursesFilter());
  store.dispatch(pathActions.pathsInit());

  const url = asPath;

  const search = url.split('?')[1] || '';

  const query = qs.parse(search);

  return {
    view: query.view || 'paths'
  };
};

CoursesLearningPaths.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
  paths: ImmutablePropTypes.list.isRequired,
  router: PropTypes.object,
  view: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  loadingCourses: PropTypes.bool,
  loadingPaths: PropTypes.bool
};

CoursesLearningPaths.defaultProps = {
  courses: List(),
  paths: List()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state),
  loadingCourses: loadingSelectors.getLoading(['COURSES_FILTER'])(state),
  loadingPaths: loadingSelectors.getLoading(['PATHS_INIT'])(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions,
    ...pathActions,
    ...courseActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesLearningPaths));
