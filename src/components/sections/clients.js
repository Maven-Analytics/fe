import {List} from 'immutable';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Carousel from '#root/components/carousel';
import CarouselSlide from '#root/components/carouselSlide';
import Image from '#root/components/image';

const Clients = ({clients}) => {
  return (
    <div className="clients">
      <div className="container container--lg">
        <header>
          <h2>SOME OF OUR <strong>HAPPY CLIENTS</strong></h2>
        </header>
        <Carousel
          options={{
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
