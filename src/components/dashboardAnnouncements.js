import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';

import RichText from './richText';

const DashboardAnnouncements = ({announcements}) => (
  <div className="dashboard-announcements">
    <ul>
      {announcements.map(announcement => {
        const date = new Date(announcement.get('date'));

        return (
          <li key={announcement.get('id')}>
            <div className="dashboard-announcements__item">
              <div className="dashboard-announcements__item-meta">
                <span>
                  {date.getUTCMonth()}.{date.getUTCDate()}.{date.getUTCFullYear()}
                </span>
                {announcement.get('pinned') ? <span className="pill pinned">Pinned</span> : null}
                {announcement.get('new') ? <span className="pill new">New</span> : null}
              </div>
              <h4>{announcement.get('title')}</h4>
              <RichText content={announcement.get('message')} />
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
