import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';

import Image from './image';

const ImageContentful = ({image, ...props}) => {
  if (!image) {
    return null;
  }

  return (
    <Image
      {...props}
      alt={image.get('title')}
      src={image.getIn(['file', 'url'])}
    />
  );
};

ImageContentful.propTypes = {
  image: ImmutablePropTypes.map.isRequired
};

ImageContentful.defaultProps = {
  image: Map()
};

export default ImageContentful;
