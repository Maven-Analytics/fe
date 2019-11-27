import React from 'react';
import PropTypes from 'prop-types';

import GlobalHeader from '../sections/globalHeader';
import GlobalFooter from '../sections/globalFooter';

import BaseLayout from './base';

const MainLayout = ({children, className}) => {
  return (
    <BaseLayout
      headerClass={className}
      header={GlobalHeader}
      footer={GlobalFooter}
    >
      {children}
    </BaseLayout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default MainLayout;

