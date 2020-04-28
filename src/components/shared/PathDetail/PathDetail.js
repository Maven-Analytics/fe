import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import Markdown from '#root/components/markdown';
import ProductDetail from '#root/components/productDetail';
import {selectors as pathSelectors} from '#root/redux/ducks/paths';
import {noop} from '#root/utils/componentHelpers';
import {Routes} from '#root/routes';

const PathDetail = ({pathId, onResumeClick: handleResumeClick}) => {
  const paths = useSelector(pathSelectors.getPaths);
  const path = paths.find(p => p.get('id') === pathId);

  if (!path) {
    return null;
  }

  return (
    <ProductDetail
      badge={path.get('badge')}
      courseCount={path.get('courses').count()}
      hours={path.get('length')}
      id={path.get('id')}
      instructors={path.get('instructors')}
      match={path.get('match')}
      onResumeClick={handleResumeClick}
      percentage_completed={path.get('percentage_completed')}
      productTerm="Path"
      resumeUrl={path.get('resumeUrl')}
      title={path.get('title')}
      titleTag="h2"
      tools={path.get('tools')}
      url={Routes.Path(path.get('slug'))}
    >
      {path.get('descriptionFull') && path.get('descriptionFull') !== '' ? <Markdown content={path.get('descriptionFull')} /> : null}
    </ProductDetail>
  );
};

PathDetail.propTypes = {
  pathId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onResumeClick: PropTypes.func
};

PathDetail.defaultProps = {
  onResumeClick: noop
};

export default PathDetail;
