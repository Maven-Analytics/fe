import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Headroom from 'react-headroom';
import Link from 'next/link';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {click, canUseDOM} from '../utils/componentHelpers';
import {selectors as stateSelectors, actions as stateActions} from '../redux/ducks/state';
import Logo from '../components/logo';
import Hamburger from '../components/hamburger';
import {menuLinksMain} from '../routes';
import HeaderAuth from '../components/headerAuth';
import {Routes} from '../routes';

const GlobalHeader = ({state, actions, className}) => {
  const classList = ['global-header'];

  if (className) {
    classList.push(className);
  }

  return (
    <header className={classList.join(' ')}>
      <Headroom disable={canUseDOM() === false}>
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
              <HeaderAuth showContact showRegister onUserClick={click(actions.offmenuToggle, 'headerUser')} />
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
  className: PropTypes.string
};

GlobalHeader.defaultProps = {
  state: Map()
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

