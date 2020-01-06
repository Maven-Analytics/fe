import PropTypes from 'prop-types';
import React from 'react';
import Remarkable from 'remarkable';

import {innerHtml} from '#root/utils/componentHelpers';

const md = new Remarkable({
  html: true
});

const Markdown = ({content, className, tag: Tag, ...props}) => {
  const parsed = md.render(content);

  // eslint-disable-next-line react/no-danger
  return <Tag className={className} dangerouslySetInnerHTML={innerHtml(parsed)} {...props} />;
};

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
  tag: PropTypes.string,
  className: PropTypes.string
};

Markdown.defaultProps = {
  tag: 'div'
};

export default Markdown;
