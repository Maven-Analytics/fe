import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import {Map, List, fromJS} from 'immutable';
import Link from 'next/link';

import {actions as courseActions, selectors as courseSelectors} from '../redux/ducks/courses';
import {actions as pathActions, selectors as pathSelectors} from '../redux/ducks/paths';
import {actions as pageActions, selectors as pageSelectors} from '../redux/ducks/pages';
import BrochureLayout from '../layouts/brochure';
import BrochureHero from '../sections/brochureHero';
import Head from '../components/head';
import BrochureContent from '../components/brochureContent';
import ImageContentful from '../components/imageContentful';

const CredentialsPage = ({page, courses, paths}) => {
  const products = fromJS([...courses.toJS(), ...paths.toJS()]);

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
      <BrochureContent className="page-credentials" title={page.get('brochureTitle')}>
        <ul>
          {products.map(product => (
            <li key={product.get('id')}>
              <Link href={product.get('badgeUrl')}>
                <a className="credential">
                  {product.get('title') ? <div className="tooltip centered">{product.get('title')}</div> : null}
                  <ImageContentful image={product.get('badge')}/>
                </a>
              </Link>
            </li>
          ))}
        </ul>

      </BrochureContent>
    </BrochureLayout>
  );
};

CredentialsPage.getInitialProps = ctx => {
  const {store} = ctx;

  store.dispatch(pageActions.pagesGet({slug: 'credentials'}));
  store.dispatch(courseActions.coursesInit());
  store.dispatch(pathActions.pathsInit());
  return {};
};

CredentialsPage.propTypes = {
  page: ImmutablePropTypes.map,
  courses: ImmutablePropTypes.list.isRequired,
  paths: ImmutablePropTypes.list.isRequired
};

CredentialsPage.defaultProps = {
  courses: List(),
  paths: List(),
  page: Map()
};

const mapStateToProps = state => ({
  courses: courseSelectors.getCourses(state),
  paths: pathSelectors.getPaths(state),
  page: pageSelectors.getPage(state, 'credentials')
});

export default connect(mapStateToProps)(CredentialsPage);
