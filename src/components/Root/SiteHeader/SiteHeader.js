import {Header, HeaderStatic, HeaderUser, LinkList} from 'maven-ui';
import {responsive, zIndex} from 'maven-ui/lib/helpers';
import {withRouter} from 'next/router';
import * as PropTypes from 'prop-types';
import React from 'react';
import Headroom from 'react-headroom';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import LoggedIn from '#root/components/loggedIn';
import LoggedOut from '#root/components/loggedOut';
import {actions as stateActions, selectors as stateSelectors} from '#root/redux/ducks/state';
import {selectors as userSelectors} from '#root/redux/ducks/user';
import {menuLinksMain, menuLinksRegister, Routes, userMenuLinks} from '#root/routes';
import {canUseDOM} from '#root/utils/componentHelpers';
import {headerHeightDesktop, headerHeightMobile} from '#root/utils/styles';

const Wrapper = styled.header`
  ${responsive.mediaBreakpointUp('lg')} {
    left: 0;
    position: ${props => (props.static ? 'static' : 'absolute')};
    top: 0;
    width: 100%;
  }

  .headroom-wrapper {
    background-color: ${props => props.theme.nero};
    height: ${headerHeightMobile}px !important;
    max-height: ${headerHeightMobile}px;

    ${responsive.mediaBreakpointUp('lg')} {
      background-color: transparent;
      height: ${headerHeightDesktop}px !important;
      max-height: none;
    }
  }

  .headroom {
    background-color: ${props => props.theme.nero};
    transition: background-color 0.15s ease-in;
    z-index: ${zIndex('globalHeader')} !important;

    ${responsive.mediaBreakpointUp('lg')} {
      background-color: transparent;
    }

    &--pinned {
      background-color: ${props => props.theme.nero};
    }
  }
`;

// eslint-disable-next-line complexity
const SiteHeader = ({router: {pathname}}) => {
  const dispatch = useDispatch();
  const state = useSelector(stateSelectors.getState);
  const user = useSelector(userSelectors.getUser);

  const fullName = user && user.get('id') ? `${user.get('first_name')} ${user.get('last_name').charAt(0)}` : null;

  const isNoHeader = pathname.includes(Routes.Login) || pathname.includes(Routes.ForgotPassword) || pathname.includes(Routes.Reset);

  if (isNoHeader) {
    return null;
  }

  const isHideMainLinks =
    pathname.includes(Routes.Dashboard) ||
    pathname.includes(Routes.WelcomeSurvey) ||
    pathname.includes(Routes.Signup) ||
    pathname.includes(Routes.Enterprise);

  const isStaticHeader =
    pathname.includes(Routes.Dashboard) ||
    pathname.includes(Routes.WelcomeSurvey) ||
    pathname.includes(Routes.Signup) ||
    pathname.includes(Routes.Terms) ||
    pathname.includes(Routes.PrivacyPolicy) ||
    pathname.includes(Routes.Enterprise);

  const isSignupOrWelcome = pathname.includes(Routes.Signup) || pathname.includes(Routes.WelcomeSurvey) || pathname.includes(Routes.Enterprise);

  const HeaderComp = isStaticHeader ? HeaderStatic : Header;

  const loginRedirect = canUseDOM() ? encodeURIComponent(`${window.location.origin}${pathname}`) : '';

  return (
    <Wrapper static={isStaticHeader}>
      <Headroom disable={canUseDOM() === false || isStaticHeader}>
        <HeaderComp
          el="div"
          hamburgerActive={state.get('mobileMenu')}
          mobileCta={
            <>
              <LoggedOut>
                <Link href={Routes.Signup}>
                  <a className="btn btn--sm btn--primary">Sign Up</a>
                </Link>
              </LoggedOut>
            </>
          }
          onHamburgerClick={() => dispatch(stateActions.offmenuToggle('mobileMenu'))}
        >
          <LinkList links={isHideMainLinks ? [] : menuLinksMain} />
          <LoggedOut>
            <LinkList
              links={isSignupOrWelcome ? [{url: `${Routes.Login}?redirectTo=${loginRedirect}`, icon: 'user', title: 'Login'}] : menuLinksRegister}
            />
          </LoggedOut>
          <LoggedIn>
            <LinkList
              links={[
                {
                  children: (
                    <>
                      <HeaderUser
                        avatar={user.get('avatar_url')}
                        links={userMenuLinks}
                        onClick={() => dispatch(stateActions.offmenuToggle('headerUser'))}
                        open={state.get('headerUser')}
                        text={fullName}
                      />
                    </>
                  )
                },
                {
                  title: 'Dashboard',
                  url: Routes.Dashboard,
                  className: 'btn btn--primary'
                }
              ]}
            />
          </LoggedIn>
        </HeaderComp>
      </Headroom>
    </Wrapper>
  );
};

SiteHeader.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(SiteHeader);
