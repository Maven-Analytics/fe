import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Link from 'next/link';

import Image from '../components/image';
import Logo from '../components/logo';
import {click} from '../utils/componentHelpers';
import {actions as stateActions} from '../redux/ducks/state';
import {Routes} from '../routes';

const AuthLayout = ({children, actions}) => {
  return (
    <Fragment>
      <main id="main" className="layout-auth" onClick={click(actions.stateReset)}>
        <div className="layout-auth__wrap">
          <div className="layout-auth__row">
            <div className="layout-auth__background">
              <Image
                cover
                placeholderColor="#FFFFFF"
                src="/static/img/auth-bg-1440.jpg"
                srcSet="
                  /static/img/auth-bg-1440.webp 1440w,
                  /static/img/auth-bg-1440.jpg 1440w,
                  /static/img/auth-bg-2880.webp 2880w,
                  /static/img/auth-bg-2880.jpg 2880w
                "
              />
            </div>
            <div className="layout-auth__content">
              <div className="layout-auth__content-inner">
                <Link href={Routes.Home}>
                  <a>
                    <Logo/>
                  </a>
                </Link>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);

