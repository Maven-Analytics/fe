import React from 'react';
import PropTypes from 'prop-types';

import {state} from '../utils/componentHelpers';

const SurveyAnswerText = ({id, text, condition, conditionId, value, onChange, style}) => {
  const classList = ['survey-answer', 'survey-answer--text'];

  if (conditionId) {
    classList.push('has-condition');
  }

  if (condition) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')} style={style}>
      <label htmlFor={id}>{text}</label>
      <input type="text" id={id} value={value || ''} onChange={state(onChange, id)} className="input"/>
    </div>
  );
};

SurveyAnswerText.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  condition: PropTypes.bool,
  conditionId: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SurveyAnswerText;
