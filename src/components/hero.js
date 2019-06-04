import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import TrackVisibility from './trackVisibility';
import ParallaxBg from './parallaxBg';
import Image from './image';
import MediaQuery from './mediaQuery';

const Hero = () => {
  return (
    <div className="hero">
      {/* <div className="hero__background">
        <Parallax strength={800} bgImage="/static/img/home-hero-desktop.png">

        </Parallax>
      </div>
      <div className="hero__background">
        <Parallax strength={800} bgImage="/static/img/home-hero-desktop.png">

        </Parallax>
      </div> */}
      <TrackVisibility className="hero__background">
        <MediaQuery min="lg">
          <ParallaxBg
            src="/static/img/home-hero-mobile.png"
            srcSet="
              /static/img/home-hero-mobile.png 1000w,
              /static/img/home-hero-desktop.png 2307w
            "
          />
        </MediaQuery>
        <MediaQuery max="lg">
          <Image
            preload
            modifier="image--cover"
            src="/static/img/home-hero-mobile.png"
            srcSet="
              /static/img/home-hero-mobile.png 1000w,
              /static/img/home-hero-desktop.png 2307w
            "
          />
        </MediaQuery>
      </TrackVisibility>
      {/* <div className="hero__background">
        <Image
          preload
          modifier="image--cover"
          src="/static/img/home-hero-mobile.png"
          srcSet="
            /static/img/home-hero-mobile.png 1000w,
            /static/img/home-hero-desktop.png 2307w
          "
        />
      </div> */}
      {/* <TrackVisibility once className="hero__background"> */}


        {/* <MediaQuery min="lg">
          <Parallax bgImage="/static/img/home-hero-desktop.png" strength={400}/>
        </MediaQuery>
        <MediaQuery max="lg">
          <Image preload modifier="image--cover" src="/static/img/home-hero-mobile.png"/>
        </MediaQuery> */}
      {/* </TrackVisibility> */}
      <div className="hero__content">
        <div className="container">
          <div className="hero__content-inner">
            <h1>We Transform Everyday People Into</h1>
            <h1><span>Data Rockstars</span></h1>
            <p><FontAwesomeIcon icon="chevron-right" size="2x"/> Award-winning business <strong>intelligence training and resources</strong></p>
            <a href="#" className="btn btn--primary-solid">Free 10-Day Trial</a>
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {

};

export default Hero;
