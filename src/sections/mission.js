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
import {click, noop} from '../utils/componentHelpers';

class Mission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: -1
    };

    // This.tween = createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleFeatureClick = this.handleFeatureClick.bind(this);
  }

  handleShow() {
    this.setState({
      visible: true
    });
  }

  handleFeatureClick(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const {content, features, scrollTo} = this.props;
    const {activeIndex} = this.state;

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
        <TrackVisibility alwaysShow className="container" onShow={this.handleShow}>
          <Fragment>

            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mission__copy">
                  {/* <Tween
                    playState={this.state.visible ? 'play' : 'pause'}
                    staggerFrom={{ alpha: 0, y: 10 }}
                    staggerTo={{ alpha: 1, y: 0 }}
                    stagger={0.2}
                    duration={1}
                    ease="Back.easeOut"
                    delay={0.5}
                  > */}
                  <div>
                    <MaIcon icon="maven" className="mission__header-icon" />
                  </div>
                  <div>
                    <Markdown content={content} />
                  </div>
                  <div>
                    <Link href={Routes.BiVideoSeries}>
                      <a className="btn btn--primary-solid">Why BI?</a>
                    </Link>
                  </div>
                  {/* </Tween> */}
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-5 offset-xl-1">
                <div className={['mission__features', activeIndex > -1 ? 'has-active' : ''].join(' ')}>
                  <Tween
                    playState={this.state.visible ? 'play' : 'pause'}
                    staggerFrom={{alpha: 0, y: 10}}
                    staggerTo={{alpha: 1, y: 0}}
                    stagger={0.2}
                    duration={1}
                    ease="Back.easeOut"
                    delay={0.5}
                  >
                    {features.map((feature, index) => (
                      <button
                        key={feature.get('title')}
                        className={['mission__feature', index === activeIndex ? 'active' : ''].join(' ')}
                        onClick={activeIndex > -1 ? noop : click(this.handleFeatureClick, index)}
                      >
                        <div className="mission__feature-inner">
                          <span role="button" className="mission__feature-close" onClick={click(this.handleFeatureClick, -1)}>
                            <MaIcon icon="times" />
                          </span>
                          <div className="mission__feature-preview">
                            <MaIcon icon={feature.get('icon')} />
                            <p>{feature.get('title')}</p>
                          </div>
                          <div className="mission__feature-description">
                            <p>{feature.get('description')}</p>
                            <Link href={feature.get('linkUrl')}>
                              <a className="btn btn--primary-solid">{feature.get('linkText')}</a>
                            </Link>
                          </div>
                        </div>
                      </button>
                    ))}
                  </Tween>
                </div>

              </div>
            </div>
            {scrollTo ? <ScrollToNext target={scrollTo} title="The Maven Method" /> : null}
          </Fragment>
        </TrackVisibility>
      </div>
    );
  }
}

Mission.propTypes = {
  content: PropTypes.string,
  features: ImmutablePropTypes.list,
  scrollTo: PropTypes.string
};

Mission.defaultProps = {
  features: List()
};

export default Mission;
