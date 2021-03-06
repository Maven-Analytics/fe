import Link from 'next/link';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Markdown from './markdown';
import Pill from './shared/Pill/Pill';

const DashboardAnnouncements = ({announcements}) => (
  <div className="dashboard-announcements">
    <ul>
      {announcements.map(announcement => {
        const date = new Date(announcement.get('date'));

        const month = date.getUTCMonth() + 1;

        return (
          <li key={announcement.get('id')}>
            <div className="dashboard-announcements__item">
              <div className="dashboard-announcements__item-meta">
                <span>
                  {month < 10 ? `0${month}` : month}.{date.getUTCDate()}.{date.getUTCFullYear()}
                </span>
                {announcement.get('pinned') ? <Pill className="pinned">Pinned</Pill> : null}
                {announcement.get('new') ? <Pill className="new">New</Pill> : null}
              </div>
              <h4>{announcement.get('title')}</h4>
              <Markdown content={announcement.get('body')}/>
              {announcement.get('ctaUrl') ? (
                <Link href={announcement.get('ctaUrl')}>
                  <button className="btn btn--default">{announcement.get('ctaText') || 'Read More'}</button>
                </Link>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

DashboardAnnouncements.propTypes = {
  announcements: ImmutablePropTypes.list
};

export default DashboardAnnouncements;
