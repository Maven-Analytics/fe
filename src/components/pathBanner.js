import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Link from 'next/link';

import Image from './image';
import Countup from './countup';
import MaIcon from './maIcon';

const PathBanner = ({badge, title, excerpt, match, courses, length, tools, url}) => {
  return (
    <div className="path-banner">
      <div className="path-banner__badge">
        <Image src={badge}/>
      </div>
      <div className="path-banner__content">
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </div>
      <ul className="path-banner__meta">
        <li className="match">
          <div className="value"><Countup duration={1000} value={match}></Countup>%</div>
          <div className="text">Match</div>
        </li>
        <li>
          <div className="value"><Countup duration={1000} value={courses}/></div>
          <div className="text">Courses</div>
        </li>
        <li>
          <div className="value"><Countup duration={1000} value={length}/></div>
          <div className="text">Hours</div>
        </li>
        <li>
          <div className="value">
            {tools.map(tool => (
              <MaIcon key={tool} icon={tool.toLowerCase()}/>
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
  badge: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  match: PropTypes.number,
  courses: PropTypes.number,
  length: PropTypes.number,
  tools: ImmutablePropTypes.list,
  url: PropTypes.string.isRequired
};

PathBanner.defaultProps = {
  tools: List()
};

export default PathBanner;
