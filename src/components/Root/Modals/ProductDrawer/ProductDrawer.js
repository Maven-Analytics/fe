import {CloseIcon, Modal, Offmenu} from 'maven-ui';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Close = styled(CloseIcon)`
  &.hamburger.is-active {
    height: 50px;
    width: 50px;

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      background: ${props => props.theme.nero};
    }
  }
`;

const Content = styled.div`
  height: 100%;
  max-width: 992px;
  padding: 1vh 3vw 1vh;
`;

const ProductDrawer = ({children, open, onClose: handleClose}) => {
  return (
    <Modal
      align="right"
      showClose={false}
      contentWidth="100%"
      contentStyle={{maxWidth: 992}}
      fadeInContent={false}
      onClose={handleClose}
      open={open}
      scroll={false}
    >
      <Offmenu
        align="right"
        closeAlign="left"
        closeIcon={<Close/>}
        headerHeight={50}
        onClose={handleClose}
        open={open}
        width="100%"
        wrapperStyle={{backgroundColor: '#fff', padding: '3vh 0 3vh 3vw'}}
      >
        <Content>
          {children}
        </Content>
      </Offmenu>
    </Modal>
  );
};

ProductDrawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default ProductDrawer;
