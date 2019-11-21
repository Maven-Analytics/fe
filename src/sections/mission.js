import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import Link from 'next/link';
import {Timeline, Tween} from 'react-gsap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as stateActions} from '../redux/ducks/state';
import {isLg, isMd, isSm, isXl} from '../components/mediaQuery';
import ParallaxBg from '../components/parallaxBg';
import Markdown from '../components/markdown';
import ScrollToNext from '../components/scrollToNext';
import MaIcon from '../components/maIcon';
import TrackVisibility from '../components/trackVisibility';
import {Routes} from '../routes';
<<<<<<< HEAD
import withWindowSize from '../components/withWindowSize';
import {click, noop, clickAction} from '../utils/componentHelpers';
import MissionFeature from '../components/missionFeature';
=======
import {canUseWebP} from '../utils/componentHelpers';
>>>>>>> enhancement-hero-image

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

  handleFeatureClick(index, feature) {
    return () => {
      if (isMd()) {
        this.setState({activeIndex: index});
      } else {
        this.props.actions.modalOpen('missionItem', feature);
      }
    };
  }

  render() {
    const {content, features, scrollTo} = this.props;
    const {activeIndex} = this.state;

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
                      <div key={index}>
                        <MissionFeature
                          tag="button"
                          active={index === activeIndex}
                          title={feature.get('title')}
                          description={feature.get('description')}
                          icon={feature.get('icon')}
                          linkText={feature.get('linkText')}
                          linkUrl={feature.get('linkUrl')}
                          onClick={activeIndex > -1 ? noop : this.handleFeatureClick(index, feature)}
                          onClose={this.handleFeatureClick(-1)}
                        />
                      </div>
                      // <button
                      //   key={feature.get('title')}
                      //   className={['mission-feature', index === activeIndex ? 'active' : ''].join(' ')}
                      //   onClick={}
                      // >
                      //   <div className="mission-feature__inner">
                      //     <span role="button" className="mission-feature__close" onClick={click(this.handleFeatureClick, -1)}>
                      //       <MaIcon icon="times" />
                      //     </span>
                      //     <div className="mission-feature__preview">
                      //       <MaIcon icon={feature.get('icon')} />
                      //       <p>{feature.get('title')}</p>
                      //     </div>
                      //     <div className="mission-feature__description">
                      //       <p>{feature.get('description')}</p>
                      //       <Link href={feature.get('linkUrl')}>
                      //         <a className="btn btn--primary-solid">{feature.get('linkText')}</a>
                      //       </Link>
                      //     </div>
                      //   </div>
                      // </button>
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
  scrollTo: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func)
};

Mission.defaultProps = {
  features: List()
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withWindowSize(Mission));
