import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import debounce from 'lodash.debounce';
import Headroom from 'react-headroom';
import Link from 'next/link';
import {fromJS, Map} from 'immutable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getCurrentScrollY, raf, ref, click} from '../utils/componentHelpers';
import Logo from './logo';
import Hamburger from './hamburger';
import {menuLinksMain, menuLinksRegister} from '../constants';

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
                <ul>
                  {menuLinksRegister.map(link => {
                    return (
                      <li key={link.get('title')}>
                        <Link href={link.get('url')}>
                          <a className={link.get('btn') ? 'btn btn--primary' : ''}>
                            {link.get('icon') ? <FontAwesomeIcon icon={link.get('icon').toJS()}/> : null}
                            {link.get('title')}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
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
