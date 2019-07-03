import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ProgressMeter from './progressMeter';

const DashboardProgress = ({items, active}) => {
  const classList = ['dashboard-progress'];

  if (active) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')}>
      <ul>
        {items.map(item => (
          <li key={item.get('courseId') || item.get('pathId')}>
            <p>{item.getIn(['course', 'title']) || item.getIn(['path', 'title'])}</p>
            {active ? <ProgressMeter value={item.get('percentage_completed')}/> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

DashboardProgress.propTypes = {
  items: ImmutablePropTypes.list,
  active: PropTypes.bool
};

export default DashboardProgress;
