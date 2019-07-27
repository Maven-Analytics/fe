import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Modals from '../sections/modals';

const BaseLayout = ({children, header: Header, footer: Footer, mainClass, hideModals}) => {
  return (
    <Fragment>
      {Header ? <Header/> : null}
      <main id="main" className={mainClass}>
        {children}
      </main>
      <Modals hideModals={hideModals}/>
      {Footer ? <Footer/> : null}
    </Fragment>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.any,
  footer: PropTypes.any,
  mainClass: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  hideModals: PropTypes.array
};

BaseLayout.defaultProps = {
  hideModals: []
};

export default BaseLayout;
