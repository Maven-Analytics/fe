import React, {Fragment} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';

import MaIcon from './maIcon';

const ProductTools = ({tools}) => {
  return (
    <Fragment>
      {tools.map(tool => (
        <MaIcon key={tool} icon={tool.toLowerCase().replace(' ', '-')}/>
      ))}
    </Fragment>
  );
};

ProductTools.propTypes = {
  tools: ImmutablePropTypes.list
};

ProductTools.defaultProps = {
  tools: List()
};

export default ProductTools;
