import PropTypes from 'prop-types';
import React from 'react';

import {stateCheck} from '#root/utils/componentHelpers';

const SurveyAnswerCheck = ({id, text, value, onChange, style}) => {
  const classList = ['survey-answer', 'survey-answer--check'];

  if (value) {
    classList.push('checked');
  }

  return (
    <div className={classList.join(' ')} style={style}>
      <div className={['checkbox-circle', value ? 'checked' : ''].join(' ')}>
        <input type="checkbox" id={id} checked={value || false} onChange={stateCheck(onChange, id)}/>
        <label htmlFor={id}>{text}</label>
      </div>
    </div>
  );
};

SurveyAnswerCheck.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SurveyAnswerCheck;
