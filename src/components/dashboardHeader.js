import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import Link from 'next/link';

import {Routes} from '../routes';

const DashboardLinks = fromJS([
  {
    title: 'Dashboard',
    url: Routes.Dashboard
  },
  {
    title: 'Learning Paths',
    url: Routes.DashboardPaths
  },
  {
    title: 'Courses',
    url: Routes.DashboardCourses
  },
  {
    title: 'Credentials',
    url: Routes.DashboardCredentials
  }
]);

const DashboardHeader = ({title, activeLink, welcome}) => {
  return (
    <div className="dashboard-header">
      <div className="container">
        <h3>
          {title}
          {welcome ? (
            <small>
              <span className="sep">/</span>
              <span className="message">{welcome}</span>
            </small>
          ) : null}
        </h3>
        <ul>
          {DashboardLinks.map((link, index) => (
            <li key={link.get('url')}>
              <Link href={link.get('url')} >
                <a className={index === activeLink ? 'active' : ''}>{link.get('title')}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  activeLink: PropTypes.number.isRequired,
  welcome: PropTypes.string
};

export default DashboardHeader;
