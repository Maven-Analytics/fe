import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, List, fromJS} from 'immutable';
import {TransitionMotion, spring, presets} from 'react-motion';
import {withRouter} from 'next/router';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../../redux/ducks/surveyResult';
import {selectors as userSelectors} from '../../redux/ducks/user';
import {selectors as loadingSelectors} from '../../redux/ducks/loading';
import Checkout from '../../layouts/checkout';
import CourseCarousel from '../../sections/courseCarousel';
import PathBanner from '../../components/pathBanner';
import {getPathHours} from '../../utils/pathHelpers';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions} from '../../redux/ducks/courses';
import {actions as userActions} from '../../redux/ducks/user';
import {Routes} from '../../routes';
import Loader from '../../components/loader';
import MaIcon from '../../components/maIcon';

class WelcomeSurveyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      items: ['loading'],
      coursesOpen: false
    };

    this.willLeave = this.willLeave.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      items: props.loading ? ['loading'] : ['results']
    };
  }

  getDivStyle(style) {
    const s = {
      opacity: style.opacity
    };

    if (style.position === 0) {
      s.position = 'absolute';
    }

    if (style.y) {
      s.transform = `translate3d(0, ${style.y}px, 0)`;
    }

    return s;
  }

  getStyles() {
    return this.state.items.map(item => {
      return {
        key: item,
        style: {
          opacity: spring(1, presets.gentle),
          y: spring(0, presets.gentle)
        }
      };
    });
  }

  willLeave() {
    return {
      position: 0,
      opacity: spring(0, presets.stiff),
      y: spring(-50, presets.stiff)
    };
  }

  willEnter() {
    return {
      opacity: 0,
      y: 0
    };
  }

  handleToggle() {
    this.setState(prevState => ({
      coursesOpen: !prevState.coursesOpen
    }));
  }

  renderLoading(style) {
    return (
      <div key="loading" className="welcome-survey-results__loading" style={this.getDivStyle(style)}>
        <Loader loading position="relative top-center" width={70} height={70} center={false} />
        <p>Just one moment, we’re finding the best courses and learning paths for your goals</p>
      </div>
    );
  }

  renderResults(style) {
    const {recommendedPaths, recommendedCourses} = this.props;
    const {coursesOpen} = this.state;
    const recommendedPath = recommendedPaths.first();

    return (
      <div key="results" style={this.getDivStyle(style)}>
        <header>
          <h1>Your Recommended Learning Path</h1>
        </header>
        <div className="welcome-survey-results__recommended-path">
          <PathBanner
            slug={recommendedPath.get('slug') ? recommendedPath.get('slug') : ''}
            badge={recommendedPath.get('badge')}
            title={recommendedPath.get('title')}
            excerpt={recommendedPath.get('excerpt')}
            match={parseInt(recommendedPath.get('match') * 100, 10)}
            courses={recommendedPath.get('courses') && recommendedPath.get('courses').count()}
            length={getPathHours(recommendedPath)}
            tools={recommendedPath.get('tools')}
            url={`${Routes.Path}/${recommendedPath.get('slug')}`}
          />
          <button
            className="path-listing-item__toggle welcome-survey-results__recommended-path-courses-toggle"
            aria-hidden={coursesOpen === false}
            aria-controls="welcome-survey-recommended-path-courses"
            onClick={this.handleToggle}
          >
            {coursesOpen ? (
              <Fragment>
                Hide included courses
                <MaIcon icon="chevron-up" />
              </Fragment>
            ) : (
              <Fragment>
                Show included courses
                <MaIcon icon="chevron-down" />
              </Fragment>
            )}
          </button>
          <div
            id="welcome-survey-recommended-path-courses"
            hidden={coursesOpen === false}
            className="welcome-survey-results__recommended-path-courses"
          >
            {coursesOpen ? <CourseCarousel separator helperText="Courses included in this path" courses={recommendedPath.get('courses')} /> : null}
          </div>
        </div>
        <CourseCarousel
          title="More Individual Courses"
          eyelash="Recommended for you"
          description="These individual courses are highly recommended based on your personal preferences to help you achieve your data rockstar goals. "
          courses={recommendedCourses}
        />
      </div>
    );
  }

  render() {
    return (
      <Checkout full fullNav>
        <TransitionMotion styles={this.getStyles()} willEnter={this.willEnter} willLeave={this.willLeave}>
          {interpolatedStyles => (
            <div className="welcome-survey-results">
              {interpolatedStyles.map(config => {
                if (config.key === 'loading') {
                  return this.renderLoading(config.style);
                }

                if (config.key === 'results') {
                  return this.renderResults(config.style);
                }

                return null;
              })}
            </div>
          )}
        </TransitionMotion>
      </Checkout>
    );
  }
}

WelcomeSurveyResults.getInitialProps = ctx => {
  const {store} = ctx;

  if (ctx && ctx.req) {
    ctx.res.writeHead(302, {Location: Routes.WelcomeSurvey});
    ctx.res.end();
  }

  store.dispatch(pathActions.pathsInit());
  store.dispatch(courseActions.coursesInit());
};

WelcomeSurveyResults.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  recommendedPaths: ImmutablePropTypes.list,
  recommendedCourses: ImmutablePropTypes.list,
  loading: PropTypes.bool
};

WelcomeSurveyResults.defaultProps = {
  surveyResults: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

const mapStateToProps = state => ({
  surveyResults: surveyResultSelectors.getSurveyResult(state),
  recommendedCourses: userSelectors.getRecommendedCoursesForDisplay(state),
  recommendedPaths: userSelectors.getRecommendedPathsForDisplay(state),
  loading: loadingSelectors.getLoading(['USER_RECOMMENDED_SET'])(state)
});

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...surveyResultActions,
        ...userActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WelcomeSurveyResults));
