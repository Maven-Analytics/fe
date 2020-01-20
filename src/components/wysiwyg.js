import {Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Markdown from './markdown';
import RichText from './richText';

const Wysiwyg = ({content, className}) => {
  return (
    <div className={['wysiwyg', className].filter(c => c && c !== '').join(' ')}>
      {Map.isMap(content) ? <RichText content={content}/> : null}
      {typeof content === 'string' ? <Markdown content={content}/> : null}
    </div>
  );
};

Wysiwyg.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.map]),
  className: PropTypes.string
};

export default Wysiwyg;
