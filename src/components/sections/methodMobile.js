import PropTypes from 'prop-types';
import React from 'react';

import MethodHeader from '#root/components/methodHeader';
import MethodItem from '#root/components/methodItem';
import TrackVisibility from '#root/components/trackVisibility';

const MethodMobile = ({items}) => {
  return (
    <div className="method-mobile">
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
    </div>
  );
};

MethodMobile.propTypes = {
  items: PropTypes.array.isRequired
};

export default MethodMobile;
