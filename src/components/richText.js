import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {isImmutable} from 'immutable';

const RichText = ({content}) => {
  if (!content) {
    return null;
  }

  return documentToReactComponents(isImmutable(content) ? content.toJS() : content);
};

RichText.propTypes = {
  content: ImmutablePropTypes.map.isRequired
};

export default RichText;
