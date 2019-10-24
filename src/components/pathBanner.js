import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as stateActions} from '../redux/ducks/state';
import {selectors as pathSelectors} from '../redux/ducks/paths';
import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import {clickAction} from '../utils/componentHelpers';

const PathBanner = ({badge, title, excerpt, match, courses, length, tools, path, actions}) => {
  const classList = ['path-banner'];

  if (match) {
    classList.push('path-banner--has-match');
  }

  if (tools && tools.count() > 2) {
    classList.push('path-banner--3-tools');
  }

  const btn = (
    <button onClick={clickAction(actions.modalOpen, 'pathDrawer', path)} className="btn btn--primary-solid">
      Path Info
    </button>
  );

  return (
    <div className={classList.join(' ')}>
      <div className="path-banner__badge">
        <ImageContentful showLoader={false} image={badge} />
      </div>
      <div className="path-banner__content">
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </div>
      <ul className="path-banner__meta">
        {match ? (
          <li className="match">
            <div className="value">{match}%</div>
            <div className="text">Match</div>
          </li>
        ) : null}
        <li>
          <div className="value">{courses}</div>
          <div className="text">Courses</div>
        </li>
        <li>
          <div className="value">{length || 0}</div>
          <div className="text">Hours</div>
        </li>
        <li className="tools">
          <div className="value">
            {tools.map(tool => (
              <MaIcon key={tool} icon={tool.toLowerCase().replace(' ', '-')} />
            ))}
          </div>
          <div className="text">Tools</div>
        </li>
        <li>{btn}</li>
      </ul>
      <div className="path-banner__cta">{btn}</div>
    </div>
  );
};

PathBanner.propTypes = {
  badge: ImmutablePropTypes.map,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  match: PropTypes.number,
  courses: PropTypes.number,
  length: PropTypes.number,
  tools: ImmutablePropTypes.list,
  slug: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func),
  path: ImmutablePropTypes.map
};

PathBanner.defaultProps = {
  tools: List(),
  badge: Map(),
  path: Map()
};

const mapStateToProps = (state, props) => ({
  path: pathSelectors.getPath(state, props.slug)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathBanner);
