import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

const RichText = ({content}) => {
  return documentToReactComponents(content.toJS());
};

RichText.propTypes = {
  content: ImmutablePropTypes.map.isRequired
};

export default RichText;
