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
import RichText from '../components/richText';
import CtaForm from '../sections/ctaForm';
import TeamTrainingForm from '../forms/teamTraining';
import CtaQuote from '../components/ctaQuote';
import Wysiwyg from '../components/wysiwyg';

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
      <BrochureContent className="page-training" title={page.get('brochureTitle')}>
        <Wysiwyg className="page-training__content" content={page.get('content')}/>
        <CtaForm title="Request A Quote" form={TeamTrainingForm}>
          <CtaQuote
            cite="- Patrick O’Donnell, VP of Sales"
            image="/static/img/1010Date-logo.png"
            imageStyle={{
              width: 187,
              height: 28
            }}
          >
            <p>I first discovered Maven Analytics through Chris’s Excel courses. The quality and caliber far exceeded all of the others I had sampled; not by a little, but by a country mile. It's clearly evident that Maven instructors take their work seriously as teachers, mentors, and subject matter experts.</p>
            <p>When we hired Maven to develop a custom training program for our team, they exceeded our expectations once again. I don't offer recommendations unless they are earned and well-deserved, and writing this recommendation for Chris and Maven Analytics was a no-brainer and a privilege. They are consummate teachers and professionals of the highest standard, and clearly at the top of their field.</p>
          </CtaQuote>
        </CtaForm>
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
