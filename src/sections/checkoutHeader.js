import React, {Component} from 'react';
import Link from 'next/link';

import Logo from '../components/logo';
import MaIcon from '../components/maIcon';

class CheckoutHeader extends Component {
  render() {
    return (
      <header className="global-header global-header--checkout">
        <div className="container">
          <div className="global-header__inner">
            <Link href="/">
              <a className="global-header__brand">
                <Logo/>
              </a>
            </Link>
            <nav>
              <ul>
              </ul>
              <ul>
                <li>
                  <Link href="/">
                    <a>
                      <MaIcon icon="user"/>
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default CheckoutHeader;
