import React from 'react';
import Link from 'next/link';

import MaIcon from '../components/maIcon';
import ParallaxBg from '../components/parallaxBg';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__background">
        <ParallaxBg
          placeholderColor="#252525"
          src="/static/img/home-hero-mobile.jpg"
          srcSet="
            /static/img/home-hero-mobile.webp 1000w,
            /static/img/home-hero-mobile.jpg 1000w,
            /static/img/home-hero-desktop.webp 2307w,
            /static/img/home-hero-desktop.jpg 2307w
          "
        />
      </div>
      <div className="hero__content">
        <div className="container">
          <div className="hero__content-inner">
            <h1>We Transform Everyday People Into</h1>
            <h1><span>Data Rockstars</span></h1>
            <p><MaIcon icon="chevron-right"/> Award-winning business <strong>intelligence training and resources</strong></p>
            <Link href="/signup"><a className="btn btn--primary-solid">Free 10-Day Trial</a></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {

};

export default Hero;
