import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import {click} from '../utils/componentHelpers';
import ParallaxBg from '../components/parallaxBg';
import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import StudentSpotlight from '../components/studentSpotlight';
import TrackVisibility from '../components/trackVisibility';
import ImageContentful from '../components/imageContentful';

class StudentSpotlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(index) {
    this.setState({
      activeIndex: index
    });
  }

  render() {
    const {spotlights} = this.props;
    const {activeIndex} = this.state;

    return (
      <div className="student-spotlights">
        <div className="student-spotlights__background">
          <ParallaxBg
            src="/static/img/student-spotlight-bg-1440.jpg"
            srcset={`
              /static/img/student-spotlight-bg-1440.webp 1440w,
              /static/img/student-spotlight-bg-1440.jpg 1440w,
              /static/img/student-spotlight-bg-2880.webp 2880w,
              /static/img/student-spotlight-bg-2880.jpg 2880w
            `}
            alt="Student Spotlight"
          />
        </div>
        <div className="container container--lg">
          <header className="student-spotlights__header">
            <h2>
              Student <strong>Spotlight</strong>
            </h2>
          </header>
          <Carousel activeIndex={activeIndex} options={{pageDots: false, prevNextButtons: true}} onChange={this.handleNavClick}>
            {spotlights.map(spotlight => (
              <CarouselSlide key={spotlight.get('id')}>
                <StudentSpotlight {...spotlight.toJS()} />
              </CarouselSlide>
            ))}
          </Carousel>
          <Carousel
            activeIndex={activeIndex}
            className="student-spotlights__nav"
            options={{
              pageDots: false,
              usePercent: false,
              cellAlign: 'center'
            }}
            onChange={this.handleNavClick}
          >
            {spotlights.map((spotlight, index) => (
              <CarouselSlide key={spotlight.get('id')}>
                <button onClick={click(this.handleNavClick, index)}>
                  <ImageContentful cover image={spotlight.get('image')} />
                </button>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

StudentSpotlights.propTypes = {
  spotlights: ImmutablePropTypes.list
};

StudentSpotlights.defaultProps = {
  spotlights: List()
};

export default StudentSpotlights;
