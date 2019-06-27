import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import Link from 'next/link';

const DashboardLinks = fromJS([
  {
    title: 'Dashboard',
    url: '/dashboard'
  },
  {
    title: 'Learning Paths',
    url: '/dashboard/paths'
  },
  {
    title: 'Courses',
    url: '/dashboard/courses'
  },
  {
    title: 'Credentials',
    url: '/dashboard/credentials'
  },
  {
    title: 'Assessments',
    url: '/dashboard/assessments'
  }
]);

const DashboardHeader = ({title, activeLink}) => {
  return (
    <div className="dashboard-header">
      <div className="container">
        <h3>{title}</h3>
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
  activeLink: PropTypes.number.isRequired
};

export default DashboardHeader;
