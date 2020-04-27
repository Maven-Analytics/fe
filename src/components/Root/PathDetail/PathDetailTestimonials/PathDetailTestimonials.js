import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {GradientText} from 'maven-ui';

import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import Markdown from '#root/components/markdown';

import PathDetailContainer from '../PathDetailContainer';
import {mediaBreakpointUp} from '#root/utils/responsive';

const CarouselWrap = styled.div`
  overflow: hidden;
  .carousel {
    overflow: visible;
    position: relative;

    &::after {
      content: ' ';
    }

    .flickity-viewport {
      overflow: visible;
    }

    .carousel-slide {
      opacity: 0.5;
      width: 261px;

      &.is-selected {
        opacity: 1;
      }

      ${mediaBreakpointUp('sm')} {
        width: 460px;
      }

      ${mediaBreakpointUp('md')} {
        width: 600px;
      }

      ${mediaBreakpointUp('lg')} {
        width: 710px;
      }
    }
  }
`;

const QuoteMarker = styled(GradientText)`
  display: inline-block;
  font-family: 'Georgia';
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.33;
  margin: 0 auto;
  position: absolute;
  top: 0;
  vertical-align: baseline;

  ${mediaBreakpointUp('md')} {
    font-size: 8rem;
    left: -2.5rem;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 1.4rem;
  text-align: center;

  ${mediaBreakpointUp('lg')} {
    margin: 0 0 2.7rem;
  }
`;

const Name = styled.p`
  color: ${props => props.theme.nero};
  font-weight: 700;
  margin: 0 0 1.4rem;
`;

const Testimonial = styled.div`
  color: #757575;
  font-size: 1.6rem;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 261px;
  padding-top: 5rem;
  position: relative;
  text-align: center;
  width: calc(100% - 50px);

  ${mediaBreakpointUp('sm')} {
    max-width: none;
    width: calc(100% - 60px);
  }

  ${mediaBreakpointUp('md')} {
    font-size: 1.8rem;
    line-height: 1.88;
    padding-top: 6rem;
    text-align: left;
    width: calc(100% - 120px);
  }

  ${mediaBreakpointUp('lg')} {
  }
`;

const Wrapper = styled.div`
  margin: 5rem 0;

  ${mediaBreakpointUp('lg')} {
    margin: 6.2rem 0 7rem;
  }
`;

const PathDetailTestimonials = ({testimonials, title, ...props}) => {
  return (
    <Wrapper {...props}>
      <PathDetailContainer>
        <SectionTitle>{title}</SectionTitle>
      </PathDetailContainer>
      <CarouselWrap>
        <PathDetailContainer>
          <Carousel isStatic className="arrow-buttons" options={{cellAlign: 'center', initialIndex: 1, pageDots: false, prevNextButtons: true}}>
            {testimonials &&
              testimonials.map(testimonial => (
                <CarouselSlide key={testimonial.id}>
                  <Testimonial>
                    <QuoteMarker>&#8220;</QuoteMarker>
                    <Markdown content={testimonial.text} />
                    <Name>- {testimonial.name}</Name>
                  </Testimonial>
                </CarouselSlide>
              ))}
          </Carousel>
        </PathDetailContainer>
      </CarouselWrap>
    </Wrapper>
  );
};

PathDetailTestimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequre,
      text: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string.isRequired
};

export default PathDetailTestimonials;
