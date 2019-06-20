import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List, Map} from 'immutable';
import Link from 'next/link';

import ImageContentful from './imageContentful';
import MaIcon from './maIcon';

const PathBanner = ({badge, title, excerpt, match, courses, length, tools, url}) => {
  return (
    <div className="path-banner">
      <div className="path-banner__badge">
        <ImageContentful showLoader={false} image={badge}/>
      </div>
      <div className="path-banner__content">
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </div>
      <ul className="path-banner__meta">
        <li className="match">
          <div className="value">{match}%</div>
          <div className="text">Match</div>
        </li>
        <li>
          <div className="value">{courses}</div>
          <div className="text">Courses</div>
        </li>
        <li>
          <div className="value">{length || 0}</div>
          <div className="text">Hours</div>
        </li>
        <li>
          <div className="value">
            {tools.map(tool => (
              <MaIcon key={tool} icon={tool.toLowerCase().replace(' ', '-')}/>
            ))}
          </div>
          <div className="text">Tools</div>
        </li>
      </ul>
      <div className="path-banner__cta">
        <Link href={url}>
          <a className="btn btn--primary-solid">
            View Path
          </a>
        </Link>
      </div>
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
  url: PropTypes.string.isRequired
};

PathBanner.defaultProps = {
  tools: List(),
  badge: Map()
};

export default PathBanner;
