import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import ParallaxBg from '../components/parallaxBg';
import Markdown from '../components/markdown';
import ScrollToNext from '../components/scrollToNext';
import MaIcon from '../components/maIcon';

const Mission = ({content, icons, scrollTo}) => {
  return (
    <div className="mission">
      <div className="mission__background">
        <ParallaxBg
          src="/static/img/mission-bg.jpg"
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
