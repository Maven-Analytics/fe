import React from 'react';
import PropTypes from 'prop-types';

import MethodItem from '../components/methodItem';
import MethodHeader from '../components/methodHeader';
import TrackVisibility from '../components/trackVisibility';

const MethodMobile = ({items}) => {
  return (
    <TrackVisibility className="method-mobile">
      <div className="container container--lg">
        <MethodHeader/>
        <ul>
          {items.map((item, index) => (
            <TrackVisibility alwaysShow key={item.title} tag="li" inViewClass="active">
              <MethodItem
                active
                key={item.title}
                step={index + 1}
                title={item.title}
                description={item.description}
                image={item.imgMobile}
                linkTitle={item.linkTitle}
                linkHref={item.linkHref}
              />
            </TrackVisibility>
          ))}
        </ul>
      </div>
    </TrackVisibility>
  );
};

MethodMobile.propTypes = {
  items: PropTypes.array.isRequired
};

export default MethodMobile;
