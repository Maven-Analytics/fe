import {spacingUnit} from 'maven-ui/lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import {Routes} from '#root/routes';
import {mediaBreakpointUp} from '#root/utils/responsive';
import {headerHeightDesktop} from '#root/utils/styles';

import HeroBg from '../../shared/HeroBg';
import FeaturedBlogCarouselItem from './FeaturedBlogCarouselItem';

const Slide = styled(FeaturedBlogCarouselItem)`
  ${mediaBreakpointUp('md')} {
    margin: 0 auto;
    max-width: 85%;
  }
`;

const Wrapper = styled.div`
  min-height: 527px;
  position: relative;

  ${mediaBreakpointUp('md')} {
    min-height: 337px;
  }

  ${mediaBreakpointUp('lg')} {
    min-height: 499px;
  }

  ${mediaBreakpointUp('xl')} {
    min-height: 614px;
  }
`;

const Inner = styled.div`
  padding: 10px 0 ${spacingUnit.l};

  ${mediaBreakpointUp('md')} {
    padding: ${spacingUnit.l} 0 ${spacingUnit.xl};
  }

  ${mediaBreakpointUp('lg')} {
    padding: ${headerHeightDesktop + 50}px 0 0;
  }

  .carousel {
    width: 100%;

    .carousel-slide {
      width: 100%;
    }

    &.arrow-buttons {
      .flickity-prev-next-button {
        color: #fff;
        background-color: rgb(36, 36, 36, 0.7);
        border-radius: 0;
        top: 125px;

        ${mediaBreakpointUp('md')} {
          background-color: rgba(255, 255, 255, 0.1);
          height: 40px;
          top: 50%;
          width: 40px;
        }

        &.previous {
          ${mediaBreakpointUp('xl')} {
            left: 0;
          }
        }

        &.next {
          ${mediaBreakpointUp('xl')} {
            right: 0;
          }
        }
      }

      .flickity-page-dots {
        display: none;

        ${mediaBreakpointUp('md')} {
          bottom: -30px;
          display: block;
          margin-left: 56px;
        }

        ${mediaBreakpointUp('lg')} {
          bottom: 0;
        }

        li {
          background-color: #fff;

          ${mediaBreakpointUp('lg')} {
            background-color: #292929;
          }
        }
      }
    }
  }
`;

const FeaturedBlogCarousel = ({blogs}) => {
  console.log(blogs);
  return (
    <Wrapper>
      <HeroBg />
      <Inner>
        <div className="container container--lg container--xl">
          <Carousel className="arrow-buttons" options={{pageDots: true, prevNextButtons: true}}>
            {blogs &&
              blogs.map((blog, index) => {
                return (
                  <CarouselSlide key={index}>
                    <div className="container container--lg">
                      <Slide
                        authorImage={blog.author && blog.author.thumbnail}
                        authorName={blog.author && blog.author.name}
                        body={blog.body}
                        eyelash={blog.category && blog.category.title}
                        id={blog.id}
                        image={blog.featuredImage}
                        link={`${Routes.Blog}/${blog.slug}`}
                        title={blog.title}
                      />
                    </div>
                  </CarouselSlide>
                );
              })}
          </Carousel>
        </div>
      </Inner>
    </Wrapper>
  );
};

FeaturedBlogCarousel.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object)
};

export default FeaturedBlogCarousel;
