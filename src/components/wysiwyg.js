import {Map} from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Markdown from './markdown';

const Wysiwyg = ({content, className}) => {
  return (
    <div className={['wysiwyg', className].filter(c => c && c !== '').join(' ')}>
      {typeof content === 'string' ? <Markdown content={content}/> : null}
    </div>
  );
};

Wysiwyg.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string
};

export default Wysiwyg;
