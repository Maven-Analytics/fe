import React from 'react';
import Link from 'next/link';

import MaIcon from '../components/maIcon';
import ParallaxBg from '../components/parallaxBg';
import withWindowSize from '../components/withWindowSize';
import {Routes} from '../routes';
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
              You are about
              <br />
              to become a
            </h1>
            <h1>
              <span>Data Rockstar</span>
            </h1>
            <p>
              <MaIcon icon="chevron-right" /> Award-winning business
              intelligence training and resources
            </p>
            <Link href={Routes.Signup}>
              <a className="btn btn--primary-solid">Free 10-Day Trial</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {};

export default withWindowSize(Hero);
