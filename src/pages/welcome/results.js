import {fromJS, Map} from 'immutable';
import {Loader} from 'maven-ui';
import {withRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {presets, spring, TransitionMotion} from 'react-motion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Checkout from '#root/components/layout/checkout';
import CourseCarousel from '#root/components/sections/courseCarousel';
import {actions as courseActions} from '#root/redux/ducks/courses';
import {selectors as loadingSelectors} from '#root/redux/ducks/loading';
import {actions as pathActions} from '#root/redux/ducks/paths';
import {selectors as recommendedSelectors} from '#root/redux/ducks/recommended';
import {actions as surveyResultActions, selectors as surveyResultSelectors} from '#root/redux/ducks/surveyResult';
import {actions as userActions} from '#root/redux/ducks/user';

import MaIcon from '../../components/maIcon';
import PathBanner from '../../components/pathBanner';
import {Routes} from '../../routes';
import {canUseDOM} from '../../utils/componentHelpers';

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
        <Loader loading align="top-center" position="relative" width={70} height={70} />
        <p>Just one moment, we’re finding the best courses and learning paths for your goals</p>
      </div>
    );
  }

  renderResults(style) {
    const {recommended} = this.props;
    const {coursesOpen} = this.state;
    const recommendedPaths = recommended.get('paths');
    const recommendedCourses = recommended.get('courses');
    const recommendedPath = recommendedPaths.first();

    if (!recommendedPath) {
      if (canUseDOM()) {
        this.props.router.push(Routes.WelcomeSurvey);
      }

      return null;
    }

    return (
      <div key="results" style={this.getDivStyle(style)}>
        <header>
          <h1>Recommended Learning Path For You</h1>
        </header>
        <div className="welcome-survey-results__recommended-path">
          <PathBanner
            id={recommendedPath.get('id')}
            slug={recommendedPath.get('slug') ? recommendedPath.get('slug') : ''}
            badge={recommendedPath.get('badge')}
            title={recommendedPath.get('title')}
            excerpt={recommendedPath.get('excerpt')}
            match={parseInt(recommendedPath.get('match') * 100, 10)}
            courses={recommendedPath.get('courses') && recommendedPath.get('courses').count()}
            length={recommendedPath.get('length')}
            tools={recommendedPath.get('tools')}
            url={`${Routes.Path}/${recommendedPath.get('slug')}`}
          />
          <button
            className="path-listing-item__toggle path-listing-item__toggle--unstyled  welcome-survey-results__recommended-path-courses-toggle"
            aria-hidden={coursesOpen === false}
            aria-controls="welcome-survey-recommended-path-courses"
            onClick={this.handleToggle}
          >
            {coursesOpen ? (
              <Fragment>
                Hide courses in this path <MaIcon icon="chevron-up" />
              </Fragment>
            ) : (
              <Fragment>
                  Show courses in this path <MaIcon icon="chevron-down" />
              </Fragment>
            )}
          </button>
          <div
            id="welcome-survey-recommended-path-courses"
            hidden={coursesOpen === false}
            className="welcome-survey-results__recommended-path-courses"
          >
            {coursesOpen ? <CourseCarousel courses={recommendedPath.get('courses')} /> : null}
          </div>
        </div>
        <hr className="welcome-survey-results__hr" />
        <CourseCarousel
          title="Individual Self-Paced Courses"
          eyelash="Recommended courses for you"
          description="These individual courses are highly recommended based on your personal preferences to help you achieve your data rockstar goals."
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

  // If (ctx && ctx.req) {
  //   ctx.res.writeHead(302, {Location: Routes.WelcomeSurvey});
  //   ctx.res.end();
  // }

  store.dispatch(pathActions.pathsGet());
  store.dispatch(courseActions.coursesInit());
};

WelcomeSurveyResults.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  recommended: ImmutablePropTypes.mapContains({
    courses: ImmutablePropTypes.list,
    paths: ImmutablePropTypes.list
  }),
  loading: PropTypes.bool,
  router: PropTypes.object
};

WelcomeSurveyResults.defaultProps = {
  surveyResults: Map(),
  recommended: fromJS({
    courses: [],
    paths: []
  })
};

const mapStateToProps = state => ({
  surveyResults: surveyResultSelectors.getSurveyResult(state),
  recommended: recommendedSelectors.getRecommended(state),
  loading: loadingSelectors.getLoading(['RECOMMENDED_SET'])(state)
});

const mapDispatchToProps = function (dispatch) {
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
