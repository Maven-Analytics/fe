import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Link from 'next/link';
import {Timeline, Tween} from 'react-gsap';

import ParallaxBg from '../components/parallaxBg';
import Markdown from '../components/markdown';
import ScrollToNext from '../components/scrollToNext';
import MaIcon from '../components/maIcon';
import TrackVisibility from '../components/trackVisibility';
import {Routes} from '../routes';
import {canUseWebP} from '../utils/componentHelpers';

class Mission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    // This.tween = createRef();
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState({
      visible: true
    });
  }

  render() {
    const {content, icons, scrollTo} = this.props;

    return (
      <div className="mission">
        <div className="mission__background">
          <ParallaxBg
            placeholderColor="#252525"
            src={canUseWebP() ? '/static/img/mission-bg.webp' : '/static/img/mission-bg.jpg'}
          />
        </div>
        <TrackVisibility alwaysShow className="container" onShow={this.handleShow}>
          <Fragment>
            <Tween
              playState={this.state.visible ? 'play' : 'pause'}
              staggerFrom={{alpha: 0, y: 10}}
              staggerTo={{alpha: 1, y: 0}}
              stagger={0.2}
              duration={1}
              ease="Back.easeOut"
              delay={0.5}
            >
              <div>
                <MaIcon icon="maven" className="mission__header-icon" />
              </div>
              <div>
                <Markdown content={content} />
              </div>
              {icons.map(icon => (
                <div key={icon.get('title')} className="mission__icon">
                  <MaIcon icon={icon.get('icon')} />
                  <p>{icon.get('title')}</p>
                </div>
              ))}
              <div>
                <Link href={Routes.Signup}>
                  <a className="btn btn--primary-solid mission__cta">Sign Up Today</a>
                </Link>
              </div>
            </Tween>

            {scrollTo ? <ScrollToNext target={scrollTo} title="The Maven Method" /> : null}
          </Fragment>
        </TrackVisibility>
      </div>
    );
  }
}

Mission.propTypes = {
  content: PropTypes.string,
  icons: ImmutablePropTypes.list,
  scrollTo: PropTypes.string
};

Mission.defaultProps = {
  icons: List()
};

export default Mission;
