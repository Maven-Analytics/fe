import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BrochureHero from '#root/components/sections/brochureHero';
import {actions as stateActions} from '#root/redux/ducks/state';

import {clickAction} from '../../utils/componentHelpers';
import BrochureContent from '../brochureContent';
import Head from '../head';
import TabListTopics from '../tabListTopics';
import TopicPreview from '../topicPreview';
import BrochureLayout from './brochure';

class VideoSeriesLayout extends Component {
  render() {
    const {page, actions} = this.props;

    return (
      <BrochureLayout>
        <Head meta={page.get('meta')} />
        <BrochureHero
          className="brochure-hero--medium"
          eyelash={page.get('heroEyelash')}
          title={page.get('heroTitle')}
          video={page.get('heroVideo')}
          description={page.get('heroText')}
          onVideoClick={clickAction(actions.modalOpen, 'video', {video: page.get('heroVideo')})}
          thumbnail={page.get('heroImage')}
          meta={false}
          backgroundSources={[
            {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
            {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
          ]}
          backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
        />
        <BrochureContent className="page-video-series">
          <div className="page-video-series__content">
            <TabListTopics tabs={page.get('flexibleContent')} title="Topics" itemComponent={TopicPreview} />
          </div>
        </BrochureContent>
      </BrochureLayout>
    );
  }
}

VideoSeriesLayout.propTypes = {
  className: PropTypes.string,
  page: ImmutablePropTypes.map,
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
)(VideoSeriesLayout);
