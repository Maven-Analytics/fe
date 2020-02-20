import * as PropTypes from 'prop-types';

import {CloseIcon, LinkList, MobileMenu, Modal, Offmenu} from 'maven-ui';
import {menuLinksMain, menuLinksRegister, userMenuLinks} from '#root/routes';

import LoggedIn from '#root/components/loggedIn';
import LoggedOut from '#root/components/loggedOut';
import React from 'react';
import {useTheme} from 'styled-components';

const MobileNav = ({open, onClose: handleClose}) => {
  const theme = useTheme();

  return (
    <Modal
      align="right"
      showClose={false}
      contentWidth="100%"
      contentStyle={{maxWidth: '100%'}}
      onClose={handleClose}
      open={open}
      scroll={false}
    >
      <Offmenu
        align="right"
        closeAlign="right"
        closeIcon={<CloseIcon />}
        closeStyle={{margin: '1rem 3rem'}}
        onClose={handleClose}
        open={open}
        width="100%"
        wrapperStyle={{backgroundColor: theme.nero}}
      >
        <MobileMenu>
          <LinkList links={menuLinksMain} onLinkClick={handleClose} />
          <LoggedIn>
            <LinkList links={userMenuLinks} onLinkClick={handleClose} />
          </LoggedIn>
          <LoggedOut>
            <LinkList links={menuLinksRegister} onLinkClick={handleClose} />
          </LoggedOut>
        </MobileMenu>
      </Offmenu>
    </Modal>
  );
};

MobileNav.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default MobileNav;
