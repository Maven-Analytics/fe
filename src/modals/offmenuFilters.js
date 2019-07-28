import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import {selectors as stateSelectors} from '../redux/ducks/state';
import CourseFilters from '../components/courseFilters';

const OffmenuFilters = ({state}) => {
  return (
    <div className="offmenu-filters">
      <CourseFilters className="course-filters--offmenu"/>
    </div>
  );
};

OffmenuFilters.propTypes = {
  state: ImmutablePropTypes.map
};

const mapStateToProps = state => ({
  state: stateSelectors.getState(state)
});

export default connect(mapStateToProps)(OffmenuFilters);
