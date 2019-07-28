import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Router, {withRouter} from 'next/router';
import qs from 'query-string';
import {bindActionCreators} from 'redux';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import {actions as stateActions} from '../redux/ducks/state';
import {handleScrollIntoView, click} from '../utils/componentHelpers';
import Brochure from '../layouts/brochure';
import PathListingItem from '../components/pathListingItem';
import CourseHero from '../components/courseHero';
import MaIcon from '../components/maIcon';
import CtaSurvey from '../sections/ctaSurvey';
import OffmenuFilters from '../modals/offmenuFilters';

class CoursesLearningPaths extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.view
    };

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(activeItem) {
    this.setState({activeItem});

    const href = {
      pathname: this.props.router.pathname,
      query: {
        view: activeItem
      }
    };

    this.props.actions.offmenuClose('filters');

    Router.push(href, href, {shallow: true});
  }

  render() {
    const {paths, actions} = this.props;
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
          <div className="container">
            <div id="courses-paths-main" className="courses-learning-paths__main">
              <header>
                <button onClick={click(actions.offmenuToggle, 'filters')} className="filter" disabled={activeItem !== 'courses'}>
                  <span>
                    <MaIcon icon="sliders-h"/>
                    Advanced Filter
                  </span>
                </button>
                <nav>
                  <ul>
                    <li>
                      <button onClick={click(this.handleNavClick, 'paths')} className={activeItem === 'paths' ? 'active' : ''}><span>Paths</span></button>
                    </li>
                    <li>
                      <button onClick={click(this.handleNavClick, 'courses')} className={activeItem === 'courses' ? 'active' : ''}><span>Courses</span></button>
                    </li>
                  </ul>
                </nav>
              </header>
              {paths.map((path, index) => (
                <PathListingItem key={index} coursesOpen={index === 0} path={path}/>
              ))}
            </div>
          </div>
        </div>
      </Brochure>
    );
  }
}

CoursesLearningPaths.getInitialProps = ctx => {
  const {store, asPath} = ctx;

  store.dispatch(courseActions.coursesInit());
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
  actions: PropTypes.objectOf(PropTypes.func)
};

CoursesLearningPaths.defaultProps = {
  courses: List(),
  paths: List()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesLearningPaths));
