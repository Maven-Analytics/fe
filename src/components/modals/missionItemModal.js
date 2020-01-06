import {Map} from 'immutable';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import MissionFeature from '#root/components/missionFeature';

import Modal from './modal';

class MissionItemModal extends Component {
  componentDidMount() {
    // This.init();
  }

  render() {
    const {data, open, onClose} = this.props;

    return (
      <Modal open={open} onClose={onClose} size="full" position="top-center" className="modal--mission-item">
        <div className="mission-item-modal">
          <MissionFeature
            tag="div"
            active
            className="mission-feature--full-display"
            title={data.get('title')}
            description={data.get('description')}
            icon={data.get('icon')}
            linkText={data.get('linkText')}
            linkUrl={data.get('linkUrl')}
          />
        </div>
      </Modal>
    );
  }
}

MissionItemModal.propTypes = {
  data: ImmutablePropTypes.map,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

MissionItemModal.defaultProps = {
  data: Map()
};

export default MissionItemModal;
