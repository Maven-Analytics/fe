import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, List, fromJS} from 'immutable';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../../redux/ducks/surveyResult';
import Checkout from '../../layouts/checkout';
import CourseCarousel from '../../sections/courseCarousel';
import PathBanner from '../../components/pathBanner';
import {getPathHours} from '../../utils/pathHelpers';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions} from '../../redux/ducks/courses';
import {actions as userActions} from '../../redux/ducks/user';
import {Routes} from '../../routes';

class WelcomeSurveyResults extends Component {
  componentDidMount() {
    const recommendedPaths = this.props.recommendedPaths.map(rp => {
      return fromJS({
        id: rp.get('id'),
        percentage: rp.get('percentage')
      });
    });
    const recommendedCourses = this.props.recommendedCourses.map(rc => {
      return fromJS({
        id: rc.get('id'),
        percentage: rc.get('percentage')
      });
    });

    this.props.actions.userRecommendedSet({
      paths: recommendedPaths.toJS(),
      courses: recommendedCourses.toJS()
    });
  }

  render() {
    const {recommendedPaths, recommendedCourses} = this.props;
    const recommendedPath = recommendedPaths.first();

    console.log(recommendedPath.toJS());

    return (
      <Checkout full>
        <div className="welcome-survey-results">
          <header>
            <h1>Your Recommended Learning Path</h1>
          </header>
          <div className="welcome-survey-results__recommended-path">
            <PathBanner
              badge={recommendedPath.get('badge')}
              title={recommendedPath.get('title')}
              excerpt={recommendedPath.get('excerpt')}
              match={parseInt(recommendedPath.get('percentage') * 100, 10)}
              courses={recommendedPath.get('courses') && recommendedPath.get('courses').count()}
              length={getPathHours(recommendedPath.get('path'))}
              tools={recommendedPath.get('tools')}
              url={`${Routes.Path}/${recommendedPath.get('slug')}`}
            />
            <CourseCarousel
              separator
              helperText="Courses included in this path"
              courses={recommendedPath.get('courses')}
            />
          </div>
          <CourseCarousel
            title="More Individual Courses"
            eyelash="Recommended for you"
            description="These individual courses are highly recommended based on your personal preferences to help you achieve your data rockstar goals. "
            courses={recommendedCourses}
          />
        </div>
      </Checkout>
    );
  }
}

WelcomeSurveyResults.getInitialProps = ctx => {
  const {store} = ctx;
  store.dispatch(pathActions.pathsInit());
  store.dispatch(courseActions.coursesInit());
};

WelcomeSurveyResults.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  recommendedPaths: ImmutablePropTypes.list,
  recommendedCourses: ImmutablePropTypes.list
};

WelcomeSurveyResults.defaultProps = {
  surveyResults: Map(),
  recommendedPaths: List(),
  recommendedCourses: List()
};

const mapStateToProps = state => ({
  surveyResults: surveyResultSelectors.getSurveyResult(state),
  recommendedCourses: surveyResultSelectors.getRecommendedCourses(state),
  recommendedPaths: surveyResultSelectors.getRecommendedPaths(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...surveyResultActions,
      ...userActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSurveyResults);
