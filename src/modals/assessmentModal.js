import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

// import {innerHtml} from '../utils/componentHelpers';

class AssessmentModal extends Component {
  componentDidMount() {
    // this.init();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this.init();
      }, 500);
    }
  }

  init() {
    console.log(this.props.id);
    window.initIframe(this.props.id);
  }

  render() {
    const {id, open, onClose} = this.props;

    return (
      <Modal open={open} onClose={onClose} size="full" className="modal--assessment">
        <div className="assessment-modal">
          <div>
            {open ? (
              <div
                className="op-interactive"
                id={id}
                data-url={`https://mavenanalytics.outgrow.us/${id}?vHeight=1`}
                data-width="100%"
              />
            ) : null}
          </div>
        </div>
      </Modal>
    );
  }
}

AssessmentModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default AssessmentModal;
