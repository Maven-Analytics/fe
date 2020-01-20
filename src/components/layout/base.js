import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import IeWarn from '#root/components/ieWarn';
import ModalController from '#root/components/modals/modalController';

const BaseLayout = ({children, header: Header, footer: Footer, mainClass, hideModals, headerClass, loginRedirect, headroomDisabled}) => {
  return (
    <Fragment>
      <IeWarn />
      {Header ? <Header loginRedirect={loginRedirect} className={headerClass} headroomDisabled={headroomDisabled}/> : null}
      <main id="main" className={mainClass}>
        {children}
      </main>
      <ModalController hideModals={hideModals} loginRedirect={loginRedirect} />
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
  loginRedirect: PropTypes.string,
  headroomDisabled: PropTypes.bool
};

BaseLayout.defaultProps = {
  hideModals: []
};

export default BaseLayout;
