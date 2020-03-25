import {Modal} from 'maven-ui';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 1132px;
  overflow: hidden;
`;

const Inner = styled.div`
  height: 100vh;
  overflow: auto;
`;

class AssessmentModal extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this.init();
      }, 500);
    }
  }

  init() {
    window.initIframe(this.props.id);
  }

  render() {
    const {id, open, onClose} = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <Wrapper>
          <Inner>
            {open ? (
              <div
                className="op-interactive"
                id={id}
                data-url={`https://mavenanalytics.outgrow.us/${id}?vHeight=1`}
                data-width="100%"
              />
            ) : null}
          </Inner>
        </Wrapper>
      </Modal>
    );
  }
}

AssessmentModal.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default AssessmentModal;
