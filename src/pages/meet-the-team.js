import {Map} from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import BrochureLayout from '#root/components/layout/brochure';
import BrochureHero from '#root/components/sections/BrochureHero';
import BrochureHeroContent from '#root/components/sections/BrochureHero/BrochureHeroContent';
import BrochureHeroMedia from '#root/components/sections/BrochureHero/BrochureHeroMedia';
import contentfulImageSrc from '#root/utils/contentfulImageSrc';

import BrochureContent from '../components/brochureContent';
import Head from '../components/head';
import ImageContentful from '../components/imageContentful';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';

const MeetTheTeam = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')} />
      <BrochureHero
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
        className="brochure-hero--medium"
        columnClasses={['col-md-6', 'col-md-6']}
        contentLeft={<BrochureHeroContent description={page.get('heroText')} eyelash={page.get('heroEyelash')} title={page.get('heroTitle')} />}
        contentRight={
          <BrochureHeroMedia overflow image={contentfulImageSrc(page.get('heroImage') && page.get('heroImage').toJS())}></BrochureHeroMedia>
        }
      />
      <BrochureContent className="page-team" title={page.get('brochureTitle')}>
        {page.get('flexibleContent') ? (
          <ul>
            {page.get('flexibleContent').map(teamMember => (
              <li key={teamMember.get('id')}>
                <div className="team-member">
                  <ImageContentful image={teamMember.getIn(['image', 'fields'])} />
                  <h4>{teamMember.get('title')}</h4>
                  <p>{teamMember.get('role')}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </BrochureContent>
    </BrochureLayout>
  );
};

MeetTheTeam.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'meet-the-team'}));
  return {};
};

MeetTheTeam.propTypes = {
  page: ImmutablePropTypes.map
};

MeetTheTeam.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'meet-the-team')
});

export default connect(mapStateToProps)(MeetTheTeam);
