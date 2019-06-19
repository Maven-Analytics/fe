import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, Map} from 'immutable';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../../redux/ducks/surveyResult';
import Checkout from '../../layouts/checkout';
import CourseCarousel from '../../sections/courseCarousel';
import PathBanner from '../../components/pathBanner';
import { getPathHours } from '../../utils/pathHelpers';

const crs = fromJS({
  title: 'Excel Formulas & Functions',
  excerpt: 'Short description about this path. Briefly mention which courses or skills would be included and the benefits. This should be stored as the “card description” for this path within the database.',
  slug: 'excel-formulas',
  length: 22.5,
  author: {
    name: 'Chris Dutton',
    thumbnail: '//via.placeholder.com/80/20E2D7/FFFFFF'
  },
  thumbnail: '//via.placeholder.com/324x182/20E2D7/FFFFFF',
  badge: '//via.placeholder.com/100x100/000000/FFFFFF'
});

const SkillsAssessmentResults = ({recommendedPaths}) => {
  const recommendedPath = recommendedPaths.first();

  console.log(recommendedPath.toJS())

  return (
    <Checkout full>
      <div className="skills-assessment-results">
        <header>
          <h1>Your Recommended Learning Path</h1>
        </header>
        <div className="skills-assessment-results__recommended-path">
          <PathBanner
            badge={recommendedPath.getIn(['path', 'badge'])}
            title={recommendedPath.getIn(['path', 'title'])}
            excerpt={recommendedPath.getIn(['path', 'excerpt'])}
            match={parseInt(recommendedPath.get('percentage') * 100, 10)}
            courses={recommendedPath.getIn(['path', 'courses']).count()}
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
          courses={fromJS([crs, crs, crs, crs, crs, crs])}
        />
      </div>
    </Checkout>
  );
};

SkillsAssessmentResults.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

SkillsAssessmentResults.defaultProps = {
  surveyResults: Map()
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

export default connect(mapStateToProps, mapDispatchToProps)(SkillsAssessmentResults);
