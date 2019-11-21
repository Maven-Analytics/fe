import React from 'react';
import Link from 'next/link';

import ParallaxBg from '../components/parallaxBg';
import {Routes} from '../routes';
import withWindowSize from '../components/withWindowSize';
import {isLg, isXl} from '../components/mediaQuery';
import {canUseWebP} from '../utils/componentHelpers';

const heroImages = {
  mdWebp: '/static/img/home-hero-tall.webp',
  lgWebp: '/static/img/hero-parallax-1600.webp',
  xlWebp: '/static/img/hero-parallax-2400.webp',
  lgJpg: '/static/img/home-hero-tall.jpg',
  mdJpg: '/static/img/hero-parallax-1600.jpg',
  xlJpg: '/static/img/hero-parallax-2400.jpg'
};

const Img = () => {
  if (canUseWebP()) {
    if (isXl()) {
      return heroImages.xlWebp;
    }

    if (isLg()) {
      return heroImages.lgWebp;
    }

    return heroImages.mdWebp;
  }

  if (isXl()) {
    return heroImages.xlJpg;
  }

  if (isLg()) {
    return heroImages.lgJpg;
  }

  return heroImages.mdJpg;
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__background">
        <ParallaxBg
          placeholderColor="#252525"
          src={Img()}
        />
      </div>
      <div className="hero__content">
        <div className="container container--lg">
          <div className="hero__content-inner">
            <h1>
              Award-winning
            </h1>
            <h1>
              <span>ANALYTICS & BUSINESS<br />INTELLIGENCE TRAINING</span>
            </h1>
            <p>
              Transforming everyday people into data rockstars
            </p>
            <Link href={Routes.Signup}>
              <a className="btn btn--primary-solid">SIGN UP FOR FREE</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {};

export default withWindowSize(Hero);
