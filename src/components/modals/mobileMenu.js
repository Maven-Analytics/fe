import Link from 'next/link';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import CloseIcon from '#root/components/closeButton';
import HeaderAuthMobile from '#root/components/headerAuthMobile';
import Logo from '#root/components/logo';
import {menuLinksMain, Routes} from '#root/routes';
import {click, ref} from '#root/utils/componentHelpers';

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

    const currentY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;

    const movingDown = currentY < startY;

    const distToBottom = this.menuScroll.scrollHeight - this.menuScroll.offsetHeight - this.menuScroll.scrollTop;

    if (distToBottom < 1 && movingDown) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render() {
    const {isActive, offmenuToggle, loginRedirect} = this.props;
    const className = ['mobile-menu'];

    if (isActive) {
      className.push('open');
    }

    return (
      <div className={className.join(' ')}>
        <div className="mobile-menu__fog" />
        <div className="mobile-menu__inner">
          <div className="container">
            <CloseIcon className="mobile-menu__close" onClick={click(offmenuToggle, 'mobileMenu')} />
            <div ref={ref.call(this, 'menuScroll')} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} className="mobile-menu__scroll">
              <div className="mobile-menu__container">
                <Link href={Routes.Home}>
                  <a className="mobile-menu__brand" onClick={click(offmenuToggle, 'mobileMenu')}>
                    <Logo height={39} width={157} />
                  </a>
                </Link>
                <nav>
                  <ul>
                    {menuLinksMain.map(link => {
                      return (
                        <li key={link.get('title')}>
                          <Link href={link.get('url')}><a onClick={click(offmenuToggle, 'mobileMenu')}>{link.get('title')}</a></Link>
                        </li>
                      );
                    })}
                  </ul>
                  <HeaderAuthMobile loginRedirect={loginRedirect} onLinkClick={click(offmenuToggle, 'mobileMenu')} />
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
  isActive: PropTypes.bool.isRequired,
  loginRedirect: PropTypes.string
};

export default MobileMenu;