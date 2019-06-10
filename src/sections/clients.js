import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import Image from '../components/image';
import TrackVisibility from '../components/trackVisibility';

const Clients = ({clients}) => {
  return (
    <TrackVisibility className="clients">
      <div className="container">
        <header>
          <h2>SOME OF OUR HAPPY CLIENTS</h2>
        </header>
        <Carousel
          options={{
            autoPlay: 1500,
            pageDots: false
          }}
        >
          {clients.map(client => (
            <CarouselSlide key={client.get('name')}>
              <Image
                src={client.get('image')}
                alt={client.get('name')}
              />
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </TrackVisibility>
  );
};

Clients.propTypes = {
  clients: ImmutablePropTypes.list
};

Clients.defaultProps = {
  clients: List()
};

export default Clients;
