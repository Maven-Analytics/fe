import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, Map} from 'immutable';

import {stateNum, prettyPercent} from '../utils/componentHelpers';
import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../redux/ducks/surveyResult';
import {selectors as courseSelectors} from '../redux/ducks/courses';
import {selectors as pathSelectors} from '../redux/ducks/paths';
import Checkout from '../layouts/checkout';
import {getInitialAnswers} from '../utils/surveyHelpers';
import {SurveyQuestions} from '../surveyContstants';

const answers = fromJS([
  {
    id: '1a',
    text: 'Excel Formulas & Functions'
  },
  {
    id: '1b',
    text: 'Pivot Tables & Pivot Charts'
  }
]);

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      answers: getInitialAnswers(SurveyQuestions, 0).toJS()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getActiveQuestion() {
    return SurveyQuestions.get(this.state.step);
  }

  handleChange(state) {
    return state ? this.setState(prevState => {
      return {
        ...prevState,
        answers: {
          ...prevState.answers,
          ...state
        }
      };
    }) : null;
  }

  handleSubmit() {
    this.props.actions.surveyResultUpdate(this.state.answers);

    this.setState(prevState => {
      return {
        ...prevState,
        step: prevState.step + 1
      };
    });
  }

  render() {
    const {recommendedCourses, recommendedPaths} = this.props;
    const activeQuestion = this.getActiveQuestion();

    return (
      <Checkout full>

        <h1>{activeQuestion.get('text')}</h1>
        {activeQuestion.get('answers').map((answer, index) => {
          return (
            <div key={answer.get('text')} className="form-group">
              <label htmlFor={index}>{answer.get('text')}: {this.state.answers[answer.get('id')]}</label>
              <input
                type="range"
                className="input"
                min={0}
                max={10}
                value={this.state.answers[answer.get('id')]}
                onChange={stateNum(this.handleChange, answer.get('id'))}
              />
            </div>
          );
        })}

        <button onClick={this.handleSubmit}>Submit</button>

        <h2>recommended courses</h2>
        <ul>
          {recommendedCourses.map(course => (
            <li key={course.get('id')}>
              {course.getIn(['course', 'title'])}
              <br/>
              <strong>Percentage: </strong>{prettyPercent(course.get('percentage'))}%
              <br/>
              <strong>Adjusted Percentage: </strong>{prettyPercent(course.get('adjustedPercentage'))}%
            </li>
          ))}
        </ul>

        <h2>recommended paths</h2>
        <ul>
          {recommendedPaths.map(path => (
            <li key={path.get('id')}>
              {path.getIn(['path', 'title'])}
              <br/>
              <strong>Percentage: </strong>{prettyPercent(path.get('percentage'))}%
              <br/>
              <strong>Adjusted Percentage: </strong>{prettyPercent(path.get('adjustedPercentage'))}%
            </li>
          ))}
        </ul>

      </Checkout>
    );
  }
}

const mapStateToProps = state => ({
  surveyResults: surveyResultSelectors.getSurveyResult(state),
  recommendedCourses: surveyResultSelectors.getRecommendedCourses(state),
  recommendedPaths: surveyResultSelectors.getRecommendedPaths(state),
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...surveyResultActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
