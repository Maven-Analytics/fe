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
import {Routes} from '../../routes';

class WelcomeSurvey extends Component {
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
        <div className="welcome-survey">
          <p className="welcome-survey__pagination">Question {this.getActiveIndex() + 1} of {this.state.questions.count()}</p>
          <TransitionMotion styles={this.getStyles} willLeave={this.willLeave} willEnter={this.willEnter}>
            {styles => (
              <div className="welcome-survey__content">
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
          <div className="welcome-survey__footer">
            {this.getPreviousIndex() >= 0 ? <button className="btn btn--empty btn--lg" onClick={this.handlePrevious}>Previous</button> : null }
            {this.getNextIndex() > 0 ? <button className="btn btn--primary-solid btn--lg" onClick={this.handleNext}>Next</button> : null}
            {this.getActiveIndex() + 1 === this.getTotalQuestions() ? <Link href={Routes.WelcomeResults}><a className="btn btn--primary-solid btn--lg">Finish</a></Link> : null}
          </div>
        </div>
      </Checkout>
    );
  }
}

WelcomeSurvey.propTypes = {
  surveyResults: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

WelcomeSurvey.defaultProps = {
  surveyResults: Map()
};

const mapStateToProps = state => ({
  surveyResults: surveyResultSelectors.getSurveyResult(state)
});

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      ...surveyResultActions
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSurvey);
