import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import {click} from '../utils/componentHelpers';
import ParallaxBg from '../components/parallaxBg';
import Image from '../components/image';
import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import StudentSpotlight from '../components/studentSpotlight';

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
    return (
      <div className="student-spotlights">
        <div className="student-spotlights__background">
          <ParallaxBg
            src="/static/img/student-spotlight-bg-1440.jpg"
            srcset="/static/img/student-spotlight-bg-1440.jpg 1440w, /static/img/student-spotlight-bg-2880.jpg 2880w"
            alt="Student Spotlight"
          />
        </div>
        <div className="container container--lg">
          <header className="student-spotlights__header">
            <h2>Student <strong>Spotlight</strong></h2>
          </header>
          <Carousel options={{pageDots: false}}>
            <CarouselSlide>
              <StudentSpotlight
                image="/static/img/students/Celia_Alves.jpg"
                name="Celia Alves"
                title="Certified Data Rockstar"
                location="Ontario, Canada"
                quote="When I was hired to develop a custom reporting solution for client who runs a medical clinic, I quickly realized that the case would be much more challenging than expected. I’d have to pull records from several systems, build data models and DAX measures to tie it all together, and generate reports and analyses using VBA and Power Pivot. The tools that I learned from Maven Analytics were critical to getting the job done, and my client is absolutely thrilled with the results!"
                callout="Rocked Her Toughest Project"
                courses={fromJS([
                  'Intro to Power Query, Power Pivot & DAX',
                  'Excel VBA & Macros'
                ])}
              />
            </CarouselSlide>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default StudentSpotlights;
