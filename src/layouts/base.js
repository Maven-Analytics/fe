import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Modals from '../sections/modals';
import IeWarn from '../components/ieWarn';

const BaseLayout = ({ children, header: Header, footer: Footer, mainClass, hideModals, headerClass, loginRedirect }) => {
  return (
    <Fragment>
      <IeWarn />
      {Header ? <Header loginRedirect={loginRedirect} className={headerClass} /> : null}
      <main id="main" className={mainClass}>
        {children}
      </main>
      <Modals hideModals={hideModals} loginRedirect={loginRedirect} />
      {Footer ? <Footer /> : null}
    </Fragment>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.any,
  footer: PropTypes.any,
  mainClass: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  hideModals: PropTypes.array,
  headerClass: PropTypes.string,
  loginRedirect: PropTypes.string
};

BaseLayout.defaultProps = {
  hideModals: []
};

export default BaseLayout;
