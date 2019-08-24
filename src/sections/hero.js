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
          // sources={[
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
            <h1>You are about<br/>to become a</h1>
            <h1><span>Data Rockstar</span></h1>
            <p><MaIcon icon="chevron-right"/> Award-winning business intelligence training and resources</p>
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
