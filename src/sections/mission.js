import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Link from 'next/link';

import ParallaxBg from '../components/parallaxBg';
import Markdown from '../components/markdown';
import ScrollToNext from '../components/scrollToNext';
import MaIcon from '../components/maIcon';
import {Routes} from '../routes';

const Mission = ({content, icons, scrollTo}) => {
  return (
    <div className="mission">
      <div className="mission__background">
        <ParallaxBg
          placeholderColor="#252525"
          src="/static/img/mission-bg.jpg"
          sources={[
            {
              type: 'image/webp',
              srcSet: '/static/img/mission-bg.webp'
            },
            {
              type: 'image/jpeg',
              srcSet: '/static/img/mission-bg.jpg'
            }
          ]}
        />
      </div>
      <div className="container">
        <MaIcon icon="maven" className="mission__header-icon"/>
        <Markdown content={content}/>
        <div className="mission__icons">
          {icons.map(icon => (
            <div key={icon.get('title')} className="mission__icon">
              <MaIcon
                icon={icon.get('icon')}
              />
              <p>{icon.get('title')}</p>
            </div>
          ))}
        </div>
        <Link href={Routes.Signup}>
          <a className="btn btn--primary-solid mission__cta">Sign Up Today</a>
        </Link>
        {scrollTo ? <ScrollToNext target={scrollTo} title="The Maven Method"/> : null}
      </div>
    </div>
  );
};

Mission.propTypes = {
  content: PropTypes.string,
  icons: ImmutablePropTypes.list,
  scrollTo: PropTypes.string
};

Mission.defaultProps = {
  icons: List()
};

export default Mission;
