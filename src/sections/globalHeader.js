import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Headroom from 'react-headroom';
import Link from 'next/link';
import {Map} from 'immutable';

import {click} from '../utils/componentHelpers';
import Logo from '../components/logo';
import Hamburger from '../components/hamburger';
import {menuLinksMain, menuLinksRegister} from '../constants';
import MaIcon from '../components/maIcon';
import HeaderAuth from '../components/headerAuth';

class GlobalHeader extends Component {
  render() {
    return (
      <header className="global-header">
        <Headroom>
          <div className="container">
            <div className="global-header__inner">
              <Link href="/">
                <a className="global-header__brand">
                  <Logo/>
                </a>
              </Link>
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
                <HeaderAuth showContact showRegister onUserClick={click(this.props.offmenuToggle, 'headerUser')}/>
              </nav>
              <Hamburger isActive={this.props.state.get('mobileMenu')} onClick={click(this.props.offmenuToggle, 'mobileMenu')}/>
            </div>
          </div>
        </Headroom>
      </header>
    );
  }
}

GlobalHeader.propTypes = {
  offmenuToggle: PropTypes.func.isRequired,
  state: ImmutablePropTypes.map
};

GlobalHeader.defaultProps = {
  state: Map()
};

export default GlobalHeader;
