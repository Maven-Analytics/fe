import React, {Component} from 'react';
import {Controller, Scene} from 'react-scrollmagic';
import {Tween, Timeline} from 'react-gsap';

import Main from '../layouts/main';

class ScrollPOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: 0
    };
  }

  componentDidMount() {
    this.setState({
      contentHeight: this.sections.offsetHeight
    });
  }

  render() {
    let duration = 4000;
    const {contentHeight} = this.state;

    const sections = [
      {
        text: 1,
        img: 'https://picsum.photos/700'
      },
      {
        text: 2,
        img: 'https://picsum.photos/701'
      },
      {
        text: 3,
        img: 'https://picsum.photos/702'
      },
      {
        text: 4,
        img: 'https://picsum.photos/703'
      }
    ];

    if (typeof window !== 'undefined') {
      duration = window.innerHeight * 2;
    }

    const scrollerHeight = 40;

    return (
      <Main>
        <div className="scrollpoc">
          <div className="section"/>
          <Controller>
            <Scene
              pin
              triggerHook="onLeave"
              duration={duration}
              indicators={false}
            >
              {progress => (
                <div className="sticky">
                  <div className="container">
                    <div className="sticky-inner">
                      <header style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <h1>Section Header</h1>
                      </header>

                      <div ref={t => this.sections = t} className="sections">
                        <div
                          className="scroller"
                        >
                          <div
                            className="scroller-inner"
                            style={{
                              transform: `translate3d(0, ${progress * 100}%, 0)`
                            }}
                          />
                        </div>
                        {sections.map((section, index) => {
                          const startAnim = index / sections.length;
                          const endAnim = (index + 1) / sections.length;
                          const active = (progress >= startAnim && progress < endAnim) || (progress === 1 && index + 1 === sections.length);
                          const classes = ['inner'];

                          if (active) {
                            classes.push('active');
                          }

                          return (
                            <div key={section.text} className={classes.join(' ')}>
                              <div className="content">
                                <h1>{section.text}</h1>
                                <p>This is the content for section {index}</p>
                              </div>
                              <div className="img">
                                <img src={section.img}/>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Scene>
          </Controller>
          {/* <div id="trigger" />
          <div className="scrollpoc__wrap">
            <Controller>
              <Scene duration={200} classToggle="zap" indicators={true}>
                {(progress, event) => (
                  <div className="scrollpoc__test">1 {progress} {event.type}</div>
                )}
              </Scene>
              <Scene duration={200} classToggle="zap" indicators={true}>
                {(progress, event) => (
                  <div className="scrollpoc__test">1 {progress} {event.type}</div>
                )}
              </Scene>
            </Controller>
          </div> */}
          {/* <Controller>
            <Scene
              pin
              triggerHook="onLeave"
              duration={1200}
              indicators={true}
            >
              {progress => (
                <div className="sticky">
                  <Controller>
                    <Scene indicators triggerhook="onEnter" duration={200} classToggle="zap">
                      {(progress, event) => (
                        <div className="scrollpoc__test">1 {progress} {event.type}</div>
                      )}
                    </Scene>
                    <Scene indicators triggerhook="onEnter" duration={200} classToggle="zap">
                      {(progress, event) => (
                        <div className="scrollpoc__test">1 {progress} {event.type}</div>
                      )}
                    </Scene>
                    <Scene indicators triggerhook="onEnter" duration={200} classToggle="zap">
                      {(progress, event) => (
                        <div className="scrollpoc__test">1 {progress} {event.type}</div>
                      )}
                    </Scene>
                    <Scene indicators triggerhook="onEnter" duration={200} classToggle="zap">
                      {(progress, event) => (
                        <div className="scrollpoc__test">1 {progress} {event.type}</div>
                      )}
                    </Scene>
                  </Controller>
                </div>
              )}
            </Scene>
          </Controller> */}
          <div className="section"/>
        </div>
      </Main>
    );
  }
}

export default ScrollPOC;
