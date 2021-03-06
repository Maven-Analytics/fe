import PropTypes from 'prop-types';
import React from 'react';

const DifficultyMeter = ({className, startingHeight, difficulty, label, diff, ...props}) => {
  const classList = ['difficulty-meter', className ? className : ''];
  return (
    <div {...props} className={classList.join(' ')}>
      {label ? <small className="label">{label}</small> : null}
      <div className="graphic">
        <span className={difficulty >= 1 ? 'active' : ''} style={{height: startingHeight}} />
        <span className={difficulty >= 2 ? 'active' : ''} style={{height: startingHeight + diff * 2}} />
        <span className={difficulty >= 3 ? 'active' : ''} style={{height: startingHeight + diff * 3}} />
        <span className={difficulty >= 4 ? 'active' : ''} style={{height: startingHeight + diff * 4}} />
        <span className={difficulty >= 5 ? 'active' : ''} style={{height: startingHeight + diff * 5}} />
      </div>
    </div>
  );
};

DifficultyMeter.propTypes = {
  className: PropTypes.string,
  difficulty: PropTypes.number,
  startingHeight: PropTypes.number,
  label: PropTypes.string,
  diff: PropTypes.number
};

DifficultyMeter.defaultProps = {
  startingHeight: 9,
  diff: 4
};

export default DifficultyMeter;
