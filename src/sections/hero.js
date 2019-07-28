import React from 'react';
import Link from 'next/link';

import MaIcon from '../components/maIcon';
import ParallaxBg from '../components/parallaxBg';
import {Routes} from '../routes';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__background">
        <ParallaxBg
          placeholderColor="#252525"
          sources={[
            {
              srcSet: '/static/img/home-hero-mobile.webp 1000w',
              type: 'image/webp'
            },
            {
              srcSet: '/static/img/home-hero-mobile.jpg 1000w',
              type: 'image/jpeg'
            },
            {
              srcSet: '/static/img/home-hero-desktop.webp 2307w',
              type: 'image/webp'
            },
            {
              srcSet: '/static/img/home-hero-desktop.jpg 2307w',
              type: 'image/jpeg'
            }
          ]}
          src="/static/img/home-hero-mobile.jpg"
        />
      </div>
      <div className="hero__content">
        <div className="container">
          <div className="hero__content-inner">
            <h1>We Transform Everyday People Into</h1>
            <h1><span>Data Rockstars</span></h1>
            <p><MaIcon icon="chevron-right"/> Award-winning business <strong>intelligence training and resources</strong></p>
            <Link href={Routes.Signup}><a className="btn btn--primary-solid">Free 10-Day Trial</a></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {

};

export default Hero;
