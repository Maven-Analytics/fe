import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';

import {actions as stateActions} from '../redux/ducks/state';
import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import {clickAction} from '../utils/componentHelpers';
import Markdown from './markdown';

const TopicPreview = ({description, video, thumbnail, actions}) => (
  <div className="topic-preview">
    <div className="topic-preview__video">
      {thumbnail ? <ImageContentful image={fromJS(thumbnail)} /> : thumbnail}
      {video ? (
        <button onClick={clickAction(actions.modalOpen, 'video', {video: video})} aria-label="Play Video">
          <MaIcon icon="play-triangle" />
        </button>
      ) : null}
    </div>
    <Markdown className="topic-preview__description" content={description} />
  </div>
);

TopicPreview.propTypes = {
  description: PropTypes.string,
  video: PropTypes.string,
  thumbnail: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...stateActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPreview);
