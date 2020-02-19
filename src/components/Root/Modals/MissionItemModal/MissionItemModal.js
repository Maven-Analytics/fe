import {Map} from 'immutable';
import {Modal} from 'maven-ui';
import {colors} from 'maven-ui/lib/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import MissionFeature from '#root/components/missionFeature';

const ModalContent = styled.div`
  background-color: ${props => `rgba(${colors.hexToRgb(props.theme.nero)}, 0.95)`};
  height: 100%;
  padding-top: 4.5rem;
`;

const MissionItemModal = ({data, onClose, open}) => {
  return (
    <Modal align="top-center" closeStyle={{fontSize: '2rem'}} open={open} onClose={onClose} >
      <ModalContent>
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
      </ModalContent>
    </Modal>
  );
};

MissionItemModal.propTypes = {
  data: ImmutablePropTypes.map,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

MissionItemModal.defaultProps = {
  data: Map()
};

export default MissionItemModal;
