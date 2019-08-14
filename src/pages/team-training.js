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

const TeamTraining = ({page}) => {
  return (
    <BrochureLayout>
      <Head meta={page.get('meta')}/>
      <BrochureHero
        className="brochure-hero--medium"
        eyelash={page.get('heroEyelash')}
        title={page.get('heroTitle')}
        description={page.get('heroDescription')}
        meta={false}
        image={<ImageContentful image={page.get('heroImage')}/>}
        colClasses={['col-md-6', 'col-md-6']}
        backgroundSources={[
          {srcSet: `${page.getIn(['heroBackground', 'file', 'url'])} 768w`, type: page.getIn(['heroBackground', 'file', 'contentType'])},
          {srcSet: `${page.getIn(['heroBackgroundSmall', 'file', 'url'])}`, type: page.getIn(['heroBackgroundSmall', 'file', 'contentType'])}
        ]}
        backgroundSrc={page.getIn(['heroBackgroundSmall', 'file', 'url'])}
      />
      <BrochureContent className="page-training" title="meet the maven method">
        <div className="page-training__content">
          <p>Let’s be honest, most training solutions just don’t cut it. Trust us, we’ve seen it all: online platforms churning out low-grade courses like factories, overpriced seminars in dreary conference rooms, and live “masterclass” sessions that feel like you’re drinking from a firehose. You deserve better.</p>
          <p>Our unique approach is ideal for teams looking for a modern and flexible learning framework; one that integrates self-paced content, live expert support, and tools to actually prove that your team is getting smarter.</p>
          <p>Here’s how it works:</p>
          <ol>
            <li><strong>Kickoff conversation</strong> to discuss your team’s challenges and learning objectives</li>
            <li><strong>Benchmark assessments</strong> to uncover strengths & weaknesses</li>
            <li><strong>Curated online learning path</strong>, with live Q&A at key checkpoints</li>
            <li>Custom dashboards and graded assessments to track progress against skills gaps</li>
            <li>Ongoing coaching & support</li>
          </ol>
          <p>In the analytics game, it’s sink or swim. And while other training platforms may throw you a life vest, we’re giving you the keys to a speedboat.</p>
          <p>Ready to transform your team into industry leaders? Let’s talk.</p>
        </div>
      </BrochureContent>
    </BrochureLayout>
  );
};

TeamTraining.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'team-training'}));
  return {};
};

TeamTraining.propTypes = {
  page: ImmutablePropTypes.map
};

TeamTraining.defaultProps = {
  page: Map()
};

const mapStateToProps = state => ({
  page: pageSelectors.getPage(state, 'team-training')
});

export default connect(mapStateToProps)(TeamTraining);
