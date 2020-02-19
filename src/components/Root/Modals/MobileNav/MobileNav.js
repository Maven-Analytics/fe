import {CloseIcon, LinkList, MobileMenu, Modal, Offmenu} from 'maven-ui';
import * as PropTypes from 'prop-types';
import React from 'react';
import {useTheme} from 'styled-components';

import LoggedIn from '#root/components/loggedIn';
import LoggedOut from '#root/components/loggedOut';
import {menuLinksMain, menuLinksRegister, userMenuLinks} from '#root/routes';

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
        closeAlign="right" closeIcon={<CloseIcon/>}
        closeStyle={{margin: '1rem 3rem'}}
        onClose={handleClose}
        open={open}
        width="100%"
        wrapperStyle={{backgroundColor: theme.nero}}
      >
        <MobileMenu>
          <LinkList links={menuLinksMain} />
          <LoggedIn>
            <LinkList links={userMenuLinks} />
          </LoggedIn>
          <LoggedOut>
            <LinkList links={menuLinksRegister} />
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
