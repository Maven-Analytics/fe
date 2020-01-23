import {fromJS} from 'immutable';
import * as PropTypes from 'prop-types';
import React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clickAction} from '#root/utils/componentHelpers';

import {actions as stateActions} from '../redux/ducks/state';
import ImageContentful from './imageContentful';
import MaIcon from './maIcon';
import Markdown from './markdown';

const TopicPreview = ({actions, item}) => (
  <div className="topic-preview">
    <div className="topic-preview__video">
      {item.get('thumbnail') ? <ImageContentful image={fromJS(item.get('thumbnail'))} /> : thumbnail}
      {item.get('video') ? (
        <button onClick={clickAction(actions.modalOpen, 'video', {video: item.get('video')})} aria-label="Play Video">
          <MaIcon icon="play-triangle" />
        </button>
      ) : null}
    </div>
    <Markdown className="topic-preview__description" content={item.get('description')} />
  </div>
);

TopicPreview.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  item: ImmutablePropTypes.mapContains({
    description: PropTypes.string,
    image: ImmutablePropTypes.map,
    video: PropTypes.string
  })
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
