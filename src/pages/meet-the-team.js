import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import ImageContentful from '../components/imageContentful';

const MeetTheTeam = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')}/>
      <BrochureHero
        className="brochure-hero--medium"
        eyelash={page.get('heroEyelash')}
        title={page.get('heroTitle')}
        description={page.get('heroDescription')}
        meta={false}
        colClasses={['col-md-6', 'col-md-6']}
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
      />
      <BrochureContent className="page-team" title={page.get('brochureTitle')}>
        {page.get('flexibleContent') ? (
          <ul>
            {page.get('flexibleContent').map(teamMember => (
              <li key={teamMember.get('id')}>
                <div className="team-member">
                  <ImageContentful image={teamMember.getIn(['image', 'fields'])}/>
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
