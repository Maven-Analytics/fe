import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map, List} from 'immutable';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../../redux/ducks/surveyResult';
import Checkout from '../../layouts/checkout';
import CourseCarousel from '../../sections/courseCarousel';
import PathBanner from '../../components/pathBanner';
import {getPathHours} from '../../utils/pathHelpers';
import {actions as pathActions} from '../../redux/ducks/paths';
import {actions as courseActions} from '../../redux/ducks/courses';

const WelcomeSurveyResults = ({recommendedPaths, recommendedCourses}) => {
  const recommendedPath = recommendedPaths.first();

  return (
    <Checkout full>
      <div className="welcome-survey-results">
        <header>
          <h1>Your Recommended Learning Path</h1>
        </header>
        <div className="welcome-survey-results__recommended-path">
          <PathBanner
            badge={recommendedPath.getIn(['path', 'badge'])}
            title={recommendedPath.getIn(['path', 'title'])}
            excerpt={recommendedPath.getIn(['path', 'excerpt'])}
            match={parseInt(recommendedPath.get('percentage') * 100, 10)}
            courses={recommendedPath.getIn(['path', 'courses']) && recommendedPath.getIn(['path', 'courses']).count()}
            length={getPathHours(recommendedPath.get('path'))}
            tools={recommendedPath.getIn(['path', 'tools'])}
            url={`/path/${recommendedPath.getIn(['path', 'slug'])}`}
          />
          <CourseCarousel
            separator
            helperText="Courses included in this path"
            courses={recommendedPath.getIn(['path', 'courses'])}
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
};

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
      ...surveyResultActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSurveyResults);
