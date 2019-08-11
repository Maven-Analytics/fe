import React from 'react';
import PropTypes from 'prop-types';

import RangeInput from './inputs/range';
import MaIcon from './maIcon';

const SurveyAnswer = ({id, text, value, note, className, onChange, icon, style}) => {
  const classList = ['survey-answer'];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(' ')} style={style}>
      {icon ? <MaIcon icon={icon}/> : null}
      <label htmlFor={id}>
        <span className="text">{text}</span>
        {note ? <span className="note">{note}</span> : null}
      </label>
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
  style: PropTypes.object,
  note: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string
};

export default SurveyAnswer;
