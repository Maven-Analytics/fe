import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';
import Link from 'next/link';

import ImageContentful from './imageContentful';
import withState from './withState';
import ProgressMeter from './progressMeter';
import {clickAction, prettyPercent} from '../utils/componentHelpers';
import CourseBanner from './courseBanner';
import {Routes} from '../routes';

const DashboardRecommendedPath = ({title, percentage_completed, badge, excerpt, path, actions, match}) => {
  return (
    <div className="dashboard-course dashboard-recommended-path">
      {match ? (
        <CourseBanner>
          <span className="text">Match</span>
          <span className="value">{`${prettyPercent(match)}%`}</span>
        </CourseBanner>
      ) : null}
      <div className="dashboard-course__inner">
        <div className="dashboard-course__badge">
          <ImageContentful image={badge} />
        </div>
        <div className="dashboard-course__content">
          <h5>{title}</h5>
          <p>{excerpt}</p>
        </div>
      </div>
      <ProgressMeter value={percentage_completed} />
      <div className="dashboard-course__footer">
        <button onClick={clickAction(actions.modalOpen, 'pathDrawer', path.get('id'))} className="btn btn--default">
          Path Info
        </button>
        <div className="dashboard-course__footer-right-buttons">
          <Link href={Routes.WelcomeResults}>
            <button className="btn btn--empty-dark">View Full Results</button>
          </Link>
          <Link href={Routes.WelcomeSurvey}>
            <button className="btn btn--empty-dark">Retake Survey</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

DashboardRecommendedPath.propTypes = {
  title: PropTypes.string,
  percentage_completed: PropTypes.number,
  badge: ImmutablePropTypes.map,
  excerpt: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  match: PropTypes.number,
  path: ImmutablePropTypes.map
};

DashboardRecommendedPath.defaultProps = {
  badge: Map()
};

export default withState(DashboardRecommendedPath);
