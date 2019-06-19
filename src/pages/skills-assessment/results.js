import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, Map} from 'immutable';
import {TransitionMotion, spring, presets} from 'react-motion';
import Link from 'next/link';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../../redux/ducks/surveyResult';
import Checkout from '../../layouts/checkout';
import {SurveyQuestions} from '../../surveyContstants';
import SurveyPage from '../../components/surveyPage';
import CourseCard from '../../components/courseCard';
import CourseCarousel from '../../sections/courseCarousel';
import PathBanner from '../../components/pathBanner';

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

class SkillsAssessmentResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: SurveyQuestions.setIn([0, 'active'], true)
    };

    this.getStyles = this.getStyles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  getActiveIndex() {
    return this.state.questions.findIndex(q => q.get('active'));
  }

  getTotalQuestions() {
    return this.state.questions.count();
  }

  getPreviousIndex() {
    const next = this.getActiveIndex() - 1;

    return this.state.questions.has(next) ? next : -1;
  }

  getNextIndex() {
    const next = this.getActiveIndex() + 1;

    return this.state.questions.has(next) ? next : -1;
  }

  handleChange(state) {
    this.props.actions.surveyResultUpdate(state);
  }

  handlePrevious() {
    const nextIndex = this.getPreviousIndex();

    if (nextIndex < 0) {
      console.log('at first step');
      return;
    }

    this.setState({
      questions: this.state.questions
        .map(q => q.set('active', false))
        .setIn([nextIndex, 'active'], true)
    });
  }

  handleNext() {
    const nextIndex = this.getNextIndex();

    if (!nextIndex) {
      console.log('survey done');
      return;
    }

    this.setState({
      questions: this.state.questions
        .map(q => q.set('active', false))
        .setIn([nextIndex, 'active'], true)
    });
  }

  getStyles() {
    return this.state.questions
      .filter(q => q.get('active'))
      .map(q => {
        return {
          key: q.get('id'),
          style: {
            opacity: spring(1, presets.gentle),
            z: spring(1)
          },
          data: q
        };
      })
      .toJS();
  }

  willLeave() {
    return {
      opacity: spring(0, presets.stiff),
      z: spring(0.9, presets.stiff),
      position: 0
    };
  }

  willEnter() {
    return {
      opacity: 0,
      z: 1
    };
  }

  render() {
    return (
      <Checkout full>
        <div className="skills-assessment-results">
          <header>
            <h1>Your Recommended Learning Path</h1>
          </header>
          <div className="skills-assessment-results__recommended-path">
            <PathBanner
              badge="//via.placeholder.com/101/20E2D7/FFFFFF"
              title="The Data Visualization Path"
              excerpt="This would be a brief description about this path. The general reason these courses are grouped together and what goals people have achieved in this path. "
              match={65}
              courses={4}
              length={22}
              tools={fromJS(['Excel', 'Power-BI'])}
              url="/"
            />
            <CourseCarousel
              separator
              helperText="Courses included in this path"
              courses={fromJS([crs, crs, crs, crs, crs, crs])}
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
  }
}

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
