import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import Carousel from '../components/carousel';
import CarouselSlide from '../components/carouselSlide';
import Image from '../components/image';

const Clients = ({clients}) => {
  return (
    <div className="clients">
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
    </div>
  );
};

Clients.propTypes = {
  clients: ImmutablePropTypes.list
};

Clients.defaultProps = {
  clients: List()
};

export default Clients;
