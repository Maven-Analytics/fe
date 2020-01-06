import PropTypes from 'prop-types';
import React from 'react';

import {innerHtml} from '#root/utils/componentHelpers';

const BrochureTitle = ({title, className, tag: Tag}) => (
  <Tag
    className={['brochure-title', className ? className : ''].join(' ')}
    dangerouslySetInnerHTML={innerHtml(title)}
  />
);

BrochureTitle.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.string
};

BrochureTitle.defaultProps = {
  tag: 'h2'
};

export default BrochureTitle;
