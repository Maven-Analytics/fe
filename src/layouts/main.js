import React from 'react';
import PropTypes from 'prop-types';

import GlobalHeader from '../sections/globalHeader';
import GlobalFooter from '../sections/globalFooter';

import BaseLayout from './base';

const MainLayout = ({children}) => {
  return (
    <BaseLayout
      header={GlobalHeader}
      footer={GlobalFooter}
    >
      {children}
    </BaseLayout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;

