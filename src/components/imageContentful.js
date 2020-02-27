import {fromJS, isImmutable, Map} from 'immutable';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

import Image from './image';

const ImageContentful = ({image, ...props}) => {
  if (!image) {
    return null;
  }

  if (!isImmutable(image)) {
    image = fromJS(image);
  }

  if (image.has('fields')) {
    image = fromJS({
      id: image.getIn(['sys', 'id']),
      file: {
        url: image.getIn(['fields', 'file', 'url'])
      },
      title: image.getIn(['fields', 'title'])
    });
  }

  return <Image {...props} alt={image.get('title')} src={image.getIn(['file', 'url'])} />;
};

ImageContentful.propTypes = {
  image: PropTypes.oneOfType([ImmutablePropTypes.map, PropTypes.object]).isRequired
};

ImageContentful.defaultProps = {
  image: Map()
};

export default ImageContentful;
