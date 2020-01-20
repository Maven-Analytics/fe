import PropTypes from 'prop-types';
import React from 'react';

import GlobalFooter from '#root/components/sections/globalFooter';
import GlobalHeader from '#root/components/sections/globalHeader';

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

