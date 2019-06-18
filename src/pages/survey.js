import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS, Map} from 'immutable';
import {TransitionMotion, spring, presets} from 'react-motion';

import {selectors as surveyResultSelectors, actions as surveyResultActions} from '../redux/ducks/surveyResult';
import {selectors as courseSelectors} from '../redux/ducks/courses';
import {selectors as pathSelectors} from '../redux/ducks/paths';
import Checkout from '../layouts/checkout';
import {SurveyQuestions} from '../surveyContstants';
import SurveyPage from '../components/surveyPage';

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: SurveyQuestions.setIn([0, 'active'], true)
    };

    this.getStyles = this.getStyles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getActiveIndex() {
    return this.state.questions.findIndex(q => q.get('active'));
  }

  getNextIndex() {
    const next = this.getActiveIndex() + 1;

    return this.state.questions.has(next) ? next : -1;
  }

  handleChange(state) {
    this.props.actions.surveyResultUpdate(state);
  }

  handleSubmit() {
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
      opacity: spring(0, presets.noWobble),
      z: spring(0.8, presets.stiff),
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
        <div className="survey">
          <p className="survey__pagination">Question {this.getActiveIndex() + 1} of {this.state.questions.count()}</p>
          <TransitionMotion styles={this.getStyles} willLeave={this.willLeave} willEnter={this.willEnter}>
            {styles => (
              <div className="survey__content">
                {styles.map(style => (
                  <SurveyPage
                    key={style.key}
                    onChange={this.handleChange}
                    question={style.data.text}
                    answers={fromJS(style.data.answers)}
                    values={this.props.surveyResults}
                    style={{
                      opacity: style.style.opacity,
                      transform: `scale(${style.style.z})`,
                      position: style.style.position === 0 ? 'absolute' : null
                    }}
                  />
                ))}
              </div>
            )}
          </TransitionMotion>
          <div className="survey__footer">
            <button className="btn btn--primary-solid btn--lg" onClick={this.handleSubmit}>Next</button>
          </div>
        </div>
      </Checkout>
    );
  }
}

Survey.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

Survey.defaultProps = {
  surveyResults: Map()
};

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
