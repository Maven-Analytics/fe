import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {Controller, Scene} from 'react-scrollmagic';

import Image from '../components/image';
import MethodItem from '../components/methodItem';
import MethodHeader from '../components/methodHeader';
import Scroller from '../components/scroller';
import TrackVisibility from '../components/trackVisibility';

class MethodScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 4000
    };

    this.items = createRef();
  }

  componentDidMount() {
    this.setState({
      duration: window.innerHeight * 3
    });
  }

  render() {
    const {duration} = this.state;
    const {items} = this.props;

    return (
      <div className="method-scroll">
        <Controller>
          <Scene
            pin
            triggerHook="onLeave"
            duration={duration}
            indicators={false}
          >
            {progress => {
              const activeIndex = progress > 0 && progress < 1 ? Math.floor(progress * items.length) : progress === 1 ? items.length - 1 : 0;

              return (
                <div className="method-scroll__wrap">
                  <div className="method-scroll__inner">
                    <div className="method-scroll__content">
                      <MethodHeader/>
                      <div ref={this.items} className="method-scroll__items">
                        <Scroller progress={progress}/>
                        {items.map((item, index) => (
                          <MethodItem
                            key={item.title}
                            step={index + 1}
                            active={index === activeIndex}
                            title={item.title}
                            description={item.description}
                            linkTitle={item.linkTitle}
                            linkHref={item.linkHref}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="method-scroll__images">
                      {items.map((item, index) => {
                        const classList = ['method-scroll__image'];

                        if (index === activeIndex) {
                          classList.push('active');
                        }

                        return (
                          <TrackVisibility key={item.img} className={classList.join(' ')}>
                            <Image
                              modifier="image-1"
                              src={item.img}
                              srcSet={`${item.img} 1x, ${item.imgRetina} 2x`}
                              placeholderColor="transparent"
                              wrapStyle={{
                                paddingTop: '53.19%'
                              }}
                            />
                            <Image
                              modifier="image-2"
                              src={item.img2}
                              srcSet={`${item.img2} 1x, ${item.img2Retina} 2x`}
                              placeholderColor="transparent"
                              wrapStyle={{
                                width: item.width,
                                height: item.height,
                                top: item.top
                              }}
                            />
                          </TrackVisibility>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }}
          </Scene>
        </Controller>
      </div>
    );
  }
}

MethodScroll.propTypes = {
  items: PropTypes.array.isRequired
};

export default MethodScroll;
