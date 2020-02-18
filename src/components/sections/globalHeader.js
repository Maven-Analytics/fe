import {Map} from 'immutable';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Headroom from 'react-headroom';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Hamburger from '#root/components/hamburger';
import HeaderAuth from '#root/components/headerAuth';
import Logo from '#root/components/logo';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {menuLinksMain, Routes} from '#root/routes';
import {canUseDOM, click} from '#root/utils/componentHelpers';

const GlobalHeader = ({state, actions, className, loginRedirect, headroomDisabled}) => {
  return null;
  const classList = ['global-header'];

  if (className) {
    classList.push(className);
  }

  return (
    <header className={classList.join(' ')}>
      <Headroom disable={canUseDOM() === false || headroomDisabled}>
        <div className="container container--lg">
          <div className="global-header__inner">
            <Link href={Routes.Home}>
              <a className="global-header__brand">
                <Logo />
              </a>
            </Link>
            <Hamburger isActive={state.get('mobileMenu')} onClick={click(actions.offmenuToggle, 'mobileMenu')} />
            <nav>
              <ul>
                {menuLinksMain.map(link => {
                  return (
                    <li key={link.get('title')}>
                      <Link href={link.get('url')}><a>{link.get('title')}</a></Link>
                    </li>
                  );
                })}
              </ul>
              <HeaderAuth showContact showRegister loginRedirect={loginRedirect} onUserClick={click(actions.offmenuToggle, 'headerUser')} />
            </nav>
          </div>
        </div>
      </Headroom>
    </header>
  );
};

GlobalHeader.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  state: ImmutablePropTypes.map,
  className: PropTypes.string,
  loginRedirect: PropTypes.string,
  headroomDisabled: PropTypes.bool
};

GlobalHeader.defaultProps = {
  state: Map(),
  headroomDisabled: false
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stateActions
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);

