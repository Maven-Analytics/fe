import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

const VideoModal = ({video, open, onClose}) => {
  return (
    <Modal open={open} onClose={onClose} size="full" className="modal--video">
      <div className="video-modal">
        <div className="video-responsive">
          {video ? (
            <iframe
              src={video}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

VideoModal.propTypes = {
  video: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default VideoModal;
