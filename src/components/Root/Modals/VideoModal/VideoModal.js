import {Modal} from 'maven-ui';
import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Video = styled.div`
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;

  iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const VideoModal = ({onClose, open, video}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Wrapper>
        <Video>
          {video ? (
            <iframe
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </Video>
      </Wrapper>
    </Modal>
  );
};

VideoModal.propTypes = {
  video: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default VideoModal;
