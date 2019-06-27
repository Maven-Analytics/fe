import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Logo from './logo';
import CloseIcon from './closeButton';
import {click, ref} from '../utils/componentHelpers';
import {menuLinksMain} from '../routes';
import HeaderAuthMobile from './headerAuthMobile';
import {Routes} from '../routes';

class MobileMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startY: 0
    };

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.menuScroll = null;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.menuScroll.scrollTo(0, 0);
    }
  }

  handleTouchStart(e) {
    this.setState({
      startY: e.touches && e.touches[0] ? e.touches[0].clientY : 0
    });
  }

  handleTouchMove(e) {
    const {startY} = this.state;

    const currentY = e.touches && e.touches[0] ? e.touches[0].clientY : 0

    const movingDown = currentY < startY;

    const distToBottom = this.menuScroll.scrollHeight - this.menuScroll.offsetHeight - this.menuScroll.scrollTop;

    if (distToBottom < 1 && movingDown) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render() {
    const {isActive, offmenuToggle} = this.props;
    const className = ['mobile-menu'];

    if (isActive) {
      className.push('open');
    }

    return (
      <div className={className.join(' ')}>
        <div className="mobile-menu__fog"/>
        <div className="mobile-menu__inner">
          <div className="container">
            <CloseIcon className="mobile-menu__close" onClick={click(offmenuToggle, 'mobileMenu')}/>
            <div ref={ref.call(this, 'menuScroll')} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} className="mobile-menu__scroll">
              <div className="mobile-menu__container">
                <Link href={Routes.Home}>
                  <a className="mobile-menu__brand">
                    <Logo height={39} width={157}/>
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
                  <HeaderAuthMobile/>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MobileMenu.propTypes = {
  offmenuToggle: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default MobileMenu;
