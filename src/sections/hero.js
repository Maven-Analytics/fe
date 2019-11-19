import React from 'react';
import Link from 'next/link';

import MaIcon from '../components/maIcon';
import ParallaxBg from '../components/parallaxBg';
import { Routes } from '../routes';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__background">
        <ParallaxBg
          placeholderColor="#252525"
          // Sources={[
          //   {
          //     srcSet: '/static/img/home-hero-tall-2400.webp 1600w',
          //     type: 'image/webp',
          //     media: '(min-width: 1600px)'
          //   },
          //   {
          //     srcSet: '/static/img/home-hero-tall-2400.jpg 1600w',
          //     type: 'image/jpeg',
          //     media: '(min-width: 1600px)'
          //   },
          //   {
          //     srcSet: '/static/img/home-hero-tall-1600.webp',
          //     type: 'image/webp',
          //     media: '(min-width: 1000px)'
          //   },
          //   {
          //     srcSet: '/static/img/home-hero-tall-1600.jpg',
          //     type: 'image/jpeg',
          //     media: '(min-width: 1000px)'
          //   },
          //   {
          //     srcSet: '/static/img/home-hero-tall-1000.webp',
          //     type: 'image/webp'
          //   },
          //   {
          //     srcSet: '/static/img/home-hero-tall-1000.jpg',
          //     type: 'image/jpeg'
          //   }
          // ]}
          src="/static/img/home-hero-tall.jpg"
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

export default Hero;
