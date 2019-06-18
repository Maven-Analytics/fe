import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {StaggeredMotion, spring, presets} from 'react-motion';

import SurveyAnswer from './surveyAnswer';
import SurveyAnswerCheck from './surveyAnswerCheck';
import SurveyAnswerText from './surveyAnswerText';

class SurveyPage extends Component {
  defaultStyles() {
    const initialStyles = {
      o: 0,
      y: 10
    };
    return [initialStyles, ...this.props.answers.map(() => initialStyles).toJS()];
  }

  styles(prevStyles) {
    return prevStyles.map((style, index) => {
      if (index === 0) {
        return {
          o: spring(1, presets.stiff),
          y: spring(1, presets.gentle)
        };
      }

      return {
        o: spring(prevStyles[index - 1].o, presets.stiff),
        y: spring(prevStyles[index - 1].y, presets.gentle)
      };
    });
  }

  render() {
    const {answers, question, onChange, values, style} = this.props;

    return (
      <div className="survey-page" style={style}>
        <StaggeredMotion
          defaultStyles={this.defaultStyles()}
          styles={this.styles}
        >
          {interpolatedStyles => (
            <div>
              {interpolatedStyles.map((s, index) => {
                const style = {
                  opacity: s.o,
                  transform: `translate3d(0, ${s.y}px, 0)`
                };

                if (index === 0) {
                  return (
                    <header key={question} style={style}>
                      <h1>{question}</h1>
                    </header>
                  );
                }

                const answer = answers.get(index - 1);

                let Component = SurveyAnswer;

                if (answer.get('type') === 'checkbox') {
                  Component = SurveyAnswerCheck;
                } else if (answer.get('type') === 'text') {
                  Component = SurveyAnswerText;
                }

                return (
                  <Component
                    key={answer.get('id')}
                    style={style}
                    id={answer.get('id')}
                    onChange={onChange}
                    text={answer.get('text')}
                    conditionId={answer.get('condition')}
                    condition={values.get(answer.get('condition'))}
                    value={values.get(answer.get('id'))}
                  />
                );
              })}
            </div>
          )}

        </StaggeredMotion>
      </div>
    );
  }
}

SurveyPage.propTypes = {
  question: PropTypes.string,
  answers: ImmutablePropTypes.list.isRequired,
  onChange: PropTypes.func,
  values: ImmutablePropTypes.map,
  style: PropTypes.object
};

SurveyPage.defaultProps = {
  answers: List(),
  values: Map()
};

export default SurveyPage;
