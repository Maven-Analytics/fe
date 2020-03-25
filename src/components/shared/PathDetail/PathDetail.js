import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import Markdown from '#root/components/markdown';
import ProductDetail from '#root/components/productDetail';
import {selectors as pathSelectors} from '#root/redux/ducks/paths';
import {noop} from '#root/utils/componentHelpers';

const PathDetail = ({pathId, onResumeClick: handleResumeClick}) => {
  const paths = useSelector(pathSelectors.getPaths);
  const path = paths.find(p => p.get('id') === pathId);

  if (!path) {
    return null;
  }

  return (
    <ProductDetail
      productTerm="Path"
      badge={path.get('badge')}
      title={path.get('title')}
      titleTag="h2"
      percentage_completed={path.get('percentage_completed')}
      resumeUrl={path.get('resumeUrl')}
      onResumeClick={handleResumeClick}
      tools={path.get('tools')}
      match={path.get('match')}
      courseCount={path.get('courses').count()}
      hours={path.get('length')}
      instructors={path.get('instructors')}
      id={path.get('id')}
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

