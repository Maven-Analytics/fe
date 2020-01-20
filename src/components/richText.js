import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {isImmutable} from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const RichText = ({content}) => {
  if (!content || (isImmutable(content) && content.isEmpty())) {
    return null;
  }

  return documentToReactComponents(isImmutable(content) ? content.toJS() : content);
};

RichText.propTypes = {
  content: ImmutablePropTypes.map.isRequired
};

export default RichText;
