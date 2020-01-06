import Link from 'next/link';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Countup from './countup';
import MaIcon from './maIcon';
import ProgressCircle from './progressCircle';
import TrackVisibility from './trackVisibility';

const DashboardOnboarding = ({items}) => {
  const percent = items.filter(item => item.get('complete')).count() / items.count() * 100;
  const firstNotComplete = items.filter(i => !i.get('complete')).first();

  return (
    <div className="dashboard-onboarding">
      <div className="dashboard-onboarding__inner">
        <div className="dashboard-onboarding__left">
          <div className="dashboard-onboarding__graph">
            <TrackVisibility alwaysShow className="value">
              {inView => (
                <>
                  <Countup disabled={!inView} value={percent} duration={500} />%
                </>
              )}
            </TrackVisibility>
            <ProgressCircle percent={percent} />
          </div>
        </div>
        <ul className="dashboard-onboarding__steps">
          {items && items.map(item => (
            <li key={item.get('text')} className={[item.get('complete') ? 'complete' : ''].join(' ')}>
              <span>
                {item.get('complete') ? <MaIcon icon="check" /> : null}
              </span>
              {item.get('text')}
            </li>
          ))}
        </ul>
        {firstNotComplete && firstNotComplete.get('linkUrl') ? (
          <Link href={firstNotComplete.get('linkUrl')}>
            <button className="btn btn--default">
              {firstNotComplete.get('linkText')}
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

DashboardOnboarding.propTypes = {
  onboarding: ImmutablePropTypes.map,
  items: ImmutablePropTypes.list
};

export default DashboardOnboarding;
