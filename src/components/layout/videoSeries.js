import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BrochureHero from '#root/components/sections/BrochureHero';
import {actions as stateActions} from '#root/redux/ducks/state';

import {clickAction} from '../../utils/componentHelpers';
import BrochureContent from '../brochureContent';
import Head from '../head';
import TabListTopics from '../tabListTopics';
import TopicPreview from '../topicPreview';
import BrochureLayout from './brochure';
import BrochureHeroContent, {BrochureHeroContentLink} from '../sections/BrochureHero/BrochureHeroContent';
import contentfulImageSrc from '#root/utils/contentfulImageSrc';
import BrochureHeroMedia from '../sections/BrochureHero/BrochureHeroMedia';

class VideoSeriesLayout extends Component {
  render() {
    const {page, actions} = this.props;

    return (
      <BrochureLayout>
        <Head meta={page.get('meta')} />
        <BrochureHero
          className="brochure-hero--medium"
          backgroundSources={[
            {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
            {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
          ]}
          backgroundSrc={page.getIn(['heroBackground', 'file', 'url'])}
          contentLeft={<BrochureHeroContent description={page.get('heroText')} eyelash={page.get('heroEyelash')} title={page.get('heroTitle')} />}
          contentRight={
            <BrochureHeroMedia
              image={contentfulImageSrc(page.get('heroImage') && page.get('heroImage').toJS())}
              onVideoClick={clickAction(actions.modalOpen, 'video', {video: page.get('heroVideo')})}
            />
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoSeriesLayout);
