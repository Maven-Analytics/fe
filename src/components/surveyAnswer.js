import React from 'react';
import PropTypes from 'prop-types';

import RangeInput from './inputs/range';

const SurveyAnswer = ({id, text, value, onChange, style}) => {
  return (
    <div className="survey-answer" style={style}>
      <label htmlFor={id}>{text}</label>
      <RangeInput
        id={id}
        max={10}
        onChange={onChange}
        value={value}
      />
      <span>{value || 0}</span>
    </div>
  );
};

SurveyAnswer.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SurveyAnswer;
