import React from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

import {innerHtml} from '../utils/componentHelpers';

const md = new Remarkable({
  html: true
});

const Markdown = ({content, tag: Tag, ...props}) => {
  const parsed = md.render(content);

  // eslint-disable-next-line react/no-danger
  return <Tag dangerouslySetInnerHTML={innerHtml(parsed)} {...props}/>;
};

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
  tag: PropTypes.string
};

Markdown.defaultProps = {
  tag: 'div'
};

export default Markdown;
