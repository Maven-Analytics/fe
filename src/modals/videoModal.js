import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

const VideoModal = ({video, open, onClose}) => {
  return (
    <Modal open={open} onClose={onClose} size="full" className="modal--video">
      <div className="video-modal">
        <div className="video-responsive">
          <iframe
            src={video}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Modal>
  );
};

VideoModal.propTypes = {
  video: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

export default VideoModal;
