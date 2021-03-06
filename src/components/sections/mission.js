import {List} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {spring, StaggeredMotion} from 'react-motion';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MaIcon from '#root/components/maIcon';
import Markdown from '#root/components/markdown';
import {isMd} from '#root/components/mediaQuery';
import MissionFeature from '#root/components/missionFeature';
import ParallaxBg from '#root/components/parallaxBg';
import ScrollToNext from '#root/components/scrollToNext';
import TrackVisibility from '#root/components/trackVisibility';
import withWindowSize from '#root/components/withWindowSize';
import {actions as stateActions} from '#root/redux/ducks/state';
import {Routes} from '#root/routes';
import {canUseWebP, noop} from '#root/utils/componentHelpers';

class Mission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: -1
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleFeatureClick = this.handleFeatureClick.bind(this);
  }

  handleShow() {
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 1000);
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
    const {activeIndex, visible} = this.state;

    return (
      <div className="mission">
        <div className="mission__background">
          <ParallaxBg
            placeholderColor="#252525"
            src={canUseWebP() ? '/static/img/mission-bg.webp' : '/static/img/mission-bg.jpg'}
          />
        </div>
        <TrackVisibility alwaysShow className="container" offset={0.5} onShow={this.handleShow}>
          <Fragment>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mission__copy">
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
                </div>
              </div>
              <div className="col-12 col-md-6 col-xl-5 offset-xl-1">
                <StaggeredMotion
                  defaultStyles={features.reduce(arr => arr.concat([{y: 10, opacity: 0}]), [])}
                  styles={prevStyles => {
                    if (visible) {
                      const easing = {
                        damping: 30,
                        stiffnexx: 265
                      };

                      return prevStyles.map((_, index) => {
                        if (index === 0) {
                          return {
                            y: spring(0, easing),
                            opacity: spring(1, easing)
                          };
                        }

                        return {
                          y: spring(prevStyles[index - 1].y, easing),
                          opacity: spring(prevStyles[index - 1].opacity, easing)
                        };
                      });
                    }

                    return prevStyles;
                  }}
                >
                  {styles => (
                    <div className={['mission__features', activeIndex > -1 ? 'has-active' : ''].join(' ')}>
                      {styles.map((style, index) => {
                        const feature = features.get(index);

                        return (
                          <div
                            key={index}
                            style={{
                              opacity: style.opacity,
                              transform: `translateY(${style.y}px)`
                            }}
                          >
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
                        );
                      })}
                    </div>
                  )}
                </StaggeredMotion>
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
